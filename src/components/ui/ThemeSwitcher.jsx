import { useUIStore } from "../../app/store/uiStore";
import Button from "./Button";
import Panel from "./Panel";

export default function ThemeSwitcher() {
  const theme = useUIStore((state) => state.theme);
  const themes = useUIStore((state) => state.themes);
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <Panel className="p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.25em]">
        Theme Mode
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        {themes.map((item) => (
          <Button
            key={item}
            onClick={() => setTheme(item)}
            variant={theme === item ? "primary" : "secondary"}
            size="sm"
          >
            {item}
          </Button>
        ))}
      </div>
    </Panel>
  );
}
