module.exports = promiseAllRecursive;

function promiseAllRecursive(value) {
  if (value instanceof Promise) {
    return value;
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map(promiseAllRecursive));
  }

  if (typeof value === 'object') {
    return resolveObject(value);
  }

  return Promise.resolve(value);
}

function resolveObject(object) {
  const promises = Object.keys(object).map(key => {
    return promiseAllRecursive(object[key]).then(value => ({ key, value }));
  });

  return Promise.all(promises).then(results => {
    return results.reduce((obj, pair) => {
      obj[pair.key] = pair.value;
      return obj;
    }, {});
  });
}
