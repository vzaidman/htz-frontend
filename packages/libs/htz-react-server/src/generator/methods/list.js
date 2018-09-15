export default (methods, count) => Array.from(Array(count), (_, i) => {
  const { method, options, } = methods[Math.floor(Math.random() * methods.length)];
  return method(options);
}
);
