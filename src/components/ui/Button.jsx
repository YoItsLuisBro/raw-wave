import { cn } from "../../lib/cn";
import { useUIStore } from "../../app/store/uiStore";

const sizeMap = {
  sm: "px-3 py-2 text-xs tracking-[0.18em]",
  md: "px-4 py-3 text-xs tracking-[0.22em]",
  lg: "px-5 py-4 text-sm tracking-[0.22em]",
  icon: "p-3",
};

const variantMap = {
  mono: {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    secondary: "bg-white text-black hover:bg-black hover:text-white",
    muted: "bg-neutral-200 text-black hover:bg-black hover:text-white",
  },
  warning: {
    primary: "bg-black text-white hover:bg-orange-100 hover:text-black",
    secondary: "bg-orange-100 text-black hover:bg-black hover:text-white",
    muted: "bg-orange-300 text-black hover:bg-black hover:text-white",
  },
  acid: {
    primary: "bg-black text-white hover:bg-lime-100 hover:text-black",
    secondary: "bg-lime-100 text-black hover:bg-black hover:text-white",
    muted: "bg-lime-300 text-black hover:bg-black hover:text-white",
  },
  concrete: {
    primary: "bg-zinc-800 text-white hover:bg-zinc-100 hover:text-black",
    secondary: "bg-zinc-100 text-black hover:bg-zinc-800 hover:text-white",
    muted: "bg-zinc-300 text-black hover:bg-zinc-800 hover:text-white",
  },
  inverted: {
    primary: "bg-white text-black hover:bg-zinc-900 hover:text-white",
    secondary: "bg-zinc-900 text-white hover:bg-white hover:text-black",
    muted: "bg-zinc-700 text-white hover:bg-white hover:text-black",
  },
};

export default function Button({
  children,
  className,
  variant = "secondary",
  size = "md",
  as: Comp = "button",
  ...props
}) {
  const theme = useUIStore((state) => state.theme);
  const themeVariants = variantMap[theme] ?? variantMap.mono;

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 border-4 border-black font-black uppercase transition",
        "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none",
        themeVariants[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
