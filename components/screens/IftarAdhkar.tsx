"use client";
import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Check, SkipBack } from "lucide-react";
import { DayData } from "@/lib/types";
import { IFTAR_ADHKAR, ADHKAR, EVENING_ADHKAR, QIYAM_ADHKAR, BACKGROUND_SETS, daySetIndexForToday, backgroundFor } from "@/lib/data";
import { vibrate, playTick } from "@/lib/storage";
import { ProgressBar, TopBar, chipStyle } from "../ui";

const HOLD_DELAY = 320;
const HOLD_INTERVAL = 90;
// offset so the evening screens don't show the exact same photos, in the same
// order, as the morning ones did earlier that day
const BG_OFFSET = ADHKAR.length + EVENING_ADHKAR.length + QIYAM_ADHKAR.length;

export default function IftarAdhkar({
  day, setDay, onDone, onExit, soundOn,
}: {
  day: DayData;
  setDay: (updater: (d: DayData) => DayData) => void;
  onDone: () => void;
  onExit: () => void;
  soundOn: boolean;
}) {
  const idx = Math.min(day.iftarAdhkarIndex, IFTAR_ADHKAR.length - 1);
  const item = IFTAR_ADHKAR[idx];
  const count = day.iftarAdhkarRepCounts[item.id] || 0;
  const [burst, setBurst] = useState(false);
  const todaySet = useMemo(() => BACKGROUND_SETS[daySetIndexForToday()], []);
  const bgUrl = backgroundFor(todaySet, BG_OFFSET + idx);

  const advancedRef = useRef(false);
  const liveCountRef = useRef(count);
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    liveCountRef.current = count;
    advancedRef.current = false;
  }, [count, item.id]);

  const clearHold = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    if (holdInterval.current) clearInterval(holdInterval.current);
    holdTimeout.current = null;
    holdInterval.current = null;
  };
  useEffect(() => clearHold, [idx]);

  const advance = useCallback(() => {
    clearHold();
    setBurst(true);
    setTimeout(() => setBurst(false), 400);
    setTimeout(() => {
      if (idx + 1 >= IFTAR_ADHKAR.length) {
        setDay(d => ({ ...d, iftarAdhkarCompleted: true }));
        onDone();
      } else {
        setDay(d => ({ ...d, iftarAdhkarIndex: idx + 1 }));
      }
    }, 380);
  }, [idx, setDay, onDone]);

  const goPrevious = useCallback(() => {
    if (idx === 0) return;
    clearHold();
    setDay(d => ({ ...d, iftarAdhkarIndex: idx - 1 }));
  }, [idx, setDay]);

  const increment = useCallback(() => {
    if (advancedRef.current) return;
    const newCount = liveCountRef.current + 1;
    liveCountRef.current = newCount;
    vibrate(item.isCounter ? 6 : 15);
    if (soundOn && item.isCounter) playTick();
    setDay(d => ({ ...d, iftarAdhkarRepCounts: { ...d.iftarAdhkarRepCounts, [item.id]: newCount } }));
    if (newCount >= item.repetitions) {
      advancedRef.current = true;
      advance();
    }
  }, [item, soundOn, setDay, advance]);

  const tap = () => increment();

  const startHold = () => {
    if (!item.isCounter) return;
    increment();
    holdTimeout.current = setTimeout(() => {
      holdInterval.current = setInterval(() => {
        if (advancedRef.current) { clearHold(); return; }
        increment();
      }, HOLD_INTERVAL);
    }, HOLD_DELAY);
  };

  const pct = Math.round((idx / IFTAR_ADHKAR.length) * 100 + (count / item.repetitions) * (100 / IFTAR_ADHKAR.length));

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div key={item.id} className="mc-fade-in" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={bgUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 45%, var(--bg) 92%)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <TopBar
          title={`Iftar · ${idx + 1} / ${IFTAR_ADHKAR.length}`}
          onBack={onExit}
          chip
          right={idx > 0 ? (
            <button onClick={goPrevious} className="mc-btn" style={{ ...chipStyle, cursor: "pointer", color: "#fff" }} aria-label="Hadith précédent">
              <SkipBack size={16} />
            </button>
          ) : undefined}
        />
        <div style={{ padding: "0 20px" }}><ProgressBar pct={pct} /></div>
        <div key={item.id} className="mc-fade-in" style={{ padding: "40px 22px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "70vh", justifyContent: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 1.2, color: "var(--gold)", textTransform: "uppercase", marginBottom: 14 }}>{item.title}</div>

          <div className="mc-card" style={{ borderRadius: 22, padding: 28, width: "100%", maxWidth: 420 }}>
            <div className="font-arabic" dir="rtl" style={{ fontSize: item.isCounter ? 22 : 24, lineHeight: 2, textAlign: "center", color: "var(--text)" }}>
              {item.arabic}
            </div>
          </div>

          {item.isCounter ? (
            <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button
                onPointerDown={startHold}
                onPointerUp={clearHold}
                onPointerLeave={clearHold}
                onPointerCancel={clearHold}
                className="mc-scale-tap mc-btn"
                style={{
                  width: 148, height: 148, borderRadius: "50%", border: "2px solid var(--emerald-line)",
                  background: burst ? "var(--emerald-soft)" : "rgba(10,10,11,0.6)",
                  backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                  cursor: "pointer", position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center", touchAction: "none",
                  transform: burst ? "scale(1.08)" : "scale(1)", transition: "transform 0.25s ease, background 0.25s ease",
                }}
              >
                <div className="font-display" style={{ fontSize: 30, color: "var(--emerald)" }}>
                  {count}<span style={{ fontSize: 16, color: "var(--text-dim)" }}> /{item.repetitions}</span>
                </div>
              </button>
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--text-faint)" }}>
                Touche pour compter · maintiens appuyé pour compter en continu
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginTop: 22, display: "flex", gap: 8 }}>
                {Array.from({ length: item.repetitions }).map((_, i) => (
                  <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: i < count ? "var(--emerald)" : "var(--track-strong)", transition: "background 0.3s ease" }} />
                ))}
              </div>
              <button onClick={tap} className="mc-btn mc-scale-tap" style={{
                marginTop: 28, padding: "16px 34px", borderRadius: 16, border: "1px solid var(--emerald-line)",
                background: burst ? "var(--emerald)" : "rgba(10,10,11,0.6)",
                backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                color: burst ? "#fff" : "#3ddb7f",
                fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
              }}>
                <Check size={17} /> J&apos;ai récité {item.repetitions > 1 ? `(${count}/${item.repetitions})` : ""}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
