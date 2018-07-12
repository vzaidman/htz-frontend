import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import WrappedScroll from '../Scroll/Scroll';
import getComponent from '../../utils/componentFromInputTemplate';

const propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

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
