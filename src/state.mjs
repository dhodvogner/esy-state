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
  console.log(`${origin} ===> notify`, stateKey, state[stateKey]);

  if (subscriptions[stateKey])
    subscriptions[stateKey].forEach((subscription) => {
      if (subscription.type === "content") {
        subscription.element.innerHTML = state[stateKey];
      }

      if (subscription.type === "repeater") {
        const { parentNode, templateNode } = subscription;
        parentNode.innerHTML = "";
        state[stateKey].forEach((item, index) => {
          const newNode = templateNode.cloneNode(true);
          if (typeof item !== 'object' || Array.isArray(item)) {
            newNode.innerHTML = item;
            parentNode.appendChild(newNode);
          } else {
            const matches = newNode.innerHTML.match(/{{\s*[\w\.]+\s*}}/g).map((x) => x.match(/[\w\.]+/)[0]);
            matches.forEach((match) => {  
              const value = (match === "__index") ? index : item[match];
              if(value === undefined) value = "";
              newNode.innerHTML = newNode.innerHTML.replace(`{{${match}}}`, value);
            });
            if(matches.length === 0) {
              newNode.innerHTML = item;
            }
            parentNode.appendChild(newNode);
          }
        });
      }
    });
}