import { createState, loadPersistedKeys, notify } from "./state.mjs";
import { collectNodes } from "./utils.mjs";
import { subscriptions, subscribe } from "./subscriptions.mjs";

export { clearPersistedKeys } from "./state.mjs";

export const state = createState(subscriptions);
export const mutations = {};

window.addEventListener("load", () => {
  loadPersistedKeys(state);

  const nodesWithDataBindings = collectNodes("#");
  nodesWithDataBindings.forEach((node) => {
    const stateKey = node.attribute.name.split("#")[1];
    subscribe(stateKey, { type: "content", element: node.element });
    notify(stateKey, state, subscriptions, "window.load");
  });

  const nodesWithHtmlBindings = collectNodes("+");
  nodesWithHtmlBindings.forEach((node) => {
    const stateKey = node.attribute.name.split("+")[1];
    subscribe(stateKey, { type: "content-html", element: node.element });
    notify(stateKey, state, subscriptions, "window.load");
  });

  const nodesWithEventBindigs = collectNodes("@");
  nodesWithEventBindigs.forEach((node) => {
    const eventKey = node.attribute.name.split("@")[1];
    node.element.addEventListener(eventKey, mutations[node.attribute.value], false);
  });

  const nodesWithRepeaterBindigs = collectNodes("%");
  nodesWithRepeaterBindigs.forEach((node) => {
    const stateKey = node.attribute.name.split("%")[1];
    const templateNode = node.element.cloneNode(true);
    const parentNode = node.element.parentNode;
    subscribe(stateKey, { type: "repeater", parentNode, templateNode });
    notify(stateKey, state, subscriptions, "window.load");
  });
});