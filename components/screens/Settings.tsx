"use client";
import React from "react";
import { Bell, BellOff, Clock, ShieldCheck, Volume2, VolumeX, Globe } from "lucide-react";
import { AppData, Settings as SettingsType } from "@/lib/types";
import { requestNotificationPermission } from "@/lib/notifications";
import { Toggle, TopBar } from "../ui";

export default function SettingsScreen({
  app, setApp, onExit,
}: {
  app: AppData;
  setApp: (updater: (a: AppData) => AppData) => void;
  onExit: () => void;
}) {
  const s = app.settings;
  const upd = (patch: Partial<SettingsType>) => setApp(a => ({ ...a, settings: { ...a.settings, ...patch } }));

  const handleNotifToggle = async (v: boolean) => {
    if (v) {
      const granted = await requestNotificationPermission();
      upd({ notifications: granted });
    } else {
      upd({ notifications: false });
    }
  };

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Paramètres" onBack={onExit} />
      <div style={{ padding: "6px 20px", display: "flex", flexDirection: "column", gap: 10 }}>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {s.notifications ? <Bell size={17} color="#16A34A" /> : <BellOff size={17} color="#55555a" />}
            <div>
              <div style={{ fontSize: 14 }}>Notifications</div>
              <div style={{ fontSize: 11, color: "#55555a" }}>Rappel quotidien tant que l&apos;app est ouverte</div>
            </div>
          </div>
          <Toggle on={s.notifications} onChange={handleNotifToggle} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Clock size={17} color="#93938e" />
            <div style={{ fontSize: 14 }}>Heure de rappel</div>
          </div>
          <input type="time" value={s.notifTime} onChange={e => upd({ notifTime: e.target.value })}
            style={{ background: "#141417", border: "1px solid var(--border)", borderRadius: 8, color: "#f3f2ee", padding: "6px 8px", fontSize: 13 }} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ShieldCheck size={17} color="#16A34A" />
            <div>
              <div style={{ fontSize: 14 }}>Mode strict</div>
              <div style={{ fontSize: 11, color: "#55555a" }}>Ouvre directement l&apos;étape où tu t&apos;es arrêté</div>
            </div>
          </div>
          <Toggle on={s.strictMode} onChange={v => upd({ strictMode: v })} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {s.soundCounter ? <Volume2 size={17} color="#93938e" /> : <VolumeX size={17} color="#55555a" />}
            <div style={{ fontSize: 14 }}>Son du compteur</div>
          </div>
          <Toggle on={s.soundCounter} onChange={v => upd({ soundCounter: v })} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <Globe size={17} color="#93938e" />
            <div style={{ fontSize: 14 }}>Langue</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ id: "fr", label: "Français" }, { id: "en", label: "English" }, { id: "ar", label: "العربية" }].map(l => (
              <button key={l.id} onClick={() => upd({ language: l.id as SettingsType["language"] })} className="mc-btn" style={{
                flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer", fontSize: 12,
                border: `1px solid ${s.language === l.id ? "var(--emerald-line)" : "var(--border)"}`,
                background: s.language === l.id ? "var(--emerald-soft)" : "transparent", color: "#f3f2ee",
              }}>{l.label}</button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 11, color: "#55555a", padding: "16px 4px", lineHeight: 1.6 }}>
          Mode hors ligne · toutes les données restent sur cet appareil (IndexedDB).
        </div>
      </div>
    </div>
  );
}
