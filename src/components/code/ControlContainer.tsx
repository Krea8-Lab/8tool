import { ParentComponent } from "solid-js";
import styles from "./ControlContainer.module.css";

export const ControlContainer: ParentComponent<{ title: string }> = (props) => {
  return (
    <div class={styles.container}>
      <span class={styles.controlTitle}>{props.title}</span>
      {props.children}
    </div>
  );
};

export default ControlContainer;
