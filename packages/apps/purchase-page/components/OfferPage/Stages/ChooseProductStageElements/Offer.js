import React from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import ReactGA from 'react-ga';
import { border, } from '@haaretz/htz-css-tools';
import { Button, EventTracker, H, } from '@haaretz/htz-components';
import pathGenerator from '../utils/pathGenerator';

import TermsButton from './TermsButton';

const offerStyle = ({ theme, isRecommended = false, }) => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  marginInlineStart: '0.5rem',
  marginInlineEnd: '0.5rem',

  ...(isRecommended
    ? {
      width: '54rem',
      height: '54rem',
      backgroundColor: theme.color('offerPage', 'bgHighlighted'),
      boxShadow: '1px 1px 6px 0 rgba(0, 0, 0, 0.2)',
    }
    : {
      width: '46rem',
      height: '48rem',
      backgroundColor: theme.color('offerPage', 'bg'),
    }),
  extend: [
    border('1px', 4, 'solid', theme.color('offerPage', 'borderHighlighted')),
    theme.mq(
      { until: 's', },
      {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingInlineEnd: '3rem',
        paddingInlineStart: '3rem',
        height: 'initial',
        marginBottom: '2rem',
        ...border(
          '1px',
          isRecommended ? 3 : 2,
          'solid',
          theme.color('offerPage', 'borderHighlighted')
        ),
      }
    ),
    theme.mq(
      { from: 's', until: 'l', },
      {
        ...border(
          '1px',
          isRecommended ? 3 : 2,
          'solid',
          theme.color('offerPage', 'borderHighlighted')
        ),
        ...(isRecommended
          ? {
            width: '50rem',
            height: '50rem',
          }
          : { width: '45rem', height: '47rem', }),
      }
    ),
  ],
});

const StyledOffer = createComponent(offerStyle, 'div', [ 'onClick', ]);

const offerTitleStyle = ({ theme, isRecommended, }) => ({
  extend: [ theme.type(2, { fromBp: 's', }), theme.type(1, { untilBp: 's', }), ],
});

const StyledOfferTitle = createComponent(offerTitleStyle, H);

const priceStyle = ({ theme, isRecommended, }) => ({
  display: 'block',
  fontWeight: 400,
  letterSpacing: '-1.4px',
  color: theme.color('offerPage', 'pricingHeadText'),
  ':before': {
    content: `"${theme.stage2.offerList.currencySymbol}"`,
    ...theme.type(1, { fromBp: 's', }),
    ...theme.type(-1, { untilBp: 's', }),
  },
  extend: [ theme.type(9, { fromBp: 's', }), theme.type(6, { untilBp: 's', }), {}, ],
});

const StyledPrice = createComponent(priceStyle, 'span');

const offerTextStyle = ({ theme, isRecommended, isFirst, }) => ({
  display: 'block',
  fontWeight: '400',
  ...(isFirst ? {} : { color: theme.color('offerPage', 'secondaryOfferText'), }),
  extend: [ theme.type(1, { fromBp: 's', }), theme.type(-1, { untilBp: 's', }), ],
});

const StyledOfferText = createComponent(offerTextStyle, 'span');

const cancelButtonTextStyle = ({ theme, isRecommended, }) => ({
  display: 'block',
  marginTop: '4.5rem',
  extend: [
    theme.type(-1, { fromBp: 's', }),
    theme.type(-3, { untilBp: 's', }),
    theme.mq({ until: 's', }, { marginTop: '1.5rem', }),
  ],
});

const StyledCancelButtonText = createComponent(cancelButtonTextStyle, 'span');

const bannerStyle = ({ theme, }) => ({
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  extend: [
    theme.mq(
      { from: 's', },
      {
        insetInlineStart: 0,
        width: '20rem',
        height: '20rem',
      }
    ),
    theme.mq(
      { until: 's', },
      {
        insetInlineEnd: 0,
        width: '19rem',
        height: '12rem',
      }
    ),
  ],
});

const StyledBanner = createComponent(bannerStyle);

const bannerInnerContStyle = ({ theme, }) => ({
  transform: 'rotate(45deg) translate(25%, 15%)',
  transformOrigin: 'bottom',
  backgroundColor: theme.color('offerPage', 'bannerColor'),
  color: 'white',
  fontWeight: 'bold',
  // a large enough number to ensure the banner oversteps its boundries
  width: '150%',
  textAlign: 'center',
  extend: [
    theme.mq(
      { until: 's', },
      {
        transform: 'rotate(-30deg) translate(6%, 156%)',
      }
    ),
    theme.type(-2, { until: 's', }),
  ],
});

const StyledBannerInnerCont = createComponent(bannerInnerContStyle);

