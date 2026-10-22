import { createContext, ParentComponent, Accessor } from "solid-js";
import { frameRef, setFrameRef } from "./index";

export const FrameContext = createContext<Accessor<HTMLDivElement | null>>(frameRef);

const FrameContextStore: ParentComponent = (props) => {
  return <FrameContext.Provider value={frameRef}>{props.children}</FrameContext.Provider>;
};

export default FrameContextStore;
export { frameRef, setFrameRef };
