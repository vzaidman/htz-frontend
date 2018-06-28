import React, { Fragment, } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

// import Masthead from '../../Masthead/Masthead';
import getComponent from '../../../utils/componentFromInputTemplate';

const Osaka = dynamic(import('../../Osaka/OsakaController'), { ssr: false, });

const propTypes = {
  /**
   * The elements composing the page’s header.
   */
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Header({ content, }) {
  return (
    <Fragment>
      {content &&
        content.map(element => {
          const Element =
            element.inputTemplate === 'com.tm.GridElementGroup'
              ? Osaka
              : getComponent(element.inputTemplate);
          return <Element key={element.contentId} {...element} />;
        })}
    </Fragment>
  );
}

Header.propTypes = propTypes;

export default Header;
