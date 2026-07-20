"use client";
import React from "react";
import { Sun } from "lucide-react";
import { AtmosphereBackground, Confetti } from "../ui";

export default function RoutineDone({ onContinue, showConfetti = true }: { onContinue: () => void; showConfetti?: boolean }) {
  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {showConfetti && <Confetti />}
      <AtmosphereBackground />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 30 }}>
        <Sun size={36} color="var(--gold)" style={{ marginBottom: 16 }} />
        <div className="font-display" style={{ fontSize: 22 }}>Morning routine completed.</div>
        <div style={{ marginTop: 8, fontSize: 14, color: "var(--text-dim)" }}>Have a blessed day.</div>
        <button onClick={onContinue} className="mc-btn mc-scale-tap" style={{
          marginTop: 30, padding: "15px 32px", borderRadius: 16, border: "1px solid var(--border)",
          background: "transparent", color: "var(--text)", fontSize: 14, cursor: "pointer",
        }}>
          Retour à l&apos;accueil
        </button>
      </div>
    </div>
  );
}
