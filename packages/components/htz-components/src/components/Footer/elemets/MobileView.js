import React from 'react';
import { createComponent, withTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Button from '../../Button/Button'; // eslint-disable-line import/no-named-as-default
import IconFaceBookLogo from '../../Icon/icons/IconFacebookLogo';
import IconTwitter from '../../Icon/icons/IconTwitter';
import IconGPlus from '../../Icon/icons/IconGPlus';
import Link from '../../Link/Link'; // eslint-disable-line import/no-named-as-default

const wrapperStyle = ({ theme, }) => ({
  display: 'block',
  textAlign: 'center',
  width: '100%',
  padding: '2rem 7rem 2rem 7rem',
  backgroundColor: '#005479',
  color: 'white',
  direction: 'rtl',
});
const Wrapper = createComponent(wrapperStyle);

const mobileHeadStyle = ({ theme, }) => ({
  fontSize: '5rem',
  ...borderBottom('1px', '2', 'solid', 'white'),
});
const StyledMobileHead = createComponent(mobileHeadStyle);

const IconMiscStyle = {
  margin: '3rem',
  marginTop: '2rem',
};

const mobileMainListStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingBottom: '4rem',
});
const StyledMobileMainList = createComponent(mobileMainListStyle, 'div');

const linkBoxStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'space-around',
});
const StyledLinkBox = createComponent(linkBoxStyle, 'ul');

const linkStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  fontSize: '2.7rem',
  marginTop: '1rem',
  marginBottom: '1rem',
});

const StyledLink = createComponent(linkStyle, Link, [ 'content', 'href', ]);

const textStyle = ({ theme, }) => ({
  fontSize: '10px',
});
const StyledText = createComponent(textStyle);

// eslint-disable-next-line react/prop-types
const MobileView = ({ theme: { footerMobileListsI18n, }, }) => (
  <Wrapper>
    <StyledMobileHead> הארץ </StyledMobileHead>
    <IconFaceBookLogo size={3.5} miscStyles={IconMiscStyle} />
    <IconTwitter size={3.5} miscStyles={IconMiscStyle} />
    <IconGPlus size={3.5} miscStyles={IconMiscStyle} />
    <StyledMobileMainList>
      <StyledLinkBox>
        {footerMobileListsI18n.ListOne.map(link => (
          <StyledLink key={link.text} content={link.text} href={link.link} />
        ))}
      </StyledLinkBox>
      <StyledLinkBox>
        {footerMobileListsI18n.ListTwo.map(link => (
          <StyledLink key={link.text} content={link.text} href={link.link} />
        ))}
      </StyledLinkBox>
    </StyledMobileMainList>
    <Button
      variant="secondary"
      boxModel={{ hp: 4.5, vp: 1, }}
      onClick={() => console.warn('WIP!')}
    >
      להורדת האפליקציה
    </Button>

    <StyledText>© כל הזכויות שמורות</StyledText>
  </Wrapper>
);

export default withTheme(MobileView);
