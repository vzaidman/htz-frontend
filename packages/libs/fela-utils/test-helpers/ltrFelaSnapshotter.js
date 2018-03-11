import createRenderer from '../src/createRenderer';
import StyleProvider from '../src/StyleProvider';
import createFelaSnapshotter from '../src/createFelaSnapshotter';

const testRenderer = createRenderer({ isRtl: false, });
const felaSnapshotter = createFelaSnapshotter(StyleProvider, testRenderer, {});

export default felaSnapshotter;
