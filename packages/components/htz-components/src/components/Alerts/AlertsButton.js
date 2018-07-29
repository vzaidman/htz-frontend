import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AriaDescription from '../AriaDescription/AriaDescription';

const alertButtonPropTypes = {
  /**
   * The author object which the user can register for his alerts.
   */
  author: PropTypes.object.isRequired,
  /**
   * A function to execute when button is toggled.
   * (Use to show/hide the registration form)
   */
  onToggle: PropTypes.func,
};

const alertsButtonDefaultProps = {
  onToggle: null,
};

class AlertsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded,
      }),
      () => {
        this.props.onToggle(this.state.isExpanded);
      }
    );
  }

  render() {
    const { author, className, children, forwardedRef, } = this.props;

    return (
      <button
        ref={forwardedRef}
        className={className}
        aria-expanded={this.state.isExpanded}
        onClick={this.toggleExpanded}
        aria-describedby="alerts_btn_description"
      >
        <AriaDescription id="alerts_btn_description">
          קבל התראות בתיבת הדואר האלקטרוני שלך עבור כתבות מ {author.name}
        </AriaDescription>
        {children}
      </button>
    );
  }
}

AlertsButton.propTypes = {
  ...alertButtonPropTypes,
  /**
   * CSS class names provided by Fela
   */
  className: PropTypes.string,
};

AlertsButton.defaultProps = {
  ...alertsButtonDefaultProps,
  className: null,
};

export default AlertsButton;
export { alertButtonPropTypes, alertsButtonDefaultProps, };
