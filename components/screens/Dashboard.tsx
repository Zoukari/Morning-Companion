"use client";
import React from "react";
import { Flame, ShieldCheck, TrendingDown, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { AppData } from "@/lib/types";
import { BADGES, levelForDays } from "@/lib/data";
import { TopBar } from "../ui";

export default function Dashboard({
  app, onExit, onReflection,
}: {
  app: AppData; onExit: () => void; onReflection: () => void;
}) {
  const level = levelForDays(app.totalDaysCompleted);
  const history = app.weightHistory;
  const last = history[history.length - 1];
  const first = history[0];
  const totalLoss = first && last ? (first.weight - last.weight).toFixed(1) : "—";
  const chartData = history.slice(-30).map(h => ({ date: h.date.slice(5), weight: h.weight }));

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <TopBar title="Tableau de bord" onBack={onExit} />
      <div style={{ padding: "6px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Flame size={18} color="#C8A75D" />
            <div className="font-display" style={{ fontSize: 24, marginTop: 8 }}>{app.streak}</div>
            <div style={{ fontSize: 12, color: "#93938e" }}>jours de série</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <ShieldCheck size={18} color="#16A34A" />
            <div className="font-display" style={{ fontSize: 24, marginTop: 8 }}>{app.totalDaysCompleted}</div>
            <div style={{ fontSize: 12, color: "#93938e" }}>jours accomplis</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <TrendingDown size={18} color="#C8A75D" />
            <div className="font-display" style={{ fontSize: 24, marginTop: 8 }}>{totalLoss}{totalLoss !== "—" ? " kg" : ""}</div>
            <div style={{ fontSize: 12, color: "#93938e" }}>poids perdu</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Award size={18} color="#16A34A" />
            <div className="font-display" style={{ fontSize: 17, marginTop: 8 }}>{level}</div>
            <div style={{ fontSize: 12, color: "#93938e" }}>niveau actuel</div>
          </div>
        </div>

        <div style={{ marginTop: 22, fontSize: 13, color: "#93938e", marginBottom: 10 }}>Badges</div>
        <div style={{ display: "flex", gap: 10 }}>
          {BADGES.map(b => {
            const unlocked = app.totalDaysCompleted >= b;
            return (
              <div key={b} className="mc-card" style={{ flex: 1, borderRadius: 14, padding: "14px 6px", textAlign: "center", opacity: unlocked ? 1 : 0.35 }}>
                <Award size={16} color={unlocked ? "#C8A75D" : "#55555a"} style={{ margin: "0 auto 6px" }} />
                <div style={{ fontSize: 12 }}>{b}j</div>
              </div>
            );
          })}
        </div>

        {chartData.length > 1 && (
          <div className="mc-card" style={{ marginTop: 22, borderRadius: 16, padding: "16px 8px 4px" }}>
            <div style={{ fontSize: 12, color: "#93938e", padding: "0 14px 10px" }}>Poids (30 derniers jours)</div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="date" stroke="#55555a" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#55555a" fontSize={10} tickLine={false} axisLine={false} domain={["auto", "auto"]} width={30} />
                <Tooltip contentStyle={{ background: "#1b1b1f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="weight" stroke="#C8A75D" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <button onClick={onReflection} className="mc-btn mc-scale-tap" style={{
          marginTop: 22, width: "100%", padding: "15px", borderRadius: 16, border: "1px solid var(--border)",
          background: "#1b1b1f", color: "#f3f2ee", fontSize: 14, cursor: "pointer",
        }}>
          Faire le bilan du jour
        </button>
      </div>
    </div>
  );
}
