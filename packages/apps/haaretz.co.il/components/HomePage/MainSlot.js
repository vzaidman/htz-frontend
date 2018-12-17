// @flow
import * as React from 'react';
import { List, } from '@haaretz/htz-components';

type Props = {
  main: { inputTemplate: string, contentId: string, properties: {}, }[],
};

function HomePageSlotsLayout({ main, }: Props): React.Node {
  return (
    <div>
      ??
      {main.map(
        element => (element && element.inputTemplate === 'com.tm.element.List' ? (
          <List key={element.contentId} {...element} />
        ) : (
          <div>not list</div>
        ))
      )}
    </div>
  );
}

export default HomePageSlotsLayout;
