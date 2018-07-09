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

PlusClose.propTypes = {
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
   * The thickness of each line (in **px**)
   */
  thickness: PropTypes.number,
};

PlusClose.defaultProps = {
  color: [ 'neutral', 'base', ],
  size: 2,
  thickness: 2,
};

const setColor = (prop, value, getColor) => {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
};

const plusCloseDashStyle = (theme, isOpen, color, size, thickness) => ({
  height: `${thickness}px`,
  width: `${size}rem`,
  position: 'absolute',
  transition: 'transform .5s',
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
      ]),
  ],
});

const plusCloseStyle = ({ theme, isOpen, color, size, thickness, }) => ({
  ...plusCloseDashStyle(theme, isOpen, color, size, thickness),
  display: 'inline-block',
  left: '50%',
  margin: '0 auto',
  top: '50%',
  transform: `translate(-50%, -50%) rotate(${isOpen ? 45 : 0}deg)`,
  ':after': {
    ...plusCloseDashStyle(theme, isOpen, color, size, thickness),
    transform: `translateY(-${size / 3.33}rem) rotate(${isOpen ? -95 : 90}deg)`,
    left: '0',
    top: `${size / 3.34}rem`,
    content: '""',
  },
});

export default function PlusClose(props) {
  return (
    <FelaComponent
      {...props}
      rule={plusCloseStyle}
      render={({ className, }) => <i className={className} />}
    />
  );
}
