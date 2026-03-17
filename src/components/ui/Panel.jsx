import { cn } from "../../lib/cn";
import { useUIStore } from "../../app/store/uiStore";

const toneMap = {
  mono: {
    white: "bg-white text-black",
    black: "bg-black text-white",
    muted: "bg-neutral-100 text-black",
    gray: "bg-neutral-200 text-black",
    striped:
      "bg-[repeating-linear-gradient(45deg,#fff_0,#fff_18px,#f5f5f5_18px,#f5f5f5_36px)] text-black",
  },
  warning: {
    white: "bg-orange-100 text-black",
    black: "bg-orange-500 text-black",
    muted: "bg-orange-200 text-black",
    gray: "bg-orange-300 text-black",
    striped:
      "bg-[repeating-linear-gradient(45deg,#ffedd5_0,#ffedd5_18px,#fdba74_18px,#fdba74_36px)] text-black",
  },
  acid: {
    white: "bg-lime-100 text-black",
    black: "bg-lime-300 text-black",
    muted: "bg-lime-200 text-black",
    gray: "bg-lime-300 text-black",
    striped:
      "bg-[repeating-linear-gradient(45deg,#ecfccb_0,#ecfccb_18px,#bef264_18px,#bef264_36px)] text-black",
  },
  concrete: {
    white: "bg-zinc-100 text-black",
    black: "bg-zinc-700 text-white",
    muted: "bg-zinc-200 text-black",
    gray: "bg-zinc-300 text-black",
    striped:
      "bg-[repeating-linear-gradient(45deg,#f4f4f5_0,#f4f4f5_18px,#d4d4d8_18px,#d4d4d8_36px)] text-black",
  },
  inverted: {
    white: "bg-zinc-900 text-white",
    black: "bg-white text-black",
    muted: "bg-zinc-800 text-white",
    gray: "bg-zinc-700 text-white",
    striped:
      "bg-[repeating-linear-gradient(45deg,#111827_0,#111827_18px,#27272a_18px,#27272a_36px)] text-white",
  },
};

export default function Panel({
  children,
  className,
  tone = "white",
  striped = false,
}) {
  const theme = useUIStore((state) => state.theme);
  const themeTones = toneMap[theme] ?? toneMap.mono;

  return (
    <div
      className={cn(
        "border-4 border-black",
        striped ? themeTones.striped : themeTones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
