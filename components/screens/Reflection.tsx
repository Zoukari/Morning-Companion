"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { DayData } from "@/lib/types";
import { TopBar } from "../ui";

export default function Reflection({
  day, setDay, onExit,
}: {
  day: DayData;
  setDay: (updater: (d: DayData) => DayData) => void;
  onExit: () => void;
}) {
  const [rating, setRating] = useState(day.reflection?.rating || 0);
  const [achieved, setAchieved] = useState<boolean | null>(day.reflection?.achieved ?? null);
  const [note, setNote] = useState(day.reflection?.note || "");

  const save = () => {
    setDay(d => ({ ...d, reflection: { rating, achieved, note } }));
    onExit();
  };

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Bilan du jour" onBack={onExit} />
      <div style={{ padding: "20px 22px" }}>
        <div className="font-display" style={{ fontSize: 19, marginBottom: 14 }}>Comment s&apos;est passée ta journée ?</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 26 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setRating(n)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <Star size={30} fill={n <= rating ? "var(--gold)" : "none"} color="var(--gold)" strokeWidth={1.5} />
            </button>
          ))}
        </div>

        {day.dailyGoal && (
          <>
            <div className="font-display" style={{ fontSize: 19, marginBottom: 12 }}>As-tu accompli ton objectif ?</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 12 }}>« {day.dailyGoal} »</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button onClick={() => setAchieved(true)} className="mc-btn" style={{
                flex: 1, padding: 14, borderRadius: 14, cursor: "pointer",
                border: `1px solid ${achieved === true ? "var(--emerald-line)" : "var(--border)"}`,
                background: achieved === true ? "var(--emerald-soft)" : "var(--card)", color: "var(--text)",
              }}>Oui</button>
              <button onClick={() => setAchieved(false)} className="mc-btn" style={{
                flex: 1, padding: 14, borderRadius: 14, cursor: "pointer",
                border: `1px solid ${achieved === false ? "rgba(200,120,93,0.4)" : "var(--border)"}`,
                background: achieved === false ? "rgba(200,80,60,0.12)" : "var(--card)", color: "var(--text)",
              }}>Non</button>
            </div>
          </>
        )}

        {achieved === false && (
          <textarea
            value={note} onChange={e => setNote(e.target.value)}
            placeholder="Pourquoi ?"
            rows={3}
            className="mc-card"
            style={{ width: "100%", borderRadius: 14, padding: 14, color: "var(--text)", outline: "none", resize: "none", fontFamily: "inherit", fontSize: 14, marginBottom: 20 }}
          />
        )}

        <button onClick={save} className="mc-btn mc-scale-tap" style={{
          width: "100%", padding: "16px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, var(--emerald), #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Enregistrer le bilan
        </button>
      </div>
    </div>
  );
}
