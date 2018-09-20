// @flow
import jsonGenerator from '../jsonGenerator';

type ObjectType = (Object, ?number, ?Object) => Object

const object: ObjectType = (obj, index = null, args = {}) => {
  const map: Object = new Map(Object.entries(obj));
  return jsonGenerator({ map, index, args, });
};

export default object;
