import React, { Fragment, } from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { LoginGeneralLayoutStyles, } from '../components/StyleComponents/LoginStyleComponents';
import { IconHaaretzLogo, } from '@haaretz/htz-components';

const { FooterWrapper, FooterContentHolder, FooterBottomLayout, } = LoginGeneralLayoutStyles;

const FooterFallback = () => (
  <Fragment>
    <FooterWrapper>
      <FooterContentHolder>
        <div>
          <IconHaaretzLogo size={6} />
        </div>
        <FooterBottomLayout>
          <div>חדשות, ידיעות מהארץ והעולם - הידיעות והחדשות בעיתון הארץ. סקופים, מאמרים, פרשנויות ותחקירי עומק באתר האיכותי בישראל</div>
          <div>© כל הזכויות שמורות להוצאת עיתון הארץ בע"מ</div>
        </FooterBottomLayout>
      </FooterContentHolder>
    </FooterWrapper>
  </Fragment>
);

export default FooterFallback;
