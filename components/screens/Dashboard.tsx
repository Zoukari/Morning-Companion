"use client";
import React, { useState } from "react";
import { Flame, ShieldCheck, X, Book, Search } from "lucide-react";
import { AppData, DayData, LEVELS, levelForStreak } from "@/lib/types";
import { HADITH_COLLECTION } from "@/lib/data";
import { TopBar } from "../ui";

const DAY_MS = 86400000;

export default function Dashboard({ app, onExit, onReflection }: {
  app: AppData; onExit: () => void; onReflection: () => void;
}) {
  const [showLevelsPopup, setShowLevelsPopup] = useState(false);
  const [selectedHadith, setSelectedHadith] = useState<typeof HADITH_COLLECTION[0] | null>(null);
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
    const mosquePrayers = rec ? Object.values(rec.prayers ?? {}).filter((p: string) => p === "mosque").length : 0;
    return { key, dayNum: d.getDate(), adhkarDone, prayedCount, mosquePrayers, isToday: i === 27 };
  });

  const bgForDay = (d: typeof days28[0]) => {
    if (d.adhkarDone && d.prayedCount >= 5) return "#16a34a";
    if (d.adhkarDone && d.prayedCount >= 3) return "#86efac";
    if (d.adhkarDone || d.prayedCount >= 3) return "#f59e0b";
    return "var(--track)";
  };

  const filteredHadith = HADITH_COLLECTION.filter(h =>
    !search || h.french.toLowerCase().includes(search.toLowerCase()) ||
    h.arabic.includes(search) || h.topic.includes(search.toLowerCase())
  );

  // ── Hadith popup ───────────────────────────────────────────
  if (selectedHadith) {
    const h = selectedHadith;
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 10px" }}>
          <button onClick={() => setSelectedHadith(null)} className="mc-btn" style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", gap: 6 }}>
            ← Retour
          </button>
          <button onClick={() => setSelectedHadith(null)} style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", padding: 6 }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: "8px 24px 40px" }}>
          <div className="mc-card" style={{ borderRadius: 20, padding: 24 }}>
            <div className="font-arabic" dir="rtl" style={{ fontSize: 22, lineHeight: 2, color: "var(--text)", marginBottom: 16, textAlign: "right" }}>
              {h.arabic}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 15, color: "var(--text)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 8 }}>
                « {h.french} »
              </div>
              <div style={{ fontSize: 12, color: "var(--text-faint)" }}>— {h.source}</div>
            </div>
            {h.explanation && (
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  Explication
                </div>
                <div style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7 }}>
                  {h.explanation}
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-faint)", textAlign: "center" }}>
            Sujet : {h.topic}
          </div>
        </div>
      </div>
    );
  }

  // ── Levels popup ───────────────────────────────────────────
  if (showLevelsPopup) {
    return (
      <div className="mc-fade-in" style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 10px" }}>
          <button onClick={() => setShowLevelsPopup(false)} className="mc-btn" style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", padding: 6 }}>
            ← Retour
          </button>
          <span style={{ fontSize: 14, color: "var(--text-dim)" }}>Niveaux</span>
          <div style={{ width: 32 }} />
        </div>
        <div style={{ padding: "4px 18px 40px" }}>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 14, lineHeight: 1.5, padding: "0 4px" }}>
            La série compte si tu fais <strong style={{ color: "var(--text)" }}>les adhkar du matin</strong> et au moins <strong style={{ color: "var(--text)" }}>3 prières</strong> dans la journée. Un jour manqué = série remise à zéro.
          </div>
          {LEVELS.map(l => (
            <div key={l.number} style={{
              display: "flex", gap: 14, padding: "16px 16px",
              marginBottom: 8, borderRadius: 16,
              background: l.number === currentLevel ? l.bg : "var(--card)",
              border: `1px solid ${l.number === currentLevel ? l.color : "var(--border)"}`,
              opacity: l.number > currentLevel ? 0.5 : 1,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                background: l.number <= currentLevel ? l.bg : "var(--track)",
                border: `2px solid ${l.number === currentLevel ? l.color : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>
                {l.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: l.number === currentLevel ? l.color : "var(--text)" }}>
                    Niv. {l.number} — {l.name}
                  </span>
                  <span className="font-arabic" dir="rtl" style={{ fontSize: 14, color: "var(--text-dim)" }}>{l.arabic}</span>
                  {l.number === currentLevel && (
                    <span style={{ fontSize: 11, background: l.color, color: "#fff", borderRadius: 99, padding: "2px 8px", fontWeight: 700 }}>
                      Tu es ici
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4, lineHeight: 1.4 }}>{l.description}</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4 }}>Requis : {l.threshold} jours de suite</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Main dashboard ─────────────────────────────────────────
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
            <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 2 }}>adhkar + ≥3 prières</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <ShieldCheck size={18} color="var(--emerald)" />
            <div className="font-display" style={{ fontSize: 28, marginTop: 6 }}>{app.totalDaysCompleted}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours accomplis</div>
          </div>
        </div>

        {/* Level card — tap to open popup */}
        <button onClick={() => setShowLevelsPopup(true)} className="mc-btn" style={{ marginTop: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
          <div style={{
            borderRadius: 16, padding: 18,
            background: lv.bg, border: `1px solid ${lv.color}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 36 }}>{lv.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: lv.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Niveau {lv.number}</div>
                <div className="font-display" style={{ fontSize: 20, color: lv.color }}>{lv.name}</div>
                <div className="font-arabic" dir="rtl" style={{ fontSize: 14, color: "var(--text-dim)" }}>{lv.arabic}</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "right" }}>
                Voir tous<br />les niveaux →
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>{lv.description}</div>
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
            <span style={{ fontSize: 10, color: "var(--text-faint)" }}>🟩 complet · 🟦 partiel · 🟨 un seul</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
            {days28.map(d => (
              <div key={d.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div title={`${d.key} — adhkar:${d.adhkarDone ? "✓" : "✗"} prières:${d.prayedCount}/5 mosquée:${d.mosquePrayers}`}
                  style={{ width: "100%", aspectRatio: "1", borderRadius: 7, background: bgForDay(d), border: d.isToday ? `2px solid ${lv.color}` : "1px solid transparent" }} />
                <span style={{ fontSize: 9, color: "var(--text-faint)" }}>{d.dayNum}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-faint)" }}>
            🟩 adhkar + 5 prières · 🟦 adhkar + 3 prières · 🟨 partiel · ⬜ rien
          </div>
        </div>

        {/* Hadith collection */}
        <div style={{ marginTop: 20, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Book size={16} color="var(--gold)" />
            <span style={{ fontSize: 14, color: "var(--text)" }}>Hadiths</span>
            <span style={{ fontSize: 11, color: "var(--text-faint)" }}>({filteredHadith.length} / {HADITH_COLLECTION.length})</span>
          </div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Chercher un hadith…"
              style={{ width: "100%", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text)", padding: "10px 12px 10px 34px", fontSize: 13, boxSizing: "border-box" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredHadith.map(h => (
            <button key={h.id} onClick={() => setSelectedHadith(h)} className="mc-btn"
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <div className="mc-card" style={{ borderRadius: 14, padding: "14px 16px" }}>
                <div className="font-arabic" dir="rtl" style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text)", marginBottom: 6 }}>
                  {h.arabic.length > 100 ? h.arabic.slice(0, 100) + "…" : h.arabic}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", fontStyle: "italic", lineHeight: 1.4 }}>
                  {h.french.length > 80 ? h.french.slice(0, 80) + "…" : `« ${h.french} »`}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{h.source.slice(0, 40)}{h.source.length > 40 ? "…" : ""}</span>
                  <span style={{ fontSize: 10, background: "var(--track)", borderRadius: 99, padding: "2px 8px", color: "var(--text-faint)" }}>{h.topic}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button onClick={onReflection} className="mc-btn mc-scale-tap" style={{ marginTop: 16, width: "100%", padding: "15px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 14, cursor: "pointer" }}>
          Faire le bilan du jour
        </button>
      </div>
    </div>
  );
}
