export type PrayerState = "none" | "home" | "mosque";

export type DayData = {
  adhkarIndex: number;
  adhkarRepCounts: Record<string, number>;
  adhkarCompleted: boolean;
  eveningAdhkarIndex: number;
  eveningAdhkarRepCounts: Record<string, number>;
  eveningAdhkarCompleted: boolean;
  qiyamAdhkarIndex: number;
  qiyamAdhkarRepCounts: Record<string, number>;
  qiyamAdhkarCompleted: boolean;
  iftarAdhkarIndex: number;
  iftarAdhkarRepCounts: Record<string, number>;
  iftarAdhkarCompleted: boolean;
  travelAdhkarIndex: number;
  travelAdhkarRepCounts: Record<string, number>;
  travelAdhkarCompleted: boolean;
  prayers: { fajr: PrayerState; dhuhr: PrayerState; asr: PrayerState; maghrib: PrayerState; isha: PrayerState };
  routineChecks: Record<string, boolean>;
  routineCompleted: boolean;
  dailyGoal: string;
  reflection: { rating: number; achieved: boolean | null; note: string } | null;
};

export type Settings = {
  language: "fr" | "en" | "ar";
  userName: string;
  notifWindowStart: string;
  notifWindowEnd: string;
  timeZone: string;
  notifications: boolean;
  pushEnabled: boolean;
  strictMode: boolean;
  soundCounter: boolean;
  theme: "dark" | "light";
};

export type AppData = {
  streak: number;
  lastCompletedDate: string | null;
  totalDaysCompleted: number;
  level: number;           // 0-10
  lastLevelDate: string | null;
  settings: Settings;
  days: Record<string, DayData>;
};

export const todayKey = () => new Date().toISOString().slice(0, 10);

const defaultPrayers = () => ({
  fajr: "none" as PrayerState, dhuhr: "none" as PrayerState,
  asr: "none" as PrayerState, maghrib: "none" as PrayerState, isha: "none" as PrayerState,
});

export const defaultDay = (): DayData => ({
  adhkarIndex: 0, adhkarRepCounts: {}, adhkarCompleted: false,
  eveningAdhkarIndex: 0, eveningAdhkarRepCounts: {}, eveningAdhkarCompleted: false,
  qiyamAdhkarIndex: 0, qiyamAdhkarRepCounts: {}, qiyamAdhkarCompleted: false,
  iftarAdhkarIndex: 0, iftarAdhkarRepCounts: {}, iftarAdhkarCompleted: false,
  travelAdhkarIndex: 0, travelAdhkarRepCounts: {}, travelAdhkarCompleted: false,
  prayers: defaultPrayers(),
  routineChecks: {}, routineCompleted: false,
  dailyGoal: "", reflection: null,
});

export const resetAdhkarOnly = (day: DayData): DayData => ({
  ...day, adhkarIndex: 0, adhkarRepCounts: {}, adhkarCompleted: false,
});

export const defaultApp = (): AppData => ({
  streak: 0,
  lastCompletedDate: null,
  totalDaysCompleted: 0,
  level: 0,
  lastLevelDate: null,
  settings: {
    language: "fr", userName: "",
    notifWindowStart: "05:00", notifWindowEnd: "06:30",
    timeZone: "", notifications: true, pushEnabled: false,
    strictMode: false, soundCounter: true, theme: "dark",
  },
  days: { [todayKey()]: defaultDay() },
});

/** LEVEL SYSTEM
 * Based on adhkar streak + daily prayer completeness.
 * A "complete" day = adhkar done + at least 3 of 5 prayers prayed.
 * Each complete day: +1 point. Miss = −1 point. ≥3 consecutive misses = reset to 0.
 */
export type Level = {
  number: number;
  emoji: string;
  name: string;
  arabic: string;
  color: string;          // hex for the badge/ring
  bg: string;             // subtle background
  threshold: number;      // streak days required
  description: string;
  rule: string;           // how to maintain it
};

