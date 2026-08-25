"use client";
import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { OCCASIONS, OccasionItem } from "@/lib/data";
import { TopBar } from "../ui";

export default function OccasionsMenu({ onExit }: { onExit: () => void }) {
  const [selected, setSelected] = useState<OccasionItem | null>(null);

  if (selected) {
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 10px" }}>
          <button onClick={() => setSelected(null)} className="mc-btn" style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> Retour
          </button>
          <button onClick={onExit} className="mc-btn" style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", padding: 6 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px 24px" }}>
          <div style={{ fontSize: 36, textAlign: "center", marginBottom: 16 }}>{selected.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 600, textAlign: "center", marginBottom: 28, color: "var(--text)" }}>
            {selected.label}
          </div>

          <div className="mc-card" style={{ borderRadius: 22, padding: 28 }}>
            <div className="font-arabic" dir="rtl" style={{ fontSize: 24, lineHeight: 2, textAlign: "center", color: "var(--text)" }}>
              {selected.arabic}
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 12, color: "var(--text-faint)", textAlign: "center" }}>
            — {selected.source}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden", paddingBottom: 40 }}>
      <TopBar title="Douaas des occasions" onBack={onExit} />
      <div style={{ padding: "8px 16px" }}>
        <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 16, padding: "0 4px" }}>
          Chaque situation a sa douaa — appuie pour la lire
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {OCCASIONS.map(o => (
            <button
              key={o.id}
              onClick={() => setSelected(o)}
              className="mc-btn mc-scale-tap mc-card"
              style={{
                borderRadius: 16, padding: "16px 8px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                cursor: "pointer", border: "1px solid var(--border)",
                background: "var(--card)",
              }}
            >
              <span style={{ fontSize: 24 }}>{o.icon}</span>
              <span style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.3, textAlign: "center" }}>
                {o.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
