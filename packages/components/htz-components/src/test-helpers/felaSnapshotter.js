// eslint-disable-next-line import/no-extraneous-dependencies
import htzTheme from '@haaretz/htz-theme';
import { createRenderer, StyleProvider, } from '@haaretz/fela-utils';
import createFelaSnapshotter from '../utils/createFelaSnapshotter';

const testRenderer = createRenderer({ isRtl: true, });
const felaSnapshotter = createFelaSnapshotter(
  StyleProvider,
  testRenderer,
  htzTheme
);

export default felaSnapshotter;
