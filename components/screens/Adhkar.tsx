"use client";
import React, { useState, useCallback } from "react";
import { Check } from "lucide-react";
import { DayData } from "@/lib/types";
import { ADHKAR } from "@/lib/data";
import { vibrate, playTick } from "@/lib/storage";
import { ProgressBar, TopBar } from "../ui";

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

  const advance = useCallback(() => {
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

  const tap = () => {
    vibrate(item.isCounter ? 8 : 15);
    if (soundOn && item.isCounter) playTick();
    const newCount = count + 1;
    setDay(d => ({ ...d, adhkarRepCounts: { ...d.adhkarRepCounts, [item.id]: newCount } }));
    if (newCount >= item.repetitions) advance();
  };

  const pct = Math.round((idx / ADHKAR.length) * 100 + (count / item.repetitions) * (100 / ADHKAR.length));

  return (
    <div style={{ minHeight: "100vh" }}>
      <TopBar title={`${idx + 1} / ${ADHKAR.length}`} onBack={onExit} />
      <div style={{ padding: "0 20px" }}><ProgressBar pct={pct} /></div>
      <div key={item.id} className="mc-fade-in" style={{ padding: "40px 22px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "70vh", justifyContent: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: 1.2, color: "#C8A75D", textTransform: "uppercase", marginBottom: 14 }}>{item.title}</div>

        <div className="mc-card" style={{ borderRadius: 22, padding: 28, width: "100%", maxWidth: 420 }}>
          <div className="font-arabic" dir="rtl" style={{ fontSize: item.isCounter ? 22 : 24, lineHeight: 2, textAlign: "center", color: "#f3f2ee" }}>
            {item.arabic}
          </div>
        </div>

        {item.isCounter ? (
          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button onClick={tap} className="mc-scale-tap mc-btn" style={{
              width: 148, height: 148, borderRadius: "50%", border: "2px solid var(--emerald-line)",
              background: "var(--emerald-soft)", cursor: "pointer", position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: burst ? "scale(1.08)" : "scale(1)", transition: "transform 0.25s ease",
            }}>
              <div className="font-display" style={{ fontSize: 30, color: "#16A34A" }}>
                {count}<span style={{ fontSize: 16, color: "#93938e" }}> /100</span>
              </div>
            </button>
            <div style={{ marginTop: 16, fontSize: 12, color: "#55555a" }}>Touche pour compter</div>
          </div>
        ) : (
          <>
            <div style={{ marginTop: 22, display: "flex", gap: 8 }}>
              {Array.from({ length: item.repetitions }).map((_, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: i < count ? "#16A34A" : "rgba(255,255,255,0.12)", transition: "background 0.3s ease" }} />
              ))}
            </div>
            <button onClick={tap} className="mc-btn mc-scale-tap" style={{
              marginTop: 28, padding: "16px 34px", borderRadius: 16, border: "none",
              background: burst ? "#16A34A" : "var(--emerald-soft)",
              color: burst ? "#fff" : "#16A34A",
              fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            }}>
              <Check size={17} /> J&apos;ai récité {item.repetitions > 1 ? `(${count}/${item.repetitions})` : ""}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
