/* global window */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Router, { withRouter, } from 'next/router';
import {
  A11yError,
  Button,
  EventTracker,
  CheckBox,
  CheckEmailExists,
  Form,
  Grid,
  GridItem,
  H,
  TextInput,
  Login,
  Register,
  ApolloConsumer,
} from '@haaretz/htz-components';

import ResetPasswordModal from './LoginOrRegisterElements/ResetPasswordModal';
import submitForm from './LoginOrRegisterElements/submitForm';
import PasswordNote from './LoginOrRegisterElements/PasswordNote';
import validateForm from './LoginOrRegisterElements/validateForm';

const formContStyle = theme => ({
  marginTop: '4rem',
  marginBottom: '20rem',
  maxWidth: '85rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  textAlign: 'inline-start',
  extend: [ theme.mq({ until: 's', }, { paddingInlineStart: '4rem', paddingInlineEnd: '4rem', }), ],
});

const formHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '3rem',
};

const textInputStyle = {
  marginTop: '2rem',
};

class LoginOrRegisterStage extends React.Component {
  static propTypes = {
    chosenSubscription: PropTypes.string.isRequired,
    registerOrLoginStage: PropTypes.string.isRequired,
    router: PropTypes.shape().isRequired,
    site: PropTypes.oneOf([ 'HTZ', 'TM', ]).isRequired,
    updateRegisterOrLoginStage: PropTypes.func.isRequired,
    updateRefetchState: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  state = {
    error: null,
    loading: false,
    email: null,
    userExists: true,
    initialFocusSet: false,
    resetPasswordModalOpen: false,
  };

  openModal = () => {
    this.setState({ resetPasswordModalOpen: true, });
  };

  render() {
    // focus the password input when it first loads, form focus will override if there is an error in the form
    if (this.passwordInputEl && !this.state.initialFocusSet && this.state.userExists) {
      this.passwordInputEl.focus();
      this.setState({ initialFocusSet: true, });
    }
    else if (this.signUpButton && !this.state.initialFocusSet) {
      this.signUpButton.focus();
      this.setState({ initialFocusSet: true, });
    }
    const {
      router,
      site,
      updateRegisterOrLoginStage,
      updateRefetchState,
      registerOrLoginStage,
    } = this.props;
    const { email, } = this.state;
    return (
      <Register
        render={({ register, }) => (
          <Login
            render={({ login, }) => (
              <CheckEmailExists
                render={({ checkEmailExists, }) => (
                  <FelaComponent
                    style={{ textAlign: 'center', }}
                    render={({
                      theme: {
                        stage3: { form, },
                      },
                      className,
                    }) => (
                      <div
                        className={className}
                        ref={node => {
                          this.forgotPasswordElem = node;
                        }}
                      >
                        <ResetPasswordModal
                          email={email}
                          closeModal={() => {
                            this.setState({ resetPasswordModalOpen: false, });
                            if (this.resetPasswordButtonEl) {
                              this.resetPasswordButtonEl.focus();
                            }
                          }}
                          isVisible={this.state.resetPasswordModalOpen}
                        />
                        <EventTracker>
                          {({ biAction, gaAction, gaMapper, }) => (
                            <ApolloConsumer>
                              {cache => (
                                <Form
                                  // dont clear the form if there is no email saved in state
                                  clearFormAfterSubmit={false}
                                  {...(email
                                    ? {
                                      initialValues: { email, },
                                    }
                                    : {})}
                                  onSubmit={fields => {
                                    console.log('submitting');
                                    submitForm({
                                      ...fields,
                                      gaAction,
                                      checkEmailExists,
                                      updateRegisterOrLoginStage,
                                      updateRefetchState,
                                      login,
                                      register,
                                      cache,
                                      Router,
                                      router,
                                      setState: newState => {
                                        this.setState(newState);
                                      },
                                      registerOrLoginStage,
                                      openResetPasswordModal: this.openModal,
                                    });
                                  }}
                                  validate={fields => validateForm({
                                    ...fields,
                                    form,
                                    site,
                                    openModal: this.openModal,
                                    registerOrLoginStage,
                                  })
                                  }
                                  render={({ getInputProps, handleSubmit, }) => (
                                    <FelaComponent style={formContStyle}>
                                      {/* render form header only when user is registering or loging in and nothing is loading */}
                                      {registerOrLoginStage === 'register'
                                      || registerOrLoginStage === 'login' ? (
                                        <FelaComponent style={formHeaderStyle}>
                                          <FelaComponent
                                            style={theme => ({
                                              extend: [ theme.type(2), ],
                                            })}
                                            render={({ className, }) => (
                                              <H className={className}>
                                                {form.registerHeader.header[registerOrLoginStage]}
                                              </H>
                                            )}
                                          />
                                          <FelaComponent
                                            style={theme => ({
                                              color: theme.color('loginOrRegister', 'inFormText'),
                                              extend: [ theme.type(-1), ],
                                            })}
                                            render={({ className, }) => (
                                              <button
                                                type="button"
                                                className={className}
                                                ref={node => {
                                                  this.signUpButton = node;
                                                }}
                                                onClick={
                                                  registerOrLoginStage === 'register'
                                                    ? () => {
                                                      this.setState({
                                                        email: null,
                                                      });
                                                      updateRegisterOrLoginStage('checkEmail');
                                                    }
                                                    : evt => {
                                                      this.openModal(evt);
                                                    }
                                                }
                                              >
                                                {
                                                  form.registerHeader.buttonText[
                                                    registerOrLoginStage
                                                  ]
                                                }
                                                {' '}
                                                <FelaComponent
                                                  style={{
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                  }}
                                                  render="span"
                                                >
                                                  {
                                                    form.registerHeader.buttonTextBold[
                                                      registerOrLoginStage
                                                    ]
                                                  }
                                                </FelaComponent>
                                              </button>
                                            )}
                                          />
                                        </FelaComponent>
                                        ) : null}

                                      <TextInput
                                        {...getInputProps({
                                          variant: 'primary',
                                          name: 'email',
                                          label: form.email.label,
                                          type: 'email',
                                          noteText: form.email.noteText,
                                          maxLength: 64,
                                          miscStyles: textInputStyle,
                                          onChange: evt => {
                                            this.setState({
                                              email: evt.target.value,
                                            });
                                          },
                                        })}
                                      />
                                      <Fragment>
                                        {/* render password input when registering or logging in */}
                                        {registerOrLoginStage !== 'checkEmail' ? (
                                          <Fragment>
                                            <TextInput
                                              {...getInputProps({
                                                refFunc: elem => {
                                                  this.passwordInputEl = elem;
                                                },
                                                variant: 'primary',
                                                name: 'password',
                                                label: form.password.label,
                                                type: 'password',
                                                noteText: PasswordNote(
                                                  form.password[
                                                    this.state.userExists
                                                      ? 'noteTextLogin'
                                                      : 'noteTextRegister'
                                                  ],
                                                  form.password.forgotPasswordText,
                                                  this.openModal,
                                                  this.state.userExists,
                                                  el => {
                                                    this.resetPasswordButtonEl = el;
                                                  }
                                                ),
                                              })}
                                              miscStyles={textInputStyle}
                                            />
                                            {/* render first and last name inputs if the user does not exist */}
                                            {registerOrLoginStage === 'register' ? (
                                              <Grid gutter={2}>
                                                <GridItem
                                                  width={[ { until: 'm', value: 1, }, ]}
                                                  miscStyles={{
                                                    maxWidth: [
                                                      {
                                                        from: 'm',
                                                        value: '50%',
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <TextInput
                                                    {...getInputProps({
                                                      variant: 'primary',
                                                      name: 'firstName',
                                                      label: form.firstName.label,
                                                      noteText: form.firstName.noteText,
                                                      maxLength: 40,
                                                      miscStyles: textInputStyle,
                                                    })}
                                                  />
                                                </GridItem>
                                                <GridItem
                                                  width={[ { until: 'm', value: 1, }, ]}
                                                  miscStyles={{
                                                    maxWidth: [
                                                      {
                                                        from: 'm',
                                                        value: '50%',
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <TextInput
                                                    {...getInputProps({
                                                      variant: 'primary',
                                                      name: 'lastName',
                                                      label: form.lastName.label,
                                                      noteText: form.lastName.noteText,
                                                      maxLength: 40,
                                                      miscStyles: textInputStyle,
                                                    })}
                                                  />
                                                </GridItem>
                                              </Grid>
                                            ) : null}
                                            <FelaComponent
                                              render={({ className, theme, }) => (
                                                <CheckBox
                                                  {...getInputProps({
                                                    name: 'terms',
                                                    labelStyle: {
                                                      ...theme.type(-1),
                                                    },
                                                    variant: 'primary',
                                                    label: (
                                                      <Fragment>
                                                        {this.state.userExists ? (
                                                          <Fragment>
                                                            {form.terms.loginText}
                                                          </Fragment>
                                                        ) : (
                                                          <Fragment>
                                                            {
                                                              form.terms.register
                                                                .labelBeforeTermsButton
                                                            }
                                                            {' '}
                                                            <FelaComponent
                                                              style={theme => {
                                                                const color = theme.color(
                                                                  'loginOrRegister',
                                                                  'inFormText'
                                                                );
                                                                return {
                                                                  color,
                                                                  ':visited': { color, },
                                                                  ':focus': {
                                                                    color,
                                                                    textDecoration: 'underline',
                                                                  },
                                                                  ':hover': {
                                                                    color,
                                                                    textDecoration: 'underline',
                                                                  },
                                                                };
                                                              }}
                                                              render={({ className, }) => (
                                                                <a
                                                                  className={className}
                                                                  href={
                                                                    form.terms.register.href[site]
                                                                  }
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                >
                                                                  {
                                                                    form.terms.register.labelTerms[
                                                                      site
                                                                    ]
                                                                  }
                                                                </a>
                                                              )}
                                                            />
                                                            {
                                                              form.terms.register
                                                                .labelAfterTermsButton
                                                            }
                                                          </Fragment>
                                                        )}
                                                      </Fragment>
                                                    ),
                                                    noteText: form.terms.noteText[site],
                                                    formElementType: 'checkBox',
                                                    miscStyles: {
                                                      marginTop: '3rem',
                                                    },
                                                  })}
                                                />
                                              )}
                                            />
                                          </Fragment>
                                        ) : null}
                                        <A11yError
                                          errorText={this.state.error || ''}
                                          miscStyles={{
                                            marginTop: '4rem',
                                            textAlign: 'center',
                                          }}
                                        />
                                        <Button
                                          variant="primaryOpaque"
                                          {...(this.state.loading
                                            ? {
                                              isBusy: true,
                                            }
                                            : {})}
                                          onClick={evt => {
                                            handleSubmit(evt);
                                            biAction({
                                              actionCode:
                                                registerOrLoginStage === 'checkEmail'
                                                  ? 107
                                                  : registerOrLoginStage === 'login'
                                                    ? 30
                                                    : 27,
                                              additionalInfo: {
                                                stage: 'login-register',
                                              },
                                            });
                                          }}
                                          miscStyles={{
                                            marginTop: '4rem',
                                            display: 'block',
                                            marginInlineEnd: 'auto',
                                            marginInlineStart: 'auto',
                                          }}
                                        >
                                          {form.continueButton.text}
                                        </Button>
                                      </Fragment>
                                    </FelaComponent>
                                  )}
                                />
                              )}
                            </ApolloConsumer>
                          )}
                        </EventTracker>
                      </div>
                    )}
                  />
                )}
              />
            )}
          />
        )}
      />
    );
  }
}

export default withRouter(LoginOrRegisterStage);
