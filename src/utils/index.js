let logger = ({ origin = "Generic" }) => ({
  set: (obj, key, value) => {
    obj[key] = value;
    console.log(origin, ": ", obj);
    return obj;
  }
});

const arrayWatcher = (target, options) => {
  const handler = logger(options);
  console.log(handler);
  new Proxy(target, handler);
};

export const watcher = (target, options) => {
  switch (true) {
    case target instanceof Object:
      return arrayWatcher(target, options);
    case target instanceof Array:
      return arrayWatcher(target, options);
    default:
      return;
  }
};

export const clone = elem => {
  switch (true) {
    case elem instanceof Array:
    case elem instanceof Object:
      return JSON.parse(JSON.stringify(elem));
    default:
      return elem;
  }
};
