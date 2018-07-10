import React from 'react';
import { createComponent, withTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import CommentSent from './CommentSent';
import Form from '../Form/Form'; // eslint-disable-line import/no-named-as-default
import TextInput from '../TextInput/TextInput';
import UserDispenser from '../User/UserDispenser';
import EventTracker from '../../utils/EventTracker';

const PlatformQuery = gql`
  {
    platform @client
  }
`;

const formStyle = ({ theme, isReplyForm, }) => ({
  backgroundColor: isReplyForm
    ? theme.color('bg', 'base')
    : theme.color('white'),
  display: 'flex',
  flexDirection: 'column',
  extend: [
    borderBottom('1px', 2, 'solid', theme.color('neutral', '-4')),
    {
      condition: isReplyForm === true,
      style: {
        paddingInlineStart: '8.5rem',
        paddingInlineEnd: '2rem',
        paddingTop: '3rem',
        marginTop: '2rem',
        marginBottom: 'calc(1px - 2rem)',
      },
    },
  ],
});

const StyledForm = createComponent(formStyle, 'div');

const textInputWrapperStyle = ({ theme, }) => ({
  flexGrow: 1,
  display: 'block',
});

const TextInputWrapper = createComponent(textInputWrapperStyle);

const inputAndToggleWrapperStyle = ({ theme, }) => ({
  display: 'flex',
  alignItems: 'flex-start',
});

const InputAndToggleWrapper = createComponent(inputAndToggleWrapperStyle);

const toggleButtonStyle = ({ theme, }) => ({
  width: '16rem',
  color: theme.color('primary'),
  marginTop: '1rem',
  fontWeight: 'bold',
  ':focus': {
    outline: 'none',
  },
  extend: [
    theme.type(-2, { lines: '2.714', }),
    theme.mq({ until: 's', }, { display: 'none', }),
    borderBottom('1px', 0.7, 'solid', 'transparent'),
    {
      ':hover': {
        ...borderBottom('1px', 0.7, 'solid', theme.color('primary')),
      },
    },
  ],
});

const ToggleButton = createComponent(toggleButtonStyle, 'button', [
  'type',
  'onClick',
]);

const AddCommentFooterStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const StyledAddCommentFooter = createComponent(AddCommentFooterStyle);

const sendCommentButtonsContStyle = ({ theme, }) => ({
  marginTop: '2rem',
  marginInlineStart: 'auto',
});

const StyledSendCommentButtonsCont = createComponent(
  sendCommentButtonsContStyle
);

function getPrintableCharsCount(html) {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '').length;
}

class CommentForm extends React.Component {
  static propTypes = {
    /**
     * Update the parent element state that the `<CommentForm />`
     * that is used to reply to another comment should close
     * undefined for the main `<CommentForm />` which never needs to close
     */
    closeReplyForm: PropTypes.func,
    /**
     * A callback that gets called when subbmiting a new comment
     * @param {String} commentAuthor
     *   The new comment author
     * @param {String} commentTextHtml
     *   The new comment text innerHTML
     * @param {String} parentCommentId
     *   The parent CommentId - defaults to '0' if there is no `parentCommentId`
     */
    initNewComment: PropTypes.func.isRequired,
    /**
     * The parent commentId when the `<CommentForm />` is a reply
     * form to another Comment, defaults to '0' because of polopoly legacy
     */
    parentCommentId: PropTypes.string,
    /**
     * A callback that gets the called when submitting the sign up to notification form in `<CommentSent />`
     * @param {String} - notificationEmail - The email the user entered
     */
    signUpNotification: PropTypes.func.isRequired,
    /** passed as a a prop by fela's withTheme func before default export */
    theme: PropTypes.shape({
      commentsStyle: PropTypes.shape({
        textInputVariant: PropTypes.string,
      }),
    }).isRequired,
  };

  static defaultProps = {
    parentCommentId: '0',
    closeReplyForm: undefined,
  };

  state = {
    displaySentComp: false,
    displayThankYou: false,
    identifiedComment: false,
  };

  isReplyForm = this.props.parentCommentId !== '0';

  TextInputVariant = this.isReplyForm
    ? `${this.props.theme.commentsStyle.textInputVariant}MediumInverse`
    : this.props.theme.commentsStyle.textInputVariant;

  handleSubmitComment = (commentAuthor, commentTextHtml) => {
    this.props.initNewComment(
      commentAuthor,
      commentTextHtml,
      this.props.parentCommentId
    );
    this.setState({ displaySentComp: true, });
  };

  handleSignUpNotification(didSignUp, notificationEmail) {
    if (!didSignUp) {
      this.setState({ displayThankYou: true, });
    }
    else {
      this.props.signUpNotification(notificationEmail);
      this.setState({ displayThankYou: true, });
    }
  }

