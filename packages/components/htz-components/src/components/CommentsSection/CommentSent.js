import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import isEmail from 'validator/lib/isEmail';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import Form from '../Form/Form'; // eslint-disable-line import/no-named-as-default

const propTypes = {
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
   * @param {Boolean} - True if the user clicked the sign up button, false if clicked no thanks button
   * @param {String} - The email the user entered
   */
  signUpNotification: PropTypes.func.isRequired,
  /** passed as a a prop by fela's withTheme func before default export */
  theme: PropTypes.shape({
    commentsStyle: PropTypes.shape({
      textInputVariant: PropTypes.string,
    }),
  }).isRequired,
};

const defaultProps = {};

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

const StyledCont = createComponent(contStyle);

const buttonsWrapperStyle = ({ theme, }) => ({
  marginTop: '3rem',
});

const ButtonsWrapper = createComponent(buttonsWrapperStyle);

const boldSpanStyle = () => ({
  fontWeight: 'bold',
});

const StyledBoldSpan = createComponent(boldSpanStyle, 'span');

const submittedPStyle = () => ({
  marginBottom: '5rem',
});

const StyledSubmittedP = createComponent(submittedPStyle, 'p');

const inputStyle = {
  marginTop: '4rem',
};

function CommentSent({
  closeDisplayThankYou,
  displayThankYou,
  isReplyForm,
  signUpNotification,
  theme,
}) {
  const {
    buttons: {
      getNotificationsBtnTxt,
      dontGetNotificationsBtnTxt,
      closeBtnText,
    },
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
  } = theme.commentSentI18n;
  return (
    <StyledCont displayThankYou={displayThankYou} isReplyForm={isReplyForm}>
      {displayThankYou ? (
        <div>
          <StyledBoldSpan>{commentRecievedBoldTextThankYouPage}</StyledBoldSpan>
          <StyledSubmittedP>{commentRecievedTextThankYouPage}</StyledSubmittedP>
          <Button
            miscStyles={{ backgroundColor: 'transparent', fontWeight: 'bold', }}
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
              <p>
                <StyledBoldSpan>{commentRecievedBoldText}</StyledBoldSpan>
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
                  variant: `${theme.commentsStyle.textInputVariant}Inverse`,
                  type: 'email',
                  miscStyles: inputStyle,
                })}
              />
              <ButtonsWrapper>
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
              </ButtonsWrapper>
            </div>
          )}
        />
      )}
    </StyledCont>
  );
}

CommentSent.propTypes = propTypes;

CommentSent.defaultProps = defaultProps;

export default withTheme(CommentSent);
