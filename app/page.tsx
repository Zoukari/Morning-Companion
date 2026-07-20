"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AppData, DayData, defaultDay, resetAdhkarOnly, todayKey } from "@/lib/types";
import { loadAppData, saveAppData } from "@/lib/storage";
import { scheduleDailyReminder, cancelDailyReminder } from "@/lib/notifications";

import Splash from "@/components/screens/Splash";
import Home from "@/components/screens/Home";
import Adhkar from "@/components/screens/Adhkar";
import AdhkarComplete from "@/components/screens/AdhkarComplete";
import Routine from "@/components/screens/Routine";
import WeightScreen from "@/components/screens/Weight";
import Goal from "@/components/screens/Goal";
import RoutineDone from "@/components/screens/RoutineDone";
import Reflection from "@/components/screens/Reflection";
import Dashboard from "@/components/screens/Dashboard";
import SettingsScreen from "@/components/screens/Settings";

type Screen =
  | "home" | "adhkar" | "adhkarComplete" | "routine" | "weight" | "goal"
  | "routineDone" | "alreadyDone" | "dashboard" | "reflection" | "settings";

export default function Page() {
  const [booted, setBooted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [app, setApp] = useState<AppData | null>(null);
  const [screen, setScreen] = useState<Screen>("home");
  const [now, setNow] = useState(new Date());
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      const data = await loadAppData();
      setApp(data);
      setBooted(true);

      // Strict mode: decide the entry screen immediately (this is what an
      // iOS Shortcuts automation lands on when it opens the PWA).
      if (data.settings.strictMode) {
        const day = data.days[todayKey()] || defaultDay();
        if (day.adhkarCompleted && day.routineCompleted) {
          setScreen("alreadyDone");
        } else if (!day.adhkarCompleted) {
          setScreen("adhkar");
        } else {
          setScreen("routine");
        }
      }
    })();

    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    const clock = setInterval(() => setNow(new Date()), 30000);
    return () => { clearTimeout(splashTimer); clearInterval(clock); };
  }, []);

  // debounced persistence
  useEffect(() => {
    if (!booted || !app) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => { saveAppData(app); }, 400);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [app, booted]);

  // notification scheduling
  useEffect(() => {
    if (!app) return;
    if (app.settings.notifications) {
      scheduleDailyReminder(app.settings.notifTime, () => {
        const day = app.days[todayKey()];
        return !!day?.adhkarCompleted;
      });
    } else {
      cancelDailyReminder();
    }
  }, [app?.settings.notifications, app?.settings.notifTime]); // eslint-disable-line react-hooks/exhaustive-deps

  // apply dark/light theme to <html>, and keep the browser chrome color in sync
  useEffect(() => {
    if (!app) return;
    const theme = app.settings.theme;
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#faf9f6" : "#0a0a0b");
  }, [app?.settings.theme]);

  const setDay = useCallback((updater: (d: DayData) => DayData) => {
    setApp(a => {
      if (!a) return a;
      const key = todayKey();
      const current = a.days[key] || defaultDay();
      const next = updater(current);
      return { ...a, days: { ...a.days, [key]: next } };
    });
  }, []);

  const finalizeDayIfDone = useCallback(() => {
    setApp(a => {
      if (!a) return a;
      const key = todayKey();
      const d = a.days[key];
      if (!d.adhkarCompleted || !d.routineCompleted) return a;
      if (a.lastCompletedDate === key) return a;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = a.lastCompletedDate === yesterday ? a.streak + 1 : 1;
      const weightHistory = d.weight
        ? [...a.weightHistory.filter(w => w.date !== key), { date: key, weight: d.weight }].sort((x, y) => x.date.localeCompare(y.date))
        : a.weightHistory;
      return { ...a, streak: newStreak, lastCompletedDate: key, totalDaysCompleted: a.totalDaysCompleted + 1, weightHistory };
    });
  }, []);

  const resetTodayAdhkar = useCallback(() => {
    setDay(d => resetAdhkarOnly(d));
  }, [setDay]);

  if (showSplash || !app) return <Splash />;

  const day = app.days[todayKey()] || defaultDay();

  const handleStart = () => {
    if (!day.adhkarCompleted) setScreen("adhkar");
    else if (!day.routineCompleted) setScreen("routine");
    else setScreen("dashboard");
  };

  switch (screen) {
    case "home":
      return <Home app={app} day={day} now={now} onStart={handleStart}
        onOpenDashboard={() => setScreen("dashboard")} onOpenSettings={() => setScreen("settings")} />;
    case "adhkar":
      return <Adhkar day={day} setDay={setDay} soundOn={app.settings.soundCounter}
        onDone={() => setScreen("adhkarComplete")} onExit={() => setScreen("home")} />;
    case "adhkarComplete":
      return <AdhkarComplete onContinue={() => setScreen("routine")} />;
    case "routine":
      return <Routine day={day} setDay={setDay} onExit={() => setScreen("home")}
        onDone={() => { setDay(d => ({ ...d, routineCompleted: true })); setScreen("weight"); }} />;
    case "weight":
      return <WeightScreen app={app} day={day} setDay={setDay} onExit={() => setScreen("home")}
        onNext={() => setScreen("goal")} />;
    case "goal":
      return <Goal day={day} setDay={setDay} onExit={() => setScreen("home")}
        onNext={() => { finalizeDayIfDone(); setScreen("routineDone"); }} />;
    case "routineDone":
      return <RoutineDone onContinue={() => setScreen("home")} />;
    case "alreadyDone":
      return <RoutineDone showConfetti={false} onContinue={() => setScreen("home")} />;
    case "dashboard":
      return <Dashboard app={app} onExit={() => setScreen("home")} onReflection={() => setScreen("reflection")} />;
    case "reflection":
      return <Reflection day={day} setDay={setDay} onExit={() => setScreen("dashboard")} />;
    case "settings":
      return <SettingsScreen app={app} setApp={setApp as any} onExit={() => setScreen("home")} onResetTodayAdhkar={resetTodayAdhkar} />;
    default:
      return null;
  }
}
