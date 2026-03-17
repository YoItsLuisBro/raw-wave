import { useMemo } from "react";
import { cn } from "../../lib/cn";

export default function VisualizerBars({ active = false }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        height: `${20 + ((index * 13) % 70)}%`,
        delay: `${(index % 5) * 120}ms`,
      })),
    [],
  );

  return (
    <div className="flex h-28 item-end gap-2 border-4 border-black bg-white p-4">
      {bars.map((bar) => (
        <div
          key={bar.id}
          className={cn(
            "w-full border-2 border-black bg-black transition-all duration-300",
            active
              ? "animate-[rawWavePulse_900ms_ease-in-out_infinite]"
              : "opacity-40",
          )}
          style={{
            height: active ? bar.height : "24%",
            animationDelay: bar.delay,
          }}
        />
      ))}
    </div>
  );
}
