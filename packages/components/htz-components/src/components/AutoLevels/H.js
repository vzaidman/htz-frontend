import React from 'react';
import PropTypes from 'prop-types';
import { LevelConsumer, } from './LevelContext';

H.propTypes = {
  /**
   * The offSet from the calculated heading level.
   * e.g: the calculated level is 3 and the offSet is 1, the heading level will be 4.
   * The offSet can be negative.
   * The final Heading level can be between 2 and 6,
   * e.g the calculated level is 10, the heading level will be 6.
   */
  offSet: PropTypes.number,
  /** Forces the generated element to be an H1 */
  isH1: PropTypes.bool,
};

H.defaultProps = {
  offSet: 0,
  isH1: false,
};
function H({ offSet, isH1, ...props }) {
  return (
    <LevelConsumer>
      {level => {
        const hLevel = isH1
          ? 1
          : Math.max(Math.min(Math.round(level + offSet), 6), 2);
        const Heading = `h${hLevel}`;
        return <Heading {...props} />;
      }}
    </LevelConsumer>
  );
}
export default H;
