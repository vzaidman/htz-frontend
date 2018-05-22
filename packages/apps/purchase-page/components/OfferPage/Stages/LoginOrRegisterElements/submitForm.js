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
  stateUserExists,
}) => {
  if (!stateEmail) {
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
  else if (stateUserExists) {
    setState({
      loading: true,
      loadingAll: true,
    });
    login(email, password)
      .then(() => {
        updateRefetchState(true);
      })
      .catch(error => {
        setState({
          error: error.message || 'שגיאה במערכת ההתחברות, אנא נסו שוב',
        });
      });
  }
  else {
    setState({
      loading: true,
      loadingAll: true,
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
        });
      });
  }
};

export default submitForm;
