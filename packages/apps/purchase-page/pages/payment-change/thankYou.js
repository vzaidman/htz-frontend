import React from 'react';
import { FelaComponent, } from 'react-fela';
import { IconCheck, } from '@haaretz/htz-components';
import MainLayout from '../../layouts/MainLayout';

export default function PaymentChangeThankYouPage(props) {
  return (
    <MainLayout isThankYou displayBackButton={false}>
      <FelaComponent style={{
        marginTop: '4rem',
        marginInlineStart: 'auto',
        marginInlineEnd: 'auto',
        maxWidth: '80rem',
        textAlign: 'center',
      }}
      >
        <IconCheck color="positive" size={10} />
        <FelaComponent
          style={theme => ({
            marginTop: '3rem',
            extend: [ theme.type(3), ],
          })}
          render={({
            className,
            theme: {
              changePayment: { thankYou, },
            },
          }) => (
            <div className={className}>
              <p>{thankYou}</p>
            </div>
          )}
        />
      </FelaComponent>
    </MainLayout>
  );
}
