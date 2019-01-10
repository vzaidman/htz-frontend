import React from 'react';
import { FelaComponent, } from 'react-fela';
import { Button, LayoutRow, LayoutContainer, H, } from '@haaretz/htz-components';
import Illustration500 from './Illustration500';

export default function Error500() {
  return (
    <LayoutRow>
      <LayoutContainer
        miscStyles={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '10rem',
        }}
      >
        <Illustration500 size={85} />
        <FelaComponent style={{ textAlign: 'center', marginTop: '5rem', }}>
          <H>זה לא אתם זה אנחנו</H>
          <p>אל דאגה, יש תקלה ואנחנו מטפלים בה</p>
        </FelaComponent>
        <Button miscStyles={{ marginTop: '3rem', }} href="https://www.haaretz.co.il">
          {'חזרה לעמוד הבית'}
        </Button>
      </LayoutContainer>
    </LayoutRow>
  );
}
