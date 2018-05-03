import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import { Button, Form, TextInput, } from '@haaretz/htz-components';
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
  marginTop: '6rem',
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
  marginTop: '4rem',
  marginInlineStart: [ { from: 'm', value: '3rem', }, ],
  maxWidth: '90%',
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
    couponProduct: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * offer list
         */
        offerList: PropTypes.arrayOf(
          PropTypes.shape({
            offerTitle: PropTypes.string.isRequired,
            offerPrice: PropTypes.string.isRequired,
            offerText: PropTypes.arrayOf(PropTypes.string.isRequired)
              .isRequired,
            offerButtonText: PropTypes.string.isRequired,
            offerDisclaimer: PropTypes.string.isRequired,
            offerRecommended: PropTypes.bool.isRequired,
            offerRecommendedText: PropTypes.string,
          }).isRequired
        ).isRequired,
      })
    ).isRequired,
    subStage: PropTypes.number.isRequired,
    fourDigits: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    userMessage: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    couponExist: false,
    fourDigits: null,
    userMessage: null,
  };

  state = {
    couponFormOpen: false,
    couponLoading: false,
    couponError: null,
    modalOpen: false,
    offerListChosenTermsIndex: null,
    // products: this.props.products,
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

    // const { offerList, cancelButtonText, } = products[chosenProductIndex];
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
                  fourDigits={fourDigits}
                  isLoggedIn={isLoggedIn}
                  cancelButtonText={cancelButtonText}
                  offerList={offerList}
                  subStage={subStage}
                  termsButtonText={termsButtonText}
                  openModal={this.openModal}
                />
                {!(subStage === 4 || subStage === 6) && (
                  <StyledMoreOptionsCont>
                    {products.map(
                      (product, idx) =>
                        (idx !== chosenProductIndex ? (
                          <Button
                            variant="offerPage"
                            miscStyles={moreOptionsButtonsMiscStyles}
                            onClick={() => {
                              console.log('change product');
                              cache.writeData({
                                data: {
                                  promotionsPageState: {
                                    chosenProductIndex: idx,
                                    __typename: 'PromotionsPageState',
                                  },
                                },
                              });
                            }}
                          >
                            {product.productTitle}
                          </Button>
                        ) : null)
                    )}
                    {couponExist &&
                      (this.state.couponFormOpen ? (
                        <Form
                          clearFormAfterSubmit={false}
                          onSubmit={async ({ couponCode, }) => {
                            console.log(`couponCode submitted: ${couponCode}`);
                            this.setState({
                              couponLoading: true,
                              couponError: false,
                            });
                            try {
                              const { data, } = await cache.query({
                                query: GET_COUPON_DATA,
                                variables: { couponCode, },
                              });
                              console.log('data from coupon', data);
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
                              <Button
                                variant="primaryOpaque"
                                isBusy={this.state.couponLoading}
                                boxModel={{ hp: 3, vp: 0.5, }}
                                onClick={handleSubmit}
                                miscStyles={couponButtonsMiscStyles}
                              >
                                {send}
                              </Button>
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
                        <Button
                          variant="offerPage"
                          miscStyles={moreOptionsButtonsMiscStyles}
                          onClick={() => {
                            this.setState({ couponFormOpen: true, });
                          }}
                        >
                          {coupon}
                        </Button>
                      ))}
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
