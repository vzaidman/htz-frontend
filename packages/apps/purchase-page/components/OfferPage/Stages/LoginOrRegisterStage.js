/* global window */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Router, { withRouter, } from 'next/router';
import {
  A11yError,
  Button,
  BIAction,
  CheckBox,
  CheckEmailExists,
  Form,
  Grid,
  GridItem,
  TextInput,
  Login,
  Register,
} from '@haaretz/htz-components';

import { ApolloConsumer, } from 'react-apollo';

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
  extend: [
    theme.mq(
      { until: 's', },
      { paddingInlineStart: '4rem', paddingInlineEnd: '4rem', }
    ),
  ],
});

const changeEmailContStyle = {
  display: 'flex',
  justifyContent: 'space-between',
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
    passwordLoaded: false,
    resetPasswordModalOpen: false,
  };

  openModal = () => {
    this.setState({ resetPasswordModalOpen: true, });
  };

  render() {
    // focus the password input when it first loads, form focus will override if there is an error in the form
    if (this.passwordInputEl && !this.state.passwordLoaded) {
      this.passwordInputEl.focus();
      this.setState({ passwordLoaded: true, });
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
                    render={({ theme: { stage3: { form, }, }, className, }) => (
                      <div className={className}>
                        <ResetPasswordModal
                          email={email}
                          closeModal={() =>
                            this.setState({ resetPasswordModalOpen: false, })
                          }
                          isVisible={this.state.resetPasswordModalOpen}
                        />
                        <ApolloConsumer>
                          {cache => (
                            <Form
                              clearFormAfterSubmit={false}
                              {...email && {
                                initialValues: { email, },
                              }}
                              onSubmit={fields => {
                                submitForm({
                                  ...fields,
                                  checkEmailExists,
                                  updateRegisterOrLoginStage,
                                  updateRefetchState,
                                  login,
                                  register,
                                  cache,
                                  Router,
                                  router,
                                  setState: newState => this.setState(newState),
                                  registerOrLoginStage,
                                });
                              }}
                              validate={fields =>
                                validateForm({
                                  ...fields,
                                  form,
                                  site,
                                  openModal: this.openModal,
                                  registerOrLoginStage,
                                })
                              }
                              render={({ getInputProps, handleSubmit, }) => (
                                <FelaComponent style={formContStyle}>
                                  {/* render form header only when user is registering and nothing is loading */}
                                  {registerOrLoginStage === 'register' && (
                                    <FelaComponent style={changeEmailContStyle}>
                                      <FelaComponent
                                        style={theme => ({
                                          extend: [ theme.type(2), ],
                                        })}
                                        render="h4"
                                      >
                                        {form.registerHeader.header}
                                      </FelaComponent>
                                      <FelaComponent
                                        style={theme => ({
                                          color: theme.color(
                                            'loginOrRegister',
                                            'inFormText'
                                          ),
                                          extend: [ theme.type(-1), ],
                                        })}
                                        render={({ className, }) => (
                                          <button
                                            type="button"
                                            className={className}
                                            onClick={() => {
                                              this.setState({ email: null, });
                                              updateRegisterOrLoginStage(
                                                'checkEmail'
                                              );
                                            }}
                                          >
                                            {form.registerHeader.buttonText}{' '}
                                            <FelaComponent
                                              style={{ fontWeight: 'bold', }}
                                              render="span"
                                            >
                                              {
                                                form.registerHeader
                                                  .buttonTextBold
                                              }
                                            </FelaComponent>
                                          </button>
                                        )}
                                      />
                                    </FelaComponent>
                                  )}

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
                                    {registerOrLoginStage !== 'checkEmail' && (
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
                                              this.state.userExists
                                            ),
                                          })}
                                          miscStyles={textInputStyle}
                                        />
                                        {/* render first and last name inputs if the user does not exist */}
                                        {registerOrLoginStage ===
                                          'register' && (
                                          <Grid gutter={2}>
                                            <GridItem
                                              width={[ { until: 'm', value: 1, }, ]}
                                              miscStyles={{
                                                maxWidth: [
                                                  { from: 'm', value: '50%', },
                                                ],
                                              }}
                                            >
                                              <TextInput
                                                {...getInputProps({
                                                  variant: 'primary',
                                                  name: 'firstName',
                                                  label: form.firstName.label,
                                                  noteText:
                                                    form.firstName.noteText,
                                                  maxLength: 40,
                                                  miscStyles: textInputStyle,
                                                })}
                                              />
                                            </GridItem>
                                            <GridItem
                                              width={[ { until: 'm', value: 1, }, ]}
                                              miscStyles={{
                                                maxWidth: [
                                                  { from: 'm', value: '50%', },
                                                ],
                                              }}
                                            >
                                              <TextInput
                                                {...getInputProps({
                                                  variant: 'primary',
                                                  name: 'lastName',
                                                  label: form.lastName.label,
                                                  noteText:
                                                    form.lastName.noteText,
                                                  maxLength: 40,
                                                  miscStyles: textInputStyle,
                                                })}
                                              />
                                            </GridItem>
                                          </Grid>
                                        )}
                                        <CheckBox
                                          {...getInputProps({
                                            name: 'terms',
                                            variant: 'primary',
                                            label: (
                                              <FelaComponent
                                                style={theme => ({
                                                  extend: [ theme.type(-1), ],
                                                })}
                                              >
                                                {this.state.userExists ? (
                                                  <Fragment>
                                                    {form.terms.loginText}
                                                  </Fragment>
                                                ) : (
                                                  <Fragment>
                                                    {
                                                      form.terms.register
                                                        .labelBeforeTermsButton
                                                    }{' '}
                                                    <FelaComponent
                                                      style={theme => ({
                                                        color: theme.color(
                                                          'loginOrRegister',
                                                          'inFormText'
                                                        ),
                                                        ':visited': {
                                                          color: theme.color(
                                                            'loginOrRegister',
                                                            'inFormText'
                                                          ),
                                                        },
                                                      })}
                                                      render={({
                                                        className,
                                                      }) => (
                                                        <a
                                                          className={className}
                                                          href={
                                                            form.terms.register
                                                              .href[site]
                                                          }
                                                          target="_blank"
                                                        >
                                                          {
                                                            form.terms.register
                                                              .labelTerms[site]
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
                                              </FelaComponent>
                                            ),
                                            noteText: form.terms.noteText[site],
                                            formElementType: 'checkBox',
                                            miscStyles: { marginTop: '3rem', },
                                          })}
                                        />
                                      </Fragment>
                                    )}
                                    {this.state.error && (
                                      <A11yError
                                        errorText={this.state.error}
                                        miscStyles={{
                                          marginTop: '4rem',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )}
                                    <BIAction>
                                      {action => (
                                        <Button
                                          variant="primaryOpaque"
                                          {...this.state.loading && {
                                            isBusy: true,
                                          }}
                                          onClick={evt => {
                                            handleSubmit(evt);
                                            action({
                                              actionCode:
                                                registerOrLoginStage ===
                                                'checkEmail'
                                                  ? 107
                                                  : registerOrLoginStage ===
                                                    'login'
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
                                      )}
                                    </BIAction>
                                  </Fragment>
                                </FelaComponent>
                              )}
                            />
                          )}
                        </ApolloConsumer>
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
