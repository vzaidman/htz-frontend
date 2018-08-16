import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import HtzLink from '../../HtzLink/HtzLink';
import Button from '../../Button/Button'; // eslint-disable-line import/no-named-as-default

const mobileBodyWrapperStyle = theme => ({
  extend: [
    theme.mq({ from: 's', }, { display: 'none', }),
    theme.mq(
      {
        until: 's',
      },
      {
        display: 'block',
        textAlign: 'center',
      }
    ),
  ],
});

const mobileMainListStyle = ({ theme, }) => ({
  marginBottom: '5rem',
  maxWidth: '42rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  columnCount: 2,
});

const StyledLink = props => (
  <FelaComponent
    style={theme => ({
      fontWeight: 'bold',
      extend: [ theme.type(0), ],
    })}
    render={({ className, }) => <HtzLink className={className} {...props} />}
  />
);

const liStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

const copyRightTextStyle = theme => ({
  marginTop: '1rem',
  marginBottom: '4rem',
  textAlign: 'center',
  display: 'block',
  extend: [ theme.type(-3), ],
});

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
  <FelaComponent style={mobileBodyWrapperStyle}>
    <FelaComponent
      style={mobileMainListStyle}
      render={({ className, }) => (
        <ul className={className}>
          {MobileList.map(link => (
            <FelaComponent style={liStyle} key={link.text} render="li">
              <StyledLink
                key={link.text}
                content={link.text}
                href={link.link}
              />
            </FelaComponent>
          ))}
        </ul>
      )}
    />
    <Button
      variant="inverse"
      boxModel={{ hp: 5, vp: 1, }}
      // Link not work correctly in inspect (browser's smart phone mode). However, Its working on smart phone.
      href="https://www.haaretz.co.il/st/inter/shivuk-digital/hebrew/mtm/haaretzapp.html"
    >
      {ButtonName.text}
    </Button>
    <FelaComponent style={copyRightTextStyle} render="span">
      {Copyright.text}
    </FelaComponent>
  </FelaComponent>
);

MobileView.propTypes = propTypes;

export default MobileView;
