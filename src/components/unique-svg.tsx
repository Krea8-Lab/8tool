import { ParentComponent, createUniqueId, onMount } from "solid-js";

export const UniqueSvg: ParentComponent<{ class?: string; className?: string }> = (props) => {
  let ref: HTMLSpanElement | undefined;
  const id = createUniqueId();

  onMount(() => {
    if (!ref) return;
    const svg = ref.querySelector("svg");
    if (!svg) return;

    const elementsWithId = svg.querySelectorAll("[id]");
    const idMap = new Map<string, string>();

    elementsWithId.forEach((el) => {
      const oldId = el.getAttribute("id")!;
      const newId = `${id.replace(/:/g, "")}_${oldId}`;
      idMap.set(oldId, newId);
      el.setAttribute("id", newId);
    });

    const allElements = svg.querySelectorAll("*");
    allElements.forEach((el) => {
      for (const attr of Array.from(el.attributes)) {
        if (attr.value.includes("url(#")) {
          let newValue = attr.value;
          idMap.forEach((newId, oldId) => {
            newValue = newValue.replace(`url(#${oldId})`, `url(#${newId})`);
          });
          el.setAttribute(attr.name, newValue);
        }
      }
    });
  });

  return (
    <span ref={ref} class={props.class || props.className}>
      {props.children}
    </span>
  );
};
