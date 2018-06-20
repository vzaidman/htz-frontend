module.exports = {
  presets: [ '@haaretz/htz-react-base/babel.js', 'next/babel', ],
  ignore:
    process.env.NODE_ENV === 'test'
      ? []
      : [
        '**/*{.,-}{spec,test}.{js,jsx}',
        '**/{__tests__,__mocks__,__snapshots__}',
      ],
};
