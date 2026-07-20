"use client";
import React from "react";
import { Check, Droplet, Sparkles, Bath, Scale, Bed, Smile } from "lucide-react";
import { DayData } from "@/lib/types";
import { ROUTINE_TASKS } from "@/lib/data";
import { vibrate } from "@/lib/storage";
import { ProgressBar, TopBar } from "../ui";

const ICONS: Record<string, any> = {
  toilet: Droplet, brush: Sparkles, wash: Bath, weigh: Scale, water: Droplet, bed: Bed, sunnan: Smile,
};

export default function Routine({
  day, setDay, onDone, onExit,
}: {
  day: DayData;
  setDay: (updater: (d: DayData) => DayData) => void;
  onDone: () => void;
  onExit: () => void;
}) {
  const checks = day.routineChecks;
  const allDone = ROUTINE_TASKS.every(t => checks[t.id]);
  const doneCount = ROUTINE_TASKS.filter(t => checks[t.id]).length;

  const toggle = (id: string) => {
    vibrate(12);
    setDay(d => ({ ...d, routineChecks: { ...d.routineChecks, [id]: !d.routineChecks[id] } }));
  };

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Routine matinale" onBack={onExit} />
      <div style={{ padding: "0 20px" }}><ProgressBar pct={(doneCount / ROUTINE_TASKS.length) * 100} /></div>
      <div style={{ padding: "26px 20px" }}>
        <div className="font-display" style={{ fontSize: 20, marginBottom: 20 }}>Ta checklist du matin</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ROUTINE_TASKS.map(t => {
            const Icon = ICONS[t.id] || Smile;
            const done = !!checks[t.id];
            return (
              <button key={t.id} onClick={() => toggle(t.id)} className="mc-btn" style={{
                display: "flex", alignItems: "center", gap: 14, padding: "16px 16px", borderRadius: 16,
                border: `1px solid ${done ? "var(--emerald-line)" : "var(--border)"}`,
                background: done ? "var(--emerald-soft)" : "var(--card)",
                cursor: "pointer", textAlign: "left", width: "100%", transition: "background 0.2s ease, border-color 0.2s ease",
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 8, flexShrink: 0,
                  border: `1.5px solid ${done ? "var(--emerald)" : "var(--text-faint)"}`,
                  background: done ? "var(--emerald)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {done && <Check size={15} color="#fff" />}
                </div>
                <Icon size={17} color={done ? "var(--emerald)" : "var(--text-dim)"} />
                <span style={{ fontSize: 14, color: done ? "var(--text)" : "var(--text-dim)" }}>{t.label}</span>
              </button>
            );
          })}
        </div>
        <button disabled={!allDone} onClick={onDone} className="mc-btn mc-scale-tap" style={{
          marginTop: 26, width: "100%", padding: "17px", borderRadius: 16, border: "none",
          background: allDone ? "linear-gradient(135deg, var(--emerald), #0f7a37)" : "var(--track)",
          color: allDone ? "#fff" : "var(--text-faint)",
          fontSize: 15, fontWeight: 600, cursor: allDone ? "pointer" : "not-allowed",
        }}>
          Terminer la routine
        </button>
      </div>
    </div>
  );
}
