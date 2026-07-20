"use client";
import { get, set } from "idb-keyval";
import { AppData, defaultApp, defaultDay, todayKey } from "./types";

const KEY = "morning-companion-data";

export async function loadAppData(): Promise<AppData> {
  try {
    const stored = await get(KEY);
    if (stored) {
      const parsed: AppData = typeof stored === "string" ? JSON.parse(stored) : stored;
      if (!parsed.days[todayKey()]) parsed.days[todayKey()] = defaultDay();
      return { ...defaultApp(), ...parsed };
    }
  } catch (e) {
    // fresh install, or IndexedDB unavailable (private browsing) — fall back to defaults
  }
  return defaultApp();
}

export async function saveAppData(data: AppData): Promise<void> {
  try {
    await set(KEY, JSON.stringify(data));
  } catch (e) {
    // best-effort only — the in-memory state still works for this session
  }
}

export function vibrate(ms: number) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(ms);
  } catch (e) {}
}

export function playTick() {
  try {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
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
