/* global window */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Router, { withRouter, } from 'next/router';
import {
  Button,
  CheckBox,
  CheckEmailExists,
  Form,
  Grid,
  GridItem,
  TextInput,
  Login,
  Register,
} from '@haaretz/htz-components';
import isEmail from 'validator/lib/isEmail';
import { Query, ApolloConsumer, } from 'react-apollo';
import gql from 'graphql-tag';

import ResetPasswordModal from './LoginOrRegisterElements/ResetPasswordModal';
import Redirect from '../../Redirect/Redirect';

const GET_PURCHASE_PAGE_DATA = gql`
  query PageData($path: String!) {
    purchasePage(path: $path)
  }
`;

const formContStyle = theme => ({
  marginTop: '4rem',
  marginBottom: '30rem',
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

const passwordNoteContStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const PasswordNote = (text, forgotPasswordText, openModal, userExists) => (
  <Fragment>
    {userExists ? (
      <FelaComponent style={passwordNoteContStyle}>
        <div>{text}</div>
        <FelaComponent
          style={theme => ({
            textDecoration: 'underline',
            color: theme.color('loginOrRegister', 'inFormText'),
          })}
          render={({ className, }) => (
            <button className={className} type="button" onClick={openModal}>
              {forgotPasswordText}
            </button>
          )}
        />
      </FelaComponent>
    ) : (
      text
    )}
  </Fragment>
);

const textInputStyle = {
  marginTop: '2rem',
};

class LoginOrRegisterStage extends React.Component {
  static propTypes = {
    chosenSubscription: PropTypes.string.isRequired,
    router: PropTypes.shape().isRequired,
    site: PropTypes.oneOf([ 'HTZ', 'TM', ]).isRequired,
    updateRegisterOrLoginStage: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  state = {
    error: null,
    loading: false,
    loadingAll: false,
    email: null,
    userExists: true,
    refetch: false,
    resetPasswordModalOpen: false,
  };

  openModal = () => {
    this.setState({ resetPasswordModalOpen: true, });
  };

  render() {
    const {
      chosenSubscription,
      router,
      site,
      updateRegisterOrLoginStage,
    } = this.props;

    if (this.state.error) {
      return (
        <div>
          <FelaComponent
            style={theme => ({
              color: theme.color('tertiary'),
              marginTop: '13rem',
              fontWeight: 'bold',
            })}
          >
            {this.state.error}
          </FelaComponent>
          <Button
            onClick={() =>
              this.setState({ error: null, loading: false, loadingAll: false, })
            }
            miscStyles={{ marginTop: '5rem', }}
          >
            נסו שוב
          </Button>
        </div>
      );
    }

    return this.state.refetch ? (
      <Query
        query={GET_PURCHASE_PAGE_DATA}
        variables={{ path: router.asPath, }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error, client, }) => {
          if (loading) return <div> Loading...</div>;
          if (error) return <div> Error...</div>;
          const { purchasePage: { pageNumber, }, } = data;
          client.writeData({ data: { loggedInOrRegistered: 'loggedIn', }, });
          return pageNumber === 2.4 ? (
            <Redirect
              destination="/promotions-page/stage1"
              replace
              router={router}
            />
          ) : pageNumber === 3.2 ? (
            chosenSubscription === 'TM' || chosenSubscription === 'HTZ' ? (
              <Redirect
                destination="/promotions-page/stage2"
                replace
                router={router}
              />
            ) : (
              <Redirect
                destination="/promotions-page/stage4"
                replace
                router={router}
              />
            )
          ) : pageNumber === 3.4 || pageNumber === 3.6 ? (
            <Redirect
              destination="/promotions-page/stage2"
              replace
              router={router}
            />
          ) : pageNumber >= 7 ? (
            <Redirect
              destination="/promotions-page/thankYou"
              replace
              router={router}
            />
          ) : (
            <Redirect
              destination="/promotions-page/stage4"
              replace
              router={router}
            />
          );
        }}
      </Query>
    ) : (
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
                          closeModal={() =>
                            this.setState({ resetPasswordModalOpen: false, })
                          }
                          isVisible={this.state.resetPasswordModalOpen}
                        />
                        <ApolloConsumer>
                          {cache => (
                            <Form
                              // dont clear the form if there is no email saved in state
                              clearFormAfterSubmit={!!this.state.email}
                              {...this.state.email && {
                                initialValues: { email: this.state.email, },
                              }}
                              onSubmit={({
                                email,
                                password,
                                firstName,
                                lastName,
                                terms,
                              }) => {
                                if (!this.state.email) {
                                  this.setState({ loading: true, email, });
                                  checkEmailExists(email)
                                    .then(userExists => {
                                      this.setState({
                                        loading: false,
                                        email,
                                        userExists,
                                      });
                                      updateRegisterOrLoginStage(
                                        userExists ? 'login' : 'register'
                                      );
                                    })
                                    .catch(error => {
                                      this.setState({ error: error.msg, });
                                    });
                                }
 else if (this.state.userExists) {
                                  this.setState({
                                    loading: true,
                                    loadingAll: true,
                                  });
                                  login(email, password)
                                    .then(() => {
                                      this.setState({
                                        refetch: true,
                                      });
                                    })
                                    .catch(error => {
                                      this.setState({
                                        error:
                                          error.message ||
                                          'שגיאה במערכת ההתחברות, אנא נסו שוב',
                                      });
                                    });
                                }
 else {
                                  this.setState({
                                    loading: true,
                                    loadingAll: true,
                                  });
                                  register(
                                    email,
                                    password,
                                    password,
                                    firstName,
                                    lastName,
                                    '',
                                    '',
                                    terms,
                                    ''
                                  )
                                    .then(() => {
                                      cache.writeData({
                                        data: {
                                          loggedInOrRegistered: 'registered',
                                        },
                                      });
                                      Router.replace(
                                        '/promotions-page/stage4',
                                        router.asPath
                                      );
                                    })
                                    .catch(error => {
                                      console.log('error register in');
                                      this.setState({
                                        error:
                                          error.message ||
                                          'שגיאה במערכת ההרשמה, אנא נסו שוב',
                                      });
                                    });
                                }
                              }}
                              validate={({
                                email = '',
                                password,
                                firstName,
                                lastName,
                                terms,
                              }) => {
                                const errors = [];
                                if (!isEmail(email)) {
                                  errors.push({
                                    name: 'email',
                                    order: 1,
                                    errorText: form.email.errorText,
                                  });
                                }

                                if (this.state.email) {
                                  if (!password) {
                                    errors.push({
                                      name: 'password',
                                      order: 2,
                                      errorText: PasswordNote(
                                        form.password.errorTextNoPassword,
                                        form.password.forgotPasswordText,
                                        this.openModal,
                                        this.state.userExists
                                      ),
                                    });
                                  }
                                  if (password && password.length < 5) {
                                    errors.push({
                                      name: 'password',
                                      order: 2,
                                      errorText: PasswordNote(
                                        form.password.errorTextUnderFiveChars,
                                        form.password.forgotPasswordText,
                                        this.openModal,
                                        this.state.userExists
                                      ),
                                    });
                                  }
                                  if (!this.state.userExists) {
                                    if (!firstName) {
                                      errors.push({
                                        name: 'firstName',
                                        order: 3,
                                        errorText: form.firstName.errorText,
                                      });
                                    }
                                    const digitRegex = new RegExp('\\d');
                                    if (
                                      firstName &&
                                      (firstName.length < 2 ||
                                        digitRegex.test(firstName))
                                    ) {
                                      errors.push({
                                        name: 'firstName',
                                        order: 3,
                                        errorText:
                                          form.firstName.errorTextUnderTwoChars,
                                      });
                                    }
                                    if (!lastName) {
                                      errors.push({
                                        name: 'lastName',
                                        order: 4,
                                        errorText: form.lastName.errorText,
                                      });
                                    }
                                    if (
                                      lastName &&
                                      (lastName.length < 2 ||
                                        digitRegex.test(lastName))
                                    ) {
                                      errors.push({
                                        name: 'lastName',
                                        order: 4,
                                        errorText:
                                          form.lastName.errorTextUnderTwoChars,
                                      });
                                    }
                                  }
                                  if (!terms) {
                                    errors.push({
                                      name: 'terms',
                                      order: 4,
                                      errorText: form.terms.errorText,
                                    });
                                  }
                                }
                                return errors;
                              }}
                              render={({ getInputProps, handleSubmit, }) => (
                                <FelaComponent style={formContStyle}>
                                  {this.state.email &&
                                    !this.state.userExists &&
                                    !this.state.loading && (
                                      <FelaComponent
                                        style={changeEmailContStyle}
                                      >
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
                                  {!this.state.loadingAll && (
                                    <TextInput
                                      {...getInputProps({
                                        variant: 'offerPage',
                                        name: 'email',
                                        label: form.email.label,
                                        type: 'email',
                                        noteText: form.email.noteText,
                                        maxLength: 64,
                                        miscStyles: textInputStyle,
                                      })}
                                    />
                                  )}
                                  <Fragment>
                                    {this.state.email && !this.state.loading ? (
                                      <Fragment>
                                        <TextInput
                                          {...getInputProps({
                                            variant: 'offerPage',
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
                                        {!this.state.userExists && (
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
                                                  variant: 'offerPage',
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
                                                  variant: 'offerPage',
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
                                            variant: 'offerPage',
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
                                            noteText: form.terms.noteText,
                                            formElementType: 'checkBox',
                                            miscStyles: { marginTop: '3rem', },
                                          })}
                                        />
                                      </Fragment>
                                    ) : null}

                                    <Button
                                      variant="offerPageOpaque"
                                      onClick={handleSubmit}
                                      {...this.state.loading && {
                                        isBusy: true,
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
