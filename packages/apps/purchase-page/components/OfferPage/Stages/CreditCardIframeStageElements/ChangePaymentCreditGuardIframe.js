import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Router from 'next/router';
import config from 'config';
import CreditCardIframe from './CreditCardIframe';

const paymentService = config.get('service.payment');

function buildCreditGuardSrc(productId) {
  return `${paymentService}/cgPayment?cgtype=payment_change_heb&productID=${productId}`;
}

const iframeWrapperStyle = {
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  maxWidth: '80rem',
  textAlign: 'center',
};

const introStyle = theme => ({
  paddingTop: '6rem',
  textAlign: 'center',
  extend: [ theme.type(0, { untilBp: 's', }), theme.type(1, { fromBp: 's', }), ],
});

export default function ChangePaymentCreditGuardIframe({ productId, }) {
  return (
    <FelaComponent style={iframeWrapperStyle}>
      <FelaComponent
        style={introStyle}
        render={({ theme, className, }) => (
          <p className={className}>{theme.changePayment.userInstructions}</p>
        )}
      />

      <CreditCardIframe
        creditGuardSrc={buildCreditGuardSrc(productId)}
        onMessage={evt => {
          const msgData = evt.data;
          if (msgData.type === 'cgmessage') {
            switch (msgData.command) {
              case 'thank_user':
                console.log('payment change. thank user.', msgData);
                Router.replace('/payment-change/thankYou');
                break;
              default:
                break;
            }
          }
        }}
      />
    </FelaComponent>
  );
}

ChangePaymentCreditGuardIframe.propTypes = {
  productId: PropTypes.number.isRequired,
};
