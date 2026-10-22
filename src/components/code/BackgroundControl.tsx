import { showBackground, setShowBackground } from "@/store";
import useHotkeys from "@/utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";

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
