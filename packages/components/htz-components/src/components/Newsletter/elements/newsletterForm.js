import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import isEmail from 'validator/lib/isEmail';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../../propTypes/responsivePropBaseType';
import { newsletterVariantType, } from './types/newsletterVariantType';
import Button from '../../Button/Button'; // eslint-disable-line import/no-named-as-default
import H from '../../AutoLevels/H';
import Form from '../../Form/Form'; // eslint-disable-line import/no-named-as-default
import TextInput from '../../TextInput/TextInput';
import IconAlefLogoTransparent from '../../Icon/icons/IconAlefLogoTransparent';
import IconMarkerLogoTransparent from '../../Icon/icons/IconMarkerLogoTransparent';

const BeforeConfirmedWrapperStyle = ({ theme, }) => ({
  textAlign: 'start',
});

const UpperInputRow = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
});

const inputUpperNoteStyle = ({ theme, variant, }) => ({
  fontWeight: 'bold',
  extend: [
    parseComponentProp(
      undefined,
      variant,
      theme.mq,
      setUpperInputVariant,
      theme.color
    ),
  ],
});

function setUpperInputVariant(prop, variant, getColor, isError) {
  return {
    color: getColor('newsletter', `${variant}TextTitle`),
  };
}

const RowStyle = ({ theme, }) => ({
  paddingTop: '2rem',
  extend: [
    theme.mq(
      { from: 's', },
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
      }
    ),
  ],
});

const InputWrapperStyle = {
  width: '100%',
};

const ButtonStyle = {
  marginTop: '1rem',
  type: -1,
  display: 'block',
  marginInlineEnd: 'auto',
  marginInlineStart: [
    { from: 's', value: '1rem', },
    { until: 's', value: 'auto', },
  ],
};

NewsletterForm.propTypes = {
  /**  determine newsletter button text */
  buttonText: PropTypes.string.isRequired,
  /**  determine newsletter headline text */
  headlineText: PropTypes.string.isRequired,
  /** determine newsletter icon if exists */
  icon: PropTypes.oneOf([ 'tm', 'htz', ]),
  /** loading boolean from apollo Mutation */
  loading: PropTypes.bool.isRequired,
  /** Indicates article category id */
  segmentId: PropTypes.number.isRequired,
  /**
   * A Function to set 'confirmed' state in Newsletter parent component.
   */
  setParentState: PropTypes.func.isRequired,
  /**
   * An apollo mutation function.
   */
  signUpNewsletter: PropTypes.func.isRequired,
  /** Indicates registered/paying user email */
  userEmail: PropTypes.string,
  /** The `<newsletter />`'s stylistic variant passed to NewsletterForm */
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

NewsletterForm.defaultProps = {
  icon: null,
  userEmail: null,
};

export function NewsletterForm({
  buttonText,
  headlineText,
  icon,
  loading,
  segmentId,
  setParentState,
  signUpNewsletter,
  userEmail,
  variant,
}) {
  const NewsletterIcon =
    icon &&
    (icon.toLowerCase() === 'htz'
      ? IconAlefLogoTransparent
      : icon.toLowerCase() === 'tm' ? IconMarkerLogoTransparent : null);
  return (
    <Form
      initialValues={{ email: userEmail, checkBox: false, }}
      onSubmit={({ email, checkBox, }) => {
        const Checked = !!checkBox;
        signUpNewsletter({
          variables: { email, segmentId, checkBox: Checked, },
        })
          .then(data => {
            setParentState(data);
          })
          .catch(mutationError => {
            console.warn('there was an error sending the query', mutationError);
          });
      }}
      validate={({ email, checkBox, }) => {
        // eslint-disable-next-line prefer-const
        let errors = [];
        if (!email) {
          errors.push({
            name: 'email',
            order: 1,
            errorText: 'נא למלא כתובת דוא"ל',
          });
        }
        if (email && !isEmail(email)) {
          errors.push({
            name: 'email',
            order: 1,
            errorText: 'נא למלא כתובת דוא"ל תקנית',
          });
        }
        return errors;
      }}
      render={({ getInputProps, handleSubmit, }) => (
        <FelaComponent
          rule={BeforeConfirmedWrapperStyle}
          render={({ className, theme, }) => {
            const {
              textInputI18n: { requiredLong, requiredShort, },
              newsletterStyle,
            } = theme;
            return (
              <div className={className}>
                <FelaComponent
                  rule={UpperInputRow}
                  render={({ className, }) => (
                    <div className={className}>
                      <FelaComponent
                        variant={variant}
                        rule={inputUpperNoteStyle}
                        render={({ className, }) => (
                          <H className={className}>{headlineText}</H>
                        )}
                      />
                      {NewsletterIcon ? (
                        <NewsletterIcon
                          size={[
                            { from: 's', value: 3, },
                            { until: 's', value: 7, },
                          ]}
                        />
                      ) : null}
                    </div>
                  )}
                />
                <FelaComponent
                  rule={RowStyle}
                  render={({ className, }) => (
                    <div className={className}>
                      <FelaComponent
                        style={InputWrapperStyle}
                        render={({ className, }) => (
                          <div className={className}>
                            <TextInput
                              {...getInputProps({
                                name: 'email',
                                label: 'דוא"ל',
                                variant: newsletterStyle[variant].inputVariant,
                                type: 'email',
                                noteText: 'אנא הזינו כתובת אימייל',
                                requiredText: {
                                  isSup: true,
                                  long: requiredLong,
                                  short: requiredShort,
                                },
                                miscStyles: { type: -1, },
                              })}
                            />
                          </div>
                        )}
                      />
                      <Button
                        onClick={handleSubmit}
                        boxModel={{ hp: 3, vp: 1, }}
                        isBusy={loading}
                        miscStyles={ButtonStyle}
                        variant={theme.newsletterStyle[variant].buttonVariant}
                      >
                        {buttonText}
                      </Button>
                    </div>
                  )}
                />
              </div>
            );
          }}
        />
      )}
    />
  );
}
