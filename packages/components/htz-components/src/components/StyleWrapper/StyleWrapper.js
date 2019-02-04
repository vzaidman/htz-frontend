// @flow
import React from 'react';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';

import type { Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';

import getComponent from '../../utils/componentFromInputTemplate';

type Props = {
  items: Array<any>,
  miscStyles: StyleProps,
  inputTemplate: string,
  contentId: string,
}

function StyleWrapper({ items, miscStyles, }: Props): Node {
  return (
    <FelaComponent
      style={theme => ({
        extend: [
          ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
        ],
      })}
    >
      {items.map(item => {
        const Element = getComponent(item.kind || item.inputTemplate);
        return <Element {...item} />;
      })}
    </FelaComponent>
  );
}

export default StyleWrapper;
