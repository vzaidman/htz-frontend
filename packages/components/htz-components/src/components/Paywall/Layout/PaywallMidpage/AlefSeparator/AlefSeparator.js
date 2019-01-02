import React from 'react';
import { FelaComponent, } from 'react-fela';
import IconAlef from '../../../../Icon/icons/IconAlefLogoTransparent';
import Separator from './Separator';


export default function AlefSeparator({ innerMargin, outerMargin, color, }) {
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
