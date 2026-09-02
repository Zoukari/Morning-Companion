"use client";
import React, { useState } from "react";
import { Flame, ShieldCheck, X, ChevronLeft, Search } from "lucide-react";
import { AppData, DayData, LEVELS, defaultDay, PrayerState } from "@/lib/types";
import { HADITH_COLLECTION } from "@/lib/data";
import { TopBar } from "../ui";

const DAY_MS = 86400000;
const PRAYERS = [
  { key: "fajr",    arabic: "الفجر" },
  { key: "dhuhr",   arabic: "الظهر" },
  { key: "asr",     arabic: "العصر" },
  { key: "maghrib", arabic: "المغرب" },
  { key: "isha",    arabic: "العشاء" },
] as const;

const NEXT_STATE: Record<PrayerState, PrayerState> = { none: "home", home: "mosque", mosque: "none" };
const STATE_COLOR: Record<PrayerState, string> = { none: "var(--track)", home: "#f97316", mosque: "#16a34a" };

type View = "main" | "levels" | "topic" | "hadith";

export default function Dashboard({ app, setDayForDate, onExit, onReflection }: {
  app: AppData;
  setDayForDate: (date: string, updater: (d: DayData) => DayData) => void;
  onExit: () => void;
  onReflection: () => void;
}) {
  const [view, setView] = useState<View>("main");
  const [activeTopic, setActiveTopic] = useState("");
  const [activeHadith, setActiveHadith] = useState<typeof HADITH_COLLECTION[0] | null>(null);
  const [search, setSearch] = useState("");
  const [editingDate, setEditingDate] = useState<string | null>(null);

  // Use stored level (not computed) so penalties/gains are reflected
  const currentLevel = Math.min(10, Math.max(0, app.level ?? 0));
  const lv = LEVELS[currentLevel];
  const nextLv = LEVELS[currentLevel + 1] ?? null;

  const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0);
  const days28 = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(todayMidnight.getTime() - (27 - i) * DAY_MS);
    const key = d.toISOString().slice(0, 10);
    const rec: DayData | undefined = app.days[key];
    const adhkarDone = !!(rec?.adhkarCompleted);
    const prayers = rec?.prayers ?? {};
    const prayedCount = Object.values(prayers).filter((p: string) => p !== "none").length;
    const isToday = i === 27;
    const isFuture = d > todayMidnight;
    return { key, dayNum: d.getDate(), adhkarDone, prayedCount, isToday, isFuture };
  });

  const bgForDay = (d: typeof days28[0]) => {
    if (d.adhkarDone && d.prayedCount >= 5) return "#16a34a";
    if (d.adhkarDone && d.prayedCount >= 3) return "#86efac";
    if (d.adhkarDone || d.prayedCount >= 3) return "#f59e0b";
    return "var(--track)";
  };

  // Group hadiths by topic
  const byTopic: Record<string, typeof HADITH_COLLECTION> = {};
  for (const h of HADITH_COLLECTION) {
    if (!byTopic[h.topic]) byTopic[h.topic] = [];
    byTopic[h.topic].push(h);
  }
  const topics = Object.entries(byTopic).sort((a, b) => b[1].length - a[1].length);
  const filteredHadith = activeTopic
    ? (byTopic[activeTopic] ?? []).filter(h => !search || h.french.toLowerCase().includes(search.toLowerCase()) || h.arabic.includes(search))
    : [];

  const TOPIC_META: Record<string, { emoji: string; label: string; color: string; bg: string }> = {
    foi: { emoji: "🌟", label: "Foi", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    salat: { emoji: "🕌", label: "Prière", color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
    dhikr: { emoji: "📿", label: "Dhikr/Dua", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
    coran: { emoji: "📖", label: "Coran", color: "#0ea5e9", bg: "rgba(14,165,233,0.12)" },
    sadaqa: { emoji: "💝", label: "Sadaqa", color: "#ec4899", bg: "rgba(236,72,153,0.12)" },
    tawbah: { emoji: "🌿", label: "Repentir", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
    sabr: { emoji: "⚖️", label: "Patience", color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
    tawakkul: { emoji: "🤲", label: "Tawakkul", color: "#f97316", bg: "rgba(249,115,22,0.12)" },
    famille: { emoji: "👨‍👩‍👧", label: "Famille", color: "#84cc16", bg: "rgba(132,204,22,0.12)" },
    caractere: { emoji: "💎", label: "Caractère", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
    connaissance: { emoji: "🎓", label: "Science", color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
    fraternite: { emoji: "🤝", label: "Fraternité", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
    zuhd: { emoji: "🌙", label: "Zuhd", color: "#64748b", bg: "rgba(100,116,139,0.12)" },
    ihsan: { emoji: "✨", label: "Ihsan", color: "#eab308", bg: "rgba(234,179,8,0.12)" },
    adoration: { emoji: "🌸", label: "Adoration", color: "#f43f5e", bg: "rgba(244,63,94,0.12)" },
    mort: { emoji: "⏳", label: "Âkhira", color: "#9ca3af", bg: "rgba(156,163,175,0.12)" },
    sawm: { emoji: "🌙", label: "Jeûne", color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
    mariage: { emoji: "💍", label: "Mariage", color: "#db2777", bg: "rgba(219,39,119,0.12)" },
    voisin: { emoji: "🏘️", label: "Voisinage", color: "#059669", bg: "rgba(5,150,105,0.12)" },
    commerce: { emoji: "🏪", label: "Commerce", color: "#d97706", bg: "rgba(217,119,6,0.12)" },
    leadership: { emoji: "👑", label: "Justice", color: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
    purification: { emoji: "💧", label: "Purification", color: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
    miséricorde: { emoji: "💙", label: "Miséricorde", color: "#2dd4bf", bg: "rgba(45,212,191,0.12)" },
    ethique: { emoji: "🧭", label: "Éthique", color: "#64748b", bg: "rgba(100,116,139,0.12)" },
  };
  const FALLBACK_META = { emoji: "📚", label: "Autre", color: "#6b7280", bg: "rgba(107,114,128,0.12)" };

  // ── Past day editor popup ────────────────────────────────────────────────────
  if (editingDate) {
    const rec = app.days[editingDate] ?? defaultDay();
    const isToday = editingDate === new Date().toISOString().slice(0, 10);
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px" }}>
          <button onClick={() => setEditingDate(null)} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> Retour
          </button>
        </div>
        <div style={{ padding: "4px 20px 48px" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
            {isToday ? "Aujourd'hui" : editingDate}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 20 }}>
            Appuie sur chaque prière pour changer son état · ⬜ non priée · 🏠 maison · 🕌 mosquée
          </div>
          <div className="mc-card" style={{ borderRadius: 18, padding: 20 }}>
            <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 14 }}>Prières</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              {PRAYERS.map(({ key, arabic }) => {
                const state = (rec.prayers?.[key as keyof typeof rec.prayers] ?? "none") as PrayerState;
                return (
                  <button key={key}
                    onClick={() => setDayForDate(editingDate, d => ({
                      ...d,
                      prayers: { ...(d.prayers ?? { fajr: "none", dhuhr: "none", asr: "none", maghrib: "none", isha: "none" }), [key]: NEXT_STATE[state] }
                    }))}
                    className="mc-btn mc-scale-tap"
                    style={{ flex: 1, borderRadius: 12, padding: "12px 4px", background: STATE_COLOR[state], border: `2px solid ${STATE_COLOR[state]}`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span className="font-arabic" dir="rtl" style={{ fontSize: 13, color: state === "none" ? "var(--text-faint)" : "#fff" }}>{arabic}</span>
                    <span style={{ fontSize: 12 }}>{state === "home" ? "🏠" : state === "mosque" ? "🕌" : "⬜"}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--text-faint)", lineHeight: 1.5, padding: "0 4px" }}>
            ℹ️ Changer les prières d'un jour passé met à jour automatiquement ta série et ton niveau.
          </div>
        </div>
      </div>
    );
  }

  // ── Hadith detail ─────────────────────────────────────────────────────────
  if (view === "hadith" && activeHadith) {
    const h = activeHadith;
    const meta = TOPIC_META[h.topic] ?? FALLBACK_META;
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px" }}>
          <button onClick={() => setView("topic")} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> {meta.label}
          </button>
        </div>
        <div style={{ padding: "4px 20px 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: meta.bg, border: `1px solid ${meta.color}40`, marginBottom: 18 }}>
            <span>{meta.emoji}</span>
            <span style={{ fontSize: 12, color: meta.color, fontWeight: 600 }}>{meta.label}</span>
          </div>
          <div className="mc-card" style={{ borderRadius: 20, padding: 24, marginBottom: 14 }}>
            <div className="font-arabic" dir="rtl" style={{ fontSize: 22, lineHeight: 2, color: "var(--text)", marginBottom: 16 }}>{h.arabic}</div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
              <div style={{ fontSize: 14, color: "var(--text)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 8 }}>« {h.french} »</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>— {h.source}</div>
            </div>
          </div>
          {h.explanation && (
            <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
              <div style={{ fontSize: 12, color: meta.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>📝 Explication</div>
              <div style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.75 }}>{h.explanation}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Topic list ────────────────────────────────────────────────────────────
  if (view === "topic") {
    const meta = TOPIC_META[activeTopic] ?? FALLBACK_META;
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden", paddingBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px" }}>
          <button onClick={() => { setView("main"); setSearch(""); }} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> Thèmes
          </button>
        </div>
        <div style={{ padding: "0 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 30 }}>{meta.emoji}</span>
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
          {filteredHadith.map((h, i) => (
            <button key={h.id} onClick={() => { setActiveHadith(h); setView("hadith"); }} className="mc-btn"
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0 0 10px", cursor: "pointer" }}>
              <div className="mc-card" style={{ borderRadius: 14, padding: "14px 16px", position: "relative" }}>
                <div className="font-arabic" dir="rtl" style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text)", marginBottom: 6 }}>
                  {h.arabic.length > 80 ? h.arabic.slice(0, 80) + "…" : h.arabic}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", fontStyle: "italic" }}>
                  {h.french.length > 70 ? h.french.slice(0, 70) + "…" : h.french}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 4 }}>{h.source.slice(0, 45)}</div>
                <span style={{ position: "absolute", bottom: 10, right: 14, fontSize: 10, color: "var(--text-faint)", fontWeight: 600 }}>
                  {i + 1}/{filteredHadith.length}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Levels popup ──────────────────────────────────────────────────────────
  if (view === "levels") {
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden", paddingBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px 8px" }}>
          <button onClick={() => setView("main")} className="mc-btn"
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={20} /> Retour
          </button>
        </div>
        <div style={{ padding: "4px 18px" }}>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 14, background: "var(--card)", borderRadius: 12, padding: "12px 14px", lineHeight: 1.6 }}>
            ⚠️ Complète adhkar + ≥3 prières pour monter. Manquer 1 jour = grâce. Manquer 2 jours = −1 niveau. Manquer 3 jours = −2. Manquer 7+ = retour à 0.
          </div>
          {LEVELS.map(l => (
            <div key={l.number} style={{ display: "flex", gap: 14, padding: "14px 16px", marginBottom: 8, borderRadius: 16, background: l.number === currentLevel ? l.bg : "var(--card)", border: `1px solid ${l.number === currentLevel ? l.color : "var(--border)"}`, opacity: l.number > currentLevel ? 0.45 : 1 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", flexShrink: 0, background: l.number <= currentLevel ? l.bg : "var(--track)", border: `2px solid ${l.number === currentLevel ? l.color : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{l.emoji}</div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: l.number === currentLevel ? l.color : "var(--text)" }}>{l.number}. {l.name}</span>
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

        {/* Level card → levels popup */}
        <button onClick={() => setView("levels")} className="mc-btn" style={{ marginTop: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
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
                  <span>Niveau {lv.number}</span><span>→ {nextLv.emoji} {nextLv.name} ({nextLv.threshold}j)</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: "rgba(0,0,0,0.15)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: lv.color, width: `${Math.min(100, (app.streak / nextLv.threshold) * 100)}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
            )}
          </div>
        </button>

        {/* 28-day calendar — chaque jour cliquable (sauf jours futurs) */}
        <div className="mc-card" style={{ marginTop: 14, borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>28 derniers jours</span>
            <span style={{ fontSize: 10, color: "var(--text-faint)" }}>Appuie pour modifier</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
            {days28.map(d => (
              <button key={d.key}
                onClick={() => !d.isFuture && setEditingDate(d.key)}
                disabled={d.isFuture}
                style={{ background: "none", border: "none", padding: 0, cursor: d.isFuture ? "default" : "pointer" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <div style={{ width: "100%", aspectRatio: "1", borderRadius: 7, background: bgForDay(d), border: d.isToday ? `2px solid ${lv.color}` : "1px solid transparent", opacity: d.isFuture ? 0.2 : 1 }} />
                  <span style={{ fontSize: 9, color: d.isToday ? lv.color : "var(--text-faint)" }}>{d.dayNum}</span>
                </div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-faint)" }}>🟩 complet · 🟦 partiel · 🟨 adhkar seul · ⬜ rien</div>
        </div>

        {/* Hadith grid by topic */}
        <div style={{ marginTop: 20, marginBottom: 12 }}>
          <div style={{ fontSize: 14, color: "var(--text)", marginBottom: 4 }}>📚 Hadiths &amp; explications</div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 14 }}>
            {HADITH_COLLECTION.length} hadiths · choisis un thème
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {topics.map(([topic, list]) => {
              const meta = TOPIC_META[topic] ?? FALLBACK_META;
              return (
                <button key={topic} onClick={() => { setActiveTopic(topic); setSearch(""); setView("topic"); }} className="mc-btn mc-scale-tap"
                  style={{ borderRadius: 14, padding: "14px 8px 12px", background: meta.bg, border: `1px solid ${meta.color}50`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative" }}>
                  <span style={{ fontSize: 24 }}>{meta.emoji}</span>
                  <span style={{ fontSize: 11, color: meta.color, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{meta.label}</span>
                  <span style={{ position: "absolute", bottom: 6, right: 8, fontSize: 10, color: meta.color, fontWeight: 700 }}>{list.length}</span>
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
