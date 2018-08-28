import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import { Query, } from '../ApolloBoundary/ApolloBoundary';
import WrappedScroll from '../Scroll/Scroll';
import getComponent from '../../utils/componentFromInputTemplate';

const IS_OSAKA_DISPLAYED = gql`
  query IsOsakaDisplayed {
    isOsakaDisplayed @client
  }
`;
const propTypes = {
  /**
   * An array of children.
   */
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

/**
 * The content of this component consists from `com.tm.element.group` types of elements
 * (see query at /htz-components/src/components/PageLayout/queries/standard_article.js, line 30).
 * each element has its 'display duration' (without it it won't pass through papi) which determines
 * for how long (in pixels) the element should appear on the page.
 */
function SideBar({ content, }) {
  return (
    <Query query={IS_OSAKA_DISPLAYED}>
      {({ data: { isOsakaDisplayed, }, }) => (
        <FelaComponent
          style={theme => ({
            position: 'sticky',
            width: '100%',
            top: isOsakaDisplayed ? '20rem' : '2rem',
            zIndex: '1',
            paddingInlineStart: '4rem',
            paddingInlineEnd: '4rem',
            paddingBottom: '4rem',
            transitionProperty: 'top',
            extend: [
              theme.getDelay('transition', -1),
              theme.getDuration('transition', -1),
              theme.getTimingFunction('transition', 'linear'),
            ],
          })}
        >
          <WrappedScroll
            render={({ y, }) =>
              content.map(element => {
                const Element = getComponent(element.inputTemplate);
                const { properties, ...elementWithoutProperties } = element;
                return (
                  <Element
                    scrollY={y}
                    key={element.contentId}
                    {...elementWithoutProperties}
                    {...properties}
                  />
                );
              })
            }
          />
        </FelaComponent>
      )}
    </Query>
  );
}

SideBar.propTypes = propTypes;

export default SideBar;