export const LEVELS: Level[] = [
  { number: 0,  emoji: "⬜", name: "Mubtadi'",  arabic: "مبتدئ",   color: "#6b7280", bg: "rgba(107,114,128,0.12)", threshold: 0,   description: "Tu commences ton chemin. Chaque adhkar et chaque prière comptent.", rule: "Commence aujourd'hui." },
  { number: 1,  emoji: "🤍", name: "Talib",     arabic: "طالب",    color: "#9ca3af", bg: "rgba(156,163,175,0.12)", threshold: 3,   description: "Tu as pris la décision de changer. Le chercheur sincère est déjà sur la voie.", rule: "3 jours de suite." },
  { number: 2,  emoji: "🟤", name: "Mureed",    arabic: "مُريد",   color: "#92400e", bg: "rgba(146,64,14,0.12)",  threshold: 7,   description: "L'aspirant veut Allah par-dessus tout. Continue à forger ta volonté.", rule: "7 jours consécutifs." },
  { number: 3,  emoji: "🟠", name: "Salik",     arabic: "سالك",    color: "#f97316", bg: "rgba(249,115,22,0.12)", threshold: 15,  description: "Le marcheur spirituel est sur le chemin. Il avance même quand c'est difficile.", rule: "15 jours de suite." },
  { number: 4,  emoji: "🟡", name: "Munib",     arabic: "مُنيب",   color: "#eab308", bg: "rgba(234,179,8,0.12)",  threshold: 30,  description: "Celui qui revient sans cesse à Allah. Un mois accompli — ta régularité se voit.", rule: "30 jours consécutifs." },
  { number: 5,  emoji: "💚", name: "Qaim",      arabic: "قائم",    color: "#22c55e", bg: "rgba(34,197,94,0.12)",  threshold: 60,  description: "Debout pour Allah — matin et soir. La discipline est devenue une seconde nature.", rule: "60 jours de suite." },
  { number: 6,  emoji: "🔵", name: "Muhtasib",  arabic: "مُحتسب", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", threshold: 90,  description: "Celui qui s'évalue et agit pour Allah seul. Trois mois de constance.", rule: "90 jours consécutifs." },
  { number: 7,  emoji: "💙", name: "Khashi'",   arabic: "خاشع",   color: "#0ea5e9", bg: "rgba(14,165,233,0.12)", threshold: 120, description: "L'humble dont le cœur est présent à chaque prière. Une rareté précieuse.", rule: "120 jours de suite." },
  { number: 8,  emoji: "💜", name: "Mouhsin",   arabic: "مُحسن",  color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", threshold: 180, description: "Celui qui fait le bien comme s'il voyait Allah. Six mois d'excellence.", rule: "180 jours consécutifs." },
  { number: 9,  emoji: "❤️", name: "Muttaqi",   arabic: "مُتقي",  color: "#ef4444", bg: "rgba(239,68,68,0.12)",  threshold: 240, description: "Le croyant qui craint Allah en public et en privé. Presque un an.", rule: "240 jours de suite." },
  { number: 10, emoji: "⭐", name: "Sâlih",     arabic: "صالح",    color: "#f59e0b", bg: "rgba(245,158,11,0.15)", threshold: 300, description: "Parmi ceux dont Allah est satisfait. 300 jours de constance — que rien ne l'interrompe.", rule: "300 jours consécutifs." },
];

// Backward compat helpers
export const LEVEL_THRESHOLDS = LEVELS.map(l => l.threshold);
export const LEVEL_NAMES = LEVELS.map(l => l.name);
export const LEVEL_DESCRIPTIONS = LEVELS.map(l => l.description);

export function levelForStreak(streak: number): number {
  let l = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (streak >= LEVELS[i].threshold) l = i;
  }
  return l;
}

export function isDayComplete(day: DayData): boolean {
  const prayedCount = Object.values(day.prayers ?? {}).filter(p => p !== "none").length;
  return day.adhkarCompleted && prayedCount >= 3;
}
