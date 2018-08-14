import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';

const colorShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

const colorPropObj = PropTypes.oneOfType([
  colorShape,
  PropTypes.arrayOf(
    PropTypes.shape({
      ...responsivePropBaseType,
      value: colorShape,
    })
  ),
]);

const propTypes = {
  /**
   * Defines the color of this animated icon.
   * Accepts string, array (with variant and shade) or an object (with brake points).
   * You can even pass an object with **open** & **close** keys if you'd
   * like different colors for each state.
   */
  color: PropTypes.oneOfType([
    PropTypes.shape({
      close: colorPropObj,
      open: colorPropObj,
    }),
    colorPropObj,
  ]),
  /**
   * The state of the Icon.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * The size of the Icon (in **rem**).
   */
  size: PropTypes.number,
  /**
   * The thickness of each line (in **px**).
   */
  thickness: PropTypes.number,
  /**
   * Transition for the icon: theme.getTransition(1, swiftOut).
   */
  isTransition: PropTypes.bool,
};

const defaultProps = {
  color: [ 'neutral', 'base', ],
  size: 2,
  thickness: 2,
  isTransition: false,
};

const setColor = (prop, value, getColor) => {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
};

const hamburgerDashStyle = (
  theme,
  isOpen,
  color,
  size,
  thickness,
  isTransition,
  main = false
) => ({
  height: `${thickness}px`,
  width: `${size}rem`,
  position: 'absolute',
  transition: 'transform .5s',
  extend: [
    isTransition ? theme.getTransition(1, 'swiftOut') : {},
    ...(isOpen
      ? !main
        ? [
          parseComponentProp(
            'backgroundColor',
            color.open || color.close || color,
            theme.mq,
            setColor,
            theme.color
          ),
        ]
        : []
      : [
        parseComponentProp(
          'backgroundColor',
          color.close || color.open || color,
          theme.mq,
          setColor,
          theme.color
        ),
      ]),
  ],
});

const hamburgerStyle = ({
  theme,
  isOpen,
  color,
  size,
  thickness,
  isTransition,
}) => ({
  ...(isOpen ? { background: 'none', } : {}),
  ...hamburgerDashStyle(
    theme,
    isOpen,
    color,
    size,
    thickness,
    isTransition,
    true
  ),
  display: 'inline-block',
  left: '50%',
  margin: '0 auto',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: '1',
  ':before': {
    ...hamburgerDashStyle(theme, isOpen, color, size, thickness, isTransition),
    ...(isOpen
      ? { transform: `translateY(${size / 3.33}rem) rotate(45deg)`, }
      : {}),
    left: '0',
    top: `-${size / 3.33}rem`,
    content: '""',
  },
  ':after': {
    ...hamburgerDashStyle(theme, isOpen, color, size, thickness, isTransition),
    ...(isOpen
      ? {
        transform: `translateY(-${size / 3.33}rem) rotate(-45deg)`,
      }
      : {}),
    left: '0',
    top: `${size / 3.33}rem`,
    content: '""',
  },
});

function Hamburger(props) {
  return (
    <FelaComponent
      {...props}
      rule={hamburgerStyle}
      render={({ className, }) => <i className={className} />}
    />
  );
}

Hamburger.propTypes = propTypes;
Hamburger.defaultProps = defaultProps;

export default Hamburger;
