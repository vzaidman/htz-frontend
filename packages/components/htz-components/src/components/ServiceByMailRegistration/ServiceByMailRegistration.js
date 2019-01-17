/* global fetch */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import isEmail from 'validator/lib/isEmail';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import Form from '../Form/Form';
import UserDispenser from '../User/UserDispenser';

function validate({ email, theme, }) {
  const errors = [];

  if (!email) {
    errors.push({
      name: 'email',
      order: 1,
      errorText: theme.serviceByMailI18n.inpEmailErrorRequired,
    });
  }
  else if (!isEmail(email)) {
    errors.push({
      name: 'email',
      order: 1,
      errorText: theme.serviceByMailI18n.inpEmailErrorInvalid,
    });
  }

  return errors;
}

export default class ServiceByMailRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isBusy: false,
    };
  }

  handleSubmit(values) {
    this.setState({ isBusy: true, });

    const { email, } = values;
    const promise = fetch(`${this.props.serviceUrl}&email=${email}`);

    promise
      .then(response => {
        let json = null;
        this.setState({
          isBusy: false,
        });

        if (response.ok) {
          json = response.json();
        }
        else if (this.props.onRegistrationError) {
          this.props.onRegistrationError();
        }

        return json;
      })
      .then(data => {
        if (data.status && data.status === 'success' && this.props.onRegistrationSuccess) {
          this.props.onRegistrationSuccess(data);
        }
      })
      .catch(data => {
        this.setState({
          isBusy: false,
        });

        if (this.props.onRegistrationError) {
          this.props.onRegistrationError(data);
        }
      });
  }

  render() {
    return (
      <UserDispenser
        render={({ isLoggedIn, user, }) => (
          <FelaComponent
            style={theme => ({
              backgroundColor: theme.color('primary', '-6'),
              paddingTop: '1rem',
              paddingStart: '1rem',
              paddingBottom: '2rem',
              paddingEnd: '1rem',
              position: 'relative',
              textAlign: 'start',
              extend: [
                theme.mq(
                  { from: 'l', },
                  {
                    paddingStart: '4rem',
                    paddingInlineEnd: '5rem',
                    paddingInlineStart: '5rem',
                    paddingBottom: '4rem',
                  }
                ),
              ],
            })}
            render={({ className, theme, }) => (
              <div className={className}>
                {this.props.title ? (
                  <FelaComponent
                    style={{ fontWeight: 'bold', extend: [ theme.type(-1), ], }}
                    render="p"
                  >
                    {this.props.title}
                  </FelaComponent>
                ) : (
                  ''
                )}
                <Form
                  onSubmit={this.handleSubmit}
                  initialValues={{ email: isLoggedIn ? user.email : null, }}
                  validate={({ email, }) => validate({ email, theme, })}
                  render={({ getInputProps, handleSubmit, clearForm, }) => (
                    <Fragment>
                      <FelaComponent
                        style={{
                          marginTop: '2rem',
                          paddingBottom: '2rem',
                        }}
                      >
                        <TextInput
                          {...getInputProps({
                            name: 'email',
                            label: theme.serviceByMailI18n.inpEmailLabelText,
                            type: 'email',
                            isError: false,
                            placeHolder: theme.serviceByMailI18n.inpEmailLabelText,
                            noteText: theme.serviceByMailI18n.inpEmailNoteText,
                            variant: 'primaryOpaque',
                            requiredText: {
                              isSup: true,
                              long: 'required',
                              short: '*',
                            },
                            miscStyles: {
                              type: [ { from: 'l', value: -2, }, ],
                              fontWeight: 'bold',
                            },
                          })}
                        />
                      </FelaComponent>

                      <FelaComponent
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          extend: [
                            theme.mq(
                              { from: 's', },
                              {
                                justifyContent: 'flex-start',
                              }
                            ),
                          ],
                        }}
                      >
                        <FelaComponent
                          style={{
                            display: 'flex',
                            alignItems: 'stretch',
                          }}
                        >
                          <Button
                            variant="primaryOpaque"
                            onClick={handleSubmit}
                            isBusy={this.state.isBusy}
                            miscStyles={{
                              type: [ { until: 's', value: 0, }, { from: 's', value: -2, }, ],
                            }}
                          >
                            {theme.serviceByMailI18n.btnSubmitText}
                          </Button>
                          {this.props.onCancel != null ? (
                            <Button
                              variant="negative"
                              isFlat
                              onClick={() => this.props.onCancel()}
                              miscStyles={{
                                type: [ { until: 's', value: 0, }, { from: 's', value: -2, }, ],
                                marginStart: '1rem',
                              }}
                            >
                              {theme.serviceByMailI18n.btnCancelText}
                            </Button>
                          ) : null}
                        </FelaComponent>
                      </FelaComponent>
                    </Fragment>
                  )}
                />
              </div>
            )}
          />
        )}
      />
    );
  }
}

ServiceByMailRegistration.propTypes = {
  /**
   * The Title for the form
   * */
  title: PropTypes.string,
  /**
   * The URL for the service
   * */
  serviceUrl: PropTypes.string.isRequired,
  /**
   * Callback to execute when registration successfully completed
   * */
  onRegistrationSuccess: PropTypes.func,
  /**
   * Callback to execute when registration fails
   * */
  onRegistrationError: PropTypes.func,
  /**
   * Callback to execute when cancel button is pressed, If omitted, the Cancel button wont appear
   * */
  onCancel: PropTypes.func,
};

ServiceByMailRegistration.defaultProps = {
  title: null,
  onRegistrationSuccess: null,
  onRegistrationError: null,
  onCancel: null,
};
