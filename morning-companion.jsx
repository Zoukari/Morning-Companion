import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sun, Moon, Check, ChevronRight, ChevronLeft, Settings as SettingsIcon,
  BarChart3, Droplet, Bed, Scale, Flame, Star, Target, X, Plus, Bath,
  Smile, Sparkles, ListChecks, Volume2, VolumeX, Globe, Bell, BellOff,
  ShieldCheck, Award, TrendingDown, Clock, ArrowRight, RotateCcw
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid
} from "recharts";

/* ============================================================
   FONTS & GLOBAL STYLE
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; }
    .mc-root {
      --bg: #0a0a0b;
      --bg-elevated: #141417;
      --card: #1b1b1f;
      --card-hover: #212126;
      --text: #f3f2ee;
      --text-dim: #93938e;
      --text-faint: #55555a;
      --emerald: #16A34A;
      --emerald-soft: rgba(22,163,74,0.14);
      --emerald-line: rgba(22,163,74,0.35);
      --gold: #C8A75D;
      --gold-soft: rgba(200,167,93,0.14);
      --border: rgba(255,255,255,0.07);
      --track: rgba(255,255,255,0.06);
      --track-strong: rgba(255,255,255,0.12);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      width: 100%;
      position: relative;
      overflow-x: hidden;
      transition: background 0.4s ease, color 0.4s ease;
    }
    [data-theme="light"] .mc-root {
      --bg: #faf9f6;
      --bg-elevated: #f1efe9;
      --card: #ffffff;
      --text: #1a1a1a;
      --text-dim: #6b6b66;
      --text-faint: #a3a39c;
      --border: rgba(0,0,0,0.08);
      --track: rgba(0,0,0,0.06);
      --track-strong: rgba(0,0,0,0.12);
      --gold: #b8894a;
      --emerald-soft: rgba(22,163,74,0.10);
      --gold-soft: rgba(184,137,74,0.14);
    }
    [data-theme="light"] .mc-grain { opacity: 0.03; }
    [data-theme="light"] .mc-streaks { opacity: 0.05; }
    [data-theme="light"] .mc-dawn-beam { opacity: 0.25 !important; }
    [data-theme="light"] .mc-orb { opacity: 0.14; }
    .mc-display { font-family: 'Fraunces', Georgia, serif; }
    .mc-arabic { font-family: 'Amiri', serif; direction: rtl; }
    .mc-fade-in { animation: mcFadeIn 0.5s ease both; }
    @keyframes mcFadeIn { from { opacity:0; transform: translateY(8px);} to {opacity:1; transform:translateY(0);} }
    .mc-scale-tap:active { transform: scale(0.96); }
    .mc-btn {
      transition: transform 0.15s ease, background 0.2s ease, opacity 0.2s ease;
    }
    .mc-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.35;
      animation: mcBreathe 7s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes mcBreathe {
      0%, 100% { transform: scale(1); opacity: 0.28; }
      50% { transform: scale(1.15); opacity: 0.42; }
    }
    .mc-scroll::-webkit-scrollbar { width: 4px; }
    .mc-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
    .mc-progress-track { background: var(--track); border-radius: 999px; overflow: hidden; }
    .mc-progress-fill { background: linear-gradient(90deg, var(--emerald), var(--gold)); transition: width 0.5s cubic-bezier(.4,0,.2,1); }
    .mc-check-row { transition: background 0.2s ease, border-color 0.2s ease; }
    .mc-toggle { transition: background 0.25s ease; }
    .mc-toggle-knob { transition: transform 0.25s cubic-bezier(.4,0,.2,1); }
    .mc-confetti-piece { position: absolute; animation: mcFall linear forwards; }
    @keyframes mcFall {
      to { transform: translateY(420px) rotate(540deg); opacity: 0; }
    }
    .mc-card { background: var(--card); border: 1px solid var(--border); }
    .mc-pulse-ring::before {
      content: '';
      position: absolute; inset: -6px;
      border-radius: 50%;
      border: 1px solid var(--emerald-line);
      animation: mcPulse 2.2s ease-out infinite;
    }
    @keyframes mcPulse {
      0% { transform: scale(0.9); opacity: 0.8; }
      100% { transform: scale(1.35); opacity: 0; }
    }

    /* --- Dawn atmosphere: grain, vertical light column, motion-blur streaks --- */
    .mc-grain {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      opacity: 0.05; mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    }
    .mc-dawn-beam {
      position: absolute; pointer-events: none; z-index: 0;
      top: -10%; left: 50%; width: 60%; height: 75%;
      transform: translateX(-50%);
      background: radial-gradient(ellipse at 50% 0%,
        rgba(200,167,93,0.20) 0%,
        rgba(22,163,74,0.10) 35%,
        rgba(10,10,11,0) 70%);
      filter: blur(40px);
      animation: mcBreathe 9s ease-in-out infinite;
    }
    .mc-streaks {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      opacity: 0.10;
      background: repeating-linear-gradient(
        112deg,
        rgba(243,242,238,0.5) 0px,
        rgba(243,242,238,0.05) 2px,
        transparent 6px,
        transparent 14px
      );
      -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 55%);
      mask-image: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 55%);
      filter: blur(2px);
    }
    .mc-horizon {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background: linear-gradient(180deg,
        rgba(30,58,74,0.22) 0%,
        rgba(10,10,11,0) 30%,
        rgba(10,10,11,0) 70%,
        rgba(200,167,93,0.08) 100%);
    }
  `}</style>
);

/* ============================================================
   ADHKAR DATA (edit this array to add / modify invocations)
   ============================================================ */
const ADHKAR = [
  { id: "kursi", title: "Ayat al-Kursi", repetitions: 1,
    arabic: "اللّٰهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ" },
  { id: "ikhlas", title: "Sourate Al-Ikhlas", repetitions: 3,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ" },
  { id: "falaq", title: "Sourate Al-Falaq", repetitions: 3,
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ" },
  { id: "nas", title: "Sourate An-Nas", repetitions: 3,
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ" },
  { id: "sayyid", title: "Sayyid al-Istighfar", repetitions: 1,
    arabic: "اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت" },
  { id: "hamm-hazan", title: "Protection contre soucis et tristesse", repetitions: 3,
    arabic: "اللهم إني أعوذ بك من الهم والحزن وأعوذ بك من العجز والكسل وأعوذ بك من الجبن والبخل وأعوذ بك من غلبة الدين وقهر الرجال" },
  { id: "afiya", title: "Demande de bien-être", repetitions: 1,
    arabic: "اللهم إني أسألك العافية في الدنيا والآخرة" },
  { id: "hayyu-qayyum", title: "Ya Hayyu Ya Qayyum", repetitions: 1,
    arabic: "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين" },
  { id: "malikal-mulk", title: "Allahumma Malikal Mulk", repetitions: 1,
    arabic: "اللهم مالك الملك تؤتي الملك من تشاء وتنزع الملك ممن تشاء وتعز من تشاء وتذل من تشاء بيدك الخير إنك على كل شيء قدير. رحمن الدنيا والآخرة ورحيمهما، تعطيهما من تشاء وتمنع منهما من تشاء، ارحمني رحمة تغنيني بها عمن سواك." },
  { id: "khayr-kullihi", title: "Demande de tout le bien", repetitions: 1,
    arabic: "اللهم إني أسألك من الخير كله عاجله وآجله ما علمت منه وما لم أعلم. وأعوذ بك من الشر كله عاجله وآجله ما علمت منه وما لم أعلم. اللهم إني أسألك الجنة وما قرب إليها من قول أو عمل. وأعوذ بك من النار وما قرب إليها من قول أو عمل. وأسألك أن تجعل كل قضاء قضيته لي خيرًا." },
  { id: "tawakkul-1", title: "Tawakkul (1/5)", repetitions: 3,
    arabic: "بسم الله توكلت على الله ولا حول ولا قوة إلا بالله" },
  { id: "tawakkul-2", title: "Tawakkul (2/5)", repetitions: 3,
    arabic: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم" },
  { id: "tawakkul-3", title: "Tawakkul (3/5)", repetitions: 1,
    arabic: "اللهم ارزقني الزوجة الصالحة التي تعينني على أمري ديني ودنياي ومعاشي وعاقبة أمري" },
  { id: "tawakkul-4", title: "Tawakkul (4/5)", repetitions: 1,
    arabic: "اللهم إن كان رزقي في السماء فأنزله وإن كان في الأرض فأخرجه وإن كان قليلاً فكثره وإن كان كثيراً فبارك لي فيه وإن كان بعيداً فقربه وإن كان قريباً فيسره" },
  { id: "tawakkul-5", title: "Tawakkul (5/5)", repetitions: 1,
    arabic: "اللهم سخر لي ملائكة السماء وجنود الأرض واجعل أمري كله يسيراً وتوكلت عليك" },
  { id: "tahlil-100", title: "Tahlil", repetitions: 100, isCounter: true,
    arabic: "لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير" },
];

const ROUTINE_TASKS = [
  { id: "toilet", label: "Aller aux toilettes", icon: Droplet },
  { id: "brush", label: "Se brosser les dents", icon: Sparkles },
  { id: "wash", label: "Se laver le visage", icon: Bath },
  { id: "weigh", label: "Se peser", icon: Scale },
  { id: "water", label: "Boire un verre d'eau", icon: Droplet },
  { id: "bed", label: "Faire le lit", icon: Bed },
  { id: "sunnan", label: "Prier les sunnan si nécessaire", icon: Smile },
];

const QUOTES = [
  { text: "Et quiconque place sa confiance en Allah, Il lui suffit.", source: "Sourate At-Talaq, 65:3" },
  { text: "La meilleure des invocations est celle faite à l'aube.", source: "Tradition prophétique" },
  { text: "Celui qui emprunte un chemin cherchant la science, Allah lui facilite un chemin vers le Paradis.", source: "Hadith rapporté par Muslim" },
  { text: "Le cœur ne trouve le repos qu'en se rappelant d'Allah.", source: "Ibn Al-Qayyim" },
  { text: "La patience est une lumière qui n'a pas de fin.", source: "Ibn Taymiyyah" },
];

// One mood per adhkar screen — cycles through, transitions smoothly between screens.
// Deliberately saturated/lifted so the change is obvious against the dark base.
const ADHKAR_MOODS = [
  { from: "#1e5c40", accent: "#2fe08a" }, // emerald
  { from: "#6b4a14", accent: "#f0b64a" }, // amber dusk
  { from: "#134f6e", accent: "#4fc3e8" }, // dawn teal
  { from: "#5a2264", accent: "#d688f0" }, // soft plum
  { from: "#6e3208", accent: "#f2925a" }, // ember
  { from: "#1c6b3a", accent: "#6fe0a0" }, // moss
  { from: "#2b2470", accent: "#8f9bf5" }, // indigo
];
const moodFor = (i) => ADHKAR_MOODS[i % ADHKAR_MOODS.length];

/* ============================================================
   HELPERS
   ============================================================ */
const todayKey = () => new Date().toISOString().slice(0, 10);

const defaultDay = () => ({
  adhkarIndex: 0,
  adhkarRepCounts: {},
  adhkarCompleted: false,
  routineChecks: {},
  routineCompleted: false,
  weight: null,
  dailyGoal: "",
  reflection: null,
});

const defaultApp = () => ({
  streak: 0,
  lastCompletedDate: null,
  totalDaysCompleted: 0,
  weightHistory: [],
  settings: {
    language: "fr",
    notifTime: "05:30",
    notifications: true,
    strictMode: false,
    soundCounter: true,
    theme: "dark",
  },
  days: { [todayKey()]: defaultDay() },
});

const STORAGE_KEY = "morning-companion-data";

function vibrate(ms) {
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {}
}

function playTick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

function levelForDays(n) {
  if (n >= 365) return "Sâlih";
  if (n >= 100) return "Mouhsin";
  if (n >= 30) return "Constant";
  if (n >= 7) return "Régulier";
  return "Débutant";
}

const BADGES = [7, 30, 100, 365];

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */
const ProgressBar = ({ pct }) => (
  <div className="mc-progress-track" style={{ height: 6, width: "100%" }}>
    <div className="mc-progress-fill" style={{ height: "100%", width: `${pct}%` }} />
  </div>
);

const Toggle = ({ on, onChange }) => (
  <button
    onClick={() => onChange(!on)}
    className="mc-toggle"
    style={{
      width: 46, height: 26, borderRadius: 999, border: "none", cursor: "pointer",
      background: on ? "var(--emerald)" : "var(--track-strong)", position: "relative", padding: 0,
    }}
  >
    <div className="mc-toggle-knob" style={{
      width: 20, height: 20, borderRadius: "50%", background: "#fff",
      position: "absolute", top: 3, left: on ? 23 : 3,
    }} />
  </button>
);

const Confetti = () => {
  const pieces = Array.from({ length: 26 });
  const colors = ["var(--emerald)", "var(--gold)", "var(--text)"];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 50 }}>
      {pieces.map((_, i) => (
        <div key={i} className="mc-confetti-piece" style={{
          left: `${Math.random() * 100}%`, top: "-10px",
          width: 6, height: 10, background: colors[i % colors.length],
          animationDuration: `${1.8 + Math.random() * 1.4}s`,
          animationDelay: `${Math.random() * 0.4}s`,
          borderRadius: 2,
        }} />
      ))}
    </div>
  );
};

const OrbBackground = ({ variant = "home" }) => (
  <>
    <div className="mc-horizon" />
    <div className="mc-dawn-beam" style={variant === "splash" ? { opacity: 0.9 } : { opacity: 0.55 }} />
    <div className="mc-streaks" />
    <div className="mc-orb" style={{
      width: 260, height: 260, background: "var(--emerald)",
      top: variant === "splash" ? "20%" : "-6%", left: "-10%",
    }} />
    <div className="mc-orb" style={{
      width: 220, height: 220, background: "var(--gold)",
      top: variant === "splash" ? "45%" : "60%", right: "-8%",
      animationDelay: "2s",
    }} />
    <div className="mc-grain" />
  </>
);

const TopBar = ({ title, onBack, right }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 20px 10px",
  }}>
    <div style={{ width: 32 }}>
      {onBack && (
        <button onClick={onBack} className="mc-btn" style={{
          background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", padding: 6,
        }}>
          <ChevronLeft size={22} />
        </button>
      )}
    </div>
    <div style={{ fontSize: 13, letterSpacing: 1.5, color: "var(--text-dim)", textTransform: "uppercase" }}>{title}</div>
    <div style={{ width: 32, display: "flex", justifyContent: "flex-end" }}>{right}</div>
  </div>
);

/* ============================================================
   SCREENS
   ============================================================ */
const SplashScreen = () => (
  <div className="mc-root mc-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
    <OrbBackground variant="splash" />
    <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
      <div style={{
        width: 74, height: 74, borderRadius: "50%", margin: "0 auto 26px",
        background: "linear-gradient(135deg, var(--emerald-soft), var(--gold-soft))",
        border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center",
      }} className="mc-pulse-ring">
        <Moon size={30} color="var(--gold)" strokeWidth={1.5} />
      </div>
      <div className="mc-display" style={{ fontSize: 30, fontWeight: 500, letterSpacing: 0.5 }}>Morning Companion</div>
      <div style={{ marginTop: 10, fontSize: 14, color: "var(--text-dim)", letterSpacing: 0.5 }}>Begin your day with Allah.</div>
    </div>
  </div>
);

const HomeScreen = ({ app, day, onStart, onOpenDashboard, onOpenSettings, now }) => {
  const totalAdhkarSteps = ADHKAR.length;
  const adhkarPct = day.adhkarCompleted ? 100 : Math.round((day.adhkarIndex / totalAdhkarSteps) * 100);
  const overallDone = day.adhkarCompleted && day.routineCompleted;
  const overallPct = Math.round(((day.adhkarCompleted ? 1 : 0) + (day.routineCompleted ? 1 : 0)) / 2 * 100 * 0.5
    + adhkarPct * 0.5 * (day.adhkarCompleted ? 0 : 1) + (day.adhkarCompleted ? 50 : 0));
  const pct = day.adhkarCompleted && day.routineCompleted ? 100 : day.adhkarCompleted ? 55 : Math.round(adhkarPct * 0.5);

  const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const quote = QUOTES[now.getDate() % QUOTES.length];

  let cta = "Commencer";
  if (day.adhkarCompleted && !day.routineCompleted) cta = "Continuer la routine";
  if (overallDone) cta = "Voir le tableau de bord";

  return (
    <div className="mc-root mc-fade-in" style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <OrbBackground />
      <TopBar
        title=""
        right={
          <button onClick={onOpenSettings} className="mc-btn" style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}>
            <SettingsIcon size={20} />
          </button>
        }
      />
      <div style={{ position: "relative", zIndex: 1, padding: "10px 24px" }}>
        <div className="mc-arabic" style={{ fontSize: 26, color: "var(--gold)", marginBottom: 6, textAlign: "right" }}>
          السلام عليكم ورحمة الله وبركاته
        </div>
        <div className="mc-display" style={{ fontSize: 24, marginTop: 18, lineHeight: 1.3 }}>
          Aujourd'hui est une nouvelle occasion<br />de se rapprocher d'Allah.
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24, fontSize: 13, color: "var(--text-dim)" }}>
          <span style={{ textTransform: "capitalize" }}>{dateStr}</span>
          <span>·</span>
          <span>{timeStr}</span>
        </div>

        <div className="mc-card" style={{ marginTop: 28, borderRadius: 20, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Progression du jour</span>
            <span className="mc-display" style={{ fontSize: 20, color: "var(--emerald)" }}>{pct}%</span>
          </div>
          <ProgressBar pct={pct} />
          <div style={{ display: "flex", gap: 18, marginTop: 16, fontSize: 12, color: "var(--text-dim)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={13} color={day.adhkarCompleted ? "var(--emerald)" : "var(--text-faint)"} />
              Adhkar
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={13} color={day.routineCompleted ? "var(--emerald)" : "var(--text-faint)"} />
              Routine
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
};

const HOLD_DELAY = 320;
const HOLD_INTERVAL = 90;

const AdhkarScreen = ({ day, setDay, onDone, onExit, soundOn }) => {
  const idx = Math.min(day.adhkarIndex, ADHKAR.length - 1);
  const item = ADHKAR[idx];
  const count = day.adhkarRepCounts[item.id] || 0;
  const [burst, setBurst] = useState(false);
  const mood = moodFor(idx);

  const advancedRef = useRef(false);
  const liveCountRef = useRef(count);
  const holdTimeout = useRef(null);
  const holdInterval = useRef(null);

  useEffect(() => {
    liveCountRef.current = count;
    advancedRef.current = false;
  }, [count, item.id]);

  const clearHold = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    if (holdInterval.current) clearInterval(holdInterval.current);
    holdTimeout.current = null;
    holdInterval.current = null;
  };
  useEffect(() => clearHold, [idx]);

  const advance = useCallback(() => {
    clearHold();
    setBurst(true);
    setTimeout(() => setBurst(false), 400);
    setTimeout(() => {
      if (idx + 1 >= ADHKAR.length) {
        setDay(d => ({ ...d, adhkarCompleted: true }));
        onDone();
      } else {
        setDay(d => ({ ...d, adhkarIndex: idx + 1 }));
      }
    }, 380);
  }, [idx, setDay, onDone]);

  const increment = useCallback(() => {
    if (advancedRef.current) return;
    const newCount = liveCountRef.current + 1;
    liveCountRef.current = newCount;
    vibrate(item.isCounter ? 6 : 15);
    if (soundOn && item.isCounter) playTick();
    setDay(d => ({ ...d, adhkarRepCounts: { ...d.adhkarRepCounts, [item.id]: newCount } }));
    if (newCount >= item.repetitions) {
      advancedRef.current = true;
      advance();
    }
  }, [item, soundOn, setDay, advance]);

  const tap = () => increment();

  const startHold = () => {
    if (!item.isCounter) return;
    increment();
    holdTimeout.current = setTimeout(() => {
      holdInterval.current = setInterval(() => {
        if (advancedRef.current) { clearHold(); return; }
        increment();
      }, HOLD_INTERVAL);
    }, HOLD_DELAY);
  };

  const pct = Math.round(((idx) / ADHKAR.length) * 100 + (count / item.repetitions) * (100 / ADHKAR.length));

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `linear-gradient(155deg, ${mood.from} 0%, var(--bg) 78%)`,
        transition: "background 0.9s ease",
      }} />
      <div style={{
        position: "absolute", top: "-10%", right: "-15%", width: 320, height: 320, borderRadius: "50%",
        background: mood.accent, opacity: 0.35, filter: "blur(90px)", zIndex: 0,
        transition: "background 0.9s ease",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "-15%", width: 260, height: 260, borderRadius: "50%",
        background: mood.from, opacity: 0.5, filter: "blur(80px)", zIndex: 0,
        transition: "background 0.9s ease",
      }} />
      <div className="mc-root" style={{ minHeight: "100vh", position: "relative", zIndex: 1, background: "transparent" }}>
        <TopBar title={`${idx + 1} / ${ADHKAR.length}`} onBack={onExit} />
        <div style={{ padding: "0 20px" }}>
          <ProgressBar pct={pct} />
        </div>
        <div key={item.id} className="mc-fade-in" style={{
          padding: "40px 22px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "70vh", justifyContent: "center",
        }}>
          <div style={{ fontSize: 12, letterSpacing: 1.2, color: "var(--gold)", textTransform: "uppercase", marginBottom: 14 }}>
            {item.title}
          </div>

          <div className="mc-card" style={{
            borderRadius: 22, padding: 28, width: "100%", maxWidth: 420,
          }}>
            <div className="mc-arabic" style={{ fontSize: item.isCounter ? 22 : 24, lineHeight: 2, textAlign: "center", color: "var(--text)" }}>
              {item.arabic}
            </div>
          </div>

          {item.isCounter ? (
            <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button
                onPointerDown={startHold}
                onPointerUp={clearHold}
                onPointerLeave={clearHold}
                onPointerCancel={clearHold}
                className="mc-scale-tap mc-btn"
                style={{
                  width: 148, height: 148, borderRadius: "50%", border: "2px solid var(--emerald-line)",
                  background: "var(--emerald-soft)", cursor: "pointer", position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center", transform: burst ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.25s ease", touchAction: "none",
                }}>
                <div className="mc-display" style={{ fontSize: 30, color: "var(--emerald)" }}>{count}<span style={{ fontSize: 16, color: "var(--text-dim)" }}> /100</span></div>
              </button>
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--text-faint)", textAlign: "center" }}>
                Touche pour compter · maintiens appuyé pour compter en continu
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginTop: 22, display: "flex", gap: 8 }}>
                {Array.from({ length: item.repetitions }).map((_, i) => (
                  <div key={i} style={{
                    width: 9, height: 9, borderRadius: "50%",
                    background: i < count ? "var(--emerald)" : "var(--track-strong)",
                    transition: "background 0.3s ease",
                  }} />
                ))}
              </div>
              <button onClick={tap} className="mc-btn mc-scale-tap" style={{
                marginTop: 28, padding: "16px 34px", borderRadius: 16, border: "none",
                background: burst ? "var(--emerald)" : "var(--emerald-soft)",
                color: burst ? "#fff" : "var(--emerald)",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Check size={17} /> J'ai récité {item.repetitions > 1 ? `(${count}/${item.repetitions})` : ""}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AdhkarCompleteScreen = ({ onContinue }) => (
  <div className="mc-root mc-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
    <Confetti />
    <OrbBackground />
    <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 30 }}>
      <div className="mc-arabic" style={{ fontSize: 30, color: "var(--gold)", marginBottom: 16 }}>الحمد لله</div>
      <div className="mc-display" style={{ fontSize: 22, lineHeight: 1.5 }}>
        Tes adhkar du matin sont terminés.
      </div>
      <div style={{ marginTop: 10, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 300 }}>
        Qu'Allah accepte tes invocations et mette la baraka dans ta journée.
      </div>
      <button onClick={onContinue} className="mc-btn mc-scale-tap" style={{
        marginTop: 34, padding: "16px 36px", borderRadius: 16, border: "none",
        background: "linear-gradient(135deg, var(--emerald), #0f7a37)", color: "#fff",
        fontSize: 15, fontWeight: 600, cursor: "pointer",
      }}>
        Continuer vers la routine
      </button>
    </div>
  </div>
);

const RoutineScreen = ({ day, setDay, onDone, onExit }) => {
  const checks = day.routineChecks;
  const allDone = ROUTINE_TASKS.every(t => checks[t.id]);
  const doneCount = ROUTINE_TASKS.filter(t => checks[t.id]).length;

  const toggle = (id) => {
    vibrate(12);
    setDay(d => ({ ...d, routineChecks: { ...d.routineChecks, [id]: !d.routineChecks[id] } }));
  };

  return (
    <div className="mc-root mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Routine matinale" onBack={onExit} />
      <div style={{ padding: "0 20px" }}><ProgressBar pct={(doneCount / ROUTINE_TASKS.length) * 100} /></div>
      <div style={{ padding: "26px 20px" }}>
        <div className="mc-display" style={{ fontSize: 20, marginBottom: 20 }}>Ta checklist du matin</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ROUTINE_TASKS.map(t => {
            const Icon = t.icon;
            const done = !!checks[t.id];
            return (
              <button key={t.id} onClick={() => toggle(t.id)} className="mc-check-row mc-btn" style={{
                display: "flex", alignItems: "center", gap: 14, padding: "16px 16px", borderRadius: 16,
                border: `1px solid ${done ? "var(--emerald-line)" : "var(--border)"}`,
                background: done ? "var(--emerald-soft)" : "var(--card)",
                cursor: "pointer", textAlign: "left", width: "100%",
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 8, flexShrink: 0,
                  border: `1.5px solid ${done ? "var(--emerald)" : "var(--text-faint)"}`,
                  background: done ? "var(--emerald)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {done && <Check size={15} color="#fff" />}
                </div>
                <Icon size={17} color={done ? "var(--emerald)" : "var(--text-dim)"} />
                <span style={{ fontSize: 14, color: done ? "var(--text)" : "var(--text-dim)", textDecoration: done ? "none" : "none" }}>{t.label}</span>
              </button>
            );
          })}
        </div>
        <button disabled={!allDone} onClick={onDone} className="mc-btn mc-scale-tap" style={{
          marginTop: 26, width: "100%", padding: "17px", borderRadius: 16, border: "none",
          background: allDone ? "linear-gradient(135deg, var(--emerald), #0f7a37)" : "var(--track)",
          color: allDone ? "#fff" : "var(--text-faint)",
          fontSize: 15, fontWeight: 600, cursor: allDone ? "pointer" : "not-allowed",
        }}>
          Terminer la routine
        </button>
      </div>
    </div>
  );
};

const WeightScreen = ({ app, day, setDay, onNext, onExit }) => {
  const [value, setValue] = useState(day.weight || "");
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
    <div className="mc-root mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Suivi du poids" onBack={onExit} />
      <div style={{ padding: "20px 22px" }}>
        <div className="mc-display" style={{ fontSize: 20, marginBottom: 6 }}>Quel est ton poids aujourd'hui ?</div>
        <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 20 }}>En kilogrammes</div>
        <div className="mc-card" style={{ borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <input
            type="number" step="0.1" inputMode="decimal" placeholder="105.6"
            value={value} onChange={e => setValue(e.target.value)}
            style={{
              background: "transparent", border: "none", outline: "none", color: "var(--text)",
              fontSize: 28, width: "100%", fontFamily: "'Fraunces', serif",
            }}
          />
          <span style={{ color: "var(--text-dim)", fontSize: 14 }}>kg</span>
        </div>

        {chartData.length > 1 && (
          <div className="mc-card" style={{ marginTop: 20, borderRadius: 16, padding: "16px 8px 4px" }}>
            <div style={{ fontSize: 12, color: "var(--text-dim)", padding: "0 14px 10px" }}>Historique (14 derniers jours)</div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="var(--track)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-faint)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-faint)" fontSize={10} tickLine={false} axisLine={false} domain={["auto", "auto"]} width={30} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--text)" }} />
                <Line type="monotone" dataKey="weight" stroke="#C8A75D" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {totalLoss !== null && (
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <div className="mc-card" style={{ flex: 1, borderRadius: 14, padding: 14, textAlign: "center" }}>
              <TrendingDown size={16} color="var(--emerald)" style={{ margin: "0 auto 4px" }} />
              <div className="mc-display" style={{ fontSize: 17 }}>{totalLoss} kg</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Perte totale</div>
            </div>
          </div>
        )}

        <button onClick={save} className="mc-btn mc-scale-tap" style={{
          marginTop: 24, width: "100%", padding: "16px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, var(--emerald), #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Enregistrer
        </button>
      </div>
    </div>
  );
};

const GoalScreen = ({ day, setDay, onNext, onExit }) => {
  const [value, setValue] = useState(day.dailyGoal || "");
  return (
    <div className="mc-root mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Objectif du jour" onBack={onExit} />
      <div style={{ padding: "20px 22px" }}>
        <div className="mc-display" style={{ fontSize: 20, marginBottom: 6 }}>Quel est ton objectif principal aujourd'hui ?</div>
        <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 20 }}>Une seule chose, claire et concrète.</div>
        <textarea
          value={value} onChange={e => setValue(e.target.value)}
          placeholder="Finir le site Laureate."
          rows={3}
          className="mc-card"
          style={{
            width: "100%", borderRadius: 16, padding: 16, color: "var(--text)", fontSize: 15,
            outline: "none", resize: "none", fontFamily: "inherit",
          }}
        />
        <button onClick={() => { setDay(d => ({ ...d, dailyGoal: value })); onNext(); }} className="mc-btn mc-scale-tap" style={{
          marginTop: 20, width: "100%", padding: "16px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, var(--emerald), #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Enregistrer et terminer
        </button>
      </div>
    </div>
  );
};

const RoutineDoneScreen = ({ onContinue }) => (
  <div className="mc-root mc-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
    <Confetti />
    <OrbBackground />
    <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 30 }}>
      <Sun size={36} color="var(--gold)" style={{ marginBottom: 16 }} />
      <div className="mc-display" style={{ fontSize: 22 }}>Morning routine completed.</div>
      <div style={{ marginTop: 8, fontSize: 14, color: "var(--text-dim)" }}>Have a blessed day.</div>
      <button onClick={onContinue} className="mc-btn mc-scale-tap" style={{
        marginTop: 30, padding: "15px 32px", borderRadius: 16, border: "1px solid var(--border)",
        background: "transparent", color: "var(--text)", fontSize: 14, cursor: "pointer",
      }}>
        Retour à l'accueil
      </button>
    </div>
  </div>
);

const ReflectionScreen = ({ day, setDay, onExit }) => {
  const [rating, setRating] = useState(day.reflection?.rating || 0);
  const [achieved, setAchieved] = useState(day.reflection?.achieved ?? null);
  const [note, setNote] = useState(day.reflection?.note || "");

  const save = () => {
    setDay(d => ({ ...d, reflection: { rating, achieved, note } }));
    onExit();
  };

  return (
    <div className="mc-root mc-fade-in" style={{ minHeight: "100vh" }}>
      <TopBar title="Bilan du jour" onBack={onExit} />
      <div style={{ padding: "20px 22px" }}>
        <div className="mc-display" style={{ fontSize: 19, marginBottom: 14 }}>Comment s'est passée ta journée ?</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 26 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setRating(n)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <Star size={30} fill={n <= rating ? "var(--gold)" : "none"} color="var(--gold)" strokeWidth={1.5} />
            </button>
          ))}
        </div>

        {day.dailyGoal && (
          <>
            <div className="mc-display" style={{ fontSize: 19, marginBottom: 12 }}>As-tu accompli ton objectif ?</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 12 }}>« {day.dailyGoal} »</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button onClick={() => setAchieved(true)} className="mc-btn" style={{
                flex: 1, padding: 14, borderRadius: 14, cursor: "pointer",
                border: `1px solid ${achieved === true ? "var(--emerald-line)" : "var(--border)"}`,
                background: achieved === true ? "var(--emerald-soft)" : "var(--card)", color: "var(--text)",
              }}>Oui</button>
              <button onClick={() => setAchieved(false)} className="mc-btn" style={{
                flex: 1, padding: 14, borderRadius: 14, cursor: "pointer",
                border: `1px solid ${achieved === false ? "rgba(200,120,93,0.4)" : "var(--border)"}`,
                background: achieved === false ? "rgba(200,80,60,0.12)" : "var(--card)", color: "var(--text)",
              }}>Non</button>
            </div>
          </>
        )}

        {achieved === false && (
          <textarea
            value={note} onChange={e => setNote(e.target.value)}
            placeholder="Pourquoi ?"
            rows={3}
            className="mc-card"
            style={{ width: "100%", borderRadius: 14, padding: 14, color: "var(--text)", outline: "none", resize: "none", fontFamily: "inherit", fontSize: 14, marginBottom: 20 }}
          />
        )}

        <button onClick={save} className="mc-btn mc-scale-tap" style={{
          width: "100%", padding: "16px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, var(--emerald), #0f7a37)", color: "#fff",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Enregistrer le bilan
        </button>
      </div>
    </div>
  );
};

const DashboardScreen = ({ app, onExit, onReflection }) => {
  const level = levelForDays(app.totalDaysCompleted);
  const history = app.weightHistory;
  const last = history[history.length - 1];
  const first = history[0];
  const totalLoss = first && last ? (first.weight - last.weight).toFixed(1) : "—";
  const chartData = history.slice(-30).map(h => ({ date: h.date.slice(5), weight: h.weight }));

  return (
    <div className="mc-root mc-fade-in" style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <TopBar title="Tableau de bord" onBack={onExit} />
      <div style={{ padding: "6px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Flame size={18} color="var(--gold)" />
            <div className="mc-display" style={{ fontSize: 24, marginTop: 8 }}>{app.streak}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours de série</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <ShieldCheck size={18} color="var(--emerald)" />
            <div className="mc-display" style={{ fontSize: 24, marginTop: 8 }}>{app.totalDaysCompleted}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>jours accomplis</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <TrendingDown size={18} color="var(--gold)" />
            <div className="mc-display" style={{ fontSize: 24, marginTop: 8 }}>{totalLoss}{totalLoss !== "—" ? " kg" : ""}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>poids perdu</div>
          </div>
          <div className="mc-card" style={{ borderRadius: 16, padding: 18 }}>
            <Award size={18} color="var(--emerald)" />
            <div className="mc-display" style={{ fontSize: 17, marginTop: 8 }}>{level}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>niveau actuel</div>
          </div>
        </div>

        <div style={{ marginTop: 22, fontSize: 13, color: "var(--text-dim)", marginBottom: 10 }}>Badges</div>
        <div style={{ display: "flex", gap: 10 }}>
          {BADGES.map(b => {
            const unlocked = app.totalDaysCompleted >= b;
            return (
              <div key={b} className="mc-card" style={{
                flex: 1, borderRadius: 14, padding: "14px 6px", textAlign: "center",
                opacity: unlocked ? 1 : 0.35,
              }}>
                <Award size={16} color={unlocked ? "var(--gold)" : "var(--text-faint)"} style={{ margin: "0 auto 6px" }} />
                <div style={{ fontSize: 12 }}>{b}j</div>
              </div>
            );
          })}
        </div>

        {chartData.length > 1 && (
          <div className="mc-card" style={{ marginTop: 22, borderRadius: 16, padding: "16px 8px 4px" }}>
            <div style={{ fontSize: 12, color: "var(--text-dim)", padding: "0 14px 10px" }}>Poids (30 derniers jours)</div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="var(--track)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-faint)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-faint)" fontSize={10} tickLine={false} axisLine={false} domain={["auto", "auto"]} width={30} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--text)" }} />
                <Line type="monotone" dataKey="weight" stroke="#C8A75D" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <button onClick={onReflection} className="mc-btn mc-scale-tap" style={{
          marginTop: 22, width: "100%", padding: "15px", borderRadius: 16, border: "1px solid var(--border)",
          background: "var(--card)", color: "var(--text)", fontSize: 14, cursor: "pointer",
        }}>
          Faire le bilan du jour
        </button>
      </div>
    </div>
  );
};

const SettingsScreen = ({ app, setApp, onExit, onResetTodayAdhkar }) => {
  const s = app.settings;
  const [confirmReset, setConfirmReset] = useState(false);
  const upd = (patch) => setApp(a => ({ ...a, settings: { ...a.settings, ...patch } }));

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
    <div className="mc-root mc-fade-in" style={{ minHeight: "100vh" }}>
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
              <div style={{ fontSize: 14 }}>Notifications</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>30 min après Fajr</div>
            </div>
          </div>
          <Toggle on={s.notifications} onChange={v => upd({ notifications: v })} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Clock size={17} color="var(--text-dim)" />
            <div style={{ fontSize: 14 }}>Heure de rappel</div>
          </div>
          <input type="time" value={s.notifTime} onChange={e => upd({ notifTime: e.target.value })}
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", padding: "6px 8px", fontSize: 13 }} />
        </div>

        <div className="mc-card" style={{ borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ShieldCheck size={17} color="var(--emerald)" />
            <div>
              <div style={{ fontSize: 14 }}>Mode strict</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>Bloque l'app tant que la routine n'est pas finie</div>
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
              <button key={l.id} onClick={() => upd({ language: l.id })} className="mc-btn" style={{
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
              {confirmReset ? "Touche à nouveau pour confirmer" : "Ne touche pas à la routine, au poids ni à l'objectif"}
            </div>
          </div>
        </button>

        <div style={{ fontSize: 11, color: "var(--text-faint)", padding: "16px 4px", lineHeight: 1.6 }}>
          Mode hors ligne · toutes les données restent sur cet appareil.
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ROOT APP
   ============================================================ */
export default function MorningCompanionApp() {
  const [booted, setBooted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [app, setApp] = useState(defaultApp());
  const [screen, setScreen] = useState("home");
  const [now, setNow] = useState(new Date());
  const saveTimer = useRef(null);

  // load persisted state
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          if (!parsed.days[todayKey()]) parsed.days[todayKey()] = defaultDay();
          setApp({ ...defaultApp(), ...parsed });
        }
      } catch (e) {
        // no existing data yet — defaults are fine
      } finally {
        setBooted(true);
      }
    })();
    const t = setTimeout(() => setShowSplash(false), 2000);
    const clock = setInterval(() => setNow(new Date()), 30000);
    return () => { clearTimeout(t); clearInterval(clock); };
  }, []);

  // debounced save
  useEffect(() => {
    if (!booted) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try { await window.storage.set(STORAGE_KEY, JSON.stringify(app), false); } catch (e) {}
    }, 400);
    return () => clearTimeout(saveTimer.current);
  }, [app, booted]);

  const day = app.days[todayKey()] || defaultDay();
  const setDay = (updater) => {
    setApp(a => {
      const key = todayKey();
      const current = a.days[key] || defaultDay();
      const next = typeof updater === "function" ? updater(current) : updater;
      return { ...a, days: { ...a.days, [key]: next } };
    });
  };

  const finalizeDayIfDone = () => {
    setApp(a => {
      const key = todayKey();
      const d = a.days[key];
      if (!d.adhkarCompleted || !d.routineCompleted) return a;
      if (a.lastCompletedDate === key) return a;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = a.lastCompletedDate === yesterday ? a.streak + 1 : 1;
      const weightHistory = d.weight
        ? [...a.weightHistory.filter(w => w.date !== key), { date: key, weight: d.weight }].sort((x, y) => x.date.localeCompare(y.date))
        : a.weightHistory;
      return {
        ...a,
        streak: newStreak,
        lastCompletedDate: key,
        totalDaysCompleted: a.totalDaysCompleted + 1,
        weightHistory,
      };
    });
  };

  const resetTodayAdhkar = () => {
    setDay(d => ({ ...d, adhkarIndex: 0, adhkarRepCounts: {}, adhkarCompleted: false }));
  };

  const handleStart = () => {
    if (!day.adhkarCompleted) setScreen("adhkar");
    else if (!day.routineCompleted) setScreen("routine");
    else setScreen("dashboard");
  };

  if (showSplash) return <div data-theme={app.settings.theme}><GlobalStyle /><SplashScreen /></div>;

  let content;
  if (screen === "home") {
    content = <HomeScreen app={app} day={day} now={now} onStart={handleStart}
      onOpenDashboard={() => setScreen("dashboard")} onOpenSettings={() => setScreen("settings")} />;
  } else if (screen === "adhkar") {
    content = <AdhkarScreen day={day} setDay={setDay} soundOn={app.settings.soundCounter}
      onDone={() => setScreen("adhkarComplete")} onExit={() => setScreen("home")} />;
  } else if (screen === "adhkarComplete") {
    content = <AdhkarCompleteScreen onContinue={() => setScreen("routine")} />;
  } else if (screen === "routine") {
    content = <RoutineScreen day={day} setDay={setDay} onExit={() => setScreen("home")}
      onDone={() => { setDay(d => ({ ...d, routineCompleted: true })); setScreen("weight"); }} />;
  } else if (screen === "weight") {
    content = <WeightScreen app={app} day={day} setDay={setDay} onExit={() => setScreen("home")}
      onNext={() => setScreen("goal")} />;
  } else if (screen === "goal") {
    content = <GoalScreen day={day} setDay={setDay} onExit={() => setScreen("home")}
      onNext={() => { finalizeDayIfDone(); setScreen("routineDone"); }} />;
  } else if (screen === "routineDone") {
    content = <RoutineDoneScreen onContinue={() => setScreen("home")} />;
  } else if (screen === "dashboard") {
    content = <DashboardScreen app={app} onExit={() => setScreen("home")} onReflection={() => setScreen("reflection")} />;
  } else if (screen === "reflection") {
    content = <ReflectionScreen day={day} setDay={setDay} onExit={() => setScreen("dashboard")} />;
  } else if (screen === "settings") {
    content = <SettingsScreen app={app} setApp={setApp} onExit={() => setScreen("home")} onResetTodayAdhkar={resetTodayAdhkar} />;
  }

  return <div data-theme={app.settings.theme}><GlobalStyle />{content}</div>;
}
