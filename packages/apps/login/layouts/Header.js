import React, { Fragment, } from 'react';
import Head from 'next/head';
//import {Logo,} from '@haaretz/haaretz.co.il/components/Logo/Logo';
import { createComponent, FelaComponent, } from 'react-fela';

const headerWrapperStyle = () => ({
  width: '1263px',
  maxWidth: '100%',
  margin: '0 auto 25px auto',
  padding: '15px 0 0 0',
  backgroundColor: '#289dd3',
  textAlign: 'center',
  color: '#ffffff',
});
const HeaderWrapper = createComponent(headerWrapperStyle);

const titleWrapperStyle = () => ({
  margin: '10px 0',
  fontSize: '5.5rem',
  fontWeight: '300',
});
const TitleWrapper = createComponent(titleWrapperStyle);

const imageWrapperStyle = () => ({
  position: 'relative',
});
const ImageWrapper = createComponent(imageWrapperStyle);

const imageHolderStyle = () => ({
  width: '100%',
  marginTop: '-20px',
  transform: 'translateY(50%)',
  '> img': {
    borderRadius: '27px',
    border: '1px solid #289dd3',
  },
});
const ImageHolder = createComponent(imageHolderStyle);

const Header = () => (
  <Fragment>
    <Head>
      <title>Login</title>
    </Head>
    <HeaderWrapper>
      <div>הארץ</div>
      <TitleWrapper>
        <div>התחברות</div>
      </TitleWrapper>
      <ImageWrapper>
        <ImageHolder>
          <img width="54" height="54" src="../static/images/header-img.png" />
        </ImageHolder>
      </ImageWrapper>
    </HeaderWrapper>
  </Fragment>
);

export default Header;
