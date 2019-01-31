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
  /**
   * The page type 'regularArticle' | 'homepage' | 'section'...
   */
  pageType: PropTypes.string.isRequired,
  /**
   * the background color passed to the LayoutRow component.
   */
  rowBgc: PropTypes.string,
  logo: PropTypes.element.isRequired,
};

const defaultProps = {
  rowBgc: null,
};

function Header({ pageType, content, articleId, rowBgc, logo, }) {
  return (
    <Fragment>
      {content
        ? content.map(element => {
          const Element = element.inputTemplate === 'com.tm.GridElementGroup'
            ? Osaka
            : getComponent(element.inputTemplate);
          return (
            <Element
              key={element.contentId}
              {...element}
              {...(element.inputTemplate === 'com.htz.EditableNavigationElement'
                ? {
                  pageType,
                  rowBgc,
                  logo,
                }
                : {})}
              articleId={articleId}
            />
          );
        })
        : null}
    </Fragment>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
