import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';

const colorShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

const propTypes = {
  /**
   * Defines the color of this animated icon.
   * Accepts string, array (with variant and shade) or an object (with brake points).
   * You can even pass an object with **open** & **close** keys if you'd
   * like different colors for each state.
   */
  color: PropTypes.oneOfType([
    colorShape,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: colorShape,
      })
    ),
  ]),
  /**
   * The direction of the animation.
   */
  direction: PropTypes.oneOf([
    'rtl',
    'rtu',
    'rtd',
    'dtu',
    'dtr',
    'dtl',
    'ltr',
    'ltd',
    'ltu',
    'utd',
    'utl',
    'utr',
  ]).isRequired,
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
};

const defaultProps = {
  color: [ 'neutral', 'base', ],
  size: 1.5,
  thickness: 2,
};

const setColor = (prop, value, getColor) => {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
};

const arrowDashStyle = (theme, isOpen, color, size, thickness) => ({
  height: `${thickness}px`,
  width: `${size}rem`,
  position: 'absolute',
  transition: 'all .5s',
  left: '50%',
  content: '""',
  extend: [
    ...(isOpen
      ? [
        parseComponentProp(
          'backgroundColor',
          color.open || color.close || color,
          theme.mq,
          setColor,
          theme.color
        ),
      ]
      : [
        parseComponentProp(
          'backgroundColor',
          color.close || color.open || color,
          theme.mq,
          setColor,
          theme.color
        ),
      ]
    ),
  ],
});

const getDirections = (direction, size) => {
  const { 0: start, 2: end, } = Array.from(direction);
  const position = {
    horizontal: {
      before: {
        x: '-50',
        y: size / 2,
      },
      after: {
        x: '-50',
        y: `-${size / 2}`,
      },
    },
    vertical: {
      before: {
        x: '-80',
        y: size / 4.5,
      },
      after: {
        x: '-20',
        y: `-${size / 4.5}`,
      },
    },
  };

  const directionMap = new Map([
    [
      'r', {
        rotation: {
          before: '45',
          after: '-45',
        },
        position: position.horizontal,
      },
    ],
    [
      'd', {
        rotation: {
          before: '45',
          after: '-45',
        },
        position: position.vertical,
      },
    ],
    [
      'l', {
        rotation: {
          before: '-45',
          after: '45',
        },
        position: position.horizontal,
      },
    ],
    [
      'u', {
        rotation: {
          before: '-45',
          after: '45',
        },
        position: position.vertical,
      },
    ],
  ]);

  return {
    start: directionMap.get(start),
    end: directionMap.get(end),
  };
};

const arrowStyle = ({ theme, isOpen, color, size, thickness, direction, }) => {
  const { start, end, } = getDirections(direction, size);
  return ({
    display: 'inline-block',
    ':before': {
      ...arrowDashStyle(theme, isOpen, color, size, thickness),
      bottom: `${50 + (size * 2.5)}%`,
      transform: `
        translateY(${
    isOpen
      ? end.position.before.y
      : start.position.before.y
    }rem) translateX(${
      isOpen
        ? end.position.before.x
        : start.position.before.x
    }%) rotate(${
      isOpen
        ? end.rotation.before
        : start.rotation.before
    }deg)
      `,
    },
    ':after': {
      ...arrowDashStyle(theme, isOpen, color, size, thickness),
      top: `${50 + (size * 2.5)}%`,
      transform: `
        translateY(${
    isOpen
      ? end.position.after.y
      : start.position.after.y
    }rem) translateX(${
      isOpen
        ? end.position.after.x
        : start.position.after.x
    }%) rotate(${
      isOpen
        ? end.rotation.after
        : start.rotation.after
    }deg)
      `,
    },
  });
};

function FlippingArrow(props) {
  return (
    <FelaComponent
      {...props}
      rule={arrowStyle}
      render={({ className, }) => (
        <i
          className={className}
        />
      )}
    />
  );
}

FlippingArrow.propTypes = propTypes;
FlippingArrow.defaultProps = defaultProps;

export default FlippingArrow;
