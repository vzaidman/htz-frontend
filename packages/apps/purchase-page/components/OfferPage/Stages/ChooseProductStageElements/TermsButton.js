import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { BIAction, } from '@haaretz/htz-components';

TermsButton.propTypes = {
  displayOnMobile: PropTypes.bool.isRequired,
  isRecommended: PropTypes.bool.isRequired,
  offerIdx: PropTypes.number.isRequired,
  termsButtonText: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

TermsButton.defaultProps = {};
const termsButtonStyle = ({ displayOnMobile, isRecommended, theme, }) => ({
  textDecoration: 'underline',
  marginTop: '1.5rem',
  display: 'block',

  extend: [
    theme.type(-1, { fromBp: 's', }),
    theme.type(-2, { untilBp: 's', }),
    theme.mq(
      { from: 's', },
      {
        marginInlineStart: 'auto',
        marginInlineEnd: 'auto',
      }
    ),
    ...(displayOnMobile
      ? [ theme.mq({ from: 's', }, { display: 'none', }), ]
      : [
        theme.mq(
          { until: 's', },
          {
            display: 'none',
          }
        ),
      ]),
  ],
});

const StyledTermsButton = createComponent(termsButtonStyle, 'button', [
  'onClick',
]);

function TermsButton({
  displayOnMobile,
  isRecommended,
  offerIdx,
  termsButtonText,
  openModal,
}) {
  return (
    <BIAction>
      {action => (
        <StyledTermsButton
          isRecommended={isRecommended}
          displayOnMobile={displayOnMobile}
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
  );
}

export default TermsButton;
