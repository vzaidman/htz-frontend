import React, { PureComponent, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer, } from 'react-apollo';
import { GET_USER, } from '../User/UserInjector';
import { doStatAction, } from './statutil';

const propTypes = {
  /** Indicates rendered JSX wrapped */
  children: PropTypes.func.isRequired,
};
const defaultProps = {};
const getActionWithQuery = client => async action => {
  const { data, } = await client.query({
    query: GET_USER,
  });
  // console.log(
  //   'logging BIAction for',
  //   action,
  //   'with client that can make queries on demand: ',
  //   client,
  //   ' user fetched from apollo was: ',
  //   data.user
  // );
  return doStatAction(action, data.user);
};

class BIAction extends PureComponent {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Fragment>{this.props.children(getActionWithQuery(client))}</Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

BIAction.propTypes = propTypes;
BIAction.defaultProps = defaultProps;

export default BIAction;
