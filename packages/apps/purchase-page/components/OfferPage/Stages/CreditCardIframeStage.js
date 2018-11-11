/* global sessionStorage */
import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { FelaComponent, } from 'react-fela';
import { EventTracker, } from '@haaretz/htz-components';
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
        <EventTracker>
          {({ biAction, HtzReactGA, }) => (
            <CreditCardIframe
              biAction={biAction}
              creditGuardSrc={creditGuardSrc}
              onMessage={evt => {
                const msgData = evt.data;
                if (msgData.type === 'cgmessage') {
                  switch (msgData.command) {
                    case 'thank_user':
                      HtzReactGA.ga('ec:addProduct', {
                        id: paymentData.saleCode,
                        name: `${chosenPaymentArrangement}-${chosenProductContentName}`,
                        brand: `salecode[${paymentData.saleCode}]`,
                        price: paymentData.prices[0].toString(),
                        variant: `promotionNumber-${paymentData.promotionNumber}`,
                        quantity: 1,
                      });
                      HtzReactGA.ga('ec:setAction', 'purchase', {
                        id: `${Math.floor(Math.random() * 1000000000000)}`, // (Required) Transaction id (string).
                        list: 'Product Stage Results',
                        revenue: paymentData.prices[0].toString(),
                        coupon: paymentData.saleCode,
                      });
                      HtzReactGA.ga('send', 'pageview');
                      sessionStorage.setItem('userProduct', msgData.data.pid);
                      Router.replace(
                        `/promotions-page/thankYou?msg=thank_user&product=${msgData.data.pid}`
                      );
                      break;

                    case 'purchase_clicked':
                      // const userdata = PromotionsUtil.getUserData();
                      // const additionalInfo = {
                      //   promotionsNumber: userdata.selectedOffer.promotionNumber,
                      //   productID: userdata.selectedOffer.productId,
                      //   saleCode: userdata.selectedOffer.saleCode,
                      // };
                      // StatUtil.doAction('37', additionalInfo);
                      // if (window.track) {
                      //   const action = `subscription${window.userSelectedMonthly ? ' monthly' : ' yearly'}`;
                      //   const label = `Subscribe button${
                      //     window.userSwitchedFromMonthlyToYearly ? ' from try yearly' : ''
                      //   }`;
                      //   window.track('Promotions - subscription', action, label);
                      // }
                      // GaTm.eventManager.fireButtonClickEvent({ event: 'promotions_offer-creditguard_payment', });
                      break;
                    default:
                      break;
                  }
                }
              }}
            />
          )}
        </EventTracker>

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
