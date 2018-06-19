import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import CreditCardIframe from './CreditCardIframeStageElements/CreditCardIframe';
import SecurePaymentLine from './Elements/SecurePaymentLine';
import PaymentSummary from './StagePaymentElements/PaymentSummary';

const propTypes = {
  chosenSubscription: PropTypes.string.isRequired,
  chosenPaymentArrangement: PropTypes.string.isRequired,
  chosenProductContentName: PropTypes.string.isRequired,
  firstPaymentAmount: PropTypes.number.isRequired,
  nextPaymentAmount: PropTypes.number.isRequired,
  creditGuardSrc: PropTypes.string.isRequired,
  paymentData: PropTypes.shape({}).isRequired,
};

const defaultProps = {};

const contStyle = theme => ({
  textAlign: 'center',
  marginInlineStart: '2rem',
  marginInlineEnd: '2rem',
  marginBottom: '36rem',
  extend: [ theme.mq({ until: 'm', }, { marginBottom: '10rem', }), ],
});
const innerContStyle = {
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  maxWidth: '80rem',
};

const secureLineContStyle = {
  width: '60%',
  marginRight: 'auto',
  marginLeft: 'auto',
};

function CreditCardIframeStage({
  chosenSubscription,
  chosenPaymentArrangement,
  chosenProductContentName,
  firstPaymentAmount,
  nextPaymentAmount,
  creditGuardSrc,
  paymentData,
}) {
  return (
    <FelaComponent style={contStyle}>
      <FelaComponent style={innerContStyle}>
        <PaymentSummary
          chosenSubscription={chosenSubscription}
          chosenPaymentArrangement={chosenPaymentArrangement}
          firstPaymentAmount={firstPaymentAmount}
          nextPaymentAmount={nextPaymentAmount}
        />
        <CreditCardIframe
          creditGuardSrc={creditGuardSrc}
          paymentData={paymentData}
          chosenProductContentName={chosenProductContentName}
          chosenPaymentArrangement={chosenPaymentArrangement}
        />
        <FelaComponent style={secureLineContStyle}>
          <SecurePaymentLine />
        </FelaComponent>
      </FelaComponent>
    </FelaComponent>
  );
}

CreditCardIframeStage.propTypes = propTypes;

CreditCardIframeStage.defaultProps = defaultProps;

export default CreditCardIframeStage;
