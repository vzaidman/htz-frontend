import React, { Fragment, } from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { LoginGeneralLayoutStyles, } from '../components/StyleComponents/LoginStyleComponents';
import FooterB from '@haaretz/htz-components';

const { FooterWrapper, FooterContentHolder, } = LoginGeneralLayoutStyles;

const Footer = () => (
  <Fragment>
    <FooterWrapper>
      <FooterContentHolder>
        <div>Footer Top</div>
        <div>Footer Bot</div>
      </FooterContentHolder>
    </FooterWrapper>
  </Fragment>
);

export default Footer;
