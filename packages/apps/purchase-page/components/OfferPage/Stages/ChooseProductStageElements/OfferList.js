import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, } from 'next/router';
import { FelaComponent, } from 'react-fela';
import { UserDispenser, } from '@haaretz/htz-components';
import Offer from './Offer';

const propTypes = {
  cancelButtonText: PropTypes.string.isRequired,
  chosenSubscription: PropTypes.string.isRequired,
  contentName: PropTypes.string.isRequired,
  fourDigits: PropTypes.string,
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

const contStyle = theme => ({
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

function OfferList({
  chosenSubscription,
  offerList,
  cancelButtonText,
  termsButtonText,
  openModal,
  fourDigits,
  router,
  contentName,
}) {
  return (
    <FelaComponent
      style={contStyle}
      render={({ className, }) => (
        <div className={className} id="offerListWrapper">
          <UserDispenser
            render={({ isLoggedIn, }) => offerList.map((offer, idx) => (
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
                contentName={contentName}
                chosenSubscription={chosenSubscription}
              />
            ))
            }
          />
        </div>
      )}
    />
  );
}

OfferList.propTypes = propTypes;

OfferList.defaultProps = defaultProps;

export default withRouter(OfferList);
