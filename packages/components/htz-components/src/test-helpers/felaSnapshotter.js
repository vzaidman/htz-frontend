import React from 'react';
import createRenderer from '../components/StyleProvider/createRenderer';
import StyleProvider from '../components/StyleProvider/StyleProvider';
import createFelaSnapshotter from './createFelaSnapshotter';

const testRenderer = createRenderer({ isRtl: true, });
const felaSnapshotter = createFelaSnapshotter(StyleProvider, testRenderer);

export default felaSnapshotter;
