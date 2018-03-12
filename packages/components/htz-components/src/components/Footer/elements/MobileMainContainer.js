import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Link from '../../Link/Link';
import Button from '../../Button/Button'; // eslint-disable-line import/no-named-as-default

const MobileBodyWrapperStyle = ({ theme, }) => ({
  ...theme.mq({ from: 's', }, { display: 'none', }),
  extend: [
    {
      ...theme.mq(
        {
          until: 's',
        },
        {
          display: 'block',
          textAlign: 'center',
        }
      ),
    },
  ],
});
const MobileBody = createComponent(MobileBodyWrapperStyle);

const mobileMainListStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: '5rem',
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
  theme: {
    color,
    footerMobileListsI18n: { ButtonName, Copyright, ListOne, ListTwo, },
  },
}) => (
  <MobileBody>
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
      // Link not in console(smart phone mode). However, Its working on smart phone.
      href="https://www.haaretz.co.il/st/inter/shivuk-digital/hebrew/mtm/haaretzapp.html"
    >
      {ButtonName.text}
    </Button>
    <StyledText>{Copyright.text}</StyledText>
  </MobileBody>
);

MobileView.propTypes = propTypes;

export default MobileView;
