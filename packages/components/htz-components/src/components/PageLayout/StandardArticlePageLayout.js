import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

import LayoutRow from './LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from './LayoutContainer'; // eslint-disable-line import/no-named-as-default

import getComponent from '../../utils/componentFromInputTemplate';
import Main from './slots/Main';

const propTypes = {
  /**
   * Article's slots content.
   */
  slots: PropTypes.shape({
    preHeader: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.arrayOf(PropTypes.object),
    postHeader: PropTypes.arrayOf(PropTypes.object),
    postMain: PropTypes.arrayOf(PropTypes.object),
    footer: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
};

const StandardArticlePageLayout = ({
  slots: { preHeader, header, postHeader, postMain, footer, },
  articleId,
}) => {
  const getElements = slot =>
    slot.map(element => {
      const Element = getComponent(element.inputTemplate);
      return (
        <Element key={element.contentId} articleId={articleId} {...element} />
      );
    });

  return (
    <Fragment>
      <LayoutRow>
        <LayoutContainer>{preHeader && getElements(preHeader)}</LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>{header && getElements(header)}</LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>
          {postHeader && getElements(postHeader)}
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>
          <Main articleId={articleId} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow>{postMain && getElements(postMain)}</LayoutRow>
      <LayoutRow>{footer && getElements(footer)}</LayoutRow>
    </Fragment>
  );
};

StandardArticlePageLayout.propTypes = propTypes;

export default StandardArticlePageLayout;
