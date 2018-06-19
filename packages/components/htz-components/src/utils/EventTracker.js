import React, { PureComponent, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer, } from 'react-apollo';
// import gql from 'graphql-tag';
import ReactGA from 'react-ga';
import { GET_USER, } from '../components/User/UserInjector';
import { doStatAction, } from '../components/BI/statutil';

const propTypes = {
  /** Indicates rendered JSX wrapped */
  children: PropTypes.func.isRequired,
};
const defaultProps = {};

const getBIActionWithQuery = client => async BIaction => {
  const { data, } = await client.query({
    query: GET_USER,
  });
  return doStatAction(BIaction, data.user);
};

const getGaActionWithQuery = () => async gaAction => {
  const { category, action, label, } = gaAction;
  return ReactGA.event({
    category,
    action,
    label,
  });
};

class EventTracker extends PureComponent {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Fragment>
            {this.props.children({
              HtzReactGA: ReactGA,
              biAction: getBIActionWithQuery(client),
              gaAction: getGaActionWithQuery(client),
              gaMapper: {
                productId: {
                  243: 'haaretz',
                  273: 'themarker',
                  274: 'dual',
                },
              },
            })}
          </Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

EventTracker.propTypes = propTypes;
EventTracker.defaultProps = defaultProps;

export default EventTracker;
