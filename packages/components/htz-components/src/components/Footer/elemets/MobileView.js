import React from 'react';
import { createComponent, } from 'react-fela';
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
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingInlineStart: '7rem',
  paddingInlineEnd: '7rem',
  backgroundColor: '#005479',
  color: 'white',
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
  marginTop: '1rem',
  marginBottom: '1rem',
  extend: [ theme.type(-1), ],
});

const StyledLink = createComponent(linkStyle, Link, [ 'content', 'href', ]);

const textStyle = ({ theme, }) => ({
  extend: [ theme.type(-3), ],
});
const StyledText = createComponent(textStyle);


const MobileView = (
// eslint-disable-next-line react/prop-types
  { theme:
    { footerMobileListsI18n:
      { ButtonName, Copyright, ListOne, ListTwo, },
    },
  }
) => (
  <Wrapper>
    <StyledMobileHead> הארץ </StyledMobileHead>
    <IconFaceBookLogo size={3.5} miscStyles={IconMiscStyle} />
    <IconTwitter size={3.5} miscStyles={IconMiscStyle} />
    <IconGPlus size={3.5} miscStyles={IconMiscStyle} />
    <StyledMobileMainList>
      <StyledLinkBox>
        {ListOne.map(link => (
          <StyledLink key={link.text} content={link.text} href={link.link} />
        ))}
      </StyledLinkBox>
      <StyledLinkBox>
        {ListTwo.map(link => (
          <StyledLink key={link.text} content={link.text} href={link.link} />
        ))}
      </StyledLinkBox>
    </StyledMobileMainList>
    <Button
      variant="secondary"
      boxModel={{ hp: 4.5, vp: 1, }}
      onClick={() => console.warn('WIP!')}
    >
      {ButtonName.text}
    </Button>

    <StyledText>{Copyright.text}</StyledText>
  </Wrapper>
);

export default MobileView;
