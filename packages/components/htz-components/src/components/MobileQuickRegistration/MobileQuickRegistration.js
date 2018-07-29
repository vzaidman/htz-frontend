import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderVertical, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Button from '../Button/Button';
import IconMailAlert from '../Icon/icons/IconMailAlert';
import Media from '../Media/Media';

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
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /**
   * Button's inner text.
   */
  teaserButton: PropTypes.string.isRequired,
};

const defaultProps = {
  miscStyles: null,
};

// eslint-disable-next-line react/prop-types
const RegistrationWrapper = ({ miscStyles, children, }) => (
  <FelaComponent
    style={theme => ({
      position: 'relative',
      textAlign: 'center',
      ...borderVertical('2px', 3, 'solid', theme.color('primary')),
      marginTop: '1rem',
      extend: [
        ...(miscStyles
          ? parseStyleProps(miscStyles, theme.mq, theme.type)
          : []),
      ],
    })}
  >
    {children}
  </FelaComponent>
);

// eslint-disable-next-line react/prop-types
const TeaserBody = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      ...theme.type(-2),
      fontWeight: '700',
      color: theme.color('neutral', '-3'),
      marginBottom: '2rem',
    })}
  >
    {children}
  </FelaComponent>
);

// eslint-disable-next-line react/prop-types
const ButtonText = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      ...theme.type(-1),
      fontWeight: '700',
    })}
    render="span"
  >
    {children}
  </FelaComponent>
);

// eslint-disable-next-line react/prop-types
const IconWrapper = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      end: '50%',
      top: '0',
      backgroundColor: theme.color('neutral', '-10'),
      paddingLeft: '2rem',
      paddingRight: '2rem',
    })}
    render="span"
  >
    {children}
  </FelaComponent>
);

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
  miscStyles,
}) {
  const href = `mailto:${doubleOptIn}-${mailto}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <Media
      query={{ until: 's', }}
      render={() => (
        <RegistrationWrapper miscStyles={miscStyles}>
          <IconWrapper>
            <IconMailAlert size={5} color="primary" />
          </IconWrapper>
          <TeaserBody>{teaserBody}</TeaserBody>
          <Button href={href} boxModel={{ hp: 4, vp: 1, }}>
            <ButtonText>{teaserButton}</ButtonText>
          </Button>
        </RegistrationWrapper>
      )}
    />
  );
}

MobileQuickRegistration.propTypes = propTypes;
MobileQuickRegistration.defaultProps = defaultProps;

export default MobileQuickRegistration;
