"use client";
import React, { useState } from "react";
import { Flame, ShieldCheck, Book, ChevronDown, ChevronUp } from "lucide-react";
import { AppData, DayData, LEVEL_NAMES, LEVEL_DESCRIPTIONS, LEVEL_THRESHOLDS, levelForStreak } from "@/lib/types";
import { HADITH_COLLECTION } from "@/lib/data";
import { TopBar } from "../ui";

const DAY_MS = 86400000;

export default function Dashboard({ app, onExit, onReflection }: {
  app: AppData; onExit: () => void; onReflection: () => void;
}) {
  const [showLevels, setShowLevels] = useState(false);
  const [expandedHadith, setExpandedHadith] = useState<string | null>(null);

  const currentLevel = levelForStreak(app.streak);
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel + 1] ?? null;

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
    if (d.adhkarDone && d.prayedCount >= 5) return "var(--emerald)";
    if (d.adhkarDone && d.prayedCount >= 3) return "#86efac";
    if (d.adhkarDone || d.prayedCount >= 3) return "var(--gold)";
    return "var(--track)";
  };

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", paddingBottom: 60, overflowX: "hidden" }}>
      <TopBar title="Tableau de bord" onBack={onExit} />
      <div style={{ padding: "4px 18px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Flame size={18} color="var(--gold)" />
            <div className="font-display" style={{ fontSize: 28, marginTop: 6 }}>{app.streak}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours de série</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <ShieldCheck size={18} color="var(--emerald)" />
            <div className="font-display" style={{ fontSize: 28, marginTop: 6 }}>{app.totalDaysCompleted}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours accomplis</div>
          </div>
        </div>

        <button onClick={() => setShowLevels(v => !v)} className="mc-btn"
          style={{ marginTop: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Niveau actuel</div>
                <div className="font-display" style={{ fontSize: 22, color: "var(--gold)" }}>
                  {currentLevel} — {LEVEL_NAMES[currentLevel]}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4, lineHeight: 1.4 }}>
                  {LEVEL_DESCRIPTIONS[currentLevel]}
                </div>
              </div>
              {showLevels ? <ChevronUp size={18} color="var(--text-faint)" /> : <ChevronDown size={18} color="var(--text-faint)" />}
            </div>
            {nextThreshold && (
              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-faint)", marginBottom: 6 }}>
                  <span>Série : {app.streak}j</span><span>Prochain : {nextThreshold}j</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "var(--track-strong)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg,var(--emerald),var(--gold))", width: `${Math.min(100, (app.streak / nextThreshold) * 100)}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
            )}
          </div>
        </button>

        {showLevels && (
          <div className="mc-card mc-fade-in" style={{ borderRadius: 16, padding: 14, marginTop: 6 }}>
            <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.5 }}>
              ⚠️ Manquer un jour = série remise à zéro, niveau baisse. Manquer 3 jours = retour niveau 0.
            </div>
            {LEVEL_NAMES.map((name, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < LEVEL_NAMES.length - 1 ? "1px solid var(--border)" : "none", opacity: i > currentLevel ? 0.4 : 1 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: i === currentLevel ? "var(--gold)" : i < currentLevel ? "var(--emerald)" : "var(--track-strong)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: i <= currentLevel ? "#fff" : "var(--text-faint)" }}>
                  {i}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: i === currentLevel ? 700 : 400, color: i === currentLevel ? "var(--gold)" : "var(--text)" }}>
                    {name}{i === currentLevel && " ← tu es ici"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{LEVEL_THRESHOLDS[i]}j de série · {LEVEL_DESCRIPTIONS[i]}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mc-card" style={{ marginTop: 14, borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>28 derniers jours</span>
            <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{days28.filter(d => d.adhkarDone).length} adhkar · {days28.filter(d => d.prayedCount >= 5).length} complets</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
            {days28.map(d => (
              <div key={d.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: 7, background: bgForDay(d), border: d.isToday ? "2px solid var(--gold)" : "1px solid transparent" }} />
                <span style={{ fontSize: 9, color: "var(--text-faint)" }}>{d.dayNum}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-faint)" }}>🟩 complet · 🟦 partiel adhkar · 🟨 partiel · ⬜ rien</div>
        </div>

        <div style={{ marginTop: 20, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <Book size={16} color="var(--gold)" />
          <span style={{ fontSize: 14, color: "var(--text)" }}>Hadiths &amp; explications</span>
          <span style={{ fontSize: 11, color: "var(--text-faint)" }}>({HADITH_COLLECTION.length})</span>
        </div>

        {HADITH_COLLECTION.map(h => (
          <button key={h.id} onClick={() => setExpandedHadith(expandedHadith === h.id ? null : h.id)}
            className="mc-btn" style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, marginBottom: 8, cursor: "pointer" }}>
            <div className="mc-card" style={{ borderRadius: 14, padding: "14px 16px" }}>
              <div className="font-arabic" dir="rtl" style={{ fontSize: 17, lineHeight: 1.8, color: "var(--text)", marginBottom: 8 }}>
                {h.arabic}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", fontStyle: "italic" }}>« {h.french} »</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4 }}>— {h.source}</div>
              {expandedHadith === h.id && (
                <div className="mc-fade-in" style={{ marginTop: 12, padding: "12px 14px", background: "var(--bg-elevated)", borderRadius: 10, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>
                  {h.explanation}
                </div>
              )}
              <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-faint)", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4 }}>
                {expandedHadith === h.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {expandedHadith === h.id ? "Réduire" : "Voir l'explication"}
              </div>
            </div>
          </button>
        ))}

        <button onClick={onReflection} className="mc-btn mc-scale-tap" style={{ marginTop: 16, width: "100%", padding: "15px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 14, cursor: "pointer" }}>
          Faire le bilan du jour
        </button>
      </div>
    </div>
  );
}
