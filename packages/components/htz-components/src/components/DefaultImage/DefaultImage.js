// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { aspectRatios, } from '../Image/Image';

type Transforms = { aspect?: string, width?: number, height?: number, };
type Props = {
  transforms: Transforms | ComponentPropResponsiveObject<Transforms>[],
};

const style = ({ theme, transforms, }) => ({
  backgroundColor: theme.color('neutral', '-5'),
  height: 0,
  extend: [ parseComponentProp('aspect', transforms, theme.mq, setAspect), ],
});

function setAspect(prop, transforms) {
  const { aspect, width, height, } = transforms;
  if (!aspect && !(width && height)) {
    throw new Error(
      'DefaultImage must get either a aspect prop or both width and height props or all three'
    );
  }
  const aspectRatio = width && height ? { width, height, } : aspectRatios[aspect];

  const paddingPercentage = (aspectRatio.height / aspectRatio.width) * 100;
  return {
    paddingTop: `${paddingPercentage}%`,
  };
}

export default function DefaultImage({ transforms, }: Props) {
  return <FelaComponent rule={style} transforms={transforms} />;
}
