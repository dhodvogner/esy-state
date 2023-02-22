
export const subscriptions = {};

export const subscribe = (stateKey, subscription) => {
  subscriptions[stateKey] = subscriptions[stateKey] || [];

  // TODO: make sure this works properly
  if (!subscriptions[stateKey].includes(subscription))
    subscriptions[stateKey].push(subscription);
}

function unsubscribe(stateKey, subscription) {
  if (subscriptions[stateKey])
    subscriptions[stateKey] = subscriptions[stateKey].filter((e) => e !== subscription);
}