// @flow

type GeneratorType = (Object, ?Array<string>, ?number) => Object;

const generator: GeneratorType = (map, fields = null, index = null) => {
  const result = {};
  if (fields) {
    for (const field of fields) {
      result[field] = map.get(field)(index);
    }
  }
  else {
    for (const [ field, method, ] of map) {
      result[field] = method(index);
    }
  }
  return result;
};

export default generator;
