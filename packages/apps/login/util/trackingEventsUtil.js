/**
 * Google Analytics Actions
 */
const actions = [
  null,
  'Scenario 1 - Valid Mail + Vaild Phone',
  'Scenario 2 - Valid Mail + No Vaild Phone',
  'Scenario 3 - Mail exists but not vaild + No Vaild Phone',
  'Scenario 4 - No mail + No Phone',
  'Scenario 5 - No valid mail + No valid Phone (P)',
  'Scenario 6 - No valid mail + valid Phone (P)',
];

/**
 * Google Analytics Events[0]
 * Regular Actions [1]
 */
const events = {
  proceedEmail: [ 'Proceed', 115, ],
  proceedPhone: [ 'Proceed', 116, ],
  connectPassword: [ 'Connect', 64, ],
  connectSMS: [ 'Connect', 124, ],
  login: [ 'Login', 117, ],
  register: [ 'Register', 61, ],
  loginPage: [ 'Login', 66, ],
  registrationPage: [ 'Registeration', 67, ],
  sendAgainOtp: [ 'Resend', 118, ],
  sendAgainPhoneEmail: [ 'Resend mail', 123, ],
  sendAgainAddressEmail: [ 'Resend mail', 127, ],
  sendResetPassword: [ 'Sent Reset Password Email', 62, ], // TODO check action name
  withPassword: [ 'Login with password', 121, ],
  withSms: [ 'Login with SMS', 120, ],
  notMyPhone: [ 'Not your phone', 119, ],
  forgotPassword: [ 'Forgot password', 56, ],
  getCustomerService: [ 'Customer Service', 122, ], // TODO: check action name
};

/**
 * Returns the required object for gaAction
 */
const getGaObject = ({ page, flowNumber, label, }) =>
  (page && flowNumber && label
    ? {
      category: page,
      action: actions[flowNumber],
      label: events[label][0],
    }
    : null);

/**
 * Returns a function that handles sending gaAction & biAction
 */
const sendTrackingEvents = (eventTrackers, dataObj) => callback => {
  const gaObject = getGaObject(dataObj);
  if (eventTrackers && eventTrackers.gaAction && eventTrackers.biAction && gaObject) {
    eventTrackers.biAction({ actionCode: events[dataObj.label][1], });
    eventTrackers.gaAction(gaObject).then(
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
      error => {
        if (typeof callback === 'function') {
          callback();
        }
        console.warn(`GA Error: ${error}`);
      }
    );
  }
  else {
    console.warn('Could not send event');
    if (typeof callback === 'function') {
      callback();
    }
  }
};

export { sendTrackingEvents, };
