import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import isEmail from 'validator/lib/isEmail';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import Form from '../Form/Form'; // eslint-disable-line import/no-named-as-default

const contStyle = ({ theme, displayThankYou, isReplyForm, }) => ({
  backgroundColor: theme.color('input', 'primaryBg'),
  paddingInlineStart: '4rem',
  paddingInlineEnd: '4rem',
  paddingTop: '5.4rem',
  extend: [
    borderBottom('1px', 11, 'solid', theme.color('comments', 'divider')),
    {
      condition: displayThankYou === true,
      style: {
        textAlign: 'center',
        paddingTop: '9.4rem',
        ...borderBottom('1px', 16, 'solid', theme.color('comments', 'divider')),
      },
    },
    {
      condition: isReplyForm === true,
      style: {
        marginTop: '2rem',
        marginBottom: 'calc(1px - 2rem)',
      },
    },
  ],
});

class CommentSent extends React.Component {
  static propTypes = {
    /** Callback that gets called when the close button is clicked */
    closeDisplayThankYou: PropTypes.func.isRequired,
    /** When true displays ThankYou screen, when false, displays sign up to email notifications screen */
    displayThankYou: PropTypes.bool.isRequired,
    /**
     * Indicates if This is a reply form (affects style)
     */
    isReplyForm: PropTypes.bool.isRequired,
    /**
     * A callback that gets the called when submitting the Form
     * @param {Boolean} didSignUp- True if the user clicked the sign up button, false if clicked no thanks button
     * @param {String} userEmail - The email the user entered
     */
    signUpNotification: PropTypes.func.isRequired,
    /**
     * The user email if there is a logged in user
     */
    userEmail: PropTypes.string,
  };

  static defaultProps = {
    userEmail: null,
  };

  manageFocus = el => {
    if (!el || el === this.focusEl) return;
    this.focusEl = el;
    this.focusEl.focus();
  }

  render() {
    const {
      closeDisplayThankYou,
      displayThankYou,
      isReplyForm,
      signUpNotification,
      userEmail,
    } = this.props;

    return (
      <FelaComponent
        displayThankYou={displayThankYou}
        isReplyForm={isReplyForm}
        rule={contStyle}
        render={({
          className,
          theme,
          theme: {
            commentSentI18n: {
              buttons: { getNotificationsBtnTxt, dontGetNotificationsBtnTxt, closeBtnText, },
              labels: { emailLabelTxt, },
              notes: { emailNoteTxt, },
              errorNotes: { emailErrorNoteTxt, },
              texts: {
                commentRecievedBoldText,
                commentRecievedText,
                commentRecievedTextSecondRow,
                commentRecievedBoldTextThankYouPage,
                commentRecievedTextThankYouPage,
              },
            },
          },
        }) => (
          <div className={className}>
            {displayThankYou ? (
              <div>
                <FelaComponent
                  style={{
                    fontWeight: 'bold',
                  }}
                  render={({ className, }) => (
                    <span
                      tabIndex={-1}
                      className={className}
                      ref={this.manageFocus}
                    >
                      {commentRecievedBoldTextThankYouPage}
                    </span>
                  )}
                />
                <FelaComponent
                  style={{
                    marginBottom: '5rem',
                  }}
                  render="p"
                >
                  {commentRecievedTextThankYouPage}
                </FelaComponent>
                <Button
                  miscStyles={{
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                  }}
                  boxModel={{ hp: 3.5, vp: 1, }}
                  onClick={closeDisplayThankYou}
                >
                  {closeBtnText}
                </Button>
              </div>
            ) : (
              <Form
                onSubmit={({ notificationEmail, }) => {
                  signUpNotification(true, notificationEmail);
                }}
                {...(userEmail ? { initialValues: { notificationEmail: userEmail, }, } : {})}
                validate={({ notificationEmail = '', }) => {
                  const errors = [];
                  if (!isEmail(notificationEmail)) {
                    errors.push({
                      name: 'notificationEmail',
                      order: 1,
                    });
                  }

                  return errors;
                }}
                render={({ getInputProps, handleSubmit, }) => (
                  <div>
                    <p
                      tabIndex={-1}
                      ref={this.manageFocus}
                    >
                      <FelaComponent
                        style={{
                          fontWeight: 'bold',
                        }}
                        render="span"
                      >
                        {commentRecievedBoldText}
                      </FelaComponent>
                      {commentRecievedText}
                    </p>
                    <p>{commentRecievedTextSecondRow}</p>
                    <TextInput
                      {...getInputProps({
                        name: 'notificationEmail',
                        noteText: emailNoteTxt,
                        errorText: emailErrorNoteTxt,
                        label: emailLabelTxt,
                        maxLength: 200,
                        variant: `${theme.commentsStyle.textInputVariant}Opaque`,
                        type: 'email',
                        miscStyles: {
                          marginTop: '4rem',
                        },
                      })}
                    />
                    <FelaComponent
                      style={{
                        marginTop: '3rem',
                      }}
                    >
                      <Button
                        miscStyles={{
                          backgroundColor: 'transparent',
                          marginInlineEnd: '2rem',
                          fontWeight: 'bold',
                        }}
                        boxModel={{ hp: 5, vp: 1, }}
                        onClick={handleSubmit}
                      >
                        {getNotificationsBtnTxt}
                      </Button>
                      <Button
                        miscStyles={{
                          backgroundColor: 'transparent',
                          fontWeight: 'bold',
                        }}
                        boxModel={{ hp: 4, vp: 1, }}
                        onClick={() => signUpNotification(false)}
                      >
                        {dontGetNotificationsBtnTxt}
                      </Button>
                    </FelaComponent>
                  </div>
                )}
              />
            )}
          </div>
        )}
      />
    );
  }
}

export default CommentSent;
