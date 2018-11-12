import React, { Component, Fragment } from 'react';
import Preloader from '../Preloader';

class ResetPasswordForm extends Component {
  
  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
  }

  /* :::::::::::::::::::::::::::::::::::: { PROPS :::::::::::::::::::::::::::::::::::: */
  static propTypes = {
    
  };

  static defaultProps = {
    
  };
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  showError = (errorMsg) => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  }

  setPreloader = (isLoadingStatus) => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }
  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { nextStage, closeModal, CloseButton, host, theme, validateEmailInput, } = this.props;

    return(
      <Fragment>
        <div>
          <CloseButton />
          <h4>החלפת סיסמה</h4>
              <Form
              clearFormAfterSubmit={false}
              // initialValues={{ email: 'insert email' }}
              validate={validateEmailInput}
              onSubmit={onResetPassword({ host, nextStage , })}
              render={({ getInputProps, handleSubmit, clearForm, }) => (
                <Fragment>
                  <TextInput
                    type="email"
                    label={theme.emailInputLabel}
                    noteText="אנא הזינו כתובת דוא”ל"
                    requiredText={{
                      long: theme.emailInputRequiredLong,
                      short: theme.emailInputRequiredShort,
                    }}
                    {...getInputProps({
                      name: 'email',
                      label: theme.emailInputLabel,
                      type: 'email',
                    })}
                  />
                  <ItemCenterer>
                    <Button onClick={handleSubmit}>המשך</Button>
                  </ItemCenterer>
                </Fragment>
              )}
            />
        </div>

        <div>
          <CloseButton/>
          <h4>החלפת סיסמה</h4>
          <br/>
          <h5>הוראות לאיפוס הסיסמה נשלחו לתיבת הדוא”ל שלך.</h5>
          <ItemCenterer>
            <Button onClick={closeModal}>התחברות</Button>
          </ItemCenterer>
        </div>

      </Fragment>
    );
    /* :::::::::::::::::::::::::::::::::::: RENDER } :::::::::::::::::::::::::::::::::::: */
  }

}

export default ResetPasswordForm;