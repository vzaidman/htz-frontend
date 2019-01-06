// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import IconAlef from '../../../../Icon/icons/IconAlefLogoTransparent';
import Separator from './Separator';

type Props = {
  innerMargin: string,
  outerMargin: string,
  color: string,
};

export default function AlefSeparator({ innerMargin, outerMargin, color, }: Props): React.Node {
  return (
    <FelaComponent
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color,
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Separator
        marginLeft={innerMargin}
        marginRight={outerMargin}
        color={color}
      />
      <IconAlef size={6} />
      <Separator
        color={color}
        marginLeft={outerMargin}
        marginRight={innerMargin}
      />
    </FelaComponent>
  );
}
