// eslint-disable-next-line import/no-extraneous-dependencies
import htzTheme from '@haaretz/htz-theme';
import createRenderer from '../utils/createRenderer';
import createFelaEnzymeRenderers from '../utils/createFelaEnzymeRenderers';

const testRenderer = createRenderer({ isRtl: true, });
const { felaMount, felaShallow, } = createFelaEnzymeRenderers(
  testRenderer,
  htzTheme
);

export { felaMount, felaShallow, };
