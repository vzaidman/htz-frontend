export default (map, fields = null) => {
  const result = {};
  if (fields) {
    for (const field of fields) {
      result[field] = map.get(field)();
    }
  }
  else {
    for (const [ field, method, ] of map) {
      result[field] = method();
    }
  }
  return result;
};
