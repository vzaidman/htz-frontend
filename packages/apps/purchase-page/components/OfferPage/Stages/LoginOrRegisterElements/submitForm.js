const submitForm = ({
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
  stateEmail,
  registerOrLoginStage,
}) => {
  if (registerOrLoginStage === 'checkEmail') {
    setState({ loading: true, email, });
    checkEmailExists(email)
      .then(userExists => {
        setState({
          loading: false,
          email,
          userExists,
        });
        updateRegisterOrLoginStage(userExists ? 'login' : 'register');
      })
      .catch(error => {
        setState({
          error: error.msg || error.message,
          loading: false,
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
      })
      .catch(error => {
        setState({
          error: error.message || 'שגיאה במערכת ההתחברות, אנא נסו שוב',
          loading: false,
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
        Router.replace('/promotions-page/stage4', router.asPath);
      })
      .catch(error => {
        setState({
          error: error.message || 'שגיאה במערכת ההרשמה, אנא נסו שוב',
          loading: false,
        });
      });
  }
};

export default submitForm;
