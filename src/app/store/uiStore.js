import { create } from "zustand";
import { loadJSON, saveJSON } from "../../lib/storage";

const STORAGE_KEY = "raw-wave-ui";
const themes = ["mono", "warning", "acid", "concrete", "inverted"];

const saved = loadJSON(STORAGE_KEY, {
  theme: "mono",
});

function persist(state) {
  saveJSON(STORAGE_KEY, {
    theme: state.theme,
  });
}

export const useUIStore = create((set) => ({
  isQueueOpen: false,
  isNowPlayingOpen: false,
  theme: saved.theme ?? "mono",
  themes,

  toggleQueue: () => set((state) => ({ isQueueOpen: !state.isQueueOpen })),

  closeQueue: () => set({ isQueueOpen: false }),

  toggleNowPlaying: () =>
    set((state) => ({ isNowPlayingOpen: !state.isNowPlayingOpen })),

  closeNowPlaying: () => set({ isNowPlayingOpen: false }),

  setTheme: (theme) =>
    set((state) => {
      const nextState = { ...state, theme };
      persist(nextState);
      return { theme };
    }),
}));
