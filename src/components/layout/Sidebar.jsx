import { NavLink } from "react-router-dom";
import { House, Search, LibraryBig } from "lucide-react";
import { useUIStore } from "../../app/store/uiStore";
import { cn } from "../../lib/cn";

const navItems = [
  { to: "/", label: "HOME", icon: House },
  { to: "/search", label: "SEARCH", icon: Search },
  { to: "/library", label: "LIBRARY", icon: LibraryBig },
];

const sidebarThemeClasses = {
  mono: "bg-white text-black",
  warning: "bg-orange-100 text-black",
  acid: "bg-lime-100 text-black",
  concrete: "bg-zinc-100 text-black",
  inverted: "bg-zinc-900 text-white",
};

const logoThemeClasses = {
  mono: "bg-black text-white",
  warning: "bg-orange-500 text-black",
  acid: "bg-lime-300 text-black",
  concrete: "bg-zinc-700 text-white",
  inverted: "bg-white text-black",
};

const noteThemeClasses = {
  mono: "bg-neutral-200 text-black",
  warning: "bg-orange-200 text-black",
  acid: "bg-lime-200 text-black",
  concrete: "bg-zinc-200 text-black",
  inverted: "bg-zinc-800 text-white",
};

export default function Sidebar() {
  const theme = useUIStore((state) => state.theme);

  return (
    <aside
      className={cn(
        "hidden border-r-4 border-black lg:flex lg:flex-col",
        sidebarThemeClasses[theme] ?? sidebarThemeClasses.mono,
      )}
    >
      <div className="border-b-4 border-black p-5">
        <div
          className={cn(
            "inline-block border-4 border-black px-3 py-2 text-2xl font-black tracking-tight",
            logoThemeClasses[theme] ?? logoThemeClasses.mono,
          )}
        >
          RAW//WAVE
        </div>

        <p className="mt-3 max-w-[18ch] text-xs font-bold uppercase tracking-[0.2em]">
          Play loud. No polish.
        </p>
      </div>

      <nav className="flex flex-col p-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "mb-3 flex items-center gap-3 border-4 border-black px-4 py-4 text-sm font-black tracking-[0.18em] transition",
                isActive
                  ? "bg-black text-white"
                  : "bg-transparent hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]",
              )
            }
          >
            <Icon size={18} strokeWidth={2.75} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t-4 border-black p-4">
        <div
          className={cn(
            "border-4 border-black p-4",
            noteThemeClasses[theme] ?? noteThemeClasses.mono,
          )}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em]">
            SYSTEM NOTE
          </p>
          <p className="mt-2 text-sm font-bold">
            Brutalist streaming interface prototype.
          </p>
        </div>
      </div>
    </aside>
  );
}
