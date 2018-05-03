/* global window */

import { Component, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   *
   */
  creditGuardSrc: PropTypes.string.isRequired,
};

const defaultProps = {};

class PaymentStage extends Component {
  componentDidMount() {
    const payPalLink = `${this.props.creditGuardSrc}&paymentType=PayPal`;
    console.log('paypal credit guard src', payPalLink);
    window.location.href = payPalLink;
  }

  render() {
    return null;
  }
}

PaymentStage.propTypes = propTypes;

PaymentStage.defaultProps = defaultProps;

export default PaymentStage;
