import React, { Component, } from 'react';
import { Query, } from 'react-apollo';
import { GET_USER, } from '../User/UserInjector';
import { doStat, } from './statutil';

class BIRequest extends Component {
  state = { shouldRender: false, };

  componentDidMount() {
    if (!this.state.shouldRender) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
    }
  }
  render() {
    if (this.state.shouldRender) {
      return (
        <Query query={GET_USER}>
          {({ loading, error, data, }) => {
            if (loading) return null;
            if (error) return null;
            doStat(data.user);
            return null;
          }}
        </Query>
      );
    }
    return null;
  }
}

BIRequest.defaultProps = {};

export default BIRequest;
