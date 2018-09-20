import React, { Fragment, } from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { LoginGeneralLayoutStyles, } from '../components/StyleComponents/LoginStyleComponents';

const footerWrapperStyle = () => ({
  position: 'absolute',
  bottom: '0px',
  width: '100%',
  height: '315px',
  backgroundColor: '#00537a',
  color: '#ffffff',

  '@media (max-width: 768px)': {
    height: '150px',
  },
});
const { FooterWrapper, } = LoginGeneralLayoutStyles;

const Footer = () => (
  <Fragment>
    <FooterWrapper>
      <br />
      <footer>
        <div>FOOTER</div>
      </footer>
    </FooterWrapper>
  </Fragment>
);

export default Footer;
