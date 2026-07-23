"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";

export const ProgressBar = ({ pct }: { pct: number }) => (
  <div className="mc-progress-track" style={{ height: 6, width: "100%" }}>
    <div className="mc-progress-fill" style={{ height: "100%", width: `${pct}%` }} />
  </div>
);

export const Toggle = ({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!on)}
    className="mc-toggle"
    style={{
      width: 46, height: 26, borderRadius: 999, border: "none", cursor: "pointer",
      background: on ? "var(--emerald)" : "var(--track-strong)", position: "relative", padding: 0,
    }}
  >
    <div className="mc-toggle-knob" style={{
      width: 20, height: 20, borderRadius: "50%", background: "#fff",
      position: "absolute", top: 3, left: on ? 23 : 3,
    }} />
  </button>
);

export const Confetti = () => {
  const pieces = Array.from({ length: 26 });
  const colors = ["var(--emerald)", "var(--gold)", "var(--text)"];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 50 }}>
      {pieces.map((_, i) => (
        <div key={i} className="mc-confetti-piece" style={{
          left: `${Math.random() * 100}%`, top: "-10px",
          width: 6, height: 10, background: colors[i % colors.length],
          animationDuration: `${1.8 + Math.random() * 1.4}s`,
          animationDelay: `${Math.random() * 0.4}s`,
          borderRadius: 2,
        }} />
      ))}
    </div>
  );
};

export const AtmosphereBackground = ({ variant = "home" }: { variant?: "home" | "splash" }) => (
  <>
    <div className="mc-horizon" />
    <div className="mc-dawn-beam" style={variant === "splash" ? { opacity: 0.9 } : { opacity: 0.55 }} />
    <div className="mc-streaks" />
    <div className="mc-orb" style={{
      width: 260, height: 260, background: "var(--emerald)",
      top: variant === "splash" ? "20%" : "-6%", left: "-10%",
    }} />
    <div className="mc-orb" style={{
      width: 220, height: 220, background: "var(--gold)",
      top: variant === "splash" ? "45%" : "60%", right: "-8%",
      animationDelay: "2s",
    }} />
    <div className="mc-grain" />
  </>
);

export const chipStyle: React.CSSProperties = {
  background: "rgba(10,10,11,0.5)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "50%",
  width: 34, height: 34,
  display: "flex", alignItems: "center", justifyContent: "center",
};

export const TopBar = ({ title, onBack, right, chip }: { title: string; onBack?: () => void; right?: React.ReactNode; chip?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 10px", position: "relative", zIndex: 1 }}>
    <div style={{ width: chip ? 34 : 32 }}>
      {onBack && (
        <button onClick={onBack} className="mc-btn" style={chip
          ? { ...chipStyle, cursor: "pointer", color: "#fff" }
          : { background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", padding: 6 }}>
          <ChevronLeft size={20} />
        </button>
      )}
    </div>
    <div style={{ fontSize: 13, letterSpacing: 1.5, color: chip ? "#fff" : "var(--text-dim)", textTransform: "uppercase", textShadow: chip ? "0 1px 4px rgba(0,0,0,0.6)" : "none" }}>{title}</div>
    <div style={{ width: chip ? 34 : 32, display: "flex", justifyContent: "flex-end" }}>{right}</div>
  </div>
);
