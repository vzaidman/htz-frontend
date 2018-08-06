import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import NewsletterConfirmed from './elements/NewsletterConfirmed';
import { NewsletterForm, } from './elements/newsletterForm';
import { newsletterVariantType, } from './elements/types/newsletterVariantType';
import Dialog from '../A11yDialog/A11yDialog';

const newsletterWrapperStyle = ({ theme, variant, miscStyles, }) => ({
  position: 'relative',
  padding: '2rem',
  // padding: [ { from: 's', value: '2rem', }, { until: 's', value: '0rem', }, ],
  width: '100%',
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

const newsletterConfirmStyle = {
  width: [ { from: 's', value: '99%', }, { until: 's', value: '98%', }, ],
  paddingTop: [ { from: 's', value: '2rem', }, { until: 's', value: '8rem', }, ],
  paddingBottom: [ { from: 's', value: '2rem', }, { until: 's', value: '5rem', }, ],
};

export default class NewsletterWithoutApollo extends React.Component {
  static propTypes = {
    /**  determine newsletter button text */
    buttonText: PropTypes.string.isRequired,
    /**
     * The element's DOM ID needs to be unique per page,
     * if there are 2 newsletter components in one page they should be passed an id manually
     * */
    contentId: PropTypes.string.isRequired,
    /**  determine newsletter headline text */
    headlineText: PropTypes.string.isRequired,
    /** determine newsletter host if exists */
    host: PropTypes.oneOf([ 'tm', 'htz', ]),
    /** determine newsletter icon if exists */
    icon: PropTypes.oneOf([ 'tm', 'htz', ]),
    /** indicates loading state of the data */
    loading: PropTypes.bool.isRequired,
    /** Trigger user's function when modal is open */
    onSubmit: PropTypes.func,
    /** Indicates article category id */
    segmentId: PropTypes.number.isRequired,
    /**
     * registration function.
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
    ]).isRequired,
  };
  static defaultProps = {
    host: null,
    icon: null,
    onSubmit: () => {},
    miscStyles: null,
    userEmail: null,
  };
  state = {
    signUpStatus: null,
  };

  confirmState = signUpStatus => {
    this.setState({
      signUpStatus,
    });
  };

  render() {
    const id = `newsletterRegForm${this.props.contentId}`;
    const {
      buttonText,
      headlineText,
      host,
      icon,
      loading,
      onSubmit,
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
            <div className={className} id={id}>
              <NewsletterForm
                buttonText={buttonText}
                headlineText={headlineText}
                icon={icon}
                loading={loading}
                variant={variant}
                userEmail={userEmail}
                segmentId={segmentId}
                signUpNewsletter={signUpNewsletter}
                setParentState={this.confirmState}
              />
              <Dialog
                appendTo={`${id}DialogWrapper`}
                elementToHide={id}
                isVisible={!!this.state.signUpStatus}
                onOpen={onSubmit}
                overlayBgColor={theme.color('newsletter', `${variant}Bg`)}
                containerMiscStyles={newsletterConfirmStyle}
                render={({ handleClose, }) => (
                  <NewsletterConfirmed
                    host={host}
                    variant={variant}
                    closeConfirmation={handleClose}
                    signUpStatus={this.state.signUpStatus}
                  />
                )}
              />
              <div id={`${id}DialogWrapper`} />
            </div>
          )}
        />
      </div>
    );
  }
}
