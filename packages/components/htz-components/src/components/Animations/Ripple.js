import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';

const rippleStyle = ({ isActive, theme, bgColor, bgNamedColor, time, }) => ({
  position: 'absolute',
  height: '3.5em',
  width: '3.5em',
  end: '50%',
  top: '50%',
  borderRadius: '50%',
  backgroundColor: bgColor,
  display: 'block',
  opacity: 0,
  pointerEvents: 'none',
  animationDirection: 'alternate',
  extend: [
    // Set background-color
    ...[
      bgNamedColor
        ? parseComponentProp(
          'backgroundColor',
          bgNamedColor,
          theme.mq,
          setColor,
          theme.color
        )
        : [],
    ],
    // eslint-disable-next-line eqeqeq
    theme.getDuration('animation', typeof time === 'undefined' ? 2 : time),
    isActive
      ? {
        animationName: [
          {
            '0%': {
              opacity: 0,
              transform: 'translate(-50%, -50%) scale(0)',
            },

            '50%': {
              opacity: '.3',
            },

            '70%': {
              transform: 'translate(-50%, -50%) scale(1)',
            },

            '100%': {
              opacity: 0,
              transform: 'translate(-50%, -50%) scale(0)',
            },
          },
        ],
      }
      : {},
  ],
});

export default React.forwardRef(({ children, ...props }, ref) => (
  <FelaComponent
    {...props}
    rule={rippleStyle}
    render={({ className, }) => (
      <div className={className} ref={ref}>
        {children}
      </div>
    )}
  />
));
