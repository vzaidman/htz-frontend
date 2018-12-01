/* global window */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import MainLayout from '../../layouts/MainLayout';
import ChangePaymentCreditGuardIframe from '../../components/OfferPage/Stages/CreditCardIframeStageElements/ChangePaymentCreditGuardIframe';

const products = [
  '243', // htz
  '273', // tm
  '239', // hdc
  '274', // htz-tm
];

export default function PaymentChangePage(props) {
  // eslint-disable-next-line react/prop-types
  const { productId, } = (props.url && props.url.query) || {};
  const isLegitProd = products.includes(productId || '-99');

  return (
    <MainLayout displayBackButton={false}>
      {isLegitProd ? (
        <ChangePaymentCreditGuardIframe productId={productId} />
      ) : (
        <FelaComponent
          style={theme => ({
            marginTop: '3rem',
            textAlign: 'center',
            extend: [ theme.type(3), ],
          })}
          render={({ theme, className, }) => (
            <div className={className}>Ilegal product</div>
          )}
        />
      )}
    </MainLayout>
  );
}
