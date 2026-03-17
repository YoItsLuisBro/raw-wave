import { useUIStore } from "../../app/store/uiStore";
import { cn } from "../../lib/cn";

const headerThemeClasses = {
  mono: "bg-[repeating-linear-gradient(45deg,#fff_0,#fff_18px,#f5f5f5_18px,#f5f5f5_36px)] text-black",
  warning:
    "bg-[repeating-linear-gradient(45deg,#ffedd5_0,#ffedd5_18px,#fdba74_18px,#fdba74_36px)] text-black",
  acid: "bg-[repeating-linear-gradient(45deg,#ecfccb_0,#ecfccb_18px,#bef264_18px,#bef264_36px)] text-black",
  concrete:
    "bg-[repeating-linear-gradient(45deg,#f4f4f5_0,#f4f4f5_18px,#d4d4d8_18px,#d4d4d8_36px)] text-black",
  inverted:
    "bg-[repeating-linear-gradient(45deg,#000_0,#000_18px,#27272a_18px,#27272a_36px)] text-white",
};

const badgeThemeClasses = {
  mono: "bg-white text-black",
  warning: "bg-orange-100 text-black",
  acid: "bg-lime-100 text-black",
  concrete: "bg-zinc-100 text-black",
  inverted: "bg-zinc-900 text-white",
};

export default function Header() {
  const theme = useUIStore((state) => state.theme);

  return (
    <header
      className={cn(
        "flex items-center justify-between border-b-4 border-black px-4 md:px-6",
        headerThemeClasses[theme] ?? headerThemeClasses.mono,
      )}
    >
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em]">
          Brutalist Music Platform
        </p>
        <h1 className="text-xl font-black uppercase sm:text-2xl md:text-4xl">
          PLAY LOUD
        </h1>
      </div>

      <div
        className={cn(
          "hidden border-4 border-black px-4 py-3 md:block",
          badgeThemeClasses[theme] ?? badgeThemeClasses.mono,
        )}
      >
        <span className="text-xs font-black uppercase tracking-[0.22em]">
          SIGNAL: STABLE
        </span>
      </div>
    </header>
  );
}
