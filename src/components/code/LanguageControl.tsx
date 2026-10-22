import { createMemo } from "solid-js";
import {
  autoDetectLanguage,
  selectedLanguage,
  setSelectedLanguage,
} from "@/store/code";
import { loadingLanguage } from "@/store";
import { Language, LANGUAGES } from "@/util/languages";
import ControlContainer from "./ControlContainer";
import styles from "./LanguageControl.module.css";
import useHotkeys from "@/utils/useHotkeys";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxEmpty,
} from "@/components/combobox";
import { cn } from "@/utils/cn";
import { ChevronUpIcon } from "@/components/icons";

type LanguageItem = {
  id: string;
  name: string;
  language: Language | null;
};

const AUTO_DETECT_ITEM: LanguageItem = {
  id: "auto-detect",
  name: "Auto-Detect",
  language: null,
};

export const LanguageControl = () => {
  const items = createMemo<LanguageItem[]>(() => {
    const languageItems = Object.entries(LANGUAGES).map(([key, lang]) => ({
      id: key,
      name: lang.name,
      language: lang,
    }));
    return [AUTO_DETECT_ITEM, ...languageItems];
  });

  const currentValue = createMemo(() => {
    const sel = selectedLanguage();
    if (!sel) return AUTO_DETECT_ITEM;
    return items().find((item) => item.language?.name === sel.name) ?? AUTO_DETECT_ITEM;
  });

  useHotkeys("l", (event) => {
    event.preventDefault();
  });

  return (
    <ControlContainer title="Language">
      <Combobox<LanguageItem>
        items={items()}
        value={currentValue()}
        onValueChange={(item) => {
          if (item) {
            setSelectedLanguage(item.language);
          }
        }}
        itemToStringLabel={(item) => item?.name ?? ""}
      >
        <ComboboxTrigger
          size="small"
          class={cn("w-[146px]", loadingLanguage() && styles.loadingShimmer)}
          icon={ChevronUpIcon}
        >
          <ComboboxValue<LanguageItem>>
            {(value) => (
              <>
                {value?.name ?? "Auto-Detect"}
                {autoDetectLanguage() ? " (auto)" : ""}
              </>
            )}
          </ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent searchPlaceholder="Search languages…">
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList<LanguageItem>>
            {(item) => (
              <ComboboxItem value={item}>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </ControlContainer>
  );
};

export default LanguageControl;
