module.exports = api => {
  api.cache( process.env.NODE_ENV !== 'development');
  
  return {
    presets: [ '@babel/preset-flow', 'next/babel', ],
    plugins: [
      'babel-plugin-transform-react-remove-prop-types',
      'babel-plugin-transform-flow-strip-types',
    ],
  };
};
