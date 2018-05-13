/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import Redirect from '../../../Redirect/Redirect';

const propTypes = {
  chosenSubscription: PropTypes.oneOf([ 'HTZ', 'TM', 'BOTH', ]),
  refetch: PropTypes.func.isRequired,
};

const defaultProps = {
  chosenSubscription: null,
};

class LoginRedirect extends React.Component {
  state = {
    pageNumber: null,
  };

  componentWillMount() {
    this.props.refetch().then(({ data: { purchasePage: { pageNumber, }, }, }) => {
      this.setState({ pageNumber, });
    });
  }

  render() {
    const { chosenSubscription, } = this.props;
    if (!this.state.pageNumber) { return <div>loading LoginRedirect component</div>; }
    let redirect;
    switch (this.state.pageNumber) {
      case 2.4:
        redirect = <Redirect destination="/promotions-page/stage1" replace />;
        break;
      case 3.2:
        redirect =
          chosenSubscription === 'TM' || chosenSubscription === 'HTZ' ? (
            <Redirect destination="/promotions-page/stage2" replace />
          ) : (
            <Redirect destination="/promotions-page/stage4" replace />
          );
        break;
      case 3.4:
      case 3.6:
        redirect = <Redirect destination="/promotions-page/stage2" replace />;
        break;

      default:
        if (this.state.pageNumber >= 7) {
          redirect = (
            <Redirect destination="/promotions-page/thankYou" replace />
          );
        }
        else { redirect = <Redirect destination="/promotions-page/stage4" replace />; }
        break;
    }

    return redirect;
  }
}

LoginRedirect.propTypes = propTypes;
LoginRedirect.defaultProps = defaultProps;

export default LoginRedirect;
