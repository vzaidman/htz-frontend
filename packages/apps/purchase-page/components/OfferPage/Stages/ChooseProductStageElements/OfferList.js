import React from 'react';
import PropTypes from 'prop-types';
// import Media from 'react-media';
import { withRouter, } from 'next/router';
import { createComponent, } from 'react-fela';
import { Media, } from '@haaretz/htz-components';
import DesktopOffer from './DesktopOffer';
import MobileOffer from './MobileOffer';

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
  ...theme.mq(
    { until: 's', },
    {
      flexDirection: 'column',
    }
  ),
});

const StyledCont = createComponent(contStyle);

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
        <Media query={{ until: 's', }}>
          {matches =>
            (matches ? (
              <MobileOffer
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
            ) : (
              <DesktopOffer
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
            ))
          }
        </Media>
      ))}
    </StyledCont>
  );
}

OfferList.propTypes = propTypes;

OfferList.defaultProps = defaultProps;

export default withRouter(OfferList);
