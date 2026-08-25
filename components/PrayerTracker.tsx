"use client";
import React from "react";
import { DayData, PrayerState } from "@/lib/types";

const PRAYERS = [
  { key: "fajr", label: "Fajr", arabic: "الفجر" },
  { key: "dhuhr", label: "Dhuhr", arabic: "الظهر" },
  { key: "asr", label: "Asr", arabic: "العصر" },
  { key: "maghrib", label: "Maghrib", arabic: "المغرب" },
  { key: "isha", label: "Isha", arabic: "العشاء" },
] as const;

const NEXT_STATE: Record<PrayerState, PrayerState> = {
  none: "home", home: "mosque", mosque: "none",
};

const STATE_COLOR: Record<PrayerState, string> = {
  none: "var(--track-strong)",
  home: "#f97316",
  mosque: "#16a34a",
};

const STATE_LABEL: Record<PrayerState, string> = {
  none: "",
  home: "🏠",
  mosque: "🕌",
};

export default function PrayerTracker({
  day, setDay,
}: {
  day: DayData;
  setDay: (updater: (d: DayData) => DayData) => void;
}) {
  const toggle = (key: keyof DayData["prayers"]) => {
    setDay(d => ({
      ...d,
      prayers: { ...d.prayers, [key]: NEXT_STATE[d.prayers[key]] },
    }));
  };

  const total = Object.values(day.prayers).filter(p => p !== "none").length;
  const atMosque = Object.values(day.prayers).filter(p => p === "mosque").length;

  return (
    <div className="mc-card" style={{ borderRadius: 18, padding: "14px 16px", marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Prières du jour</span>
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
          {total}/5{atMosque > 0 && ` · ${atMosque} 🕌`}
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
        {PRAYERS.map(({ key, arabic }) => {
          const state = day.prayers[key as keyof typeof day.prayers];
          const color = STATE_COLOR[state];
          return (
            <button
              key={key}
              onClick={() => toggle(key as keyof DayData["prayers"])}
              className="mc-btn mc-scale-tap"
              style={{
                flex: 1, borderRadius: 12, padding: "10px 4px",
                background: state === "none" ? "var(--track)" : color,
                border: `2px solid ${state === "none" ? "var(--border)" : color}`,
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 4, transition: "all 0.2s ease",
              }}
            >
              <span
                className="font-arabic"
                dir="rtl"
                style={{ fontSize: 12, color: state === "none" ? "var(--text-faint)" : "#fff", lineHeight: 1 }}
              >
                {arabic}
              </span>
              {state !== "none" && (
                <span style={{ fontSize: 11 }}>{STATE_LABEL[state]}</span>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-faint)", textAlign: "center" }}>
        Appuie pour changer · ⬜ pas priée · 🏠 maison · 🕌 mosquée
      </div>
    </div>
  );
}
