import { NavLink } from "react-router-dom";
import { House, Search, LibraryBig } from "lucide-react";
import { cn } from "../../lib/cn";
import { useUIStore } from "../../app/store/uiStore";

const navItems = [
  { to: "/", label: "HOME", icon: House },
  { to: "/search", label: "SEARCH", icon: Search },
  { to: "/library", label: "LIBRARY", icon: LibraryBig },
];

const navThemeClasses = {
  mono: "bg-white text-black",
  warning: "bg-orange-100 text-black",
  acid: "bg-lime-100 text-black",
  concrete: "bg-zinc-100 text-black",
  inverted: "bg-zinc-900 text-white",
};

export default function MobileNav() {
  const theme = useUIStore((state) => state.theme);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t-4 border-black lg:hidden",
        navThemeClasses[theme] ?? navThemeClasses.mono,
      )}
    >
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            cn(
              "flex min-h-16 flex-col items-center justify-center gap-2 border-r-4 border-black px-3 py-3 text-[10px] font-black uppercase tracking-[0.18em] last:border-r-0",
              isActive ? "bg-black text-white" : "bg-transparent",
            )
          }
        >
          <Icon size={18} strokeWidth={2.75} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
