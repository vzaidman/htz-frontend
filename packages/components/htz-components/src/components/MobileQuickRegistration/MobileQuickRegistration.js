import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { borderVertical, } from '@haaretz/htz-css-tools';
// eslint-disable-next-line import/no-named-as-default
import Button from '../Button/Button';
import IconMailAlert from '../Icon/icons/IconMailAlert';

const propTypes = {
  /**
   * Element's main text, displayed above the button.
   */
  teaserBody: PropTypes.string.isRequired,
  /**
   * TODO: understand and describe what this does
   */
  doubleOptIn: PropTypes.oneOf([ 'doptint', 'doptinf', ]).isRequired,
  /**
   * Mail's recipient.
   */
  mailto: PropTypes.string.isRequired,
  /**
   * Mail's subject.
   */
  mailSubject: PropTypes.string.isRequired,
  /**
   * Mail's body.
   */
  mailBody: PropTypes.string.isRequired,
  /**
   * Button's inner text.
   */
  teaserButton: PropTypes.string.isRequired,
};

const wrapperStyle = ({ theme, }) => ({
  position: 'relative',
  textAlign: 'center',
  ...borderVertical('2px', 3, 'solid', theme.color('primary')),
  marginTop: '1rem',
});
const RegistrationWrapper = createComponent(wrapperStyle);

const teaserBodyStyle = ({ theme, }) => ({
  ...theme.type(-2),
  fontWeight: '700',
  color: theme.color('neutral', '-3'),
  marginBottom: '2rem',
});
const TeaserBody = createComponent(teaserBodyStyle);

const buttonTextStyle = ({ theme, }) => ({
  ...theme.type(-1),
  fontWeight: '700',
});
const ButtonText = createComponent(buttonTextStyle, 'span');

const iconWrapperStyle = ({ theme, }) => ({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '0',
  backgroundColor: theme.color('neutral', '-10'),
  paddingLeft: '2rem',
  paddingRight: '2rem',
});
const IconWrapper = createComponent(iconWrapperStyle, 'span');

/*
 * This quick registration is for **mobile only**.<br/>All of it's props are required
 * and changes to them ought to be done in polopoly (template ID: com.polobase.quickNewsletterRegistration)
 */
function MobileQuickRegistration({
  teaserBody,
  doubleOptIn,
  mailto,
  mailSubject,
  mailBody,
  teaserButton,
}) {
  const href = `mailto:${doubleOptIn}-${mailto}?subject=${mailSubject}&body=${
    mailBody
  }`;

  return (
    <RegistrationWrapper>
      <IconWrapper>
        <IconMailAlert size={5} color="primary" />
      </IconWrapper>
      <TeaserBody>{teaserBody}</TeaserBody>
      <Button href={href} boxModel={{ hp: 4, vp: 1, }}>
        <ButtonText>{teaserButton}</ButtonText>
      </Button>
    </RegistrationWrapper>
  );
}

MobileQuickRegistration.propTypes = propTypes;

export default MobileQuickRegistration;
