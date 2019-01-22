import React from 'react';
import PropTypes from 'prop-types';
import { LevelConsumer, } from './LevelContext';

H.propTypes = {
  /**
   * The offset from the calculated heading level.
   * e.g: the calculated level is 3 and the offset is 1, the heading level will be 4.
   * The offset can be negative.
   * The final Heading level can be between 2 and 6,
   * e.g the calculated level is 10, the heading level will be 6.
   */
  offset: PropTypes.number,
  /** Forces the generated element to be an H1 */
  isH1: PropTypes.bool,
};

H.defaultProps = {
  offset: 0,
  isH1: false,
};
function H({ offset, isH1, ...props }) {
  return (
    <LevelConsumer>
      {level => {
        const hLevel = isH1
          ? 1
          : Math.max(Math.min(Math.round(level + offset), 6), 2);
        const Heading = `h${hLevel}`;
        return <Heading {...props} />;
      }}
    </LevelConsumer>
  );
}
export default H;
