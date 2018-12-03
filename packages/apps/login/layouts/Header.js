import React, { Fragment, } from 'react';
import Head from 'next/head';
import { IconHaaretzLogo, } from '@haaretz/htz-components';
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
  fontSize: '5rem',
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
});
const ImageHolder = createComponent(imageHolderStyle);

const svgWrapperStyle = () => ({
  width: '50px',
  height: '50px',
  margin: '0 auto',
  background: '#fff',
  padding: '9px',
  borderRadius: '27px',
  border: '1px solid #289dd3',
});
const SvgHolder = createComponent(svgWrapperStyle);

const Header = () => (
  <Fragment>
    <Head>
      <title>Login</title>
    </Head>
    <HeaderWrapper>
      <IconHaaretzLogo size={2.7} />
      <TitleWrapper>
        <div>התחברות</div>
      </TitleWrapper>
      <ImageWrapper>
        <ImageHolder>
          <SvgHolder>
            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 256 256">
              <path
                fill="#289dd3"
                d="M69.7 69c0-33.2 26.9-60.2 60.2-60.2S190 35.8 190 69c0 33.2-26.9 60.2-60.2 60.2S69.7 102.2 69.7 69zM142.8 155.6h-25.9c-52.6 0-96 41.1-99.9 92.7h225.8C238.8 196.7 195.4 155.6 142.8 155.6z"
              />
            </svg>
          </SvgHolder>
        </ImageHolder>
      </ImageWrapper>
    </HeaderWrapper>
  </Fragment>
);

export default Header;
