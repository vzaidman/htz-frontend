/* eslint-disable react/prop-types */
import React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import config from 'config';
import A11yDialog from '../A11yDialog/A11yDialog';
import Button from '../Button/Button';
import ServiceByMailRegistration from './ServiceByMailRegistration';
import authorPropTypes from '../../propTypes/authorPropTypes';

export default class AuthorNotificationsRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.id = `authorAlerts_${Math.floor(Math.random() * 100)}`;
    this.state = {
      showDialog: false,
      registrationSuccess: false,
    };

    this.onRegistrationSuccess = this.onRegistrationSuccess.bind(this);
    this.onRegistrationError = this.onRegistrationError.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  onRegistrationSuccess(data) {
    this.setState(
      {
        showDialog: true,
        registrationSuccess: true,
      },
      () => {
        this.props.biAction({
          actionCode: 93,
          additionalInfo: {
            writer_id: this.props.author.contentId,
            platform: this.props.platform,
          },
        });
      }
    );
  }

  onRegistrationError(data) {
    this.setState({
      showDialog: true,
      registrationSuccess: false,
    });
  }

  handleCloseDialog() {
    this.setState({ showDialog: false, });
    this.props.onToggle && this.props.onToggle();
  }

  render() {
    console.log(config);
    return (
      <FelaTheme
        render={theme => (
          <div>
            <div id={`${this.id}_form`}>
              <ServiceByMailRegistration
                title={`${theme.serviceByMailI18n.authorAlertServiceTitle}${
                  this.props.author.contentName
                }`}
                serviceUrl={`${
                  config.service.alerts
                }/alerts/register?newsletterId=${
                  this.props.author.contentId
                }&type=writers`}
                onRegistrationSuccess={this.onRegistrationSuccess}
                onRegistrationError={this.onRegistrationError}
                onCancel={this.props.onToggle}
              />
            </div>
            <A11yDialog
              appendTo={this.id}
              elementToHide={`${this.id}_form`}
              isVisible={this.state.showDialog}
              overlayBgColor="rgba(0, 0, 0, 0.5)"
              onClose={this.props.onToggle}
              containerMiscStyles={{
                backgroundColor: theme.color('primary', '-6'),
                width: '100%',
                height: '100%',
              }}
              render={({ isVisible, handleClose, isModal, }) => (
                <FelaComponent
                  rule={({ theme, }) => ({
                    textAlign: 'center',
                  })}
                  render={({ className, }) => (
                    <div className={className}>
                      <FelaComponent
                        style={{
                          paddingTop: 4,
                          ...theme.type(-1),
                          fontWeight: '700',
                          marginBottom: 2,
                        }}
                      >
                        {this.state.registrationSuccess
                          ? theme.serviceByMailI18n.successDefaultMessage
                          : theme.serviceByMailI18n.failureDefaultMessage}
                      </FelaComponent>
                      <Button onClick={handleClose} variant="primary">
                        {theme.serviceByMailI18n.btnCloseText}
                      </Button>
                    </div>
                  )}
                />
              )}
            />
            <div id={this.id} />
          </div>
        )}
      />
    );
  }
}

AuthorNotificationsRegistration.propTypes = {
  author: PropTypes.shape(authorPropTypes).isRequired,
  /** Callback to execute when cancel button is pressed, If omitted, the Cancel button wont appear * */
  onToggle: PropTypes.func,
};

AuthorNotificationsRegistration.defaultProps = {
  onToggle: null,
};
