/* global window */

import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter, } from 'next/router';
import { FelaComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import { Button, RadioGroup, Form, IconPaypal, } from '@haaretz/htz-components';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import SecurePaymentLine from './Elements/SecurePaymentLine';
import PaymentButtonsDivider from './StagePaymentElements/PaymentButtonsDivider';
import PaymentSummary from './StagePaymentElements/PaymentSummary';
import CreditCardSvg from './Elements/CreditCardSvg';
import Redirect from '../../Redirect/Redirect';

const propTypes = {
  /**
   * does the user have past debts
   */
  hasDebt: PropTypes.bool.isRequired,
  creditCardsDetails: PropTypes.arrayOf(
    PropTypes.shape({
      companyCode: PropTypes.number,
      fourDigits: PropTypes.string,
    })
  ),
  chosenSubscription: PropTypes.string.isRequired,
  chosenPaymentArrangement: PropTypes.string.isRequired,
  firstPaymentAmount: PropTypes.number.isRequired,
  nextPaymentAmount: PropTypes.number.isRequired,
  displayPayPal: PropTypes.bool.isRequired,
  router: PropTypes.shape().isRequired,
};

const defaultProps = {
  creditCardsDetails: null,
};

const formContStyle = theme => ({
  maxWidth: '82rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  textAlign: 'center',
});

const formHeaderStyle = theme => ({
  textAlign: 'start',
  marginTop: '4rem',
  extend: [ theme.type(0), theme.mq({ until: 's', }, { marginTop: '5rem', }), ],
});

const paymentButtonsContStyle = ({ theme, isFourDigits, }) => ({
  textAlign: 'center',
  display: 'inline-block',
  marginTop: '4rem',
  ...(!isFourDigits
    ? { marginBottom: '5rem', }
    : theme.mq(
      { from: 's', },
      {
        marginBottom: '15rem',
      }
    )),
});

const radioButtonStyle = { marginTop: '3rem', marginInlineEnd: '4rem', };

const securedPaymentStyle = theme => ({
  width: '80%',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  marginBottom: '2rem',
  extend: [
    {
      ...parseComponentProp(
        'marginBottom',
        [ { until: 's', value: '4rem', }, { from: 's', value: '2rem', }, ],
        theme.mq,
        (prop, value) => ({ [prop]: value, })
      ),
    },
  ],
});

class PaymentStage extends Component {
  state = {
    displayPaymentButtons: !this.props.creditCardsDetails,
  };

  render() {
    const {
      creditCardsDetails,
      chosenSubscription,
      chosenPaymentArrangement,
      firstPaymentAmount,
      hasDebt,
      nextPaymentAmount,
      displayPayPal,
      router,
    } = this.props;

    if (!creditCardsDetails && !displayPayPal) {
      return (
        <ApolloConsumer>
          {cache => {
            cache.writeData({
              data: {
                promotionsPageState: {
                  paymentType: 'creditCard',
                  __typename: 'PromotionsPageState',
                },
              },
            });
            return (
              <Redirect
                destination={`/promotions-page/${hasDebt ? 'debt' : 'stage5'}`}
                replace
                router={router}
              />
            );
          }}
        </ApolloConsumer>
      );
    }

    return (
      <Fragment>
        <FelaComponent
          style={{
            marginInlineStart: 'auto',
            marginInlineEnd: 'auto',
          }}
        >
          {creditCardsDetails && (
            <PaymentSummary
              chosenSubscription={chosenSubscription}
              chosenPaymentArrangement={chosenPaymentArrangement}
              firstPaymentAmount={firstPaymentAmount}
              nextPaymentAmount={nextPaymentAmount}
            />
          )}
        </FelaComponent>
        <ApolloConsumer>
          {cache => (
            <Form
              disableSubmitOnEnterKeyDown
              initialValues={{
                ...(!!creditCardsDetails && { paymentMethodIndex: '0', }),
              }}
              onSubmit={({ paymentMethodIndex, }, paymentType = null) => {
                cache.writeData({
                  data: {
                    promotionsPageState: {
                      paymentType,
                      paymentMethodIndex,
                      __typename: 'PromotionsPageState',
                    },
                  },
                });
                if (hasDebt) {
                  Router.push('/promotions-page/debt', router.asPath);
                }
 else {
                  Router.push('/promotions-page/stage5', router.asPath);
                }
              }}
              validate={({ paymentMethodIndex, }) => {
                const errors = [];

                return errors;
              }}
              render={({ getInputProps, handleSubmit, }) => (
                <FelaComponent
                  style={formContStyle}
                  render={({
                    theme: {
                      stage4: { subStage2: { headerPaymentMethod, form, }, },
                    },
                    className,
                  }) => (
                    <div className={className}>
                      {!!creditCardsDetails && (
                        <Fragment>
                          <FelaComponent
                            style={{
                              paddingInlineStart: '3rem',
                              paddingInlineEnd: '3rem',
                              textAlign: 'start',
                            }}
                          >
                            <FelaComponent style={formHeaderStyle} render="h4">
                              {headerPaymentMethod}
                            </FelaComponent>
                            <RadioGroup
                              {...getInputProps({
                                name: 'paymentMethodIndex',
                                onChange: evt => {
                                  this.setState({
                                    displayPaymentButtons:
                                      evt.target.value === '-1',
                                  });
                                },
                                radioButtons: [
                                  ...creditCardsDetails.map(
                                    ({ companyCode, fourDigits, }, index) => ({
                                      value: index.toString(),
                                      variant: 'primary',
                                      label: (
                                        <FelaComponent
                                          style={{
                                            fontFamily: 'Helvetica',
                                            fontWeight: 'bold',
                                            letterSpacing: '2px',
                                          }}
                                          render={({ className, }) => (
                                            <Fragment>
                                              <FelaComponent
                                                render="p"
                                                style={theme => ({
                                                  ...theme.mq(
                                                    { from: 's', },
                                                    {
                                                      display: 'inline',
                                                    }
                                                  ),
                                                })}
                                              >
                                                <span>
                                                  המשך תשלום עם כרטיס שמספרו
                                                </span>{' '}
                                              </FelaComponent>
                                              <span className={className}>
                                                {fourDigits}
                                              </span>
                                              <span className={className}>
                                                •••• •••• ••••
                                              </span>
                                              <FelaComponent
                                                style={{ marginRight: '2rem', }}
                                                render={({ className, }) => (
                                                  <CreditCardSvg
                                                    companyCode={companyCode}
                                                    className={className}
                                                  />
                                                )}
                                              />
                                            </Fragment>
                                          )}
                                        />
                                      ),
                                      miscStyles: radioButtonStyle,
                                    })
                                  ),
                                  {
                                    value: '-1',
                                    variant: 'primary',
                                    label: 'בחר באמצעי תשלום אחר',
                                    miscStyles: radioButtonStyle,
                                  },
                                ],
                                formElementType: 'radio',
                              })}
                            />
                          </FelaComponent>

                          {!this.state.displayPaymentButtons && (
                            <Button
                              variant="salesOpaque"
                              boxModel={{ hp: 6, vp: 1, }}
                              onClick={evt => {
                                handleSubmit(evt, 'existingCreditCard');
                              }}
                              miscStyles={{
                                display: 'block',
                                marginInlineEnd: 'auto',
                                marginInlineStart: 'auto',
                                marginTop: '5rem',
                                marginBottom: '5rem',
                              }}
                            >
                              {form.continueButton.text}
                            </Button>
                          )}
                        </Fragment>
                      )}

                      {this.state.displayPaymentButtons && (
                        <FelaComponent
                          style={paymentButtonsContStyle}
                          isFourDigits={!!creditCardsDetails}
                          render={({
                            className,
                            theme: { payment: { payVia, creditCard, }, },
                          }) => {
                            const buttonProps = {
                              variant: 'primary',
                              fontSize: [
                                { until: 's', value: -1, },
                                { from: 's', until: 'l', value: 2, },
                                { from: 'l', until: 'xl', value: 0, },
                                { from: 'xl', value: -1, },
                              ],
                              boxModel: [
                                { until: 's', value: { hp: 11, vp: 2, }, },
                                {
                                  from: 's',
                                  until: 'l',
                                  value: { hp: 15, vp: 3, },
                                },
                                {
                                  from: 'l',
                                  until: 'xl',
                                  value: { hp: 12, vp: 2, },
                                },
                                { from: 'xl', value: { hp: 11, vp: 2, }, },
                              ],
                            };
                            return (
                              <div className={className}>
                                <div>
                                  <Button
                                    {...buttonProps}
                                    onClick={evt => {
                                      handleSubmit(evt, 'creditCard');
                                    }}
                                  >
                                    {payVia} <br />
                                    {creditCard}
                                  </Button>
                                </div>
                                {displayPayPal && (
                                  <Fragment>
                                    <PaymentButtonsDivider />
                                    <div>
                                      <Button
                                        {...buttonProps}
                                        onClick={evt => {
                                          handleSubmit(evt, 'PayPal');
                                        }}
                                      >
                                        {payVia} <br />
                                        <IconPaypal
                                          size={[
                                            { until: 's', value: 3.5, },
                                            {
                                              from: 's',
                                              until: 'l',
                                              value: 5.25,
                                            },
                                            { from: 'l', value: 3.5, },
                                          ]}
                                        />
                                      </Button>
                                    </div>
                                  </Fragment>
                                )}
                              </div>
                            );
                          }}
                        />
                      )}
                      <FelaComponent style={securedPaymentStyle}>
                        <SecurePaymentLine withLine={false} />
                      </FelaComponent>
                    </div>
                  )}
                />
              )}
            />
          )}
        </ApolloConsumer>
      </Fragment>
    );
  }
}

PaymentStage.propTypes = propTypes;

PaymentStage.defaultProps = defaultProps;

export default withRouter(PaymentStage);
