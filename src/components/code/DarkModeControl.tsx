import { darkMode, setDarkMode, themeAtom, themeDarkModeAtom } from "@/store/themes";
import useHotkeys from "@/utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";

export const DarkModeControl = () => {
  const canToggle = () => {
    const t = themeAtom();
    return !!t.syntax.light && !!t.syntax.dark;
  };

  const toggleDarkMode = () => {
    if (canToggle()) {
      setDarkMode(!darkMode());
    }
  };

  useHotkeys("d", toggleDarkMode);

  return (
    <ControlContainer title="Dark mode">
      <Switch checked={themeDarkModeAtom()} onCheckedChange={setDarkMode} disabled={!canToggle()} />
    </ControlContainer>
  );
};

export default DarkModeControl;
