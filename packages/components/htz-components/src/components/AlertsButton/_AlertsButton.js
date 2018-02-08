import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AriaDescription from '../AriaDescription/AriaDescription';

const authorPropTypes = {
  author: PropTypes.object.isRequired,
};

class AlertsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };

    this.openFollowAuthorDialog = this.openFollowAuthorDialog.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded(){
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  //TODO: add open-dialog logic to Alerts button
  openFollowAuthorDialog() {
    this.toggleExpanded();
  }

  render() {
    const { author, className, children, } = this.props;

    return (
      <button
        className={className}
        aria-expanded={this.state.isExpanded}
        onClick={this.openFollowAuthorDialog}
        aria-describedby="alerts_btn_description"
      >
        <AriaDescription id="alerts_btn_description">קבל התראות בתיבת הדואר האלקטרוני שלך עבור כתבות מ {author.name}</AriaDescription>
        {children}
      </button>
    );
  }
}

AlertsButton.propTypes = {
  ...authorPropTypes,
  /**
   * CSS class names provided by Fela
   */
  className: PropTypes.string,
}

AlertsButton.defaultProps = {
  className: null,
}

export default AlertsButton;
export { authorPropTypes, };
