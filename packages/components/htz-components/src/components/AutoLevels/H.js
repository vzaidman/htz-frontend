import React from 'react';
import PropTypes from 'prop-types';
import { LevelConsumer, } from './LevelContext';

H.propTypes = {
  /**
   * The offSet from the calculated heading level.
   * e.g: the calculated level is 3 and the offSet is 1, the heading level will be 4.
   * The offSet can be negative.
   * The final Heading level can be between 1 and 6,
   * e.g the calculated level is 10, the heading level will be 6.
   */
  offSet: PropTypes.number,
};

H.defaultProps = {
  offSet: 0,
};
function H({ offSet, ...props }) {
  return (
    <LevelConsumer>
      {level => {
        const hLevel = Math.max(Math.min(Math.round(level + offSet), 6), 1);
        const Heading = `h${hLevel}`;
        return <Heading {...props} />;
      }}
    </LevelConsumer>
  );
}
export default H;
