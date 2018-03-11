import createRenderer from '../src/createRenderer';
import StyleProvider from '../src/StyleProvider';
import createFelaSnapshotter from '../src/createFelaSnapshotter';

const testRenderer = createRenderer({ isRtl: true, });
const felaSnapshotter = createFelaSnapshotter(StyleProvider, testRenderer, {});

export default felaSnapshotter;
