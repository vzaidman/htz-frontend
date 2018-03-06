import React from 'react';
import PropTypes from 'prop-types';
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

const mobileHeadStyle = ({
  theme: { color, footerBorderStyle: { borderWidth, lines, borderStyle, }, },
}) => ({
  fontSize: '5rem',
  ...borderBottom(borderWidth, lines, borderStyle, color('footer', 'border')),
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

const propTypes = {
  theme: PropTypes.shape({
    footerMobileListsI18n: PropTypes.shape({
      ButtonName: PropTypes.object,
      Copyright: PropTypes.object,
      ListOne: PropTypes.arrayOf(PropTypes.object),
      ListTwo: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};
const MobileView = ({
  theme: { footerMobileListsI18n: { ButtonName, Copyright, ListOne, ListTwo, }, },
}) => (
  <Wrapper>
    <StyledMobileHead> הארץ </StyledMobileHead>
    <Link
      href="https://www.facebook.com/haaretz"
      content={<IconFaceBookLogo size={3.5} miscStyles={IconMiscStyle} />}
    />
    <Link
      href="https://twitter.com/haaretz"
      content={<IconTwitter size={3.5} miscStyles={IconMiscStyle} />}
    />
    <Link
      href="https://play.google.com/store/apps/details?id=com.haaretz"
      content={<IconGPlus size={3.5} miscStyles={IconMiscStyle} />}
    />
    <StyledMobileMainList>
      <StyledLinkBox>
        {ListOne.map(link => <StyledLink key={link.text} content={link.text} href={link.link} />)}
      </StyledLinkBox>
      <StyledLinkBox>
        {ListTwo.map(link => <StyledLink key={link.text} content={link.text} href={link.link} />)}
      </StyledLinkBox>
    </StyledMobileMainList>
    {/* todo: onClick button should direct to download app (hardcoded?) */}
    <Button variant="secondary" boxModel={{ hp: 4.5, vp: 1, }} onClick={() => console.warn('WIP!')}>
      {ButtonName.text}
    </Button>

    <StyledText>{Copyright.text}</StyledText>
  </Wrapper>
);

MobileView.propTypes = propTypes;

export default MobileView;
