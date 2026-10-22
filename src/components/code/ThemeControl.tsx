import { createMemo, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { themeAtom, setThemeId, THEMES, unlockedThemesAtom } from "@/store/themes";
import { setPaddingOption } from "@/store";
import ControlContainer from "./ControlContainer";
import styles from "./ThemeControl.module.css";
import useHotkeys from "@/utils/useHotkeys";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxValue,
  ComboboxEmpty,
} from "@/components/combobox";
import { UniqueSvg } from "@/components/unique-svg";
import { ChevronUpIcon } from "@/components/icons";

function ThemePreview(props: { theme: any }) {
  const icon = () => props.theme?.icon;

  return (
    <Show
      when={icon()}
      fallback={
        <span
          class={styles.themePreview}
          style={{
            "background-image": `linear-gradient(140deg, ${props.theme.background?.from || "#333"}, ${props.theme.background?.to || "#111"})`,
          }}
        />
      }
    >
      <UniqueSvg class={styles.themePreview}>
        <Dynamic component={icon()} class={styles.logo} />
      </UniqueSvg>
    </Show>
  );
}

export const ThemeControl = () => {
  const currentTheme = themeAtom;
  const unlockedThemes = unlockedThemesAtom;

  const setTheme = (theme: any) => {
    setThemeId(theme.id);
    if (theme.name === THEMES.vercel.name || theme.name === THEMES.rabbit.name) {
      setPaddingOption(64);
    }
    try {
      localStorage.setItem("codeTheme", theme.id);
    } catch (error) {
      console.log("Could not set theme in localStorage", error);
    }
  };

  useHotkeys("c", () => {
    const availableThemes = Object.values(THEMES).filter(
      (t: any) => unlockedThemes().includes(t.id) || !t.hidden,
    );
    const currentIndex = availableThemes.findIndex((t: any) => t.id === currentTheme().id);
    if (availableThemes[currentIndex + 1]) {
      setTheme(availableThemes[currentIndex + 1]);
    } else {
      setTheme(availableThemes[0]);
    }
  });

  const { partnerThemes, themes } = Object.entries(THEMES).reduce<{
    partnerThemes: any[];
    themes: any[];
  }>(
    (acc, [key, value]: [string, any]) => {
      const themeWithKey = { ...value, key };
      if (value.partner) {
        acc.partnerThemes.push(themeWithKey);
      } else {
        acc.themes.push(themeWithKey);
      }
      return acc;
    },
    { partnerThemes: [], themes: [] },
  );

  const filteredPartnerThemes = createMemo(() =>
    partnerThemes.filter(
      (t: any) => unlockedThemes().includes(t.id) || !t.hidden || t.name === currentTheme().name,
    ),
  );

  const allThemesList = createMemo(() => [...filteredPartnerThemes(), ...themes]);

  return (
    <ControlContainer title="Theme">
      <Combobox
        items={allThemesList()}
        value={currentTheme()}
        onValueChange={(theme) => {
          if (theme) setTheme(theme);
        }}
        itemToStringLabel={(t) => t?.name ?? ""}
      >
        <ComboboxTrigger size="small" class="w-[60px]" icon={ChevronUpIcon}>
          <ComboboxValue>
            {(value) => (value ? <ThemePreview theme={value} /> : "Theme")}
          </ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent showSearchIcon>
          <ComboboxEmpty>No themes found.</ComboboxEmpty>
          <ComboboxList>
            {(theme) => (
              <ComboboxItem value={theme}>
                <div class="flex items-center gap-2">
                  <ThemePreview theme={theme} />
                  <span>{theme.name}</span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </ControlContainer>
  );
};

export default ThemeControl;
