import { showBackground, setShowBackground } from "~/apps/code/store";
import { Switch } from "~/components/switch";
import useHotkeys from "~/utils/useHotkeys";

import ControlContainer from "./ControlContainer";

export const BackgroundControl = () => {
  useHotkeys("b", () => {
    setShowBackground((old) => !old);
  });

  return (
    <ControlContainer title="Background">
      <Switch checked={showBackground()} onCheckedChange={setShowBackground} />
    </ControlContainer>
  );
};

export default BackgroundControl;
