"use client";
import React, { useState } from "react";
import { TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { AppData, DayData } from "@/lib/types";
import { TopBar } from "../ui";

export default function WeightScreen({
  app, day, setDay, onNext, onExit,
}: {
  app: AppData; day: DayData;
  setDay: (updater: (d: DayData) => DayData) => void;
  onNext: (v: number | null) => void;
  onExit: () => void;
}) {
  const [value, setValue] = useState<string>(day.weight?.toString() || "");
  const history = app.weightHistory;
  const last = history[history.length - 1];
  const first = history[0];
  const totalLoss = first && last ? (first.weight - last.weight).toFixed(1) : null;

  const save = () => {
    const v = parseFloat(value);
    if (!isNaN(v)) {
      setDay(d => ({ ...d, weight: v }));
      onNext(v);
    } else {
      onNext(null);
    }
  };

  const chartData = history.slice(-14).map(h => ({ date: h.date.slice(5), weight: h.weight }));

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Suivi du poids" onBack={onExit} />
      <div style={{ padding: "20px 22px" }}>
        <div className="font-display" style={{ fontSize: 20, marginBottom: 6 }}>Quel est ton poids aujourd&apos;hui ?</div>
        <div style={{ fontSize: 13, color: "#93938e", marginBottom: 20 }}>En kilogrammes</div>
        <div className="mc-card" style={{ borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <input
            type="number" step="0.1" inputMode="decimal" placeholder="105.6"
            value={value} onChange={e => setValue(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "#f3f2ee", fontSize: 28, width: "100%" }}
            className="font-display"
          />
          <span style={{ color: "#93938e", fontSize: 14 }}>kg</span>
        </div>

        {chartData.length > 1 && (
          <div className="mc-card" style={{ marginTop: 20, borderRadius: 16, padding: "16px 8px 4px" }}>
            <div style={{ fontSize: 12, color: "#93938e", padding: "0 14px 10px" }}>Historique (14 derniers jours)</div>
            <ResponsiveContainer width="100%" height={140}>
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

        {totalLoss !== null && (
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <div className="mc-card" style={{ flex: 1, borderRadius: 14, padding: 14, textAlign: "center" }}>
              <TrendingDown size={16} color="#16A34A" style={{ margin: "0 auto 4px" }} />
              <div className="font-display" style={{ fontSize: 17 }}>{totalLoss} kg</div>
              <div style={{ fontSize: 11, color: "#93938e" }}>Perte totale</div>
            </div>
          </div>
        )}

        <button onClick={save} className="mc-btn mc-scale-tap" style={{
          marginTop: 24, width: "100%", padding: "16px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, #16A34A, #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Enregistrer
        </button>
      </div>
    </div>
  );
}
