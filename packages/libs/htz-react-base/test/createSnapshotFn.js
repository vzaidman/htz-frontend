const React = require('react');
const renderer = require('react-test-renderer');

function createSnapshotFn(styleProvider) {
  return component => ({
    // Output an object with both the component snapshot and raw styles.
    component: renderer
      .create(React.cloneElement(styleProvider, {}, component))
      .toJSON(),
    styles: styleProvider.props.renderer.renderToString(),
  });
}

module.exports = createSnapshotFn;
