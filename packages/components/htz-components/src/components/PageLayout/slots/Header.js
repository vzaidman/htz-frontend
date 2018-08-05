import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

// import Osaka from '../../Osaka/OsakaController';
import getComponent from '../../../utils/componentFromInputTemplate';

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
          const Element = getComponent(element.inputTemplate);
          return <Element key={element.contentId} {...element} />;
        })}
    </Fragment>
  );
}

Header.propTypes = propTypes;

export default Header;
