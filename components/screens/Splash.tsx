"use client";
import React from "react";
import { Moon } from "lucide-react";
import { AtmosphereBackground } from "../ui";

export default function Splash() {
  return (
    <div className="mc-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", position: "relative", overflowX: "hidden" }}>
      <AtmosphereBackground variant="splash" />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div className="mc-pulse-ring" style={{
          width: 74, height: 74, borderRadius: "50%", margin: "0 auto 26px",
          background: "linear-gradient(135deg, var(--emerald-soft), var(--gold-soft))",
          border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        }}>
          <Moon size={30} color="var(--gold)" strokeWidth={1.5} />
        </div>
        <div className="font-display" style={{ fontSize: 30, fontWeight: 500, letterSpacing: 0.5 }}>Morning Companion</div>
        <div style={{ marginTop: 10, fontSize: 14, color: "var(--text-dim)", letterSpacing: 0.5 }}>Begin your day with Allah.</div>
      </div>
    </div>
  );
}