  render() {
    const { closeReplyForm, theme, } = this.props;
    const {
      buttons: { sendBtnTxt, cancelBtnTxt, toggleUserBtnText, },
      labels: { nameLabelTxt, commentLabelTxt, },
      notes: { nameNoteTxt, commentNoteTxt, },
      errorNotes: { nameErrorNoteTxt, commentErrorNoteTxt, },
    } = theme.commentFormI18n;

    return (
      <UserDispenser
        render={({ user, isLoggedIn, }) =>
          (this.state.displaySentComp ? (
            <div>
              <CommentSent
                userEmail={user.email}
                closeDisplayThankYou={() => {
                  this.setState({
                    displayThankYou: false,
                    displaySentComp: false,
                  });
                  if (this.isReplyForm) {
                    closeReplyForm();
                  }
                }}
                displayThankYou={this.state.displayThankYou}
                isReplyForm={this.isReplyForm}
                signUpNotification={(didSignUp, notificationEmail) =>
                  this.handleSignUpNotification(didSignUp, notificationEmail)
                }
              />
            </div>
          ) : (
            <Form
              disableSubmitOnEnterKeyDown
              onSubmit={({ commentAuthor, commentTextHtml, }) => {
                this.handleSubmitComment(commentAuthor, commentTextHtml);
              }}
              validate={({ commentAuthor, commentTextHtml, }) => {
                const errors = [];
                if (!commentAuthor) {
                  errors.push({
                    name: 'commentAuthor',
                    order: 1,
                  });
                }
                if (
                  !commentTextHtml ||
                  getPrintableCharsCount(commentTextHtml).length === 0
                ) {
                  errors.push({ name: 'commentTextHtml', order: 2, });
                }

                return errors;
              }}
              render={({ getInputProps, handleSubmit, }) => (
                <Query query={PlatformQuery}>
                  {({ loading, error, data, client, }) => {
                    if (loading) return <p>loading...</p>;
                    if (error) console.log(error);
                    const { platform, } = data;
                    return (
                      <EventTracker>
                        {({ biAction, }) => (
                          <StyledForm isReplyForm={this.isReplyForm}>
                            <InputAndToggleWrapper>
                              <TextInputWrapper>
                                <TextInput
                                  {...getInputProps({
                                    name: 'commentAuthor',
                                    errorText: nameErrorNoteTxt,
                                    noteText: nameNoteTxt,
                                    label: nameLabelTxt,
                                    maxLength: 50,
                                    variant: this.TextInputVariant,
                                    isDisabled: this.state.identifiedComment,
                                    refFunc: elem => {
                                      this.commentAuthorElem = elem;
                                    },
                                    ...(this.state.identifiedComment
                                      ? {
                                          value: `${user.firstName} ${
                                            user.lastName
                                          }`,
                                        }
                                      : {}),
                                  })}
                                />
                              </TextInputWrapper>
                              {isLoggedIn && (
                                <ToggleButton
                                  type="button"
                                  onClick={() => {
                                    this.setState(
                                      prevState => ({
                                        identifiedComment: !prevState.identifiedComment,
                                      }),
                                      () => {
                                        this.commentAuthorElem.focus();
                                      }
                                    );
                                  }}
                                >
                                  {toggleUserBtnText(
                                    this.state.identifiedComment
                                  )}
                                </ToggleButton>
                              )}
                            </InputAndToggleWrapper>

                            <TextInput
                              {...getInputProps({
                                name: 'commentTextHtml',
                                errorText: commentErrorNoteTxt,
                                height: 14,
                                toggleCommandBiCallBack: command => {
                                  biAction({
                                    actionCode: 104,
                                    additionalInfo: {
                                      effect: command,
                                      platform,
                                    },
                                  });
                                },
                                isContentEditable: true,
                                noteText: commentNoteTxt,
                                label: commentLabelTxt,
                                miscStyles: { marginTop: '4.14rem', },
                                variant: this.TextInputVariant,
                              })}
                            />

                            <StyledAddCommentFooter>
                              <StyledSendCommentButtonsCont>
                                {this.isReplyForm ? (
                                  <Button
                                    variant="negative"
                                    boxModel={{ hp: 5, vp: 1, }}
                                    miscStyles={{
                                      marginInlineEnd: '2rem',
                                      backgroundColor: 'transparent',
                                    }}
                                    onClick={closeReplyForm}
                                  >
                                    {cancelBtnTxt}
                                  </Button>
                                ) : null}
                                <Button
                                  miscStyles={{
                                    backgroundColor: 'transparent',
                                  }}
                                  boxModel={{ hp: 5, vp: 1, }}
                                  onClick={evt => {
                                    biAction({
                                      actionCode: 1,
                                      additionalInfo: {
                                        platform,
                                      },
                                    });
                                    handleSubmit(evt);
                                  }}
                                >
                                  {sendBtnTxt}
                                </Button>
                              </StyledSendCommentButtonsCont>
                            </StyledAddCommentFooter>
                          </StyledForm>
                        )}
                      </EventTracker>
                    );
                  }}
                </Query>
              )}
            />
          ))
        }
      />
    );
  }
}

export default withTheme(CommentForm);
