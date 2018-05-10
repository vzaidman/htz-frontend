import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import {
  Button,
  BIAction,
  Form,
  TextInput,
  Link,
} from '@haaretz/htz-components';
import gql from 'graphql-tag';
import OfferList from './ChooseProductStageElements/OfferList';
import Modal from './ChooseProductStageElements/Modal';
import UserMessage from './Elements/UserMessage';

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

class ChooseProductStage extends Component {
  static propTypes = {
    chosenProductIndex: PropTypes.number.isRequired,
    couponExist: PropTypes.bool,
    /** JSON of a couponProduct, needs to be parsed */
    couponProduct: PropTypes.string,
    fourDigits: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
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
  };

  openModal = offerListChosenTermsIndex => {
    this.setState({ modalOpen: true, offerListChosenTermsIndex, });
  };

  closeModal = () => {
    this.setState({ modalOpen: false, offerListChosenTermsIndex: null, });
  };
  render() {
    const {
      chosenProductIndex,
      couponExist,
      couponProduct,
      products,
      subStage,
      fourDigits,
      isLoggedIn,
      userMessage,
    } = this.props;

    const { offerList, cancelButtonText, } =
      chosenProductIndex === 'couponProduct'
        ? JSON.parse(couponProduct)
        : products[chosenProductIndex];
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
                couponForm: { textLabel, textNote, buttons: { send, close, }, },
              },
              buttons: { entitlements, },
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
                  cancelButtonText={cancelButtonText}
                  fourDigits={fourDigits}
                  isLoggedIn={isLoggedIn}
                  offerList={offerList}
                  openModal={this.openModal}
                  termsButtonText={termsButtonText}
                />
                {!(subStage === 4 || subStage === 6) && (
                  <StyledMoreOptionsCont>
                    {products.map(
                      (product, idx) =>
                        (idx !== chosenProductIndex ? (
                          <Fragment key={product.productTitle}>
                            <BIAction>
                              {action => (
                                <Button
                                  key={product.productTitle}
                                  variant="primary"
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
                                    action({
                                      actionCode: 25,
                                      additionalInfo: {
                                        stage: 'product',
                                      },
                                    });
                                  }}
                                >
                                  {product.productTitle}
                                </Button>
                              )}
                            </BIAction>
                          </Fragment>
                        ) : null)
                    )}
                    {couponExist &&
                      (this.state.couponFormOpen ? (
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
                              <BIAction>
                                {action => (
                                  <Button
                                    variant="primaryOpaque"
                                    isBusy={this.state.couponLoading}
                                    boxModel={{ hp: 3, vp: 0.5, }}
                                    onClick={evt => {
                                      handleSubmit(evt);
                                      action({
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
                                )}
                              </BIAction>
                              <Button
                                variant="neutral"
                                isFlat
                                boxModel={{ hp: 3, vp: 0.5, }}
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
                        <BIAction>
                          {action => (
                            <Button
                              variant="primary"
                              miscStyles={moreOptionsButtonsMiscStyles}
                              onClick={() => {
                                this.setState({ couponFormOpen: true, });
                                action({
                                  actionCode: 22,
                                  additionalInfo: {
                                    stage: 'product',
                                  },
                                });
                              }}
                            >
                              {coupon}
                            </Button>
                          )}
                        </BIAction>
                      ))}
                    <FelaComponent
                      style={theme => ({
                        marginTop: '4rem',
                        fontWeight: '700',
                        extend: [ theme.type(-1), ],
                      })}
                      render="p"
                    >
                      {entitlements.beforeLinkText}{' '}
                      <Link
                        href={entitlements.link}
                        content={
                          <FelaComponent
                            render="span"
                            style={{
                              textDecoration: 'underline',
                              textDecorationSkip: 'ink',
                            }}
                          >
                            {entitlements.linkText}
                          </FelaComponent>
                        }
                      />
                    </FelaComponent>
                  </StyledMoreOptionsCont>
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
