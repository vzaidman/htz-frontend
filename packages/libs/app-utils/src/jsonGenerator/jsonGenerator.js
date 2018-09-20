// @flow

type GeneratorType = ({
  map: Object,
  fields?: ?Array<string>,
  index: ?number,
  args: ?Object,
}) => Object;

const jsonGenerator: GeneratorType = ({ map, fields = null, index = null, args = null, }) => {
  const result = {};
  if (fields) {
    for (const field of fields) {
      result[field] = map.get(field)({ index, args, });
    }
  }
  else {
    for (const [ field, method, ] of map) {
      result[field] = method({ index, args, });
    }
  }
  return result;
};

export default jsonGenerator;
