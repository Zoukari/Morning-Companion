"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Check, ArrowRight, BarChart3, Moon, BookOpen, Star, Sunset } from "lucide-react";
import { AppData, DayData } from "@/lib/types";
import { ADHKAR, EVENING_ADHKAR, QIYAM_ADHKAR, IFTAR_ADHKAR, QUOTES, ENCOURAGEMENTS } from "@/lib/data";
import { toArabicName } from "@/lib/transliterate";
import { AtmosphereBackground, ProgressBar, TopBar } from "../ui";

export default function Home({
  app, day, now, onStart, onOpenDashboard, onOpenSettings, onOpenEveningAdhkar, onOpenQiyamAdhkar, onOpenIftarAdhkar, onReviewAdhkar,
}: {
  app: AppData; day: DayData; now: Date;
  onStart: () => void; onOpenDashboard: () => void; onOpenSettings: () => void;
  onOpenEveningAdhkar: () => void; onOpenQiyamAdhkar: () => void; onOpenIftarAdhkar: () => void; onReviewAdhkar: () => void;
}) {
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [klikFixed, setKlikFixed] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setKlikFixed(false), 20000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx(i => (i + 1) % QUOTES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);
  const quote = QUOTES[quoteIdx];
  const arabicName = toArabicName(app.settings.userName);
  const encouragement = ENCOURAGEMENTS[quoteIdx % ENCOURAGEMENTS.length].replace("{name}", app.settings.userName);
  const QUOTE_INTERVAL_MS = 10000;
  const adhkarPct = day.adhkarCompleted ? 100 : Math.round((day.adhkarIndex / ADHKAR.length) * 100);
  const overallDone = day.adhkarCompleted && day.routineCompleted;
  const pct = overallDone ? 100 : day.adhkarCompleted ? 55 : Math.round(adhkarPct * 0.5);

  const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  let cta = "Commencer";
  if (day.adhkarCompleted && !day.routineCompleted) cta = "Continuer la routine";
  if (overallDone) cta = "Voir le tableau de bord";

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh", paddingBottom: klikFixed ? 90 : 40, position: "relative", overflowX: "hidden" }}>
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
          السلام عليكم ورحمة الله وبركاته {arabicName && `يا ${arabicName}`}
        </div>
        <div className="font-display" style={{ fontSize: 24, marginTop: 18, lineHeight: 1.3 }}>
          Aujourd&apos;hui est une nouvelle occasion<br />de se rapprocher d&apos;Allah.
        </div>

        <div key={`enc-${quoteIdx}`} className="mc-fade-in" style={{ marginTop: 12, fontSize: 19, color: "var(--gold)", lineHeight: 1.4, fontWeight: 700 }}>
          {encouragement}
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

        <div key={quoteIdx} className="mc-fade-in" style={{
          marginTop: 18, padding: 18, borderRadius: 18,
          background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)", position: "relative",
        }}>
          <div style={{ position: "absolute", top: 12, right: 12 }}>
            <svg width={22} height={22} viewBox="0 0 22 22">
              <circle cx={11} cy={11} r={9} fill="none" stroke="#e5e0d8" strokeWidth={2.5} />
              <circle
                key={quoteIdx}
                cx={11} cy={11} r={9} fill="none" stroke="#C8A75D" strokeWidth={2.5}
                strokeDasharray={2 * Math.PI * 9}
                style={{
                  transform: "rotate(-90deg)", transformOrigin: "50% 50%",
                  animation: `mcRingDrain ${QUOTE_INTERVAL_MS}ms linear forwards`,
                }}
              />
            </svg>
          </div>

          {quote.arabic && (
            <div className="font-arabic" dir="rtl" style={{ fontSize: 17, color: "#8a6a2f", lineHeight: 1.7, marginBottom: 8, textAlign: "right", paddingRight: 28 }}>
              {quote.arabic}
            </div>
          )}
          <div style={{ fontSize: 13, color: "#3a3a3a", fontStyle: "italic", lineHeight: 1.5, paddingRight: quote.arabic ? 0 : 28 }}>
            « {quote.text} »
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: "#8a8a85" }}>— {quote.source}</div>
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

        {day.adhkarCompleted && (
          <button onClick={onReviewAdhkar} className="mc-btn" style={{
            marginTop: 10, width: "100%", padding: "13px", borderRadius: 16, border: "1px solid var(--border)",
            background: "transparent", color: "var(--text-dim)", fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <BookOpen size={15} /> Revoir les adhkar du matin
          </button>
        )}

        <button onClick={onOpenEveningAdhkar} className="mc-btn" style={{
          marginTop: 10, width: "100%", padding: "13px", borderRadius: 16, border: "1px solid rgba(129,140,248,0.35)",
          background: "rgba(129,140,248,0.10)", color: "var(--text)", fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 500,
        }}>
          <Moon size={15} color="#818cf8" />
          Azkar du soir (facultatif)
          {day.eveningAdhkarCompleted ? (
            <Check size={13} color="var(--emerald)" />
          ) : (
            <span style={{ color: "var(--text-faint)" }}>· {day.eveningAdhkarIndex}/{EVENING_ADHKAR.length}</span>
          )}
        </button>

        <button onClick={onOpenQiyamAdhkar} className="mc-btn" style={{
          marginTop: 10, width: "100%", padding: "13px", borderRadius: 16, border: "1px solid rgba(200,167,93,0.4)",
          background: "rgba(200,167,93,0.12)", color: "var(--text)", fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 500,
        }}>
          <Star size={15} color="var(--gold)" />
          Qiyam al-Layl (facultatif)
          {day.qiyamAdhkarCompleted ? (
            <Check size={13} color="var(--emerald)" />
          ) : (
            <span style={{ color: "var(--text-faint)" }}>· {day.qiyamAdhkarIndex}/{QIYAM_ADHKAR.length}</span>
          )}
        </button>

        <button onClick={onOpenIftarAdhkar} className="mc-btn" style={{
          marginTop: 10, width: "100%", padding: "13px", borderRadius: 16, border: "1px solid rgba(251,146,60,0.4)",
          background: "rgba(251,146,60,0.12)", color: "var(--text)", fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 500,
        }}>
          <Sunset size={15} color="#fb923c" />
          Avant l&apos;iftar (facultatif)
          {day.iftarAdhkarCompleted ? (
            <Check size={13} color="var(--emerald)" />
          ) : (
            <span style={{ color: "var(--text-faint)" }}>· {day.iftarAdhkarIndex}/{IFTAR_ADHKAR.length}</span>
          )}
        </button>

        {!klikFixed && <KlikBadge />}
      </div>

      {klikFixed && (
        <div style={{ position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)", zIndex: 50 }}>
          <KlikBadge />
        </div>
      )}
    </div>
  );
}

function KlikBadge() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
      <a
        href="https://klikdj.com" target="_blank" rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "9px 18px",
          borderRadius: 999, background: "#11111c",
          border: "1px solid rgba(167,139,250,0.35)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          textDecoration: "none", cursor: "pointer",
        }}
      >
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          background: "linear-gradient(135deg, #d9c5f9, #b79cf0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: "#1a1a2e", flexShrink: 0,
        }}>K</div>
        <span style={{ fontSize: 13, color: "#b0b0c0" }}>
          Site fait par <span style={{ color: "#a78bfa", fontWeight: 700 }}>KLIK</span>
        </span>
        <span style={{ fontSize: 13, color: "#45454f" }}>|</span>
        <span style={{ fontSize: 13, color: "#b0b0c0" }}>© {new Date().getFullYear()}</span>
      </a>
    </div>
  );
}
