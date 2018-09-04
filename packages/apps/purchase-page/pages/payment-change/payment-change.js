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

// eslint-disable-next-line react/prop-types
export default function PaymentChangePage(props) {
  const isLegitProd = products.includes(props.url.query.productId || '-99');

  return (
    <MainLayout displayBackButton={false}>
      { isLegitProd ?
        (
          <ChangePaymentCreditGuardIframe
            productId={props.url.query.productId}
          />
        ) : (
          <FelaComponent
            style={theme => ({
              marginTop: '3rem',
              textAlign: 'center',
              extend: [ theme.type(3), ],
            })}
            render={({ theme, className, }) => (
              <div className={className}>Ilegal product</div>
              )
            }
          />
        )
      }
    </MainLayout>
  );
}
