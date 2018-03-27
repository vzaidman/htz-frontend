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
  maxWidth: '42rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
});
const StyledMobileMainList = createComponent(mobileMainListStyle, 'section');

const linkBoxStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '18rem',
  flexWrap: 'wrap',
  width: '100%',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  alignItems: 'space-around',
});
const StyledLinkBox = createComponent(linkBoxStyle, 'ul');

const linkStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  extend: [ theme.type(0), ],
});

const StyledLink = createComponent(linkStyle, Link, [ 'content', 'href', ]);

const liStyle = ({ theme, }) => ({
  marginTop: '1rem',
  marginBottom: '1rem',
});
const StyledLi = createComponent(liStyle, 'li');
const textStyle = ({ theme, }) => ({
  marginTop: '1rem',
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
    footerMobileListsI18n: { ButtonName, Copyright, MobileList, },
  },
}) => (
  <MobileBody>
    <StyledMobileMainList>
      <StyledLinkBox>
        {MobileList.map(link => (
          <StyledLi key={link.text}>
            <StyledLink key={link.text} content={link.text} href={link.link} />
          </StyledLi>
        ))}
      </StyledLinkBox>
    </StyledMobileMainList>
    <Button
      variant="secondary"
      boxModel={{ hp: 5, vp: 1, }}
      // Link not work correctly in inspect (browser's smart phone mode). However, Its working on smart phone.
      href="https://www.haaretz.co.il/st/inter/shivuk-digital/hebrew/mtm/haaretzapp.html"
    >
      {ButtonName.text}
    </Button>
    <StyledText>{Copyright.text}</StyledText>
  </MobileBody>
);

MobileView.propTypes = propTypes;

export default MobileView;