/* eslint-disable react/prop-types */
const DesktopOffer = ({
  cancelButtonText,
  contentName,
  offer,
  openModal,
  termsButtonText,
  offerIdx,
  isLoggedIn,
  fourDigits,
  router,
}) => {
  const { pathName, asPath, } = pathGenerator(
    isLoggedIn ? 'stage4' : 'stage3',
    router
  );

  const continueToNextStage = ({ cache, idx, routerPush = false, }) => {
    cache.writeData({
      data: {
        promotionsPageState: {
          // todo: do we need stage in state?
          stage: 4,
          subStage: isLoggedIn ? 0 : fourDigits ? 2 : 3,
          chosenOfferIndex: idx,
          __typename: 'PromotionsPageState',
        },
      },
    });
    if (routerPush) {
      router.push(pathName, asPath);
    }
  };
  return (
    <ApolloConsumer>
      {cache => (
        /* eslint-enable react/prop-types */
        <EventTracker>
          {({ biAction, gaAction, gaMapper, }) => (
            <StyledOffer
              key={Math.random()}
              isRecommended={offer.isRecommended}
              onClick={() => {
                biAction({
                  actionCode: 21,
                  additionalInfo: {
                    stage: 'product',
                    chosenProduct: offer.title,
                  },
                });
                gaAction({
                  category: `promotions-step-3-${
                    gaMapper.productId[offer.paymentData.productID]
                  }`,
                  action: `${gaMapper.productId[offer.paymentData.productID]}
                  -salecode[${offer.paymentData.saleCode}]
                  `,
                  label: `${offer.type}-${
                    gaMapper.productId[offer.paymentData.productID]
                  }`,
                });
                ReactGA.ga('ec:addProduct', {
                  id: offer.paymentData.saleCode,
                  name: `${offer.type}-${contentName}`,
                  brand: `salecode[${offer.paymentData.saleCode}]`,
                  price: offer.price,
                  variant: `promotionNumber-${
                    offer.paymentData.promotionNumber
                  }`,
                });
                ReactGA.ga('ec:setAction', 'click', {
                  list: 'Product Stage Results',
                });
                ReactGA.ga(
                  'send',
                  'event',
                  `${offer.type}-${contentName}`,
                  'offer click',
                  'add to cart',
                  {
                    nonInteraction: 1,
                  }
                ); // Send data using an event.

                ReactGA.ga('ec:addProduct', {
                  id: offer.paymentData.saleCode,
                  name: `${offer.type}-${contentName}`,
                  brand: `salecode[${offer.paymentData.saleCode}]`,
                  price: offer.price,
                  variant: `promotionNumber-${
                    offer.paymentData.promotionNumber
                  }`,
                });
                ReactGA.ga('ec:setAction', 'add', {
                  list: 'Product Stage Results',
                });
                ReactGA.ga(
                  'send',
                  'event',
                  `${offer.type}-${contentName}`,
                  'offer click',
                  'add to cart'
                );

                continueToNextStage({ cache, idx: offerIdx, routerPush: true, });
              }}
            >
              {offer.isRecommended && offer.bannerText ? (
                <StyledBanner>
                  <StyledBannerInnerCont>
                    {offer.bannerText}
                  </StyledBannerInnerCont>
                </StyledBanner>
              ) : null}
              <FelaComponent
                style={theme => ({
                  extend: [ theme.mq({ until: 's', }, { textAlign: 'right', }), ],
                })}
              >
                <StyledOfferTitle isRecommended={offer.isRecommended}>
                  {offer.title}
                </StyledOfferTitle>
                <StyledPrice isRecommended={offer.isRecommended}>
                  {offer.price}
                </StyledPrice>
                {(offer.text || offer.originalPrice) &&
                  [
                    offer.originalPrice,
                    ...(offer.text ? [ offer.text, ] : []),
                  ].map((text, textIndex) => (
                    <StyledOfferText
                      key={Math.random()}
                      isRecommended={offer.isRecommended}
                      isFirst={textIndex === 0}
                    >
                      {text}
                    </StyledOfferText>
                  ))}
                <TermsButton
                  displayOnMobile
                  isRecommended={offer.isRecommended}
                  offerIdx={offerIdx}
                  termsButtonText={termsButtonText}
                  openModal={openModal}
                />
              </FelaComponent>
              <FelaComponent
                style={theme => ({
                  extend: [
                    theme.mq(
                      { until: 's', },
                      {
                        alignSelf: 'flex-end',
                      }
                    ),
                  ],
                })}
              >
                <Button
                  href={pathName}
                  variant="salesOpaque"
                  boxModel={{ hp: 3, vp: 1, }}
                  miscStyles={{
                    marginTop: [
                      { until: 's', value: '1rem', },
                      { from: 's', value: '3rem', },
                    ],
                    type: [ { until: 's', value: -1, }, ],
                  }}
                  onClick={() => {
                    continueToNextStage({ cache, idx: offerIdx, });
                  }}
                >
                  {offer.buttonText}
                </Button>

                <StyledCancelButtonText isRecommended={offer.isRecommended}>
                  {cancelButtonText}
                </StyledCancelButtonText>
                <TermsButton
                  displayOnMobile={false}
                  isRecommended={offer.isRecommended}
                  offerIdx={offerIdx}
                  offer={offer}
                  termsButtonText={termsButtonText}
                  openModal={openModal}
                />
              </FelaComponent>
            </StyledOffer>
          )}
        </EventTracker>
      )}
    </ApolloConsumer>
  );
};

export default DesktopOffer;
