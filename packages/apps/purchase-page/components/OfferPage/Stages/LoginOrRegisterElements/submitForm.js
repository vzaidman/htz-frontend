import React from 'react';
import { pixelEvent, } from '@haaretz/htz-components';
import { FelaComponent, } from 'react-fela';
import pathGenerator from '../utils/pathGenerator';

const submitForm = ({
  gaAction,
  email,
  password,
  firstName,
  lastName,
  terms,
  checkEmailExists,
  updateRegisterOrLoginStage,
  updateRefetchState,
  login,
  register,
  cache,
  Router,
  router,
  setState,
  registerOrLoginStage,
  openResetPasswordModal,
}) => {
  if (registerOrLoginStage === 'checkEmail') {
    setState({ loading: true, email, });
    checkEmailExists(email)
      .then(userExists => {
        setState(
          {
            loading: false,
            email,
            userExists,
            error: null,
          },
          updateRegisterOrLoginStage(userExists ? 'login' : 'register')
        );
        gaAction({
          category: 'promotions-step-4-registration',
          action: 'email-continue',
          label: `user-${userExists ? 'login' : 'register'}`,
        });
      })
      .catch(error => {
        setState({
          error: error.msg || error.message,
          loading: false,
        });
        gaAction({
          category: 'promotions-step-4-registration',
          action: 'email-continue',
          label: 'error',
        });
      });
  }
  else if (registerOrLoginStage === 'login') {
    setState({
      loading: true,
      error: null,
    });
    login(email, password)
      .then(() => {
        pixelEvent('trackCustom', 'LogIntoAccount', {
          subscription_id: `${Math.floor(Math.random() * 1000000000000)}`,
        });
        updateRefetchState(true);
        gaAction({
          category: 'promotions-step-4-registration',
          action: 'password-continue',
          label: 'logged-in',
        });
      })
      .catch(error => {
        let displayError = error.message || 'שגיאה במערכת ההתחברות, אנא נסו שוב';
        if (displayError === 'הדואר האלקטרוני או הסיסמה שהוזנו אינם קיימים במערכת') {
          displayError = (
            <FelaComponent style={{ fontWeight: 'normal', }} render="span">
              הסיסמא שהזנתם שגויה, נסו שנית או -{' '}
              <FelaComponent
                style={{ fontWeight: 700, }}
                render={({ className, }) => (
                  <button
                    className={className}
                    type="button"
                    onClick={evt => openResetPasswordModal(evt)}
                  >
                    החליפו סיסמא
                  </button>
                )}
              />
            </FelaComponent>
          );
        }
        setState({
          error: displayError,
          loading: false,
        });
        gaAction({
          category: 'promotions-step-4-registration',
          action: 'password-continue',
          label: 'error',
        });
      });
  }
  else {
    setState({
      loading: true,
      error: null,
    });
    register(email, password, password, firstName, lastName, '', '', terms, '')
      .then(() => {
        cache.writeData({
          data: {
            loggedInOrRegistered: 'registered',
          },
        });
        pixelEvent('trackCustom', 'RegisterNewAccount', {
          subscription_id: `${Math.floor(Math.random() * 1000000000000)}`,
        });
        gaAction({
          category: 'promotions-step-4-registration',
          action: 'password-continue',
          label: 'success',
        });
        const { pathName, asPath, } = pathGenerator('stage4', router);
        Router.replace(pathName, asPath);
      })
      .catch(error => {
        setState({
          error: error.message || 'שגיאה במערכת ההרשמה, אנא נסו שוב',
          loading: false,
        });
        gaAction({
          category: 'promotions-step-4-registration',
          action: 'password-continue',
          label: 'error',
        });
      });
  }
};

export default submitForm;
