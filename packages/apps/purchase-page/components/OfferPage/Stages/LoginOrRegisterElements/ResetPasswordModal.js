import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import {
  A11yDialog,
  Button,
  Form,
  TextInput,
  BIAction,
  H,
  ApolloConsumer,
} from '@haaretz/htz-components';
import isEmail from 'validator/lib/isEmail';
import gql from 'graphql-tag';
import CloseModalButton from '../Elements/CloseModalButton';

const RESET_PASSWORD = gql`
  query resetPassword($userName: String!) {
    resetPassword(userName: $userName) {
      status
      message
    }
  }
`;

const modalStyle = {
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  width: '65rem',
  maxWidth: '75rem',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
};

const buttonStyle = {
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop: '3rem',
  marginBottom: '4rem',
};

class ResetPasswordModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    email: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    offerDisclaimer: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    email: null,
    offerDisclaimer: null,
  };
  state = {
    resetEmailSent: false,
    message: null,
    loading: false,
  };

  closeModal = () => {
    this.props.closeModal();
    this.setState({
      resetEmailSent: false,
      message: null,
      loading: false,
    });
  };

  render() {
    const { isVisible, } = this.props;
    return (
      <A11yDialog
        appendTo="#modalsRoot"
        elementToHide="#pageRoot"
        isVisible={isVisible}
        onClose={this.closeModal}
        isModal
        closeOnOutsideClick
        overlayBgColor="rgba(22, 22, 22, 0.8)"
        render={({ handleClose, }) => (
          <FelaComponent
            style={modalStyle}
            render={({
              theme: {
                stage3: {
                  form,
                  resetPassword: {
                    header,
                    resetPasswordButton,
                    successMessage,
                    successButtonText,
                  },
                },
              },
              className,
            }) => (
              <div className={className}>
                <FelaComponent style={{ textAlign: 'end', }}>
                  <CloseModalButton handleClose={handleClose} />
                </FelaComponent>
                <FelaComponent
                  style={theme => ({
                    textAlign: 'center',
                    extend: [ theme.type(1), ],
                  })}
                  render={({ className, }) => (
                    <H id="forgetPasswordDescription" className={className}>
                      {header}
                    </H>
                  )}
                />
                {this.state.resetEmailSent ? (
                  <Fragment>
                    <FelaComponent
                      style={theme => ({
                        color: theme.color('neutral', -3),
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop: '3rem',
                        marginBottom: '2rem',
                      })}
                    >
                      {successMessage}
                    </FelaComponent>
                    <Button
                      variant="primaryOpaque"
                      miscStyles={buttonStyle}
                      onClick={this.closeModal}
                      isBusy={this.state.loading}
                    >
                      {successButtonText}
                    </Button>
                  </Fragment>
                ) : (
                  <FelaComponent style={{ textAlign: 'center', }}>
                    <ApolloConsumer>
                      {client =>
                        (this.props.isVisible ? (
                          <Form
                            clearFormAfterSubmit={false}
                            initialValues={{ resetEmail: this.props.email, }}
                            onSubmit={async ({ resetEmail, }) => {
                              this.setState({ loading: true, });
                              const {
                                data: { resetPassword: { status, message, }, },
                              } = await client.query({
                                query: RESET_PASSWORD,
                                variables: { userName: resetEmail, },
                              });
                              this.setState({
                                resetEmailSent: status === 'success',
                                message,
                                loading: false,
                              });
                            }}
                            validate={({ resetEmail = '', }) => {
                              const errors = [];
                              if (!isEmail(resetEmail)) {
                                errors.push({
                                  name: 'resetEmail',
                                  order: 1,
                                  errorText: form.email.errorText,
                                });
                              }

                              return errors;
                            }}
                            render={({ getInputProps, handleSubmit, }) => (
                              <Fragment>
                                <FelaComponent
                                  style={{ textAlign: 'inline-start', }}
                                >
                                  <TextInput
                                    {...getInputProps({
                                      variant: 'primary',
                                      name: 'resetEmail',
                                      label: form.email.label,
                                      type: 'email',
                                      noteText: form.email.noteText,
                                      errorText: this.state.message,
                                      isError: !!this.state.message,
                                      onChange: () => {
                                        this.setState({ message: null, });
                                      },
                                    })}
                                  />
                                </FelaComponent>
                                <BIAction>
                                  {action => (
                                    <Button
                                      variant="primaryOpaque"
                                      miscStyles={buttonStyle}
                                      attrs={{
                                        'aria-described':
                                          'forgetPasswordDescription',
                                      }}
                                      onClick={evt => {
                                        handleSubmit(evt);
                                        action({
                                          actionCode: 34,
                                          additionalInfo: {
                                            stage: 'login-register',
                                          },
                                        });
                                      }}
                                      isBusy={this.state.loading}
                                    >
                                      {resetPasswordButton}
                                    </Button>
                                  )}
                                </BIAction>
                              </Fragment>
                            )}
                          />
                        ) : null)
                      }
                    </ApolloConsumer>
                  </FelaComponent>
                )}
              </div>
            )}
          />
        )}
      />
    );
  }
}

export default ResetPasswordModal;
