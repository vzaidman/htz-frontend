import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import isEmail from 'validator/lib/isEmail';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../../propTypes/responsivePropBaseType';
import { newsletterVariantType, } from './types/newsletterVariantType';
import Button from '../../Button/Button'; // eslint-disable-line import/no-named-as-default
import Form from '../../Form/Form'; // eslint-disable-line import/no-named-as-default
import TextInput from '../../TextInput/TextInput';
import CheckBox from '../../CheckBox/CheckBox'; // eslint-disable-line import/no-named-as-default
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
    theme.type(1),
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

const CheckBoxStyle = {
  display: [ { from: 's', value: 'flex', }, { until: 's', value: 'none', }, ],
  type: -2,
  marginTop: '1rem',
};

NewsletterForm.propTypes = {
  /** determine newsletter icon if exists */
  brand: PropTypes.oneOf([ 'tm', 'htz', ]),
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
  brand: null,
  userEmail: null,
};

export function NewsletterForm({
  brand,
  loading,
  segmentId,
  setParentState,
  signUpNewsletter,
  userEmail,
  variant,
}) {
  const NewsletterIcon =
    brand &&
    (brand.toLowerCase() === 'htz'
      ? IconAlefLogoTransparent
      : brand.toLowerCase() === 'tm' ? IconMarkerLogoTransparent : null);
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
            errorText: 'אנא הזינו כתובת אימייל',
          });
        }
        if (email && !isEmail(email)) {
          errors.push({
            name: 'email',
            order: 1,
            errorText: 'נא להכניס כתובת דואל תקינה',
          });
        }
        return errors;
      }}
      render={({ getInputProps, handleSubmit, }) => (
        <FelaComponent
          rule={BeforeConfirmedWrapperStyle}
          render={({ className, theme, }) => {
            const {
              newsletterI18n: {
                buttons: { newsletterSubmit, },
                texts: { newsletterTitle, },
              },
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
                          <h3 className={className}>{newsletterTitle}</h3>
                        )}
                      />
                      {NewsletterIcon ? <NewsletterIcon /> : null}
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
                                placeholder: 'name@mail.com',
                                noteText: 'אנא הזינו כתובת אימייל',
                                requiredText: {
                                  isSup: true,
                                  long: requiredLong,
                                  short: requiredShort,
                                },
                              })}
                            />
                          </div>
                        )}
                      />
                      <Button
                        onClick={handleSubmit}
                        boxModel={{ hp: 3, vp: 1.5, }}
                        isBusy={loading}
                        miscStyles={ButtonStyle}
                        variant={theme.newsletterStyle[variant].buttonVariant}
                      >
                        {newsletterSubmit}
                      </Button>
                    </div>
                  )}
                />
                <CheckBox
                  {...getInputProps({
                    name: 'checkBox',
                    label: 'ברצוני לקבל ניוזלטרים, מידע שיווקי והטבות',
                    miscStyles: CheckBoxStyle,
                    noteText: ' ',
                  })}
                />
              </div>
            );
          }}
        />
      )}
    />
  );
}
