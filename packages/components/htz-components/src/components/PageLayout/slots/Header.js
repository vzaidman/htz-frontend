import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

import Osaka from '../../Osaka/OsakaController';
import getComponent from '../../../utils/componentFromInputTemplate';

const propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
  /**
   * The elements composing the page’s header.
   */
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Header({ content, articleId, }) {
  return (
    <Fragment>
      {content &&
        content.map(element => {
          const Element =
            element.inputTemplate === 'com.tm.GridElementGroup'
              ? Osaka
              : getComponent(element.inputTemplate);
          return (
            <Element
              key={element.contentId}
              {...element}
              articleId={articleId}
            />
          );
        })}
    </Fragment>
  );
}

Header.propTypes = propTypes;

export default Header;
