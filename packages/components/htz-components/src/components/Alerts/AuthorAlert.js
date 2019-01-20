import React from 'react';
import { FelaComponent, } from 'react-fela';
import AlertsButton, { alertButtonPropTypes, alertsButtonDefaultProps, } from './AlertsButton';
import IconMailAlert from '../Icon/icons/IconMailAlert';
import Media from '../Media/Media';
import A11yDialog from '../A11yDialog/A11yDialog';
import AuthorNotificationsRegistration from '../ServiceByMailRegistration/AuthorNotificationsRegistration';

class AuthorAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAuthorAlertsForm: false,
    };
    this.alertsToggleRef = React.createRef();
  }

  toggleAuthorAlertsForm = showMe => {
    this.setState(
      prevState => ({
        isShowAuthorAlertsForm: !prevState.isShowAuthorAlertsForm,
      }),
      () => {
        if (!this.state.isShowAuthorAlertsForm) {
          this.props.innerRef.current.focus();
        }
        else {
          this.props.biAction({
            actionCode: 91,
            additionalInfo: {
              writer_id: this.props.author.contentId,
              platform: this.props.platform,
            },
          });
        }
      }
    );
  };

  render() {
    return (
      <FelaComponent
        style={theme => ({
          color: theme.color('alerts', 'openButtonText'),
          fontWeight: 'bold',
          extend: [
            theme.type(-2, { fromBp: 'xl', }),
            theme.type(-1, { fromBp: 'l', untilBp: 'xl', }),
            theme.type(-2, { untilBp: 'l', }),
            theme.mq(
              { from: 's', },
              {
                width: '100%',
                textAlign: 'end',
              }
            ),
            theme.mq(
              { from: 's', until: 'l', },
              {
                display: 'inline',
              }
            ),
            theme.mq(
              { from: 'l', },
              {
                display: 'flex',
              }
            ),
            theme.mq(
              { until: 's', },
              {
                textAlign: 'center',
              }
            ),
          ],
        })}
        render={({
          className,
          theme,
          theme: {
            alertsI18n: { mobileAlertsText, desktopAlertsText, },
          },
        }) => (
          <React.Fragment>
            <Media query={{ from: 'l', }}>
              {matches => (matches ? (
                <React.Fragment>
                  <AlertsButton
                    className={className}
                    author={this.props.author}
                    onToggle={() => this.toggleAuthorAlertsForm(this.state.isShowAuthorAlertsForm)
                      }
                    forwardedRef={this.props.innerRef}
                  >
                    <IconMailAlert size={2.5} miscStyles={{ marginEnd: '1rem', }} />
                    <FelaComponent render="span">{desktopAlertsText}</FelaComponent>
                  </AlertsButton>
                  <A11yDialog
                    appendTo="modal-example-12"
                    elementToHide="pageRoot"
                    isVisible={this.state.isShowAuthorAlertsForm}
                    overlayBgColor="rgba(255, 255, 255, 0.9)"
                    closeOnOutsideClick
                    onClose={() => this.toggleAuthorAlertsForm(this.state.isShowAuthorAlertsForm)}
                    isModal
                    render={({ isVisible, handleClose, isModal, }) => (
                      <FelaComponent
                        style={{
                          textAlign: 'center',
                        }}
                        render={({ className, }) => (
                          <div className={className}>
                            <FelaComponent
                              rule={({ theme, }) => ({
                                overflow: 'hidden',
                                left: 0,
                                right: 0,
                                backgroundColor: theme.color('primary', '-5'),
                                zIndex: theme.getZIndex('above'),
                                ':before': {
                                  position: 'absolute',
                                  display: 'block',
                                  content: '""',
                                  height: '2px',
                                  width: '100%',
                                  backgroundColor: theme.color('primary', '-1'),
                                  zIndex: 1,
                                },
                              })}
                              render={({ className, }) => (
                                <div className={className}>
                                  <AuthorNotificationsRegistration
                                    author={this.props.author}
                                    platform={this.props.platform}
                                    biAction={this.props.biAction}
                                    onToggle={() => handleClose()}
                                  />
                                </div>
                              )}
                            />
                          </div>
                        )}
                      />
                    )}
                  />
                </React.Fragment>
              ) : (
                <AlertsButton
                  className={className}
                  author={this.props.author}
                  onToggle={this.props.onToggle}
                  forwardedRef={this.props.innerRef}
                >
                  <IconMailAlert
                    size={[ { until: 's', value: 3, }, { from: 's', value: 2.5, }, ]}
                    miscStyles={{ marginEnd: '1rem', }}
                  />
                  <FelaComponent
                    style={{
                      display: 'block',
                    }}
                    render="span"
                  >
                    {mobileAlertsText}
                  </FelaComponent>
                </AlertsButton>
              ))
              }
            </Media>
          </React.Fragment>
        )}
      />
    );
  }
}
AuthorAlert.propTypes = alertButtonPropTypes;
AuthorAlert.defaultProps = alertsButtonDefaultProps;

export default React.forwardRef((props, ref) => <AuthorAlert innerRef={ref} {...props} />);
