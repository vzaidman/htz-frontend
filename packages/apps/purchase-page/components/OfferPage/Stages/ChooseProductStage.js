import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import ReactGA from 'react-ga';
import {
  Button,
  EventTracker,
  Form,
  TextInput,
  TextLink,
  ApolloConsumer,
} from '@haaretz/htz-components';
import gql from 'graphql-tag';
import { visuallyHidden, } from '@haaretz/htz-css-tools';
import OfferList from './ChooseProductStageElements/OfferList';
import Modal from './ChooseProductStageElements/Modal';
import UserMessage from './Elements/UserMessage';

const gaMapper = {
  productId: {
    243: 'haaretz',
    273: 'themarker',
    274: 'dual',
  },
};

const GET_COUPON_DATA = gql`
  query couponProduct($couponCode: String!) {
    couponProduct(couponCode: $couponCode)
  }
`;

const contStyle = () => ({
  textAlign: 'center',
});

const StyledCont = createComponent(contStyle);

const couponFormStyle = () => ({
  display: 'flex',
  alignItems: 'flex-start',
  textAlign: 'start',
  marginTop: '3rem',
});

const StyledCouponForm = createComponent(couponFormStyle);

const moreOptionsContStyle = ({ theme, }) => ({
  color: theme.color('offerPage', 'buttonText'),
  marginBottom: '11rem',
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '80%',
});

const StyledMoreOptionsCont = createComponent(moreOptionsContStyle);

const moreOptionsButtonsMiscStyles = {
  marginTop: '2rem',
  type: -1,
};
const couponButtonsMiscStyles = {
  marginTop: '1rem',
  marginInlineStart: '0.5rem',
  // width: '11rem',
};

const AriaHidden = ({ children, }) => (
  <FelaComponent
    style={visuallyHidden()}
    render={({ className, }) => (
      <span className={className}>{children}</span>
    )}
  />
);
AriaHidden.propTypes = { children: PropTypes.node.isRequired, };

const AltPricingOption = ({ productTitle, }) => {
  const specialOffer = productTitle.indexOf('מיוחד') !== -1;
  return (
    <Fragment>
      {specialOffer && <AriaHidden>החלף ל</AriaHidden>}
      {specialOffer ? productTitle : 'חזרה למחיר הרגיל'}
    </Fragment>
  );
};
AltPricingOption.propTypes = { productTitle: PropTypes.string.isRequired, };

