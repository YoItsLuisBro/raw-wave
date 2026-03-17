import { X, ListMusic, Play, Pause } from "lucide-react";
import { usePlayerStore } from "../../app/store/playerStore";
import { useUIStore } from "../../app/store/uiStore";
import Panel from "../ui/Panel";
import Button from "../ui/Button";
import { cn } from "../../lib/cn";

export default function QueueDrawer() {
  const queue = usePlayerStore((state) => state.queue);
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  const isQueueOpen = useUIStore((state) => state.isQueueOpen);
  const closeQueue = useUIStore((state) => state.closeQueue);

  if (!isQueueOpen) return null;

  return (
    <>
      <button
        aria-label="Close queue overlay"
        className="fixed inset-0 z-40 bg-black/30"
        onClick={closeQueue}
      />

      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l-4 border-black bg-white p-4 shadow-[12px_0_0_0_#000]">
        <Panel striped className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between border-b-4 border-black pb-4">
            <div className="flex items-center gap-3">
              <ListMusic size={20} strokeWidth={2.75} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                  Active Queue
                </p>
                <h2 className="text-2xl font-black uppercase">Queue Block</h2>
              </div>
            </div>

            <Button
              onClick={closeQueue}
              variant="secondary"
              size="icon"
              className="hover:shadow-none"
            >
              <X size={18} strokeWidth={2.75} />
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {queue.length ? (
              <div className="grid gap-3">
                {queue.map((track, index) => {
                  const active = track.id === currentTrackId;

                  const handleClick = () => {
                    if (active) {
                      togglePlay();
                    } else {
                      playTrack(track, queue);
                    }
                  };

                  return (
                    <div
                      key={track.id}
                      className={cn(
                        "border-4 border-black p-3",
                        active ? "bg-black text-white" : "bg-white text-black",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-1 truncate text-sm font-black uppercase tracking-[0.14em]">
                            {track.title}
                          </h3>
                          <p
                            className={cn(
                              "truncate text-xs font-bold uppercase tracking-[0.12em]",
                              active ? "text-neutral-300" : "text-neutral-600",
                            )}
                          >
                            {track.artist}
                          </p>
                        </div>

                        <Button
                          onClick={handleClick}
                          variant={active ? "secondary" : "primary"}
                          size="icon"
                          className="shrink-0 hover:shadow-none"
                        >
                          {active && isPlaying ? (
                            <Pause size={16} strokeWidth={2.75} />
                          ) : (
                            <Play size={16} strokeWidth={2.75} />
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border-4 border-black bg-white p-5">
                <p className="text-lg font-black uppercase">Queue Empty</p>
                <p className="mt-2 text-sm font-bold uppercase text-neutral-700">
                  Play something to populate the active queue.
                </p>
              </div>
            )}
          </div>
        </Panel>
      </aside>
    </>
  );
}
