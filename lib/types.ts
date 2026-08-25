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
export const LEVEL_THRESHOLDS = [0, 3, 7, 15, 30, 60, 90, 120, 180, 240, 300];
export const LEVEL_NAMES = [
  "Débutant",     // 0
  "En chemin",    // 1
  "Marcheur",     // 2
  "Régulier",     // 3
  "Constant",     // 4
  "Persévérant",  // 5
  "Assidu",       // 6
  "Dévoué",       // 7
  "Mouhsin",      // 8
  "Muttaqi",      // 9
  "Sâlih",        // 10
];
export const LEVEL_DESCRIPTIONS = [
  "Tu commences ton chemin. Chaque adhkar compte.",
  "Tu as pris la décision de changer. Continue.",
  "La régularité commence à se former.",
  "Tu as trouvé un rythme. Ne le brise pas.",
  "Tes jours sont structurés autour du rappel d'Allah.",
  "La persévérance est ta marque. Continue.",
  "L'assidu est aimé d'Allah. Tu en fais partie.",
  "Tu t'es donné à la pratique. Allah le voit.",
  "Celui qui fait le bien constamment — tu y es.",
  "Garde-toi en alerte. Les grands peuvent chuter.",
  "الصالح — parmi ceux dont Allah est satisfait.",
];

export function levelForStreak(streak: number): number {
  let l = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (streak >= LEVEL_THRESHOLDS[i]) l = i;
  }
  return l;
}

export function isDayComplete(day: DayData): boolean {
  const prayedCount = Object.values(day.prayers).filter(p => p !== "none").length;
  return day.adhkarCompleted && prayedCount >= 3;
}
