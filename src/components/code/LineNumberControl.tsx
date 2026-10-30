import { setShowLineNumbers } from "~/apps/code/store";
import { themeAtom, themeLineNumbersAtom } from "~/apps/code/store/themes";
import { Switch } from "~/components/switch";
import useHotkeys from "~/utils/useHotkeys";

import ControlContainer from "./ControlContainer";

export const LineNumberControl = () => {
  const isDisabled = () => {
    const t = themeAtom();
    return !!(t.partner && !t.lineNumbersToggleable);
  };

  const toggleShowLineNumbers = () => {
    if (isDisabled()) return;
    setShowLineNumbers((old) => !(old ?? themeLineNumbersAtom()));
  };

  useHotkeys("n", toggleShowLineNumbers);

  return (
    <ControlContainer title="Line numbers">
      <Switch
        checked={themeLineNumbersAtom()}
        onCheckedChange={(checked) => setShowLineNumbers(checked)}
        disabled={isDisabled()}
      />
    </ControlContainer>
  );
};

export default LineNumberControl;
