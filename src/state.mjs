import { renderMustache, isNullOrUndefined } from "./utils.mjs";

const LOCALSOTRAGE_PREFIX = "esy_state_";
let persistedKeyes = [];

export const clearPersistedKeys = () => {
  persistedKeyes.forEach(key => localStorage.removeItem(LOCALSOTRAGE_PREFIX + key));
  persistedKeyes = [];
  savePersistedKeys();
};

export const loadPersistedKeys = (state) => {
  const keys = localStorage.getItem(LOCALSOTRAGE_PREFIX + "persisted_keys");
  if (keys) persistedKeyes = JSON.parse(keys);

  persistedKeyes.forEach(key => {
    const value = localStorage.getItem(LOCALSOTRAGE_PREFIX + key);
    state[key] = JSON.parse(value);
  });
};

const savePersistedKeys = () => {
  localStorage.setItem(LOCALSOTRAGE_PREFIX + "persisted_keys", JSON.stringify(persistedKeyes));
};

const setPersistedKey = (key, value) => {
  if(key.startsWith("__")) return;
  localStorage.setItem(LOCALSOTRAGE_PREFIX + key, JSON.stringify(value));

  if (persistedKeyes.includes(key)) return;
  persistedKeyes.push(key);
  savePersistedKeys();
};

export const createState = (subscriptions, repeaters) => {
  return new Proxy({}, {
    get: (state, prop) => {
      return state[prop];
    },
    set: (state, prop, value) => {
      state[prop] = value;
      setPersistedKey(prop, value);
      notify(prop, state, subscriptions, "state_change");
      return true;
    }
  });
};

// TODO: persist state in local storage
// 1. on load -> persisted_keyes = localStorage.getItem("persisted_keys")
// 2. on get -> if (persisted_keys.includes(key)) -> return localStorage.getItem(key)
// 3. on set -> localStorage.setItem(key, value), persisted_keys.push(key)
// do not persist any variables that start with __
// What if we exceed the local storage limit? -> https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
// How to measure the size of a string? -> https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
// How to handle arrays and objects? -> JSON.stringify, JSON.parse

export const notify = (stateKey, state, subscriptions, origin) => {
  // TODO: better logging
  // Hoe can we create a devtools panel for this?
  console.log(`📢 ${origin} ==> notify`, stateKey, state[stateKey]);

  // debounce state changes to avoid multiple re-renders?

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

        if(isNullOrUndefined(state[stateKey])) return;

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