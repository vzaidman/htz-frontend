/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const propTypes = {
  headerElements: PropTypes.arrayOf(
    PropTypes.oneOf([ PropTypes.string, PropTypes.element, ])
  ).isRequired,
};

const defaultProps = {};

const headerStyle = theme => ({
  fontWeight: 'normal',
  maxWidth: '65rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  extend: [
    theme.type(2, { untilBp: 's', }),
    theme.type(3, { fromBp: 's', untilBp: 'l', }),
    theme.type(3, { fromBp: 'l', }),
    theme.mq(
      { until: 's', },
      { paddingInlineStart: '4rem', paddingInlineEnd: '4rem', }
    ),
  ],
});

function StageHeader({ headerElements, }) {
  return (
    <FelaComponent style={{ textAlign: 'center', }}>
      <FelaComponent
        style={headerStyle}
        render={({ className, }) => (
          <h1 className={className}>
            {headerElements.map(element => (
              <FelaComponent style={{ display: 'block', }}>
                {element}
              </FelaComponent>
            ))}
          </h1>
        )}
      />
    </FelaComponent>
  );
}

StageHeader.propTypes = propTypes;
StageHeader.defaultProps = defaultProps;

export default StageHeader;
