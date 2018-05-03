// import React, { Component, Fragment, } from 'react';
// import PropTypes from 'prop-types';
// import gql from 'graphql-tag';
// import { Mutation, } from 'react-apollo';
// import { createComponent, FelaComponent, } from 'react-fela';
// import { LayoutContainer, Logout, } from '@haaretz/htz-components';
// import Stage2 from './Stages/ChooseSlotStage';
// import Stage3 from './Stages/ChooseProductStage';
// import Stage4 from './Stages/Stage4';
// import StageDebt from './Stages/StageDebt';
// import StageThankYou from './Stages/StageThankYou';
// import StageTransition from './StageTransition/StageTransition';

// const ADD_STATE_TO_STORE = gql`
//   mutation addState($state: Object!) {
//     addState(state: $state) @client
//   }
// `;

// const contStyle = () => ({
//   textAlign: 'center',
// });

// const StyledCont = createComponent(contStyle);

// const stagesCounterStyle = ({ theme, }) => ({
//   textAlign: 'center',
//   marginTop: '6rem',
//   fontWeight: 'bold',
//   color: theme.color('primary'),
//   extend: [ theme.type(-1), ],
// });

// const StyledStagesCounter = createComponent(stagesCounterStyle, 'h3');

// class OfferPage extends Component {
//   static propTypes = {
//     /** is there a logged in user */
//     isLoggedIn: PropTypes.bool.isRequired,
//     /**
//      *   passed by apollo
//      */
//     refetch: PropTypes.func.isRequired,
//     /** A user object that the App holds */
//     user: PropTypes.shape({
//       type: PropTypes.string,
//       id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
//       email: PropTypes.email,
//       firstName: PropTypes.string,
//       lastName: PropTypes.string,
//       emailStatus: PropTypes.bool,
//       token: PropTypes.string,
//       anonymousId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
//       __typename: PropTypes.string.isRequired,
//     }),
//     purchasePage: PropTypes.object, // eslint-disable-line react/forbid-prop-types
//   };

//   static defaultProps = {
//     user: {
//       email: null,
//       emailStatus: null,
//       firstName: null,
//       lastName: null,
//       id: null,
//       anonymousId: null,
//       type: null,
//       token: null,
//     },
//     purchasePage: null,
//   };

//   state = {
//     stage: 2,
//     subStage: 0,
//     chosenSlotIndex: null,
//     chosenOfferIndex: null,
//     // defaults to the first product in the array, example for a second products is a student product
//     chosenProductIndex: 0,
//     paymentType: null,
//     approveDebtClaim: false,
//     // stage: 4,
//     // subStage: 3,
//     // chosenOfferIndex: 0,
//     // chosenProductIndex: 0,
//     // chosenSlotIndex: 0,
//     // firstName: 'gdg',
//     // lastName: 'dfgdgd',
//     // paymentType: 'creditCard',
//     // phone: '5747457',
//     // residence: 'israel',
//   };

//   componentDidMount() {
//     this.props.addState({ variables: { state: this.state, }, });
//   }

//   getChildContext() {
//     return {
//       updateOfferPageState: this.updateOfferPageState,
//       fourDigits: this.props.purchasePage && this.props.purchasePage.fourDigits,
//       user: this.props.user,
//       isLoggedIn: this.props.isLoggedIn,
//       getCreditGuardSrc: () => {
//         const chosenOfferPaymentData =
//           this.props.purchasePage &&
//           this.state.chosenSlotIndex !== null &&
//           this.state.chosenProductIndex !== null &&
//           this.state.chosenOfferIndex !== null
//             ? this.props.purchasePage.slots[this.state.chosenSlotIndex]
//               .products[this.state.chosenProductIndex].offerList[
//                 this.state.chosenOfferIndex
//               ].paymentData
//             : null;

//         const creditGuardSrc = chosenOfferPaymentData
//           ? `https://dev-payment.haaretz.co.il/creditGuard/CreditGuardBridgeServlet?productID=${
//             chosenOfferPaymentData.productID
//           }&saleCode=${chosenOfferPaymentData.saleCode}&promotionNumber=${
//             chosenOfferPaymentData.promotionNumber
//           }&cgtype=${chosenOfferPaymentData.cgtype}&approveDebtClaim=${
//             this.state.approveDebtClaim
//           }&thankYouEmailTemplate=6236`
//           : null;
//         return creditGuardSrc;
//       },
//     };
//   }

