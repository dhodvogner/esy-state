import { renderMustache } from "./utils.mjs";

export const createState = (subscriptions, repeaters) => {
  return new Proxy({}, {
    get: (state, prop) => {
      return state[prop];
    },
    set: (state, prop, value) => {
      state[prop] = value;
      notify(prop, state, subscriptions, "state_change");
      return true;
    }
  });
};

export const notify = (stateKey, state, subscriptions, origin) => {
  console.log(`📢 ${origin} ==> notify`, stateKey, state[stateKey]);

  if (subscriptions[stateKey])
    subscriptions[stateKey].forEach((subscription) => {
      if (subscription.type === "content") {
        subscription.element.innerText = state[stateKey];
      }

      if (subscription.type === "content-html") {
        subscription.element.innerHTML = state[stateKey];
      }

      if (subscription.type === "repeater") {
        const { parentNode, templateNode } = subscription;
        parentNode.innerHTML = "";
        state[stateKey].forEach((item, index) => {
          const newNode = templateNode.cloneNode(true);
          if (typeof item !== 'object' || Array.isArray(item)) {
            newNode.innerText = item;
            parentNode.appendChild(newNode);
          } else {
            item["__index"] = index;
            newNode.innerHTML = renderMustache(newNode.innerHTML, item);
            parentNode.appendChild(newNode);
          }
        });
      }
    });
}