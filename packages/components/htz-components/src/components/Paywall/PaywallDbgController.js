/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import PaywallDataProvider from './PaywallDataProvider';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';

class PaywallDbgController extends React.Component {
  static propTypes = {
    initialData: PropTypes.shape({
      slotLocation: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      confirm: PropTypes.shape({
        text: PropTypes.string,
        url: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    paywallData: this.props.initialData,
  }

  componentDidMount() {
    const paywall = {
      update: this.update,
    };
    if (typeof window !== 'undefined') {
      window.paywall = paywall;
    }
  }

  update = (field, value) => {
    this.setState(state => ({
      paywallData: {
        ...state.paywallData,
        [field]: value,
      },
    }));
  }

  render() {
    console.log('[PaywallDbgController] render. state:', this.state);
    return (
      <ApolloConsumer>
        {
          client => {
            client.writeData({
              data: {
                paywall: this.state.paywallData,
              },
            });
            return null;
          }
        }
      </ApolloConsumer>
    );
  }
}


const PaywallDbgControllerWithData = props => (
  <PaywallDataProvider>
    {
      paywallData => (
        <PaywallDbgController initialData={paywallData} {...props} />
      )
    }
  </PaywallDataProvider>
);

export default PaywallDbgControllerWithData;
