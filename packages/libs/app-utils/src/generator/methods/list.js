// @flow

type ListType = (Array<Object>, number, ?Object) => Array<string | number | Date>

const list: ListType = (methods, count, args) => Array.from(Array(count), (_, i) => {
  const { method, options, } = methods[Math.floor(Math.random() * methods.length)];
  return method(options, i, args);
});

export default list;
