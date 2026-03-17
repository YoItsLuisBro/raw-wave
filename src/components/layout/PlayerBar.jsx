import { useEffect } from "react";
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Volume2,
  ListMusic,
  PanelsTopLeft,
} from "lucide-react";
import { usePlayerStore } from "../../app/store/playerStore";
import { useUIStore } from "../../app/store/uiStore";
import { tracks } from "../../data/tracks";
import { formatTime } from "../../lib/formatTime";
import Panel from "../ui/Panel";
import Button from "../ui/Button";

export default function PlayerBar() {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const currentSound = usePlayerStore((state) => state.currentSound);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const volume = usePlayerStore((state) => state.volume);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const playNext = usePlayerStore((state) => state.playNext);
  const playPrevious = usePlayerStore((state) => state.playPrevious);
  const seekTo = usePlayerStore((state) => state.seekTo);
  const tick = usePlayerStore((state) => state.tick);

  const toggleQueue = useUIStore((state) => state.toggleQueue);
  const toggleNowPlaying = useUIStore((state) => state.toggleNowPlaying);

  const currentTrack =
    tracks.find((track) => track.id === currentTrackId) ?? null;

  useEffect(() => {
    const interval = window.setInterval(() => {
      tick();
    }, 500);

    return () => window.clearInterval(interval);
  }, [tick]);

  const progressPercent =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <footer className="grid gap-4 border-t-4 border-black bg-white p-4 lg:grid-cols-[1.05fr_1fr_320px]">
      <Panel tone="muted" className="p-3">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleNowPlaying}
            className="grid h-16 w-16 shrink-0 place-items-center border-4 border-black bg-black text-center text-[10px] font-black tracking-[0.2em] text-white"
          >
            {currentTrack ? currentTrack.cover : "ART"}
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black uppercase tracking-[0.15em]">
              {currentTrack?.title ?? "NO TRACK SELECTED"}
            </p>
            <p className="truncate text-xs font-bold uppercase tracking-[0.14em] text-neutral-700">
              {currentTrack?.artist ?? "RAW//WAVE SYSTEM"}
            </p>
          </div>

          <Button
            onClick={toggleQueue}
            variant="secondary"
            size="icon"
            className="hidden shrink-0 hover:shadow-none sm:inline-flex"
          >
            <ListMusic size={18} strokeWidth={2.75} />
          </Button>
        </div>
      </Panel>

      <Panel className="p-3">
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={playPrevious}
            variant="secondary"
            size="icon"
            className="hover:shadow-none"
            disabled={!currentSound}
          >
            <SkipBack size={18} strokeWidth={2.75} />
          </Button>

          <Button
            onClick={togglePlay}
            variant="primary"
            size="icon"
            className="hover:shadow-none"
            disabled={!currentSound}
          >
            {isPlaying ? (
              <Pause size={18} strokeWidth={2.75} />
            ) : (
              <Play size={18} strokeWidth={2.75} />
            )}
          </Button>

          <Button
            onClick={playNext}
            variant="secondary"
            size="icon"
            className="hover:shadow-none"
            disabled={!currentSound}
          >
            <SkipForward size={18} strokeWidth={2.75} />
          </Button>
        </div>

        <div className="mt-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="w-full accent-black"
            disabled={!currentSound}
          />

          <div className="mt-2 flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="mt-2 h-4 border-4 border-black bg-neutral-200">
            <div
              className="h-full bg-black transition-[width]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </Panel>

      <Panel tone="muted" className="p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Volume2 size={18} strokeWidth={2.75} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Volume
            </span>
          </div>

          <Button
            onClick={toggleNowPlaying}
            variant="secondary"
            size="icon"
            className="hover:shadow-none sm:hidden"
          >
            <PanelsTopLeft size={18} strokeWidth={2.75} />
          </Button>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-black"
        />

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">
            {volume}
          </p>

          <Button
            onClick={toggleQueue}
            variant="secondary"
            size="sm"
            className="sm:hidden"
          >
            Queue
          </Button>
        </div>
      </Panel>
    </footer>
  );
}
