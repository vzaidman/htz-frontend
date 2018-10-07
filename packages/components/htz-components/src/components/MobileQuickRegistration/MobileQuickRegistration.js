import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, borderVertical, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Button from '../Button/Button';
import IconAlefLogo from '../Icon/icons/IconAlefLogo';
import Media from '../Media/Media';
import ReadingHistoryProvider from '../ReadingHistory/ReadingHistoryProvider';

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
      marginTop: '2rem',
      extend: [
        borderVertical('1px', 4, 'solid', theme.color('primary')),
        ...(miscStyles
          ? parseStyleProps(miscStyles, theme.mq, theme.type)
          : []),
      ],
    })}
    render="aside"
  >
    {children}
  </FelaComponent>
);

// eslint-disable-next-line react/prop-types
const TeaserBody = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      color: theme.color('neutral', '-3'),
      marginBottom: '2rem',
      extend: [ theme.type(5), ],
    })}
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
class MobileQuickRegistration extends Component {
  state = {
    signedUp: false,
  };
  render() {
    const {
      teaserBody,
      doubleOptIn,
      mailto,
      mailSubject,
      mailBody,
      teaserButton,
      miscStyles,
    } = this.props;
    const href = `mailto:${doubleOptIn}-${mailto}?subject=${mailSubject}&body=${mailBody}`;
    const renderFrequency = 10;
    return (
      <ReadingHistoryProvider>
        {
          readingHistory => {
            const shouldRender = (readingHistory && readingHistory.length % renderFrequency !== 0);
            console.log('[MobileQuickRegistration] readingHistory: %o render %o', readingHistory, shouldRender);
            if (shouldRender === false) {
              return null;
            }
            return (
              <FelaTheme
                render={theme => (
                  <Media
                    query={{ until: 's', }}
                    render={() => (
                      <RegistrationWrapper miscStyles={miscStyles}>
                        <IconWrapper>
                          <IconAlefLogo size={4} color="primary" />
                        </IconWrapper>
                        {this.state.signedUp ? (
                          <FelaComponent
                            style={{
                              fontWeight: '700',
                              color: theme.color('neutral', '-3'),
                              marginTop: '5rem',
                              marginBottom: '6rem',
                              extend: [ theme.type(3), ],
                            }}
                          >
                            {theme.mobileQuickRegistrationI18n.signedUpText}
                          </FelaComponent>
                        ) : (
                          <Fragment>
                            <TeaserBody>{teaserBody}</TeaserBody>
                            <Button
                              variant="primaryOpaque"
                              href={href}
                              boxModel={{ hp: 4, vp: 1, }}
                              onClick={() => this.setState({ signedUp: true, })}
                            >
                              {teaserButton}
                            </Button>
                          </Fragment>
                          )}
                      </RegistrationWrapper>
                    )}
                  />
                )}
              />
            );
          }
        }
      </ReadingHistoryProvider>
    );
  }
}

MobileQuickRegistration.propTypes = propTypes;
MobileQuickRegistration.defaultProps = defaultProps;

export default MobileQuickRegistration;
