import React from 'react';
import dynamic from 'next/dynamic';

import getComponent from '../../../utils/componentFromInputTemplate';

const Osaka = dynamic(import('../../Osaka/OsakaController'), { ssr: false, });

function Header({ content, }) {
  return content.map(element => {
    const Element =
      element.inputTemplate === 'com.tm.GridElementGroup'
        ? Osaka
        : getComponent(element.inputTemplate);
    return <Element key={element.contentId} {...element} />;
  });
}

export default Header;
