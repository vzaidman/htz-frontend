import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';

const propTypes = {
  stage: PropTypes.number,
};

const defaultProps = {
  stage: null,
};

const stagesCounterStyle = theme => ({
  textAlign: 'center',
  paddingTop: '4rem',
  fontWeight: 'bold',
  color: theme.color('stagesCounter', 'step'),
  extend: [ theme.type(-1), ],
});

function StageCounter({ stage, }) {
  return (
    <FelaComponent
      style={stagesCounterStyle}
      render={({
        className,
        theme: {
          offerPage: {
            stagesCounter: { beforeCounter, afterCounter, debtTxt, },
          },
        },
      }) => (
        <h3 className={className}>
          {stage ? (
            <Fragment>
              {beforeCounter} {stage} {afterCounter}
            </Fragment>
          ) : (
            debtTxt
          )}
        </h3>
      )}
    />
  );
}

StageCounter.propTypes = propTypes;
StageCounter.defaultProps = defaultProps;

export default StageCounter;
