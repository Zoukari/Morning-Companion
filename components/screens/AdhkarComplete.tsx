"use client";
import React from "react";
import { AtmosphereBackground, Confetti } from "../ui";

export default function AdhkarComplete({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflowX: "hidden" }}>
      <Confetti />
      <AtmosphereBackground />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 30 }}>
        <div className="font-arabic" style={{ fontSize: 30, color: "var(--gold)", marginBottom: 16 }}>الحمد لله</div>
        <div className="font-display" style={{ fontSize: 22, lineHeight: 1.5 }}>Tes adhkar du matin sont terminés.</div>
        <div style={{ marginTop: 10, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 300 }}>
          Qu&apos;Allah accepte tes invocations et mette la baraka dans ta journée.
        </div>
        <button onClick={onContinue} className="mc-btn mc-scale-tap" style={{
          marginTop: 34, padding: "16px 36px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, var(--emerald), #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Continuer vers la routine
        </button>
      </div>
    </div>
  );
}