class ChooseProductStage extends Component {
  static propTypes = {
    chosenProductIndex: PropTypes.number.isRequired,
    chosenSubscription: PropTypes.string.isRequired,
    couponExist: PropTypes.bool,
    /** JSON of a couponProduct, needs to be parsed */
    couponProduct: PropTypes.string,
    fourDigits: PropTypes.string,
    host: PropTypes.oneOf([ 'HTZ', 'TM', ]).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * offer list
         */
        offerList: PropTypes.arrayOf(
          PropTypes.shape({
            price: PropTypes.string,
            originalPrice: PropTypes.string.isRequired,
            buttonText: PropTypes.string.isRequired,
            disclaimer: PropTypes.arrayOf(PropTypes.object).isRequired,
            bannerText: PropTypes.string.isRequired,
            isRecommended: PropTypes.bool,
            type: PropTypes.string.isRequired,
            paymentData: PropTypes.object.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    refetch: PropTypes.func.isRequired,
    subStage: PropTypes.number.isRequired,
    userMessage: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    couponExist: false,
    couponProduct: null,
    fourDigits: null,
    userMessage: null,
  };

  state = {
    couponFormOpen: false,
    couponLoading: false,
    couponError: null,
    modalOpen: false,
    offerListChosenTermsIndex: null,
    chosenProduct: 0,
  };

  componentDidMount() {
    this.props.products[this.state.chosenProduct].offerList.map((item, idx) => ReactGA.ga('ec:addImpression', {
      id: item.paymentData.saleCode,
      name: `${item.type}-${
        this.props.products[this.state.chosenProduct].contentName
      }`,
      brand: `salecode[${item.paymentData.saleCode}]`,
      position: idx + 1,
      price: item.price,
      variant: `promotionNumber-${item.paymentData.promotionNumber}`,
      list: 'Product Stage Results',
    })
    );
    ReactGA.ga('send', 'pageview');
  }

  componentDidUpdate(prevProps, prevState) {
    // only update impressions if the chosenProduct state has changed
    if (prevState.chosenProduct !== this.state.chosenProduct) {
      this.props.products[this.state.chosenProduct].offerList.map((item, idx) => ReactGA.ga('ec:addImpression', {
        id: item.paymentData.saleCode,
        name: `${item.type}-${
          this.props.products[this.state.chosenProduct].contentName
        }`,
        brand: `salecode[${item.paymentData.saleCode}]`,
        position: idx + 1,
        price: item.price,
        variant: `promotionNumber-${item.paymentData.promotionNumber}`,
        list: 'Product Stage Results',
      })
      );
      ReactGA.ga('send', 'pageview');
    }
  }

  openModal = offerListChosenTermsIndex => {
    this.setState({ modalOpen: true, offerListChosenTermsIndex, });
  };

  closeModal = () => {
    this.setState({ modalOpen: false, offerListChosenTermsIndex: null, });
  };

  render() {
    const {
      chosenProductIndex,
      chosenSubscription,
      couponExist,
      couponProduct,
      host,
      products,
      subStage,
      fourDigits,
      userMessage,
    } = this.props;

    const { offerList, cancelButtonText, contentName, } = chosenProductIndex === 'couponProduct'
      ? JSON.parse(couponProduct)
      : products[chosenProductIndex];
    const productName = gaMapper.productId[offerList[0].paymentData.productID];
    return (
      <FelaComponent
        render={({
          theme: {
            stage2: {
              offerList: { termsButtonText, },
              optionButtons: { coupon, },
              form: {
                couponError,
                validation,
                couponForm: {
                  textLabel,
                  textNote,
                  buttons: { send, close, },
                },
              },
              buttons: { entitlements, organizationSubscription, },
            },
          },
        }) => (
          <ApolloConsumer>
            {cache => (
              <StyledCont>
                <Modal
                  closeModal={this.closeModal}
                  isVisible={this.state.modalOpen}
                  offerDisclaimer={
                    this.state.offerListChosenTermsIndex !== null
                      ? offerList[this.state.offerListChosenTermsIndex]
                        .disclaimer
                      : null
                  }
                />
                <UserMessage userMessage={userMessage} />
                <OfferList
                  chosenSubscription={chosenSubscription}
                  contentName={contentName}
                  cancelButtonText={cancelButtonText}
                  fourDigits={fourDigits}
                  offerList={offerList}
                  openModal={this.openModal}
                  termsButtonText={termsButtonText}
                />
                {!(subStage === 4 || subStage === 6) && (
                  <EventTracker>
                    {({ biAction, gaAction, }) => (
                      <StyledMoreOptionsCont>
                        {products.map(
                          (product, idx) => (idx !== chosenProductIndex ? (
                            <Fragment key={product.productTitle}>
                              <Button
                                key={product.productTitle}
                                variant="primary"
                                attrs={{
                                  'aria-controls': 'offerListWrapper',
                                }}
                                miscStyles={moreOptionsButtonsMiscStyles}
                                onClick={() => {
                                  cache.writeData({
                                    data: {
                                      promotionsPageState: {
                                        chosenProductIndex: idx,
                                        __typename: 'PromotionsPageState',
                                      },
                                    },
                                  });
                                  this.setState({ chosenProduct: idx, });
                                  biAction({
                                    actionCode: 25,
                                    additionalInfo: {
                                      stage: 'product',
                                    },
                                  });
                                  gaAction({
                                    category: `promotions-step-3-${productName}`,
                                    action: 'student-button',
                                    label: `${productName}`,
                                  });
                                }}
                              >
                                <AltPricingOption productTitle={product.productTitle} />
                              </Button>
                            </Fragment>
                          ) : null)
                        )}
                        {couponExist
                          && (this.state.couponFormOpen ? (
                            <Form
                              clearFormAfterSubmit={false}
                              onSubmit={async ({ couponCode, }) => {
                                this.setState({
                                  couponLoading: true,
                                  couponError: false,
                                });
                                try {
                                  const { data, } = await cache.query({
                                    query: GET_COUPON_DATA,
                                    variables: { couponCode, },
                                  });
                                  if (data.couponProduct.couponErrorMessage) {
                                    this.setState({
                                      couponLoading: false,
                                      couponError:
                                        data.couponProduct.couponErrorMessage,
                                    });
                                    gaAction({
                                      category: `promotions-step-3-${productName}`,
                                      action: `coupon send-${productName}`,
                                      label: `coupon-submitted-error-${productName}`,
                                    });
                                  }
                                  else {
                                    this.setState({
                                      couponLoading: false,
                                      couponFormOpen: false,
                                    });
                                    cache.writeData({
                                      data: {
                                        promotionsPageState: {
                                          chosenProductIndex: 'couponProduct',
                                          couponProduct: JSON.stringify(
                                            data.couponProduct
                                          ),
                                          __typename: 'PromotionsPageState',
                                        },
                                      },
                                    });
                                    gaAction({
                                      category: `promotions-step-3-${productName}`,
                                      action: `coupon send-${productName}`,
                                      label: `coupon-submitted-${productName}`,
                                    });
                                  }
                                }
                                catch (err) {
                                  this.setState({
                                    couponLoading: false,
                                    couponError,
                                  });
                                  console.log('error from catch', err);
                                }
                              }}
                              // todo: validation for coupon
                              validate={({ couponCode, }) => {
                                const errors = [];
                                if (!couponCode) {
                                  errors.push({
                                    name: 'couponCode',
                                    order: 1,
                                    errorText: validation,
                                  });
                                }

                                return errors;
                              }}
                              render={({ getInputProps, handleSubmit, }) => (
                                <StyledCouponForm>
                                  <TextInput
                                    {...getInputProps({
                                      name: 'couponCode',
                                      label: textLabel,
                                      noteText: textNote,
                                      errorText: this.state.couponError,
                                      isError: this.state.couponError,
                                      // todo: how to get the right width
                                      miscStyles: { minWidth: '32rem', },
                                    })}
                                  />
                                  <Button
                                    variant="primaryOpaque"
                                    isBusy={this.state.couponLoading}
                                    boxModel={{ hp: 3, vp: 1, }}
                                    onClick={evt => {
                                      handleSubmit(evt);
                                      biAction({
                                        actionCode: 24,
                                        additionalInfo: {
                                          stage: 'product',
                                        },
                                      });
                                    }}
                                    miscStyles={couponButtonsMiscStyles}
                                  >
                                    {send}
                                  </Button>
                                  <Button
                                    variant="neutral"
                                    isFlat
                                    boxModel={{ hp: 3, vp: 1, }}
                                    onClick={() => {
                                      this.setState({ couponFormOpen: false, });
                                    }}
                                    miscStyles={couponButtonsMiscStyles}
                                  >
                                    {close}
                                  </Button>
                                </StyledCouponForm>
                              )}
                            />
                          ) : (
                            <Button
                              variant="primary"
                              miscStyles={moreOptionsButtonsMiscStyles}
                              onClick={() => {
                                this.setState({ couponFormOpen: true, });
                                biAction({
                                  actionCode: 22,
                                  additionalInfo: {
                                    stage: 'product',
                                  },
                                });
                                gaAction({
                                  category: `promotions-step-3-${productName}`,
                                  action: `coupon-clicked-${productName}`,
                                  label: `coupon-clicked-${productName}`,
                                });
                              }}
                            >
                              {coupon}
                            </Button>
                          ))}
                        <FelaComponent
                          style={theme => ({
                            marginTop: '4rem',
                            fontWeight: '700',
                            extend: [ theme.type(-1), ],
                          })}
                          render="p"
                        >
                          {entitlements.beforeLinkText}
                          {' '}
                          <a
                            onClick={() => {
                              gaAction({
                                category: 'promotions-step-3',
                                action: 'newspaper subscribers',
                              });
                            }}
                            href={entitlements.link}
                          >
                            <FelaComponent
                              render="span"
                              style={{
                                textDecoration: 'underline',
                                textDecorationSkip: 'ink',
                              }}
                            >
                              {entitlements.linkText}
                            </FelaComponent>
                          </a>
                        </FelaComponent>
                        <FelaComponent
                          style={theme => ({
                            marginTop: '2rem',
                            extend: [ theme.type(-1), ],
                          })}
                        >
                          <TextLink
                            href={organizationSubscription.url[host]}
                            tagName="a"
                            onClick={() => {
                              // TODO: fix external url fetch
                              biAction({
                                actionCode: 42,
                                additionalInfo: {
                                  organization: organizationSubscription.text,
                                },
                              });
                            }}
                          >
                            {organizationSubscription.text}
                          </TextLink>
                        </FelaComponent>
                      </StyledMoreOptionsCont>
                    )}
                  </EventTracker>
                )}
              </StyledCont>
            )}
          </ApolloConsumer>
        )}
      />
    );
  }
}

export default ChooseProductStage;
