import { setShowLineNumbers } from "~/apps/code/store";
import { themeLineNumbersAtom } from "~/apps/code/store/themes";
import { Switch } from "~/components/switch";
import useHotkeys from "~/utils/useHotkeys";

import ControlContainer from "./ControlContainer";

export const LineNumberControl = () => {
  const toggleShowLineNumbers = () => {
    setShowLineNumbers((old) => !(old ?? themeLineNumbersAtom()));
  };

  useHotkeys("n", toggleShowLineNumbers);

  return (
    <ControlContainer title="Line numbers">
      <Switch
        checked={themeLineNumbersAtom()}
        onCheckedChange={(checked) => setShowLineNumbers(checked)}
      />
    </ControlContainer>
  );
};

export default LineNumberControl;