//   // componentWillReceiveProps(nextProps) {
//   //   if (nextProps && nextProps.purchasePage) {
//   //     this.setState({
//   //       stage: Math.floor(this.nextProps.purchasePage.pageNumber),
//   //       subStage: Math.round((this.nextProps.purchasePage.pageNumber % 1) * 10),
//   //     });
//   //   }
//   // }

//   getStage2Data = slots =>
//     slots.map(slot => {
//       const { offerList, cancelButtonText, ...cleanData } = slot.products[0];
//       return {
//         subscriptionName: slot.subscriptionName,
//         ...cleanData,
//       };
//     });

//   updateOfferPageState = newState => {
//     this.setState({
//       ...newState,
//     });
//   };

//   render() {
//     const { purchasePage, isLoggedIn, user, refetch, } = this.props;

//     const {
//       chosenOfferIndex,
//       chosenProductIndex,
//       chosenSlotIndex,
//       stage,
//       subStage,
//     } = this.state;

//     const chosenSubscription =
//       purchasePage && chosenSlotIndex
//         ? purchasePage.slots[chosenSlotIndex].subscriptionName
//         : null;

//     const chosenPaymentArrangement =
//       purchasePage && chosenProductIndex
//         ? purchasePage.slots[chosenSlotIndex].products[chosenProductIndex]
//           .offerList[chosenOfferIndex]
//         : null;

//     return (
//       <FelaComponent
//         render={({
//           theme: {
//             offerPage: {
//               stagesCounter: { beforeCounter, afterCounter, debtTxt, },
//               userBanner,
//             },
//           },
//         }) => (
//           <StyledCont>
//             {/* todo: figure out numbering Stages and wording with Inbal */}
//             {typeof stage === 'number' && (
//               <StyledStagesCounter>
//                 {beforeCounter} {stage} {afterCounter}
//               </StyledStagesCounter>
//             )}
//             {stage === 'debt' && (
//               <StyledStagesCounter>{debtTxt}</StyledStagesCounter>
//             )}

//             <LayoutContainer bgc="white" miscStyles={{ paddingTop: '1.5rem', }}>
//               {stage === 2 &&
//                 // stage 2 is responsible for processing the slots and
//                 // getting the relevant info, the first product from products arr
//                 // inside each slot is always displayed at this stage
//                 purchasePage && (
//                   <Stage2
//                     tableData={this.getStage2Data(purchasePage.slots)}
//                     subStage={subStage}
//                   />
//                 )}
//               {stage === 3 &&
//                 purchasePage && (
//                   <StageTransition
//                     chosenSubscription={chosenSubscription}
//                     stage={stage}
//                     stageElement={
//                       <Stage3
//                         subStage={subStage}
//                         chosenProductIndex={chosenProductIndex}
//                         couponExist={
//                           purchasePage.slots[chosenSlotIndex].couponExist
//                         }
//                         products={purchasePage.slots[chosenSlotIndex].products}
//                       />
//                     }
//                   />
//                 )}
//               {stage === 4 && (
//                 <StageTransition
//                   chosenSubscription={chosenSubscription}
//                   chosenPaymentArrangement={chosenPaymentArrangement}
//                   stage={stage}
//                   stageElement={
//                     <Stage4
//                       chosenSubscription={chosenSubscription}
//                       chosenPaymentArrangement={chosenPaymentArrangement}
//                       hasDebt={!!purchasePage.pastDebts}
//                       refetch={refetch}
//                       subStage={subStage}
//                     />
//                   }
//                 />
//               )}

//               {stage === 'debt' && (
//                 <StageDebt
//                   pastDebts={purchasePage.pastDebts}
//                   paymentType={this.state.paymentType}
//                 />
//               )}
//               {stage === 'thankYou' && (
//                 <StageThankYou chosenSubscription={chosenSubscription} />
//               )}
//             </LayoutContainer>
//           </StyledCont>
//         )}
//       />
//     );
//   }
// }

// const Wrapper = props => (
//   <Mutation mutation={ADD_STATE_TO_STORE}>
//     {(addState, { data, }) => <OfferPage {...props} addState={addState} />}
//   </Mutation>
// );

// OfferPage.childContextTypes = {
//   updateOfferPageState: PropTypes.func,
//   fourDigits: PropTypes.arrayOf(PropTypes.string),
//   user: PropTypes.object,
//   isLoggedIn: PropTypes.bool,
//   getCreditGuardSrc: PropTypes.func,
// };

// export default Wrapper;
