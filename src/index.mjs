import { createState, loadPersistedKeys, notify } from "./state.mjs";
import { collectNodes } from "./utils.mjs";
import { subscriptions, subscribe } from "./subscriptions.mjs";

export { clearPersistedKeys } from "./state.mjs";

export const state = createState(subscriptions);
export const mutations = {};

window.addEventListener("load", () => {
  loadPersistedKeys(state);

  const stateKeys = [];

  const nodesWithDataBindings = collectNodes("#");
  nodesWithDataBindings.forEach((node) => {
    const stateKey = node.attribute.name.split("#")[1];
    subscribe(stateKey, { type: "content", element: node.element, templateNode: node.element.cloneNode(true) });
    if(!stateKeys.includes(stateKey)) stateKeys.push(stateKey);
  });

  const nodesWithHtmlBindings = collectNodes("+");
  nodesWithHtmlBindings.forEach((node) => {
    const stateKey = node.attribute.name.split("+")[1];
    subscribe(stateKey, { type: "content-html", element: node.element });
    if(!stateKeys.includes(stateKey)) stateKeys.push(stateKey);
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
    if(!stateKeys.includes(stateKey)) stateKeys.push(stateKey);
  });

  const nodesWithConditionalBindigs = collectNodes("?");
  nodesWithConditionalBindigs.forEach((node) => {
    let compare_type = true;
    let stateKey = node.attribute.name.split("?")[1];
    if (stateKey[0] === "!") {
      compare_type = false;
      stateKey = stateKey.slice(1);
    }
    const templateNode = node.element.cloneNode(true);
    const parentNode = node.element.parentNode;
    const prev = node.element.previousElementSibling;
    parentNode.removeChild(node.element);
    subscribe(stateKey, { type: "conditional", parentNode, templateNode, compare_type, prev });
    if(!stateKeys.includes(stateKey)) stateKeys.push(stateKey);
  });

  stateKeys.forEach((stateKey) => {
    notify(stateKey, state, subscriptions, "window.load");
  });
});