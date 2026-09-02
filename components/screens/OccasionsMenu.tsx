"use client";
import React, { useState } from "react";
import { ChevronLeft, Clock, RefreshCw } from "lucide-react";
import { DUA_COLLECTION, DuaEntry } from "@/lib/data";
import { TopBar } from "../ui";

// ─── Topic metadata ──────────────────────────────────────────────────────────
const TOPIC_META: Record<string, { emoji: string; label: string; color: string; bg: string }> = {
  matin:        { emoji: "🌅", label: "Matin",         color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  soir:         { emoji: "🌙", label: "Soir",          color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  salat:        { emoji: "🕌", label: "Prière",        color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
  istighfar:    { emoji: "🌿", label: "Pardon",        color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  protection:   { emoji: "🛡️", label: "Protection",   color: "#0ea5e9", bg: "rgba(14,165,233,0.12)" },
  maladie:      { emoji: "🤲", label: "Maladie",       color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  tristesse:    { emoji: "💙", label: "Tristesse",     color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  rizq:         { emoji: "💰", label: "Rizq",          color: "#84cc16", bg: "rgba(132,204,22,0.12)" },
  parents:      { emoji: "👨‍👩‍👧", label: "Parents",     color: "#ec4899", bg: "rgba(236,72,153,0.12)" },
  repas:        { emoji: "🍽️", label: "Repas",         color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  sommeil:      { emoji: "😴", label: "Sommeil",       color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  connaissance: { emoji: "📚", label: "Connaissance",  color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
  mosquee:      { emoji: "🕌", label: "Mosquée",       color: "#059669", bg: "rgba(5,150,105,0.12)" },
  mariage:      { emoji: "💍", label: "Mariage",       color: "#db2777", bg: "rgba(219,39,119,0.12)" },
  voyage:       { emoji: "✈️", label: "Voyage",        color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
  quotidien:    { emoji: "⭐", label: "Quotidien",     color: "#eab308", bg: "rgba(234,179,8,0.12)" },
  hajj:         { emoji: "🕋", label: "Hajj / Omra",  color: "#92400e", bg: "rgba(146,64,14,0.12)" },
  wudu:         { emoji: "🚿", label: "Ablutions",    color: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
  "apres-salat": { emoji: "🙏", label: "Après prière", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
};
const FALLBACK = { emoji: "🤲", label: "Autre", color: "#6b7280", bg: "rgba(107,114,128,0.12)" };

// Group by topic
const byTopic: Record<string, DuaEntry[]> = {};
for (const d of DUA_COLLECTION) {
  if (!byTopic[d.topic]) byTopic[d.topic] = [];
  byTopic[d.topic].push(d);
}
const topics = Object.entries(byTopic).sort((a, b) => b[1].length - a[1].length);

type View = "grid" | "list" | "detail";

export default function OccasionsMenu({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<View>("grid");
  const [activeTopic, setActiveTopic] = useState("");
  const [activeDua, setActiveDua] = useState<DuaEntry | null>(null);

  // ── Dua detail popup ────────────────────────────────────────────────────────
  if (view === "detail" && activeDua) {
    const h = activeDua;
    const meta = TOPIC_META[h.topic] ?? FALLBACK;
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px", gap: 12 }}>
          <button onClick={() => setView("list")} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <ChevronLeft size={20} /> {meta.label}
          </button>
        </div>
        <div style={{ padding: "4px 20px 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: meta.bg, border: `1px solid ${meta.color}40`, marginBottom: 18 }}>
            <span>{meta.emoji}</span>
            <span style={{ fontSize: 12, color: meta.color, fontWeight: 600 }}>{meta.label}</span>
          </div>

          <div className="mc-card" style={{ borderRadius: 20, padding: 24, marginBottom: 14 }}>
            <div className="font-arabic" dir="rtl" style={{ fontSize: 22, lineHeight: 2, color: "var(--text)", marginBottom: 16 }}>
              {h.arabic}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
              <div style={{ fontSize: 14, color: "var(--text)", fontStyle: "italic", lineHeight: 1.7 }}>
                « {h.french} »
              </div>
            </div>
          </div>

          {(h.when || h.times) && (
            <div className="mc-card" style={{ borderRadius: 14, padding: 16, marginBottom: 12 }}>
              {h.when && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: h.times ? 10 : 0 }}>
                  <Clock size={14} color={meta.color} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{h.when}</div>
                </div>
              )}
              {h.times && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <RefreshCw size={14} color={meta.color} />
                  <div style={{ fontSize: 13, color: "var(--text-dim)" }}>{h.times}× fois</div>
                </div>
              )}
            </div>
          )}

          <div style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", marginTop: 8 }}>
            — {h.source}
          </div>
        </div>
      </div>
    );
  }

  // ── Topic list ──────────────────────────────────────────────────────────────
  if (view === "list") {
    const meta = TOPIC_META[activeTopic] ?? FALLBACK;
    const list = byTopic[activeTopic] ?? [];
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden", paddingBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px", gap: 12 }}>
          <button onClick={() => setView("grid")} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <ChevronLeft size={20} /> Toutes les catégories
          </button>
        </div>
        <div style={{ padding: "0 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ fontSize: 30 }}>{meta.emoji}</span>
            <div>
              <div style={{ fontSize: 19, fontWeight: 700, color: meta.color }}>{meta.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{list.length} douaas</div>
            </div>
          </div>

          {list.map((d, i) => (
            <button key={d.id} onClick={() => { setActiveDua(d); setView("detail"); }} className="mc-btn"
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0 0 10px", cursor: "pointer" }}>
              <div className="mc-card" style={{ borderRadius: 14, padding: "14px 16px", position: "relative" }}>
                <div className="font-arabic" dir="rtl" style={{ fontSize: 17, lineHeight: 1.8, color: "var(--text)", marginBottom: 8 }}>
                  {d.arabic.length > 80 ? d.arabic.slice(0, 80) + "…" : d.arabic}
                </div>
                {d.when && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                    <Clock size={11} color={meta.color} />
                    <span style={{ fontSize: 11, color: meta.color }}>{d.when}</span>
                  </div>
                )}
                <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{d.source.slice(0, 45)}</div>
                {/* Number bottom right */}
                <div style={{ position: "absolute", bottom: 10, right: 14, fontSize: 10, color: "var(--text-faint)", fontWeight: 600 }}>
                  {i + 1}/{list.length}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Category grid ───────────────────────────────────────────────────────────
  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden", paddingBottom: 48 }}>
      <TopBar title="Douaas authentiques" onBack={onExit} />
      <div style={{ padding: "4px 16px" }}>
        <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 16, padding: "0 4px" }}>
          {DUA_COLLECTION.length} douaas · {topics.length} catégories — tirées de Hisn al-Muslim
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {topics.map(([topic, list]) => {
            const meta = TOPIC_META[topic] ?? FALLBACK;
            return (
              <button key={topic}
                onClick={() => { setActiveTopic(topic); setView("list"); }}
                className="mc-btn mc-scale-tap"
                style={{ borderRadius: 16, padding: "14px 8px 12px", background: meta.bg, border: `1px solid ${meta.color}50`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative" }}>
                <span style={{ fontSize: 26 }}>{meta.emoji}</span>
                <span style={{ fontSize: 11, color: meta.color, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>
                  {meta.label}
                </span>
                {/* Count bottom right */}
                <span style={{ position: "absolute", bottom: 6, right: 8, fontSize: 10, color: meta.color, fontWeight: 700 }}>
                  {list.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
