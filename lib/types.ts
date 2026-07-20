export type DayData = {
  adhkarIndex: number;
  adhkarRepCounts: Record<string, number>;
  adhkarCompleted: boolean;
  routineChecks: Record<string, boolean>;
  routineCompleted: boolean;
  weight: number | null;
  dailyGoal: string;
  reflection: { rating: number; achieved: boolean | null; note: string } | null;
};

export type Settings = {
  language: "fr" | "en" | "ar";
  notifTime: string;
  notifications: boolean;
  strictMode: boolean;
  soundCounter: boolean;
};

export type AppData = {
  streak: number;
  lastCompletedDate: string | null;
  totalDaysCompleted: number;
  weightHistory: { date: string; weight: number }[];
  settings: Settings;
  days: Record<string, DayData>;
};

export const todayKey = () => new Date().toISOString().slice(0, 10);

export const defaultDay = (): DayData => ({
  adhkarIndex: 0,
  adhkarRepCounts: {},
  adhkarCompleted: false,
  routineChecks: {},
  routineCompleted: false,
  weight: null,
  dailyGoal: "",
  reflection: null,
});

export const defaultApp = (): AppData => ({
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
  },
  days: { [todayKey()]: defaultDay() },
});
