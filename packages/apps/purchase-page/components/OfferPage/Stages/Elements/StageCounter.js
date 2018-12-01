import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { H, Query, } from '@haaretz/htz-components';

const GET_STARTING_STAGE = gql`
  query {
    startFromStage2 @client
  }
`;

const propTypes = {
  stage: PropTypes.number,
};

const defaultProps = {
  stage: null,
};

const stagesCounterStyle = theme => ({
  textAlign: 'center',
  paddingTop: '6rem',
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
        <Query query={GET_STARTING_STAGE}>
          {({ data: { startFromStage2, }, }) => (
            <H className={className}>
              {stage ? (
                <Fragment>
                  {beforeCounter}
                  {' '}
                  {startFromStage2 ? stage - 1 : stage}
                  {' '}
                  {afterCounter(startFromStage2)}
                </Fragment>
              ) : (
                debtTxt
              )}
            </H>
          )}
        </Query>
      )}
    />
  );
}

StageCounter.propTypes = propTypes;
StageCounter.defaultProps = defaultProps;

export default StageCounter;
