import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, } from 'next/router';
import { createComponent, } from 'react-fela';
import { border, } from '@haaretz/htz-css-tools';
import { Button, } from '@haaretz/htz-components';
import { ApolloConsumer, } from 'react-apollo';

const propTypes = {
  cancelButtonText: PropTypes.string.isRequired,
  fourDigits: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
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
  openModal: PropTypes.func.isRequired,
  router: PropTypes.shape().isRequired,
  termsButtonText: PropTypes.string.isRequired,
};

const defaultProps = {
  fourDigits: null,
};

const contStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '5rem',
  marginBottom: '6rem',
});

const StyledCont = createComponent(contStyle);

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
    : { width: '46rem', height: '48rem', }),
  extend: [
    border('1px', 4, 'solid', theme.color('offerPage', 'borderHighlighted')),
    theme.mq(
      { until: 's', },
      {
        ...border(
          '1px',
          isRecommended ? 3 : 2,
          'solid',
          theme.color('offerPage', 'borderHighlighted')
        ),
        ...(isRecommended
          ? {
            width: '26.5rem',
            height: '33rem',
          }
          : { width: '22.5rem', height: '28rem', }),
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
  extend: [
    theme.type(2, { fromBp: 's', }),
    theme.type(isRecommended ? -2 : -3, { untilBp: 's', }),
  ],
});

const StyledOfferTitle = createComponent(offerTitleStyle, 'h2');

const priceStyle = ({ theme, isRecommended, }) => ({
  display: 'block',
  color: theme.color('offerPage', 'pricingHeadText'),
  ':before': {
    content: `"${theme.stage2.offerList.currencySymbol}"`,
    ...theme.type(1, { fromBp: 's', }),
    ...theme.type(isRecommended ? -3 : -4, { untilBp: 's', }),
  },
  extend: [
    theme.type(8, { fromBp: 's', }),
    theme.type(isRecommended ? 3 : 2, { untilBp: 's', }),
  ],
});

const StyledPrice = createComponent(priceStyle, 'span');

const offerTextStyle = ({ theme, isRecommended, isFirst, }) => ({
  display: 'block',
  fontWeight: '400',
  ...(isFirst ? {} : { color: theme.color('offerPage', 'secondaryOfferText'), }),
  extend: [
    theme.type(1, { fromBp: 's', }),
    theme.type(isRecommended ? -3 : -4, { untilBp: 's', }),
  ],
});

const StyledOfferText = createComponent(offerTextStyle, 'span');

const cancelButtonTextStyle = ({ theme, isRecommended, }) => ({
  display: 'block',
  marginTop: '4.5rem',
  extend: [
    theme.type(-1, { fromBp: 's', }),
    theme.type(isRecommended ? -3 : -4, { untilBp: 's', }),
    theme.mq({ until: 's', }, { marginTop: isRecommended ? '2rem' : '1rem', }),
  ],
});

const StyledCancelButtonText = createComponent(cancelButtonTextStyle, 'span');

const termsButtonStyle = ({ theme, isRecommended, }) => ({
  textDecoration: 'underline',
  marginTop: '1.5rem',
  display: 'block',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  extend: [
    theme.mq({ until: 's', }, { marginTop: isRecommended ? '1rem' : 0, }),
    theme.type(-1, { fromBp: 's', }),
    theme.type(isRecommended ? -4 : -5, { untilBp: 's', }),
  ],
});

const StyledTermsButton = createComponent(termsButtonStyle, 'button', [
  'onClick',
]);

const bannerStyle = ({ theme, }) => ({
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  insetInlineStart: 0,
  width: '20rem',
  height: '20rem',
  extend: [ theme.mq({ until: 's', }, { width: '12rem', height: '12rem', }), ],
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
      { transform: 'rotate(37deg) translate(22%, -20%)', }
    ),
    theme.type(-4, { untilBp: 's', }),
  ],
});

const StyledBannerInnerCont = createComponent(bannerInnerContStyle);

/* eslint-disable react/prop-types */
const Offer = ({
  cancelButtonText,
  offer,
  openModal,
  termsButtonText,
  offerIdx,
  isLoggedIn,
  fourDigits,
  router,
}) => {
  const pathName = isLoggedIn
    ? { pathname: '/promotions-page/stage4', }
    : { pathname: '/promotions-page/stage3', };

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
      router.push(pathName, router.asPath);
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
          <Button
            href={pathName}
            asPath={router.asPath}
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
          <StyledTermsButton
            isRecommended={offer.isRecommended}
            onClick={evt => {
              evt.stopPropagation();
              openModal(offerIdx);
            }}
          >
            {termsButtonText}
          </StyledTermsButton>
        </StyledOffer>
      )}
    </ApolloConsumer>
  );
};

function OfferList({
  offerList,
  cancelButtonText,
  termsButtonText,
  openModal,
  isLoggedIn,
  fourDigits,
  router,
}) {
  return (
    <StyledCont>
      {offerList.map((offer, idx) => (
        <Offer
          // eslint-disable-next-line react/no-array-index-key
          key={`offer-${idx}`}
          isLoggedIn={isLoggedIn}
          fourDigits={fourDigits}
          offer={offer}
          cancelButtonText={cancelButtonText}
          termsButtonText={termsButtonText}
          openModal={openModal}
          offerIdx={idx}
          router={router}
        />
      ))}
    </StyledCont>
  );
}

OfferList.propTypes = propTypes;

OfferList.defaultProps = defaultProps;

export default withRouter(OfferList);
