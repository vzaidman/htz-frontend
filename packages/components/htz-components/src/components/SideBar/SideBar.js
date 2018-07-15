import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import WrappedScroll from '../Scroll/Scroll';
import getComponent from '../../utils/componentFromInputTemplate';

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
    <FelaComponent
      style={{
        position: 'sticky',
        width: '100%',
        top: '12px',
        zIndex: '1',
        paddingInlineStart: '4rem',
        paddingInlineEnd: '4rem',
      }}
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
  );
}

SideBar.propTypes = propTypes;

export default SideBar;
