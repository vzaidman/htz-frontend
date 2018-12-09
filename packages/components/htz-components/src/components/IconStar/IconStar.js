import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import PropTypes from 'prop-types';
import React from 'react';

import setColor from '../../utils/setColor';

IconStar.propTypes = {
  /**
   * Can be a the fontSize number in rem's, or a responsive array of values
   * parsed by parseComponentProp
   *
   * A number represents a value in rems, while a string may be useful
   * for setting `inherit` or `unset`.
   */
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  rightColor: PropTypes.arrayOf(PropTypes.string),
  leftColor: PropTypes.arrayOf(PropTypes.string),
};

IconStar.defaultProps = {
  size: 3,
  rightColor: [ 'primary', ],
  leftColor: [ 'primary', ],
};

const style = ({ theme, size, }) => ({
  extend: [ parseComponentProp('size', size, theme.mq, setSize), ],
});

function setSize(size, value) {
  return {
    fontSize: typeof value === 'number' ? `${value}rem` : value,
  };
}
function IconStar({ size, rightColor, leftColor, }) {
  return (
    <FelaComponent
      size={size}
      rule={style}
      render={({ theme, className, }) => (
        <svg
          className={className}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <FelaComponent
            rightColor={rightColor}
            rule={({ theme, rightColor, }) => ({
              extend: [
                parseComponentProp(
                  'fill',
                  rightColor,
                  theme.mq,
                  setColor,
                  theme.color
                ),
              ],
            })}
            render={({ className: rightClassName, }) => (
              <path
                className={rightClassName}
                d="M246.8 99.5c-.8-2.6-3.4-4.3-7.7-4.9L167 83.4 135 15c-1-1.8-2.1-3.3-3.3-4.4s-2.5-1.5-3.7-1.5V209.8l64.2 35.3 3.3 1.4c.9.3 1.9.5 2.8.5 2 0 3.7-.9 4.6-2.8.9-1.9 1.2-4.5.9-7.9l-12.6-74.7 52-53c3.2-3.4 4.4-6.5 3.6-9.1z"
              />
            )}
          />
          <FelaComponent
            leftColor={leftColor}
            rule={({ theme, leftColor, }) => ({
              extend: [
                parseComponentProp(
                  'fill',
                  leftColor,
                  theme.mq,
                  setColor,
                  theme.color
                ),
              ],
            })}
            render={({ className: leftClassName, }) => (
              <path
                className={leftClassName}
                d="M10.2 99.5c.8-2.6 3.4-4.3 7.7-4.9L90 83.4 122 15c1-1.8 2.1-3.3 3.3-4.4 1.2-1.1 2-1.7 3.7-1.4V209.8l-64.2 35.3-3.3 1.4c-.9.3-1.9.5-2.8.5-2.1 0-3.7-.9-4.6-2.8-.9-1.9-1.2-4.5-.9-7.9l12.6-74.7-52.1-53c-3.1-3.4-4.3-6.5-3.5-9.1z"
              />
            )}
          />
        </svg>
      )}
    />
  );
}

export default IconStar;
