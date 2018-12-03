/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import Redirect from '../../../Redirect/Redirect';

const propTypes = {
  chosenSubscription: PropTypes.oneOf([ 'HTZ', 'TM', 'BOTH', ]),
  pageNumber: PropTypes.number.isRequired,
};

const defaultProps = {
  chosenSubscription: null,
};

function LoginRedirect({ chosenSubscription, pageNumber, }) {
  let redirect;
  switch (pageNumber) {
    case 2.4:
      redirect = <Redirect destination="stage1" replace />;
      break;
    case 3.2:
      redirect =
        chosenSubscription === 'TM' || chosenSubscription === 'HTZ' || !chosenSubscription ? (
          <Redirect destination="stage2" replace />
        ) : (
          <Redirect destination="stage4" replace />
        );
      break;
    case 3.4:
    case 3.6:
      redirect = <Redirect destination="stage2" replace />;
      break;

    default:
      if (pageNumber >= 7) {
        redirect = <Redirect destination="thankYou" replace />;
      }
      else {
        redirect = <Redirect destination="stage4" replace />;
      }
      break;
  }

  return redirect;
}

LoginRedirect.propTypes = propTypes;
LoginRedirect.defaultProps = defaultProps;

export default LoginRedirect;
