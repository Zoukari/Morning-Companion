"use client";
import React from "react";
import { Bell, BellOff, Clock, ShieldCheck, Volume2, VolumeX, Globe, Sun, Moon, RotateCcw, Zap } from "lucide-react";
import { AppData, Settings as SettingsType } from "@/lib/types";
import { enablePush } from "@/lib/push";
import { Toggle, TopBar } from "../ui";

export default function SettingsScreen({
  app, setApp, onExit, onResetTodayAdhkar,
}: {
  app: AppData;
  setApp: (updater: (a: AppData) => AppData) => void;
  onExit: () => void;
  onResetTodayAdhkar: () => void;
}) {
  const s = app.settings;
  const [confirmReset, setConfirmReset] = React.useState(false);
  const [pushStatus, setPushStatus] = React.useState<"idle" | "working" | "error">("idle");
  const upd = (patch: Partial<SettingsType>) => setApp(a => ({ ...a, settings: { ...a.settings, ...patch } }));

  const handleNotifToggle = async (v: boolean) => {
    upd({ notifications: v });
    if (!v) return;
    if (!s.pushEnabled) {
      setPushStatus("working");
      const result = await enablePush();
      if (result.ok) {
        upd({ pushEnabled: true });
        setPushStatus("idle");
      } else {
        upd({ notifications: false });
        setPushStatus("error");
        setTimeout(() => setPushStatus("idle"), 3000);
      }
    }
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3500);
      return;
    }
    onResetTodayAdhkar();
    setConfirmReset(false);
  };

  return (
    <div className="mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Paramètres" onBack={onExit} />
      <div style={{ padding: "6px 20px", display: "flex", flexDirection: "column", gap: 10 }}>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            {s.theme === "dark" ? <Moon size={17} color="var(--text-dim)" /> : <Sun size={17} color="var(--gold)" />}
            <div style={{ fontSize: 14 }}>Apparence</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => upd({ theme: "dark" })} className="mc-btn" style={{
              flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer", fontSize: 12,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              border: `1px solid ${s.theme === "dark" ? "var(--emerald-line)" : "var(--border)"}`,
              background: s.theme === "dark" ? "var(--emerald-soft)" : "transparent", color: "var(--text)",
            }}><Moon size={13} /> Sombre</button>
            <button onClick={() => upd({ theme: "light" })} className="mc-btn" style={{
              flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer", fontSize: 12,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              border: `1px solid ${s.theme === "light" ? "var(--emerald-line)" : "var(--border)"}`,
              background: s.theme === "light" ? "var(--emerald-soft)" : "transparent", color: "var(--text)",
            }}><Sun size={13} /> Clair</button>
          </div>
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {s.notifications ? <Bell size={17} color="var(--emerald)" /> : <BellOff size={17} color="var(--text-faint)" />}
            <div>
              <div style={{ fontSize: 14 }}>Notifications push</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>
                {pushStatus === "working" ? "Activation en cours…" : pushStatus === "error" ? "Refusé ou indisponible" : "Arrivent même app fermée"}
              </div>
            </div>
          </div>
          <Toggle on={s.notifications} onChange={handleNotifToggle} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <Clock size={17} color="var(--text-dim)" />
            <div style={{ fontSize: 14 }}>Plage de rappel</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="time" value={s.notifWindowStart} onChange={e => upd({ notifWindowStart: e.target.value })}
              style={{ flex: 1, background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", padding: "8px 8px", fontSize: 13 }} />
            <span style={{ color: "var(--text-faint)", fontSize: 12 }}>à</span>
            <input type="time" value={s.notifWindowEnd} onChange={e => upd({ notifWindowEnd: e.target.value })}
              style={{ flex: 1, background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", padding: "8px 8px", fontSize: 13 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 11, color: "var(--text-faint)" }}>
            <Zap size={12} />
            Si tu n&apos;ouvres pas l&apos;app, la notif revient toutes les 20 min dans cette plage jusqu&apos;à ce que tu fasses tes adhkar
          </div>
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ShieldCheck size={17} color="var(--emerald)" />
            <div>
              <div style={{ fontSize: 14 }}>Mode strict</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>Ouvre directement l&apos;étape où tu t&apos;es arrêté</div>
            </div>
          </div>
          <Toggle on={s.strictMode} onChange={v => upd({ strictMode: v })} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {s.soundCounter ? <Volume2 size={17} color="var(--text-dim)" /> : <VolumeX size={17} color="var(--text-faint)" />}
            <div style={{ fontSize: 14 }}>Son du compteur</div>
          </div>
          <Toggle on={s.soundCounter} onChange={v => upd({ soundCounter: v })} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <Globe size={17} color="var(--text-dim)" />
            <div style={{ fontSize: 14 }}>Langue</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ id: "fr", label: "Français" }, { id: "en", label: "English" }, { id: "ar", label: "العربية" }].map(l => (
              <button key={l.id} onClick={() => upd({ language: l.id as SettingsType["language"] })} className="mc-btn" style={{
                flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer", fontSize: 12,
                border: `1px solid ${s.language === l.id ? "var(--emerald-line)" : "var(--border)"}`,
                background: s.language === l.id ? "var(--emerald-soft)" : "transparent", color: "var(--text)",
              }}>{l.label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: "var(--text-faint)", padding: "0 4px" }}>Administration</div>
        <button onClick={handleReset} className="mc-btn mc-scale-tap" style={{
          borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
          border: `1px solid ${confirmReset ? "rgba(200,80,60,0.4)" : "var(--border)"}`,
          background: confirmReset ? "rgba(200,80,60,0.12)" : "var(--card)",
          color: "var(--text)", textAlign: "left", width: "100%",
        }}>
          <RotateCcw size={17} color={confirmReset ? "#c85a3c" : "var(--text-dim)"} />
          <div>
            <div style={{ fontSize: 14 }}>{confirmReset ? "Confirmer la réinitialisation ?" : "Réinitialiser les adhkar du jour"}</div>
            <div style={{ fontSize: 11, color: "var(--text-faint)" }}>
              {confirmReset ? "Touche à nouveau pour confirmer — remet les adhkar d'aujourd'hui à zéro" : "Ne touche pas à la routine, au poids ni à l'objectif du jour"}
            </div>
          </div>
        </button>

        <div style={{ fontSize: 11, color: "var(--text-faint)", padding: "16px 4px", lineHeight: 1.6 }}>
          Mode hors ligne · toutes les données restent sur cet appareil (IndexedDB).
        </div>
      </div>
    </div>
  );
}
