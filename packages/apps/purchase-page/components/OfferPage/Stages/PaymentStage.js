/* global window */
import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter, } from 'next/router';
import { FelaComponent, } from 'react-fela';
import ReactGA from 'react-ga';
import {
  Button,
  RadioGroup,
  Form,
  IconPaypal,
  EventTracker,
  H,
  ApolloConsumer,
} from '@haaretz/htz-components';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import SecurePaymentLine from './Elements/SecurePaymentLine';
import PaymentButtonsDivider from './StagePaymentElements/PaymentButtonsDivider';
import PaymentSummary from './StagePaymentElements/PaymentSummary';
import Redirect from '../../Redirect/Redirect';
import pathGenerator from './utils/pathGenerator';

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
  chosenProductContentName: PropTypes.string.isRequired,
  chosenSubscription: PropTypes.string.isRequired,
  chosenPaymentArrangement: PropTypes.string.isRequired,
  firstPaymentAmount: PropTypes.number.isRequired,
  nextPaymentAmount: PropTypes.number.isRequired,
  displayPayPal: PropTypes.bool.isRequired,
  router: PropTypes.shape().isRequired,
  paymentData: PropTypes.shape().isRequired,
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
    paymentHeaderElLoaded: false,
  };

  componentDidMount() {
    const {
      creditCardsDetails,
      displayPayPal,
      hasDebt,
      chosenProductContentName,
      paymentData,
      chosenPaymentArrangement,
    } = this.props;

    if (!creditCardsDetails && !displayPayPal) {
      if (!hasDebt) {
        ReactGA.event({
          category: 'promotions-step-4',
          action: 'credit -guard',
          label: chosenProductContentName,
        });
        ReactGA.ga('ec:addProduct', {
          id: paymentData.saleCode,
          name: `${chosenPaymentArrangement}-${chosenProductContentName}`,
          brand: `brand-salecode[${paymentData.saleCode}]`,
          price: paymentData.prices[0].toString(),
          variant: `promotionNumber-${paymentData.promotionNumber}`,
        });
        ReactGA.ga('ec:setAction', 'checkout', {
          option: 'creditCard',
        });
        ReactGA.ga('send', 'pageview');
      }
    }
  }

  render() {
    const {
      chosenProductContentName,
      chosenSubscription,
      chosenPaymentArrangement,
      creditCardsDetails,
      firstPaymentAmount,
      hasDebt,
      nextPaymentAmount,
      paymentData,
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
                destination={hasDebt ? 'debt' : 'stage5'}
                replace
                router={router}
              />
            );
          }}
        </ApolloConsumer>
      );
    }
    if (this.paymentHeaderEl && !this.state.paymentHeaderElLoaded) {
      this.paymentHeaderEl.focus();
      this.setState({ paymentHeaderElLoaded: true, });
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
              clearFormAfterSubmit={false}
              initialValues={{
                ...(!!creditCardsDetails && { paymentMethodIndex: '0', }),
              }}
              onSubmit={({ paymentMethodIndex, }, paymentType = null) => {
                ReactGA.ga('ec:addProduct', {
                  id: paymentData.saleCode,
                  name: `${chosenPaymentArrangement}-${chosenProductContentName}`,
                  category: chosenSubscription,
                  brand: `brand-salecode[${paymentData.saleCode}]`,
                  variant: `promotionNumber-${paymentData.promotionNumber}`,
                });
                ReactGA.ga('ec:setAction', 'checkout', {
                  option: paymentType,
                });

                // Adding paypal purchase.
                if (window && paymentType === 'PayPal') {
                  const addProductData = {
                    id: paymentData.saleCode,
                    name: `${chosenPaymentArrangement}-${chosenProductContentName}`,
                    category: chosenSubscription,
                    brand: `brand-salecode[${paymentData.saleCode}]`,
                    variant: `promotionNumber-${paymentData.promotionNumber}`,
                  };
                  window.sessionStorage.setItem('htz-paypal', `${paymentData.saleCode}`);
                  window.sessionStorage.setItem('htz-revenue', `${paymentData.prices[0].toString()}`);
                  window.sessionStorage.setItem('htz-add-product', JSON.stringify(addProductData));
                }
                ReactGA.ga('send', 'pageview');

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
                  const { pathName, asPath, } = pathGenerator('debt', router);
                  Router.push(pathName, asPath);
                }
 else {
                  const { pathName, asPath, } = pathGenerator('stage5', router);
                  Router.push(pathName, asPath);
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
                    theme: { stage4: { headerPaymentMethod, form, }, },
                    className,
                  }) => (
                    <div className={className}>
                      {creditCardsDetails ? (
                        <Fragment>
                          <FelaComponent
                            style={{
                              paddingInlineStart: '3rem',
                              paddingInlineEnd: '3rem',
                              textAlign: 'start',
                            }}
                          >
                            <FelaComponent
                              style={formHeaderStyle}
                              render={({ className, }) => (
                                <H
                                  ref={el => this.paymentHeaderEl}
                                  className={className}
                                >
                                  {headerPaymentMethod}
                                </H>
                              )}
                            />
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
                                                  {
                                                    form.continueWithCreditCardText
                                                  }
                                                </span>{' '}
                                              </FelaComponent>
                                              <span className={className}>
                                                {fourDigits}
                                              </span>{' '}
                                              <span className={className}>
                                                {form.hiddenCreditCardDigits}
                                              </span>
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
                            <EventTracker>
                              {biAction => (
                                <Button
                                  variant="salesOpaque"
                                  boxModel={{ hp: 6, vp: 1, }}
                                  onClick={evt => {
                                    handleSubmit(evt, 'existingCreditCard');
                                    biAction({
                                      actionCode: 37,
                                      additionalInfo: {
                                        stage: 'payment',
                                      },
                                    });
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
                            </EventTracker>
                          )}
                        </Fragment>
                      ) : null}

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
                              <EventTracker>
                                {({ biAction, gaAction, gaMapper, }) => (
                                  <div className={className}>
                                    <div>
                                      <Button
                                        {...buttonProps}
                                        onClick={evt => {
                                          handleSubmit(evt, 'creditCard');
                                          biAction({
                                            actionCode: 109,
                                            additionalInfo: {
                                              stage: 'payment',
                                            },
                                          });
                                          gaAction({
                                            category: 'promotions-step-4',
                                            action: `credit-guard-${
                                              gaMapper.productId[
                                                paymentData.productID
                                              ]
                                            }`,
                                            label: `${
                                              gaMapper.productId[
                                                paymentData.productID
                                              ]
                                            }-salecode[${
                                              paymentData.saleCode
                                            }]`,
                                          });
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
                                              biAction({
                                                actionCode: 29,
                                                additionalInfo: {
                                                  stage: 'payment',
                                                },
                                              });
                                              gaAction({
                                                category: 'promotions-step-4',
                                                action: `paypal-${
                                                  gaMapper.productId[
                                                    paymentData.productID
                                                  ]
                                                }`,
                                                label: `${
                                                  gaMapper.productId[
                                                    paymentData.productID
                                                  ]
                                                }-salecode[${
                                                  paymentData.saleCode
                                                }]`,
                                              });
                                            }}
                                          >
                                            {payVia} <br />
                                            <FelaComponent
                                              style={{ display: 'none', }}
                                            >
                                              Paypal
                                            </FelaComponent>
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
                                )}
                              </EventTracker>
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
