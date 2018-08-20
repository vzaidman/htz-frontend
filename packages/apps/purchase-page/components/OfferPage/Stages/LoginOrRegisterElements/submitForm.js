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
        updateRefetchState(true);
        gaAction({
          category: 'promotions-step-4-registration',
          action: 'password-continue',
          label: 'logged-in',
        });
      })
      .catch(error => {
        setState({
          error: error.message || 'שגיאה במערכת ההתחברות, אנא נסו שוב',
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
