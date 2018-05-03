import { createComponent, } from 'react-fela';

const rippleStyle = ({ isActive, theme, bgColor, }) => ({
  position: 'absolute',

  height: '8rem',
  width: '8rem',
  end: '50%',
  top: '50%',
  borderRadius: '50%',
  backgroundColor: bgColor,
  display: 'block',
  opacity: 0,
  ...(isActive
    ? {
      animationDuration: '0.5s',
      animationDirection: 'alternate',
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
    : {}),
});

export default createComponent(rippleStyle);
