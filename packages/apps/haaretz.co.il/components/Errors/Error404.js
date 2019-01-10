import React from 'react';
import { FelaComponent, } from 'react-fela';
import { Button, LayoutRow, LayoutContainer, H, } from '@haaretz/htz-components';
import Illustration404 from './Illustration404';

export default function Error404() {
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
        <Illustration404 size={85} />
        <FelaComponent style={{ textAlign: 'center', marginTop: '5rem', }}>
          <H>נראה שהלכת לאיבוד</H>
          <p>אפשר ליהנות מהשקט או לחזור למציאות</p>
        </FelaComponent>
        <Button miscStyles={{ marginTop: '3rem', }} href="https://www.haaretz.co.il">
          {'חזרה לעמוד הבית'}
        </Button>
      </LayoutContainer>
    </LayoutRow>
  );
}
