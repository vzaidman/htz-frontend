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
   * The state of the Icon.
   */
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  color: [ 'neutral', 'base', ],
};

const setColor = (prop, value, getColor) => {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
};

const hamburgerDashStyle = (theme, isOpen, color) => ({
  height: '2px',
  transition: 'all .5s',
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

const hamburgerStyle = ({ theme, isOpen, color, }) => ({
  ...hamburgerDashStyle(theme, isOpen, color),
  display: 'inline-block',
  start: '0',
  margin: '0 auto',
  opacity: '1',
  transform: isOpen ? 'translateY(-1rem) rotate(90deg)' : 'translateY(-1rem)',
  width: '3.5rem',
  ':before': {
    ...hamburgerDashStyle(theme, isOpen, color),
    ...(isOpen && { transform: 'translate(1rem, -0.25rem) rotate(-180deg)', }),
    position: 'absolute',
    start: isOpen ? '1' : '0',
    top: '-1rem',
    content: '""',
    width: '3rem',
  },
  ':after': {
    ...hamburgerDashStyle(theme, isOpen, color),
    ...(isOpen && { transform: 'translate(-1rem, 0.25rem) rotate(180deg)', }),
    position: 'absolute',
    start: isOpen ? '-1' : '0',
    top: '1rem',
    content: '""',
    width: '2.5rem',
  },
});

function VerticalHamburger(props) {
  console.log(props);
  return (
    <FelaComponent
      {...props}
      rule={hamburgerStyle}
      render={({ className, }) => <i className={className} />}
    />
  );
}

VerticalHamburger.propTypes = propTypes;
VerticalHamburger.defaultProps = defaultProps;

export default VerticalHamburger;
