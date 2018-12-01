import React from 'react';
import PropTypes from 'prop-types';
import FelaComponent from 'react-fela/lib/FelaComponent';
import Observer from 'react-intersection-observer';

const animate = theme => ({
  ...theme.getDuration('animation', 8),
  animationName: [
    {
      '0%': { opacity: 0, },
      '100%': { opacity: 1, },
    },
  ],
});

const createRule = mediaQuery => ({ theme, isActive, }) => theme.mq(mediaQuery, {
  ...(isActive ? animate(theme) : { opacity: 0, }),
});

const FadeinViewport = ({ threshold, mediaQuery, children, }) => (
  <Observer threshold={threshold} triggerOnce>
    {
      inView => (
        <FelaComponent rule={createRule(mediaQuery)} isActive={inView}>
          {children}
        </FelaComponent>
      )
    }
  </Observer>
);

FadeinViewport.defaultProps = {
  threshold: 0,
  mediaQuery: null,
};

FadeinViewport.propTypes = {
  threshold: PropTypes.number,
  /* eslint react/forbid-prop-types: 0 */
  mediaQuery: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


export default FadeinViewport;
