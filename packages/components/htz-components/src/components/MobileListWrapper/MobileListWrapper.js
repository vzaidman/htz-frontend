// @flow
import React from 'react';

import type { ComponentType, } from 'react';

import Media from '../Media/Media';
import getComponent from '../../utils/componentFromInputTemplate';

type Props = {
  lists: Array<Object>,
};

function MobileListWrapper({ lists, }: Props) {
  return (
    <Media
      query={{ until: 's', }}
      render={() =>
        lists.map(list => {
          const Element: ComponentType<Object> = getComponent(
            list.inputTemplate
          );
          return <Element key={list.contentId} {...list} />;
        })
      }
    />
  );
}

export default MobileListWrapper;
