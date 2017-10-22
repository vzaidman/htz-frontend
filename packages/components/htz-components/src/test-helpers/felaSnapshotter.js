// eslint-disable-next-line import/no-extraneous-dependencies
import htzTheme from '@haaretz/htz-theme';
import createRenderer from '../utils/createRenderer';
import StyleProvider from '../components/StyleProvider/StyleProvider';
import createFelaSnapshotter from '../utils/createFelaSnapshotter';

const testRenderer = createRenderer({ isRtl: true, });
const felaSnapshotter = createFelaSnapshotter(
  StyleProvider,
  testRenderer,
  htzTheme
);

export default felaSnapshotter;
