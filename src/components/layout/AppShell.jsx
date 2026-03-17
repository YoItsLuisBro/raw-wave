import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PlayerBar from "./PlayerBar";
import MobileNav from "./MobileNav";
import QueueDrawer from "./QueueDrawer";
import NowPlayingPanel from "../player/NowPlayingPanel";
import { useUIStore } from "../../app/store/uiStore";
import { cn } from "../../lib/cn";

const shellThemeClasses = {
  mono: "bg-white text-black",
  warning: "bg-orange-400 text-black",
  acid: "bg-lime-300 text-black",
  concrete: "bg-zinc-300 text-black",
  inverted: "bg-black text-white",
};

const mainThemeClasses = {
  mono: "bg-neutral-100 text-black",
  warning: "bg-orange-200 text-black",
  acid: "bg-lime-100 text-black",
  concrete: "bg-zinc-200 text-black",
  inverted: "bg-zinc-950 text-white",
};

export default function AppShell() {
  const theme = useUIStore((state) => state.theme);

  return (
    <>
      <div
        className={cn(
          "grid min-h-screen grid-rows-[1fr_auto] pb-16 lg:pb-0",
          shellThemeClasses[theme] ?? shellThemeClasses.mono,
        )}
      >
        <div className="grid min-h-0 lg:grid-cols-[260px_1fr]">
          <Sidebar />

          <div className="grid min-h-0 grid-rows-[88px_1fr]">
            <Header />

            <main
              className={cn(
                "min-h-0 overflow-y-auto border-l-0 border-t-4 border-black p-4 md:p-6 lg:border-l-4",
                mainThemeClasses[theme] ?? mainThemeClasses.mono,
              )}
            >
              <Outlet />
            </main>
          </div>
        </div>

        <PlayerBar />
      </div>

      <MobileNav />
      <QueueDrawer />
      <NowPlayingPanel />
    </>
  );
}
