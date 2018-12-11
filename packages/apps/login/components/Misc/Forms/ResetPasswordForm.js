import React, { Component, Fragment, } from 'react';
import config from 'config';
import { domainToSiteNumber, } from '../../../util/siteUtil';

import { Form, TextInput, Button, } from '@haaretz/htz-components';
import { getEmail, } from '../../../pages/queryutil/userDetailsOperations';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';

// Styling Components -------
const { ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

const onResetPassword = ({ host, nextStage, showError, hideError, setPreloader, flow, eventsTrackers, }) => ({
  email,
}) => {
  setPreloader(true);
  hideError();
  const params = `userName=${email}&newsso=true&layer=sendpassword&site=${domainToSiteNumber(
    host
  )}`;
  fetch(`${config.get('service.sso')}/sso/r/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
    .then(
      success => success.json(),
      () => Promise.resolve({ status: 'error', message: 'server error', })
    )
    .then(json => {
      setPreloader(false);
      if (json.status === 'success') {
        sendTrackingEvents(eventsTrackers, { page: 'Reset Password', flowNumber: flow, label: 'sendResetPassword', })(() => {
            nextStage();
          }
        );
        
      }
      else {
        hideError();
        showError(json.message);
      }
    });
};

class ResetPasswordForm extends Component {
  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
  };

  /* :::::::::::::::::::::::::::::::::::: { PROPS :::::::::::::::::::::::::::::::::::: */
  static propTypes = {};

  static defaultProps = {};
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  };

  setPreloader = isLoadingStatus => {
    this.setState({ isLoading: !!isLoadingStatus, });
  };
  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { nextStage, CloseButton, host, theme, validateEmailInput, client, flow, eventsTrackers, } = this.props;

    return (
      <Fragment>
        <div>
          <CloseButton />
          <h4>החלפת סיסמה</h4>
          <Form
            clearFormAfterSubmit={false}
            initialValues={ {email: getEmail(client)} }
            validate={validateEmailInput}
            onSubmit={onResetPassword({
              host,
              nextStage,
              showError: this.showError,
              hideError: this.hideError,
              setPreloader: this.setPreloader,
              flow,
              eventsTrackers,
            })}
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

                <ErrorBox className={this.state.showError ? "" : "hidden"}>
                  <span>
                    {this.state.errorMessage}
                  </span>
                </ErrorBox>

                <ItemCenterer>
                  <Button isBusy={this.state.isLoading} onClick={handleSubmit}>המשך</Button>
                </ItemCenterer>
              </Fragment>
            )}
          />
        </div>
      </Fragment>
    );
    /* :::::::::::::::::::::::::::::::::::: RENDER } :::::::::::::::::::::::::::::::::::: */
  }
}

export default ResetPasswordForm;
