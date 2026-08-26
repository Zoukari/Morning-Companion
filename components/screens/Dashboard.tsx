"use client";
import React, { useState } from "react";
import { Flame, ShieldCheck, X, ChevronLeft, Search } from "lucide-react";
import { AppData, DayData, LEVELS, levelForStreak } from "@/lib/types";
import { HADITH_COLLECTION } from "@/lib/data";
import { TopBar } from "../ui";

const DAY_MS = 86400000;

// Topic grid config — emoji, label, colour tint
const TOPIC_META: Record<string, { emoji: string; label: string; color: string; bg: string }> = {
  foi:          { emoji: "🌟", label: "Foi",          color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  salat:        { emoji: "🕌", label: "Prière",       color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
  dhikr:        { emoji: "📿", label: "Dhikr/Dua",   color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  coran:        { emoji: "📖", label: "Coran",        color: "#0ea5e9", bg: "rgba(14,165,233,0.12)" },
  sadaqa:       { emoji: "💝", label: "Sadaqa",       color: "#ec4899", bg: "rgba(236,72,153,0.12)" },
  tawbah:       { emoji: "🌿", label: "Repentir",     color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  sabr:         { emoji: "⚖️", label: "Patience",     color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  tawakkul:     { emoji: "🤲", label: "Tawakkul",     color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  famille:      { emoji: "👨‍👩‍👧", label: "Famille",      color: "#84cc16", bg: "rgba(132,204,22,0.12)" },
  caractere:    { emoji: "💎", label: "Caractère",    color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  connaissance: { emoji: "🎓", label: "Science",      color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
  fraternite:   { emoji: "🤝", label: "Fraternité",   color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  zuhd:         { emoji: "🌙", label: "Zuhd",         color: "#64748b", bg: "rgba(100,116,139,0.12)" },
  ihsan:        { emoji: "✨", label: "Ihsan",         color: "#eab308", bg: "rgba(234,179,8,0.12)" },
  adoration:    { emoji: "🌸", label: "Adoration",    color: "#f43f5e", bg: "rgba(244,63,94,0.12)" },
  mort:         { emoji: "⏳", label: "Mort/Âkhira",  color: "#9ca3af", bg: "rgba(156,163,175,0.12)" },
  sawm:         { emoji: "🌙", label: "Jeûne",        color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
  mariage:      { emoji: "💍", label: "Mariage",      color: "#db2777", bg: "rgba(219,39,119,0.12)" },
  voisin:       { emoji: "🏘️", label: "Voisinage",    color: "#059669", bg: "rgba(5,150,105,0.12)" },
  commerce:     { emoji: "🏪", label: "Commerce",     color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  leadership:   { emoji: "👑", label: "Justice",      color: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
  miséricorde:  { emoji: "💙", label: "Miséricorde",  color: "#2dd4bf", bg: "rgba(45,212,191,0.12)" },
  purification: { emoji: "💧", label: "Purification", color: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
};

const FALLBACK = { emoji: "📚", label: "Autre", color: "#6b7280", bg: "rgba(107,114,128,0.12)" };

// Group hadiths by topic
const byTopic: Record<string, typeof HADITH_COLLECTION> = {};
for (const h of HADITH_COLLECTION) {
  if (!byTopic[h.topic]) byTopic[h.topic] = [];
  byTopic[h.topic].push(h);
}
const topics = Object.entries(byTopic).sort((a, b) => b[1].length - a[1].length);

type View = "main" | "levels" | "topic" | "hadith";

export default function Dashboard({ app, onExit, onReflection }: {
  app: AppData; onExit: () => void; onReflection: () => void;
}) {
  const [view, setView] = useState<View>("main");
  const [activeTopic, setActiveTopic] = useState<string>("");
  const [activeHadith, setActiveHadith] = useState<typeof HADITH_COLLECTION[0] | null>(null);
  const [search, setSearch] = useState("");

  const currentLevel = levelForStreak(app.streak);
  const lv = LEVELS[currentLevel];
  const nextLv = LEVELS[currentLevel + 1] ?? null;

  const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0);
  const days28 = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(todayMidnight.getTime() - (27 - i) * DAY_MS);
    const key = d.toISOString().slice(0, 10);
    const rec: DayData | undefined = app.days[key];
    const adhkarDone = !!(rec?.adhkarCompleted);
    const prayedCount = rec ? Object.values(rec.prayers ?? {}).filter((p: string) => p !== "none").length : 0;
    return { key, dayNum: d.getDate(), adhkarDone, prayedCount, isToday: i === 27 };
  });
  const bgForDay = (d: typeof days28[0]) => {
    if (d.adhkarDone && d.prayedCount >= 5) return "#16a34a";
    if (d.adhkarDone && d.prayedCount >= 3) return "#86efac";
    if (d.adhkarDone || d.prayedCount >= 3) return "#f59e0b";
    return "var(--track)";
  };

  // ── Hadith detail popup ─────────────────────────────────────────────────────
  if (view === "hadith" && activeHadith) {
    const h = activeHadith;
    const meta = TOPIC_META[h.topic] ?? FALLBACK;
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px", gap: 12 }}>
          <button onClick={() => setView(activeTopic ? "topic" : "main")} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> {activeTopic ? (TOPIC_META[activeTopic]?.label ?? activeTopic) : "Thèmes"}
          </button>
        </div>
        <div style={{ padding: "4px 20px 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: meta.bg, border: `1px solid ${meta.color}40`, marginBottom: 16 }}>
            <span>{meta.emoji}</span>
            <span style={{ fontSize: 12, color: meta.color, fontWeight: 600 }}>{meta.label}</span>
          </div>

          <div className="mc-card" style={{ borderRadius: 20, padding: 24, marginBottom: 16 }}>
            <div className="font-arabic" dir="rtl" style={{ fontSize: 22, lineHeight: 2, color: "var(--text)", marginBottom: 16 }}>
              {h.arabic}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
              <div style={{ fontSize: 14, color: "var(--text)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 10 }}>
                « {h.french} »
              </div>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>— {h.source}</div>
            </div>
          </div>

          {h.explanation && (
            <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
              <div style={{ fontSize: 12, color: meta.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                📝 Explication
              </div>
              <div style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.75 }}>
                {h.explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Topic hadith list ────────────────────────────────────────────────────────
  if (view === "topic") {
    const meta = TOPIC_META[activeTopic] ?? FALLBACK;
    const list = (byTopic[activeTopic] ?? []).filter(h =>
      !search || h.french.toLowerCase().includes(search.toLowerCase()) || h.arabic.includes(search)
    );
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden", paddingBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px", gap: 12 }}>
          <button onClick={() => { setView("main"); setSearch(""); }} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> Thèmes
          </button>
        </div>
        <div style={{ padding: "0 18px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 28 }}>{meta.emoji}</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: meta.color }}>{meta.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{byTopic[activeTopic]?.length ?? 0} hadiths</div>
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Chercher…"
              style={{ width: "100%", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text)", padding: "10px 12px 10px 34px", fontSize: 13, boxSizing: "border-box" }} />
          </div>
          {list.map(h => (
            <button key={h.id} onClick={() => { setActiveHadith(h); setView("hadith"); }} className="mc-btn"
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0 0 10px", cursor: "pointer" }}>
              <div className="mc-card" style={{ borderRadius: 14, padding: "14px 16px" }}>
                <div className="font-arabic" dir="rtl" style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text)", marginBottom: 6 }}>
                  {h.arabic.length > 80 ? h.arabic.slice(0, 80) + "…" : h.arabic}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", fontStyle: "italic" }}>
                  {h.french.length > 70 ? h.french.slice(0, 70) + "…" : h.french}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}>{h.source.slice(0, 45)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Levels popup ─────────────────────────────────────────────────────────────
  if (view === "levels") {
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden", paddingBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px", gap: 12 }}>
          <button onClick={() => setView("main")} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> Retour
          </button>
        </div>
        <div style={{ padding: "4px 18px 4px" }}>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 14, lineHeight: 1.5, background: "var(--card)", borderRadius: 12, padding: "12px 14px" }}>
            ⚠️ La série s'incrémente si tu fais <strong style={{ color: "var(--text)" }}>les adhkar du matin</strong> et <strong style={{ color: "var(--text)" }}>≥3 prières</strong>. Un jour manqué = série remise à zéro = niveau baisse.
          </div>
          {LEVELS.map(l => (
            <div key={l.number} style={{ display: "flex", gap: 14, padding: "14px 16px", marginBottom: 8, borderRadius: 16, background: l.number === currentLevel ? l.bg : "var(--card)", border: `1px solid ${l.number === currentLevel ? l.color : "var(--border)"}`, opacity: l.number > currentLevel ? 0.45 : 1 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", flexShrink: 0, background: l.number <= currentLevel ? l.bg : "var(--track)", border: `2px solid ${l.number === currentLevel ? l.color : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {l.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: l.number === currentLevel ? l.color : "var(--text)" }}>
                    {l.number}. {l.name}
                  </span>
                  <span className="font-arabic" dir="rtl" style={{ fontSize: 14, color: "var(--text-dim)" }}>{l.arabic}</span>
                  {l.number === currentLevel && <span style={{ fontSize: 11, background: l.color, color: "#fff", borderRadius: 99, padding: "2px 8px", fontWeight: 700 }}>Tu es ici</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4, lineHeight: 1.4 }}>{l.description}</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 3 }}>≥ {l.threshold} jours de suite</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Main dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", paddingBottom: 60, overflowX: "hidden" }}>
      <TopBar title="Tableau de bord" onBack={onExit} />
      <div style={{ padding: "4px 18px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Flame size={18} color="var(--gold)" />
            <div className="font-display" style={{ fontSize: 28, marginTop: 6 }}>{app.streak}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours de série</div>
            <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 2 }}>adhkar + ≥3 prières</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <ShieldCheck size={18} color="var(--emerald)" />
            <div className="font-display" style={{ fontSize: 28, marginTop: 6 }}>{app.totalDaysCompleted}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours accomplis</div>
          </div>
        </div>

        {/* Level card → tap to open levels popup */}
        <button onClick={() => setView("levels")} className="mc-btn"
          style={{ marginTop: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
          <div style={{ borderRadius: 16, padding: 18, background: lv.bg, border: `1px solid ${lv.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 38 }}>{lv.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: lv.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Niveau {lv.number}</div>
                <div className="font-display" style={{ fontSize: 20, color: lv.color }}>{lv.name}</div>
                <div className="font-arabic" dir="rtl" style={{ fontSize: 14, color: "var(--text-dim)" }}>{lv.arabic}</div>
              </div>
              <div style={{ fontSize: 10, color: "var(--text-faint)" }}>Voir tous →</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>{lv.description}</div>
            {nextLv && (
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-faint)", marginBottom: 5 }}>
                  <span>{app.streak}j</span><span>→ {nextLv.emoji} {nextLv.name} ({nextLv.threshold}j)</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: "rgba(0,0,0,0.15)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: lv.color, width: `${Math.min(100, (app.streak / nextLv.threshold) * 100)}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
            )}
          </div>
        </button>

        {/* 28-day calendar */}
        <div className="mc-card" style={{ marginTop: 14, borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>28 derniers jours</span>
            <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{days28.filter(d => d.adhkarDone && d.prayedCount >= 5).length} jours complets</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
            {days28.map(d => (
              <div key={d.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: 7, background: bgForDay(d), border: d.isToday ? `2px solid ${lv.color}` : "1px solid transparent" }} />
                <span style={{ fontSize: 9, color: "var(--text-faint)" }}>{d.dayNum}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-faint)" }}>🟩 adhkar+5 prières · 🟦 adhkar+3 prières · 🟨 partiel · ⬜ rien</div>
        </div>

        {/* Hadith topic grid */}
        <div style={{ marginTop: 20, marginBottom: 12 }}>
          <div style={{ fontSize: 14, color: "var(--text)", marginBottom: 4 }}>📚 Hadiths &amp; explications</div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 14 }}>
            {HADITH_COLLECTION.length} hadiths · choisis un thème
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {topics.map(([topic, list]) => {
              const meta = TOPIC_META[topic] ?? FALLBACK;
              return (
                <button key={topic} onClick={() => { setActiveTopic(topic); setSearch(""); setView("topic"); }} className="mc-btn mc-scale-tap"
                  style={{ borderRadius: 14, padding: "14px 8px", background: meta.bg, border: `1px solid ${meta.color}50`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 24 }}>{meta.emoji}</span>
                  <span style={{ fontSize: 11, color: meta.color, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{meta.label}</span>
                  <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{list.length}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={onReflection} className="mc-btn mc-scale-tap" style={{ marginTop: 8, width: "100%", padding: "15px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 14, cursor: "pointer" }}>
          Faire le bilan du jour
        </button>
      </div>
    </div>
  );
}
