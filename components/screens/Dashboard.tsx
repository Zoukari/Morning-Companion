"use client";
import React, { useState } from "react";
import { Flame, ShieldCheck, TrendingDown, Award, Target, Check } from "lucide-react";
import { LineChart, Line, ReferenceLine, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { AppData } from "@/lib/types";
import { BADGES, levelForDays } from "@/lib/data";
import { TopBar } from "../ui";

const DAY_MS = 86400000;

export default function Dashboard({
  app, setApp, onExit, onReflection,
}: {
  app: AppData; setApp: (updater: (a: AppData) => AppData) => void;
  onExit: () => void; onReflection: () => void;
}) {
  const level = levelForDays(app.totalDaysCompleted);
  const history = app.weightHistory;
  const last = history[history.length - 1];
  const first = history[0];
  const totalLoss = first && last ? (first.weight - last.weight) : null;
  const chartData = history.slice(-30).map(h => ({ date: h.date.slice(5), weight: h.weight }));
  const toGoal = last && app.goalWeight != null ? (last.weight - app.goalWeight) : null;

  const [goalInput, setGoalInput] = useState(app.goalWeight?.toString() || "");
  const saveGoal = () => {
    const v = parseFloat(goalInput);
    setApp(a => ({ ...a, goalWeight: isNaN(v) ? null : v }));
  };

  // last 28 days, oldest first — each cell reflects that calendar day's completion
  const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0);
  const days28 = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(todayMidnight.getTime() - (27 - i) * DAY_MS);
    const key = d.toISOString().slice(0, 10);
    const rec = app.days[key];
    const done = !!(rec && rec.adhkarCompleted && rec.routineCompleted);
    return { key, dayNum: d.getDate(), done, isToday: i === 27 };
  });

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <TopBar title="Tableau de bord" onBack={onExit} />
      <div style={{ padding: "6px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Flame size={18} color="var(--gold)" />
            <div className="font-display" style={{ fontSize: 24, marginTop: 8 }}>{app.streak}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours de série</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <ShieldCheck size={18} color="var(--emerald)" />
            <div className="font-display" style={{ fontSize: 24, marginTop: 8 }}>{app.totalDaysCompleted}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours accomplis</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <TrendingDown size={18} color="var(--gold)" />
            <div className="font-display" style={{ fontSize: 24, marginTop: 8 }}>
              {totalLoss != null ? `${totalLoss.toFixed(1)} kg` : "—"}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>poids perdu</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Award size={18} color="var(--emerald)" />
            <div className="font-display" style={{ fontSize: 17, marginTop: 8 }}>{level}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>niveau actuel</div>
          </div>
        </div>

        {/* Streak detail — last 28 days */}
        <div className="mc-card" style={{ marginTop: 22, borderRadius: 16, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Détail des 28 derniers jours</span>
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>{days28.filter(d => d.done).length}/28</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {days28.map(d => (
              <div key={d.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: "100%", aspectRatio: "1", borderRadius: 8,
                  background: d.done ? "var(--emerald)" : "var(--track)",
                  border: d.isToday ? "1.5px solid var(--gold)" : "1px solid transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {d.done && <Check size={11} color="#fff" />}
                </div>
                <span style={{ fontSize: 9, color: "var(--text-faint)" }}>{d.dayNum}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 22, fontSize: 13, color: "var(--text-dim)", marginBottom: 10 }}>Badges</div>
        <div style={{ display: "flex", gap: 10 }}>
          {BADGES.map(b => {
            const unlocked = app.totalDaysCompleted >= b;
            return (
              <div key={b} className="mc-card" style={{ flex: 1, borderRadius: 14, padding: "14px 6px", textAlign: "center", opacity: unlocked ? 1 : 0.35 }}>
                <Award size={16} color={unlocked ? "var(--gold)" : "var(--text-faint)"} style={{ margin: "0 auto 6px" }} />
                <div style={{ fontSize: 12 }}>{b}j</div>
              </div>
            );
          })}
        </div>

        {/* Weight-loss path */}
        <div className="mc-card" style={{ marginTop: 22, borderRadius: 16, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Target size={15} color="var(--gold)" />
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Chemin du poids perdu</span>
          </div>

          {history.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--text-faint)", padding: "6px 2px 4px" }}>
              Pas encore de pesée enregistrée — le chemin apparaîtra dès ta première pesée.
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: 18 }}>{first.weight} kg</div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)" }}>départ</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: 18, color: "var(--emerald)" }}>{last.weight} kg</div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)" }}>actuel</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: 18, color: toGoal != null && toGoal <= 0 ? "var(--emerald)" : "var(--text)" }}>
                    {toGoal != null ? `${Math.abs(toGoal).toFixed(1)} kg` : "—"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)" }}>
                    {toGoal != null ? (toGoal <= 0 ? "objectif atteint" : "restant") : "objectif"}
                  </div>
                </div>
              </div>

              {chartData.length > 1 ? (
                <div style={{ marginTop: 16 }}>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={chartData}>
                      <CartesianGrid stroke="var(--track)" vertical={false} />
                      <XAxis dataKey="date" stroke="var(--text-faint)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--text-faint)" fontSize={10} tickLine={false} axisLine={false} domain={["auto", "auto"]} width={30} />
                      <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                      {app.goalWeight != null && (
                        <ReferenceLine y={app.goalWeight} stroke="var(--gold)" strokeDasharray="4 4" />
                      )}
                      <Line type="monotone" dataKey="weight" stroke="var(--gold)" strokeWidth={2} dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div style={{ marginTop: 14, fontSize: 12, color: "var(--text-faint)" }}>
                  Encore une pesée ou deux et le graphique apparaîtra ici.
                </div>
              )}
            </>
          )}

          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-dim)", flexShrink: 0 }}>Objectif</span>
            <input
              type="number" step="0.1" inputMode="decimal" placeholder="Poids cible (kg)"
              value={goalInput} onChange={e => setGoalInput(e.target.value)} onBlur={saveGoal}
              style={{ flex: 1, background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", padding: "8px 10px", fontSize: 13 }}
            />
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>kg</span>
          </div>
        </div>

        <button onClick={onReflection} className="mc-btn mc-scale-tap" style={{
          marginTop: 22, width: "100%", padding: "15px", borderRadius: 16, border: "1px solid var(--border)",
          background: "var(--card)", color: "var(--text)", fontSize: 14, cursor: "pointer",
        }}>
          Faire le bilan du jour
        </button>
      </div>
    </div>
  );
}
