import { ParentComponent } from "solid-js";

export const ButtonGroup: ParentComponent = (props) => {
  return <span class="buttonGroup">{props.children}</span>;
};
