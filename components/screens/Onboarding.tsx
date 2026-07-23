"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AtmosphereBackground } from "../ui";

export default function Onboarding({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();

  const submit = () => {
    if (trimmed.length === 0) return;
    onSubmit(trimmed);
  };

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", position: "relative", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
      <AtmosphereBackground />
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 26px" }}>
        <div className="font-arabic" dir="rtl" style={{ fontSize: 28, color: "var(--gold)", marginBottom: 14, textAlign: "center" }}>
          السلام عليكم
        </div>
        <div className="font-display" style={{ fontSize: 22, textAlign: "center", lineHeight: 1.35, marginBottom: 8 }}>
          Comment veux-tu que je t&apos;appelle ?
        </div>
        <div style={{ fontSize: 13, color: "var(--text-dim)", textAlign: "center", marginBottom: 28 }}>
          Ton prénom sert à personnaliser tes rappels du matin.
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: "16px 18px" }}>
          <input
            autoFocus
            type="text" placeholder="Ton prénom" value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") submit(); }}
            style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 20, width: "100%" }}
            className="font-display"
          />
        </div>

        <button
          onClick={submit}
          disabled={trimmed.length === 0}
          className="mc-btn mc-scale-tap"
          style={{
            marginTop: 22, width: "100%", padding: "17px", borderRadius: 16, border: "none",
            background: trimmed.length === 0 ? "var(--track-strong)" : "linear-gradient(135deg, var(--emerald), #0f7a37)",
            color: trimmed.length === 0 ? "var(--text-faint)" : "#fff",
            fontSize: 15, fontWeight: 600, cursor: trimmed.length === 0 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.2s ease, color 0.2s ease",
          }}
        >
          Continuer <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
