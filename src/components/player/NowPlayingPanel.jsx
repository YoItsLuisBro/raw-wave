import { X, Disc3 } from "lucide-react";
import { usePlayerStore } from "../../app/store/playerStore";
import { useUIStore } from "../../app/store/uiStore";
import { tracks } from "../../data/tracks";
import { formatTime } from "../../lib/formatTime";
import Panel from "../ui/Panel";
import Button from "../ui/Button";
import VisualizerBars from "./VisualizerBars";

export default function NowPlayingPanel() {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const isNowPlayingOpen = useUIStore((state) => state.isNowPlayingOpen);
  const closeNowPlaying = useUIStore((state) => state.closeNowPlaying);

  const currentTrack =
    tracks.find((track) => track.id === currentTrackId) ?? null;

  if (!isNowPlayingOpen) return null;

  return (
    <>
      <button
        aria-label="Close now playing overlay"
        className="fixed inset-0 z-40 bg-black/30"
        onClick={closeNowPlaying}
      />

      <section className="fixed inset-x-0 top-0 z-50 mx-auto h-full max-w-4xl p-4">
        <Panel tone="white" className="flex h-full flex-col p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between border-b-4 border-black pb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                Active Signal
              </p>
              <h2 className="text-2xl font-black uppercase md:text-3xl">
                Now Playing
              </h2>
            </div>

            <Button
              onClick={closeNowPlaying}
              variant="secondary"
              size="icon"
              className="hover:shadow-none"
            >
              <X size={18} strokeWidth={2.75} />
            </Button>
          </div>

          <div className="grid min-h-0 flex-1 gap-6 md:grid-cols-[1.1fr_1fr]">
            <div className="grid min-h-80 gap-4">
              <div className="grid place-items-center border-4 border-black bg-black p-6 text-white">
                <div className="text-center">
                  <div className="mx-auto grid h-40 w-40 place-items-center border-4 border-white text-xl font-black tracking-[0.25em] md:h-56 md:w-56">
                    {currentTrack ? currentTrack.cover : "ART"}
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2">
                    <Disc3 size={20} strokeWidth={2.75} />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                      {isPlaying ? "Playback Live" : "Playback Paused"}
                    </span>
                  </div>
                </div>
              </div>

              <VisualizerBars active={isPlaying} />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                  Track Data
                </p>
                <h3 className="mt-2 text-3xl font-black uppercase md:text-5xl">
                  {currentTrack?.title ?? "NO TRACK"}
                </h3>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-neutral-700">
                  {currentTrack?.artist ?? "RAW//WAVE SYSTEM"}
                </p>
              </div>

              <div className="border-4 border-black bg-neutral-100 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                  Progress
                </p>

                <div className="mt-3 h-6 border-4 border-black bg-white">
                  <div
                    className="h-full bg-black transition-[width]"
                    style={{
                      width:
                        duration > 0
                          ? `${Math.min((currentTime / duration) * 100, 100)}%`
                          : "0%",
                    }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-xs font-black uppercase tracking-[0.18em]">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-4 border-black bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                    Playback State
                  </p>
                  <p className="mt-2 text-xl font-black uppercase">
                    {isPlaying ? "RUNNING" : "PAUSED"}
                  </p>
                </div>

                <div className="border-4 border-black bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                    Signal Type
                  </p>
                  <p className="mt-2 text-xl font-black uppercase">BRUTALIST</p>
                </div>
              </div>

              <div className="border-4 border-black bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                  System Note
                </p>
                <p className="mt-2 text-sm font-bold uppercase text-neutral-700">
                  Oversized playback mode for editorial impact and portfolio
                  polish.
                </p>
              </div>
            </div>
          </div>
        </Panel>
      </section>
    </>
  );
}
