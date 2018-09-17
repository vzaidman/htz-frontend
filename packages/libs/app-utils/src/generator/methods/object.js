// @flow
import jsonGenerator from '../generator';

type ObjectType = (Object, ?number) => Object

const object: ObjectType = (obj, index = null) => {
  const map: Object = new Map(Object.entries(obj));
  return jsonGenerator(map, null, index);
};

export default object;
