"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { DayData } from "@/lib/types";
import { ADHKAR, moodFor } from "@/lib/data";
import { vibrate, playTick } from "@/lib/storage";
import { ProgressBar, TopBar } from "../ui";

const HOLD_DELAY = 320;   // ms before auto-repeat kicks in
const HOLD_INTERVAL = 90; // ms between auto increments while holding

export default function Adhkar({
  day, setDay, onDone, onExit, soundOn,
}: {
  day: DayData;
  setDay: (updater: (d: DayData) => DayData) => void;
  onDone: () => void;
  onExit: () => void;
  soundOn: boolean;
}) {
  const idx = Math.min(day.adhkarIndex, ADHKAR.length - 1);
  const item = ADHKAR[idx];
  const count = day.adhkarRepCounts[item.id] || 0;
  const [burst, setBurst] = useState(false);
  const mood = moodFor(idx);

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
      if (idx + 1 >= ADHKAR.length) {
        setDay(d => ({ ...d, adhkarCompleted: true }));
        onDone();
      } else {
        setDay(d => ({ ...d, adhkarIndex: idx + 1 }));
      }
    }, 380);
  }, [idx, setDay, onDone]);

  const increment = useCallback(() => {
    if (advancedRef.current) return;
    const newCount = liveCountRef.current + 1;
    liveCountRef.current = newCount;
    vibrate(item.isCounter ? 6 : 15);
    if (soundOn && item.isCounter) playTick();
    setDay(d => ({ ...d, adhkarRepCounts: { ...d.adhkarRepCounts, [item.id]: newCount } }));
    if (newCount >= item.repetitions) {
      advancedRef.current = true;
      advance();
    }
  }, [item, soundOn, setDay, advance]);

  const tap = () => increment();

  const startHold = () => {
    if (!item.isCounter) return; // hold-to-repeat only makes sense for the 100x counter
    increment();
    holdTimeout.current = setTimeout(() => {
      holdInterval.current = setInterval(() => {
        if (advancedRef.current) { clearHold(); return; }
        increment();
      }, HOLD_INTERVAL);
    }, HOLD_DELAY);
  };

  const pct = Math.round((idx / ADHKAR.length) * 100 + (count / item.repetitions) * (100 / ADHKAR.length));

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `linear-gradient(155deg, ${mood.from} 0%, var(--bg) 78%)`,
        transition: "background 0.9s ease",
      }} />
      <div style={{
        position: "absolute", top: "-10%", right: "-15%", width: 320, height: 320, borderRadius: "50%",
        background: mood.accent, opacity: 0.35, filter: "blur(90px)", zIndex: 0,
        transition: "background 0.9s ease",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "-15%", width: 260, height: 260, borderRadius: "50%",
        background: mood.from, opacity: 0.5, filter: "blur(80px)", zIndex: 0,
        transition: "background 0.9s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <TopBar title={`${idx + 1} / ${ADHKAR.length}`} onBack={onExit} />
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
                  background: "var(--emerald-soft)", cursor: "pointer", position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center", touchAction: "none",
                  transform: burst ? "scale(1.08)" : "scale(1)", transition: "transform 0.25s ease",
                }}
              >
                <div className="font-display" style={{ fontSize: 30, color: "var(--emerald)" }}>
                  {count}<span style={{ fontSize: 16, color: "var(--text-dim)" }}> /100</span>
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
                marginTop: 28, padding: "16px 34px", borderRadius: 16, border: "none",
                background: burst ? "var(--emerald)" : "var(--emerald-soft)",
                color: burst ? "#fff" : "var(--emerald)",
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
