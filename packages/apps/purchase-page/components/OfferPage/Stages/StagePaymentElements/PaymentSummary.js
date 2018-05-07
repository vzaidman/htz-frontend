import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { border, } from '@haaretz/htz-css-tools';
import Phones from '../Elements/Phones';

const propTypes = {
  chosenSubscription: PropTypes.string.isRequired,
  chosenPaymentArrangement: PropTypes.string.isRequired,
  firstPaymentAmount: PropTypes.number.isRequired,
  nextPaymentAmount: PropTypes.number.isRequired,
};

const chosenDetailsBoxStyle = theme => ({
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
  marginTop: '6rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  extend: [
    border('1px', 2, 'solid', theme.color('offerPage', 'paymentSummaryBorder')),
    theme.mq(
      { from: 's', },
      {
        maxWidth: '65rem',
      }
    ),
    theme.mq(
      { until: 's', },
      {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        marginTop: '3rem',
      }
    ),
  ],
});

const phonesContStyle = ({ theme, }) => ({
  extend: [ theme.type(-1), theme.mq({ until: 'm', }, { marginBottom: '1rem', }), ],
});

const StyledPhonesCont = createComponent(phonesContStyle);

const detailsContStyle = ({ theme, }) => ({
  marginInlineStart: '3rem',
  textAlign: 'start',
  extend: [ theme.mq({ until: 's', }, { textAlign: 'center', }), ],
});

const StyledDetailsCont = createComponent(detailsContStyle);

const detailsHeaderStyle = ({ theme, }) => ({
  color: theme.color('offerPage', 'secondaryOfferText'),
  fontWeight: 'bold',
  extend: [ theme.type(1, { fromBp: 'm', }), theme.type(-1, { untilBp: 's', }), ],
});

const StyledDetailsHeader = createComponent(detailsHeaderStyle, 'h4');

const detailsPaymentStyle = ({ theme, }) => ({
  color: theme.color('offerPage', 'secondaryOfferText'),
  extend: [ theme.type(0, { fromBp: 'm', }), theme.type(-2, { untilBp: 's', }), ],
});

const StyledDetailsPayments = createComponent(detailsPaymentStyle);

const paymentAmountStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  ':before': {
    content: `"${theme.stage4.currencySymbol}"`,
  },
});

const StyledPaymentAmount = createComponent(paymentAmountStyle, 'span');

const paymentTextStyle = ({ isFirst, }) => ({
  ...(isFirst && {
    ':after': {
      marginInlineEnd: '1rem',
      marginInlineStart: '1rem',
      fontWeight: 'bold',
      content: '"|"',
    },
  }),
});

const StyledPaymentText = createComponent(paymentTextStyle, 'span');

const decimalPlaces = num => {
  // eslint-disable-next-line prefer-template
  const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
      // Adjust for scientific notation.
      (match[2] ? +match[2] : 0)
  );
};

function PaymentSummary({
  chosenSubscription,
  chosenPaymentArrangement,
  firstPaymentAmount,
  nextPaymentAmount,
}) {
  return (
    <FelaComponent
      style={chosenDetailsBoxStyle}
      render={({
        className,
        theme: {
          stage5: {
            details: {
              chosenSubscriptionText,
              chosenPaymentArrangementText,
              firstPaymentText,
              nextPaymentText,
            },
          },
        },
      }) => (
        <div className={className}>
          <StyledPhonesCont>
            <Phones subscription={chosenSubscription} size={3.5} />
          </StyledPhonesCont>
          <StyledDetailsCont>
            <StyledDetailsHeader>
              {chosenSubscriptionText[chosenSubscription]}{' '}
              {chosenPaymentArrangementText[chosenPaymentArrangement]}
            </StyledDetailsHeader>
            <StyledDetailsPayments>
              <StyledPaymentText isFirst>
                {firstPaymentText}{' '}
                <StyledPaymentAmount>
                  {firstPaymentAmount}
                  {decimalPlaces(firstPaymentAmount) === 1 && '0'}
                </StyledPaymentAmount>
              </StyledPaymentText>
              <StyledPaymentText>
                {nextPaymentText}{' '}
                <StyledPaymentAmount>
                  {nextPaymentAmount}
                  {decimalPlaces(nextPaymentAmount) === 1 && '0'}
                </StyledPaymentAmount>
              </StyledPaymentText>
            </StyledDetailsPayments>
          </StyledDetailsCont>
        </div>
      )}
    />
  );
}

PaymentSummary.propTypes = propTypes;

export default PaymentSummary;
