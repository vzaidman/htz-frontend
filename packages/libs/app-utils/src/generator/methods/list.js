// @flow

type ListType = (Array<Object>, number) => Array<string | number | Date>

const list: ListType = (methods, count) => Array.from(Array(count), (_, i) => {
  const { method, options, } = methods[Math.floor(Math.random() * methods.length)];
  return method(options);
});

export default list;
