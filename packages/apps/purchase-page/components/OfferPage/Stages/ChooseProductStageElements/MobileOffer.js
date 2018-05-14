import React from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import { border, } from '@haaretz/htz-css-tools';
import { Button, BIAction, } from '@haaretz/htz-components';
import { friendlyRoutes, } from '../../../../routes/routes';

const offerStyle = ({ theme, isRecommended = false, }) => ({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  position: 'relative',
  marginInlineStart: '0.5rem',
  marginInlineEnd: '0.5rem',
  marginBottom: '2rem',
  width: '90%',
  boxShadow: '1px 1px 6px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.color(
    'offerPage',
    isRecommended ? 'bgHighlighted' : 'bg'
  ),
  extend: [
    border(
      '1px',
      isRecommended ? 3 : 2,
      'solid',
      theme.color('offerPage', 'borderHighlighted')
    ),
  ],
});

const StyledOffer = createComponent(offerStyle, 'div', [ 'onClick', ]);

const offerTitleStyle = ({ theme, isRecommended, }) => ({
  ...theme.type(1),
});

const StyledOfferTitle = createComponent(offerTitleStyle, 'h2');

const priceStyle = ({ theme, isRecommended, }) => ({
  display: 'block',
  fontWeight: 300,
  letterSpacing: '-1.4px',
  color: theme.color('offerPage', 'pricingHeadText'),
  ':before': {
    content: `"${theme.stage2.offerList.currencySymbol}"`,
    ...theme.type(-1),
  },
  extend: [ theme.type(6), ],
});

const StyledPrice = createComponent(priceStyle, 'span');

const offerTextStyle = ({ theme, isRecommended, isFirst, }) => ({
  display: 'block',
  fontWeight: '400',
  ...(isFirst ? {} : { color: theme.color('offerPage', 'secondaryOfferText'), }),
  ...theme.type(-1),
});

const StyledOfferText = createComponent(offerTextStyle, 'span');

const cancelButtonTextStyle = ({ theme, isRecommended, }) => ({
  display: 'block',
  marginTop: '1.5rem',
  ...theme.type(-3),
});

const StyledCancelButtonText = createComponent(cancelButtonTextStyle, 'span');

const termsButtonStyle = ({ theme, isRecommended, }) => ({
  textDecoration: 'underline',
  marginTop: '1rem',
  display: 'block',
  ...theme.type(-2),
});

const StyledTermsButton = createComponent(termsButtonStyle, 'button', [
  'onClick',
]);

const bannerStyle = ({ theme, }) => ({
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  insetInlineEnd: 0,
  width: '19rem',
  height: '12rem',
});

const StyledBanner = createComponent(bannerStyle);

const bannerInnerContStyle = ({ theme, }) => ({
  transform: 'rotate(-30deg) translate(6%, 156%)',
  transformOrigin: 'bottom',
  backgroundColor: theme.color('offerPage', 'bannerColor'),
  color: 'white',
  fontWeight: 'bold',
  // a large enough number to ensure the banner oversteps its boundries
  width: '150%',
  textAlign: 'center',
  ...theme.type(-2),
});

const StyledBannerInnerCont = createComponent(bannerInnerContStyle);

/* eslint-disable react/prop-types */
const MobileOffer = ({
  cancelButtonText,
  offer,
  openModal,
  termsButtonText,
  offerIdx,
  isLoggedIn,
  fourDigits,
  router,
}) => {
  // eslint-disable-next-line prefer-const
  let [ pathWithoutQuery, queryPartFromPath, ] = router.asPath.split(/\?(.+)/);
  pathWithoutQuery = pathWithoutQuery.substr(
    0,
    pathWithoutQuery.lastIndexOf('/')
  );
  const computedAsPath = `${pathWithoutQuery}/${
    isLoggedIn ? friendlyRoutes.stage4 : friendlyRoutes.stage3
  }${queryPartFromPath ? `?${queryPartFromPath}` : ''}`;
  const pathName = isLoggedIn
    ? '/promotions-page/stage4'
    : '/promotions-page/stage3';

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
      if (router.asPath) {
        router.push(pathName, computedAsPath);
      }
      else {
        router.push(pathName, computedAsPath);
      }
    }
  };
  return (
    <ApolloConsumer>
      {cache => (
        /* eslint-enable react/prop-types */
        <StyledOffer
          key={Math.random()}
          isRecommended={offer.isRecommended}
          onClick={() => {
            continueToNextStage({ cache, idx: offerIdx, routerPush: true, });
          }}
        >
          {offer.isRecommended && offer.bannerText ? (
            <StyledBanner>
              <StyledBannerInnerCont>{offer.bannerText}</StyledBannerInnerCont>
            </StyledBanner>
          ) : null}
          <FelaComponent
            style={{
              textAlign: 'start',
            }}
          >
            <StyledOfferTitle isRecommended={offer.isRecommended}>
              {offer.title}
            </StyledOfferTitle>
            <StyledPrice isRecommended={offer.isRecommended}>
              {offer.price}
            </StyledPrice>
            {offer.text &&
              offer.text.map((text, textIndex) => (
                <StyledOfferText
                  key={Math.random()}
                  isRecommended={offer.isRecommended}
                  isFirst={textIndex === 0}
                >
                  {text}
                </StyledOfferText>
              ))}
            <BIAction>
              {action => (
                <StyledTermsButton
                  isRecommended={offer.isRecommended}
                  onClick={evt => {
                    evt.stopPropagation();
                    openModal(offerIdx);
                    action({
                      actionCode: 21,
                      additionalInfo: {
                        stage: 'product',
                      },
                    });
                  }}
                >
                  {termsButtonText}
                </StyledTermsButton>
              )}
            </BIAction>
          </FelaComponent>
          <FelaComponent
            style={{
              marginTop: '2rem',
            }}
          >
            <FelaComponent>
              <BIAction>
                {action => (
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
                      action({
                        actionCode: 21,
                        additionalInfo: {
                          stage: 'product',
                          chosenProduct: offer.title,
                        },
                      });
                      continueToNextStage({ cache, idx: offerIdx, });
                    }}
                  >
                    {offer.buttonText}
                  </Button>
                )}
              </BIAction>
              <StyledCancelButtonText isRecommended={offer.isRecommended}>
                {cancelButtonText}
              </StyledCancelButtonText>
            </FelaComponent>
          </FelaComponent>
        </StyledOffer>
      )}
    </ApolloConsumer>
  );
};

export default MobileOffer;
