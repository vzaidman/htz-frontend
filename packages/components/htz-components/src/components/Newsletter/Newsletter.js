import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { Mutation, } from 'react-apollo';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import NewsletterConfirmed from './elements/NewsletterConfirmed';
import { NewsletterForm, } from './elements/newsletterForm';
import submitNewsletter from './mutations/submitNewsletter';
import { newsletterVariantType, } from './elements/types/newsletterVariantType';
import Dialog from '../A11yDialog/A11yDialog';

const newsletterWrapperStyle = ({ theme, variant, miscStyles, }) => ({
  position: 'relative',
  extend: [
    parseComponentProp(
      undefined,
      variant,
      theme.mq,
      setVariant,
      theme.color,
      theme
    ),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

function setVariant(prop, variant, getColor) {
  return {
    backgroundColor: getColor('newsletter', `${variant}Bg`),
    color: getColor('newsletter', `${variant}Text`),
  };
}

class NewsletterWithoutApollo extends React.Component {
  static propTypes = {
    /**
     * Set dialog constants to prevent cases which more than newsletter on page
     * with the same id, and to better match user's naming convention.
     */
    dialogRequirements: PropTypes.shape({
      appendTo: PropTypes.string,
      elementToHide: PropTypes.string,
    }).isRequired,
    /** loading boolean from apollo Mutation */
    loading: PropTypes.bool.isRequired,
    /** Indicates article category id */
    segmentId: PropTypes.number.isRequired,
    /**
     * An apollo mutation function.
     */
    signUpNewsletter: PropTypes.func.isRequired,
    /** Indicates registered/paying user email */
    userEmail: PropTypes.string,
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
    /** The `<newsletter />`'s stylistic variant */
    variant: PropTypes.oneOfType([
      newsletterVariantType,
      PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: newsletterVariantType.isRequired,
        })
      ),
    ]),
  };
  static defaultProps = {
    miscStyles: null,
    userEmail: null,
    variant: 'highlight',
  };

  state = {
    confirmed: false,
  };

  confirmState = ({ data, }) => {
    if (data.signUpNewsletter) {
      this.setState({
        confirmed: true,
      });
    }
  };
  render() {
    const {
      dialogRequirements: { appendTo, elementToHide, },
      loading,
      userEmail,
      segmentId,
      signUpNewsletter,
      variant,
      miscStyles,
    } = this.props;
    return (
      <div>
        <FelaComponent
          variant={variant}
          miscStyles={miscStyles}
          rule={newsletterWrapperStyle}
          render={({ className, theme, }) => (
            <div className={className} id={elementToHide}>
              <NewsletterForm
                loading={loading}
                variant={variant}
                userEmail={userEmail}
                segmentId={segmentId}
                signUpNewsletter={signUpNewsletter}
                setParentState={this.confirmState}
              />
              <Dialog
                appendTo={appendTo}
                elementToHide={elementToHide}
                isVisible={this.state.confirmed}
                overlayBgColor={theme.color('newsletter', `${variant}Bg`)}
                render={({ handleClose, }) => (
                  <FelaComponent
                    style={{
                      minWidth: '80rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                    }}
                    render={({ className, }) => (
                      <div className={className}>
                        <NewsletterConfirmed
                          variant={variant}
                          closeConfirmation={handleClose}
                        />
                      </div>
                    )}
                  />
                )}
              />
              <div id={appendTo} />
            </div>
          )}
        />
      </div>
    );
  }
}

export default function Newsletter(props) {
  return (
    <Mutation mutation={submitNewsletter}>
      {(signUpNewsletter, { data, loading, }) => (
        <NewsletterWithoutApollo
          signUpNewsletter={signUpNewsletter}
          loading={loading}
          {...props}
        />
      )}
    </Mutation>
  );
}

// exporting NewsletterWithoutApollo for running tests without apollo client dependency.
export { NewsletterWithoutApollo, };
