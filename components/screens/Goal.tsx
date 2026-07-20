"use client";
import React, { useState } from "react";
import { DayData } from "@/lib/types";
import { TopBar } from "../ui";

export default function Goal({
  day, setDay, onNext, onExit,
}: {
  day: DayData;
  setDay: (updater: (d: DayData) => DayData) => void;
  onNext: () => void;
  onExit: () => void;
}) {
  const [value, setValue] = useState(day.dailyGoal || "");
  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Objectif du jour" onBack={onExit} />
      <div style={{ padding: "20px 22px" }}>
        <div className="font-display" style={{ fontSize: 20, marginBottom: 6 }}>Quel est ton objectif principal aujourd&apos;hui ?</div>
        <div style={{ fontSize: 13, color: "#93938e", marginBottom: 20 }}>Une seule chose, claire et concrète.</div>
        <textarea
          value={value} onChange={e => setValue(e.target.value)}
          placeholder="Finir le site Laureate."
          rows={3}
          className="mc-card"
          style={{ width: "100%", borderRadius: 16, padding: 16, color: "#f3f2ee", fontSize: 15, outline: "none", resize: "none", fontFamily: "inherit" }}
        />
        <button onClick={() => { setDay(d => ({ ...d, dailyGoal: value })); onNext(); }} className="mc-btn mc-scale-tap" style={{
          marginTop: 20, width: "100%", padding: "16px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, #16A34A, #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Enregistrer et terminer
        </button>
      </div>
    </div>
  );
}
