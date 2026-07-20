"use client";
import React from "react";
import { Settings as SettingsIcon, Check, ArrowRight, BarChart3 } from "lucide-react";
import { AppData, DayData } from "@/lib/types";
import { ADHKAR, QUOTES } from "@/lib/data";
import { AtmosphereBackground, ProgressBar, TopBar } from "../ui";

export default function Home({
  app, day, now, onStart, onOpenDashboard, onOpenSettings,
}: {
  app: AppData; day: DayData; now: Date;
  onStart: () => void; onOpenDashboard: () => void; onOpenSettings: () => void;
}) {
  const adhkarPct = day.adhkarCompleted ? 100 : Math.round((day.adhkarIndex / ADHKAR.length) * 100);
  const overallDone = day.adhkarCompleted && day.routineCompleted;
  const pct = overallDone ? 100 : day.adhkarCompleted ? 55 : Math.round(adhkarPct * 0.5);

  const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const quote = QUOTES[now.getDate() % QUOTES.length];

  let cta = "Commencer";
  if (day.adhkarCompleted && !day.routineCompleted) cta = "Continuer la routine";
  if (overallDone) cta = "Voir le tableau de bord";

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", paddingBottom: 40, position: "relative" }}>
      <AtmosphereBackground />
      <TopBar
        title=""
        right={
          <button onClick={onOpenSettings} className="mc-btn" style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}>
            <SettingsIcon size={20} />
          </button>
        }
      />
      <div style={{ position: "relative", zIndex: 1, padding: "10px 24px" }}>
        <div className="font-arabic" dir="rtl" style={{ fontSize: 26, color: "var(--gold)", marginBottom: 6, textAlign: "right" }}>
          السلام عليكم ورحمة الله وبركاته
        </div>
        <div className="font-display" style={{ fontSize: 24, marginTop: 18, lineHeight: 1.3 }}>
          Aujourd&apos;hui est une nouvelle occasion<br />de se rapprocher d&apos;Allah.
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24, fontSize: 13, color: "var(--text-dim)" }}>
          <span style={{ textTransform: "capitalize" }}>{dateStr}</span>
          <span>·</span>
          <span>{timeStr}</span>
        </div>

        <div className="mc-card" style={{ marginTop: 28, borderRadius: 20, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Progression du jour</span>
            <span className="font-display" style={{ fontSize: 20, color: "var(--emerald)" }}>{pct}%</span>
          </div>
          <ProgressBar pct={pct} />
          <div style={{ display: "flex", gap: 18, marginTop: 16, fontSize: 12, color: "var(--text-dim)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={13} color={day.adhkarCompleted ? "var(--emerald)" : "var(--text-faint)"} /> Adhkar
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={13} color={day.routineCompleted ? "var(--emerald)" : "var(--text-faint)"} /> Routine
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18, fontSize: 13, color: "var(--text-dim)", fontStyle: "italic", lineHeight: 1.5, padding: "0 4px" }}>
          « {quote.text} »
          <div style={{ marginTop: 4, fontSize: 11, color: "var(--text-faint)" }}>— {quote.source}</div>
        </div>

        <button onClick={onStart} className="mc-btn mc-scale-tap" style={{
          marginTop: 30, width: "100%", padding: "17px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, var(--emerald), #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {cta} <ArrowRight size={17} />
        </button>

        <button onClick={onOpenDashboard} className="mc-btn" style={{
          marginTop: 14, width: "100%", padding: "13px", borderRadius: 16, border: "1px solid var(--border)",
          background: "transparent", color: "var(--text-dim)", fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <BarChart3 size={15} /> Tableau de bord · série de {app.streak} jour{app.streak > 1 ? "s" : ""}
        </button>
      </div>
    </div>
  );
}
