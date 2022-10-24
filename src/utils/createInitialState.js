const createInitialState = (keys) => {
  return Object.fromEntries(keys.map((key) => [key, false]));
};

export default createInitialState;
