import { create } from "zustand";
import { Howl } from "howler";
import { useLibraryStore } from "./libraryStore";

function stopSound(sound) {
  if (!sound) return;
  sound.stop();
  sound.unload();
}

export const usePlayerStore = create((set, get) => ({
  queue: [],
  currentTrackId: null,
  currentSound: null,
  isPlaying: false,
  volume: 70,
  currentTime: 0,
  duration: 0,

  setVolume: (volume) => {
    const sound = get().currentSound;

    if (sound) {
      sound.volume(volume / 100);
    }

    set({ volume });
  },

  setQueue: (queue, startTrackId = null) => {
    const trackId = startTrackId ?? queue[0]?.id ?? null;

    set({
      queue,
      currentTrackId: trackId,
    });
  },

  playTrack: (track, queue = null) => {
    const state = get();
    const nextQueue = queue ?? state.queue;
    const existingSound = state.currentSound;

    stopSound(existingSound);

    const sound = new Howl({
      src: [track.audioSrc],
      html5: true,
      volume: state.volume / 100,
      onplay: () => {
        set({
          isPlaying: true,
          duration: sound.duration() || 0,
        });
      },
      onpause: () => {
        set({ isPlaying: false });
      },
      onstop: () => {
        set({ isPlaying: false, currentTime: 0 });
      },
      onend: () => {
        get().playNext();
      },
      onload: () => {
        set({ duration: sound.duration() || 0 });
      },
    });

    sound.play();

    useLibraryStore.getState().pushRecentTrack(track.id);

    set({
      queue: nextQueue,
      currentTrackId: track.id,
      currentSound: sound,
      isPlaying: true,
      currentTime: 0,
    });
  },

  togglePlay: () => {
    const { currentSound, isPlaying } = get();

    if (!currentSound) return;

    if (isPlaying) {
      currentSound.pause();
      set({ isPlaying: false });
    } else {
      currentSound.play();
      set({ isPlaying: true });
    }
  },

  seekTo: (time) => {
    const { currentSound } = get();
    if (!currentSound) return;

    currentSound.seek(time);
    set({ currentTime: time });
  },

  playNext: () => {
    const { queue, currentTrackId } = get();
    if (!queue.length || !currentTrackId) return;

    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrackId,
    );
    if (currentIndex === -1) return;

    const nextTrack = queue[currentIndex + 1];

    if (!nextTrack) {
      const currentSound = get().currentSound;
      if (currentSound) {
        currentSound.stop();
      }

      set({
        isPlaying: false,
        currentTime: 0,
      });
      return;
    }

    get().playTrack(nextTrack, queue);
  },

  playPrevious: () => {
    const { queue, currentTrackId, currentTime } = get();
    if (!queue.length || !currentTrackId) return;

    const currentSound = get().currentSound;

    if (currentTime > 3 && currentSound) {
      currentSound.seek(0);
      set({ currentTime: 0 });
      return;
    }

    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrackId,
    );
    if (currentIndex <= 0) return;

    const previousTrack = queue[currentIndex - 1];
    get().playTrack(previousTrack, queue);
  },

  tick: () => {
    const { currentSound, isPlaying } = get();
    if (!currentSound || !isPlaying) return;

    const position = currentSound.seek();

    set({
      currentTime: typeof position === "number" ? position : 0,
    });
  },

  cleanup: () => {
    stopSound(get().currentSound);

    set({
      queue: [],
      currentTrackId: null,
      currentSound: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    });
  },
}));
