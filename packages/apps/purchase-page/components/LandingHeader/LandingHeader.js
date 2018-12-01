import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, } from 'next/router';
import { createComponent, withTheme, } from 'react-fela';
import { IconHaaretzFullLogo, Button, BIAction, } from '@haaretz/htz-components';
import { friendlyRoutes, } from '../../routes/routes';

const propTypes = {
  router: PropTypes.shape().isRequired,
  /** passed as a a prop by fela's withTheme func before default export */
  theme: PropTypes.shape({
    landingHeader: PropTypes.shape({
      underLogoText: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const defaultProps = {};

const contStyle = () => ({
  overflow: 'hidden',
  transformOrigin: 'top left',
  transform: 'skewY(-6deg)',
});

const StyledCont = createComponent(contStyle);

const innerContStyle = ({ theme, }) => ({
  textAlign: 'center',
  transformOrigin: 'top left',
  transform: 'skewY(6deg)',
  backgroundImage:
    `linear-gradient(130deg, ${theme.color('primary', '-2')}, ${theme.color(
      'secondary',
      '+1'
    )}),`
    + 'url(http://res.cloudinary.com/dmymrss4v/image/upload/v1518514050/BG_image_haaretz.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  // todo: should it be 100% height and width auto like it is now?
  backgroundSize: 'cover',
  backgroundOrigin: 'content-box',
  // paddingRight: '5rem',
  // paddingLeft: '5rem',
  color: 'white',

  '@supports (background-blend-mode: multiply)': {
    backgroundBlendMode: 'multiply',
    backgroundImage:
      `linear-gradient(130deg, ${theme.color('primary', '-2')}, ${theme.color(
        'secondary',
        '+1'
      )}),`
      + 'url(http://res.cloudinary.com/dmymrss4v/image/upload/v1518514050/BG_image_haaretz.png)',
  },
});

const StyledInnerCont = createComponent(innerContStyle);
const iconsContStyle = ({ theme, }) => ({
  paddingTop: '12rem',
  extend: [
    theme.mq({ from: 'l', }, { paddingTop: '23rem', }),
    theme.mq({ until: 's', }, { paddingTop: '8rem', }),
  ],
});

const StyledIconsCont = createComponent(iconsContStyle);

const underLogoHeaderStyle = ({ theme, }) => ({
  fontWeight: 300,
  letterSpacing: '3px',
  marginTop: '-5rem',
  extend: [ theme.type(2), ],
});

const StyledUnderLogoHeader = createComponent(underLogoHeaderStyle);

const mainHeaderContStyle = ({ theme, }) => ({
  marginTop: '5rem',
  // todo : add sides padding, ask max for each bp
  extend: [
    theme.mq({ from: 'l', }, { marginTop: '6rem', }),
    theme.mq({ until: 's', }, { marginTop: '4rem', }),
  ],
});

const StyledMainHeaderCont = createComponent(mainHeaderContStyle);

const mainHeaderStyle = ({ theme, }) => ({
  fontWeight: 300,
  extend: [
    theme.type(9),
    theme.mq({ from: 'l', }, { ...theme.type(13), }),
    theme.mq({ until: 's', }, { ...theme.type(8), }),
  ],
});

const StyledMainHeader = createComponent(mainHeaderStyle);

const pricingHeaderStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  marginTop: '6rem',
  extend: [
    theme.type(1),
    theme.mq({ from: 'l', }, { marginTop: '10rem', ...theme.type(5), }),
    theme.mq({ until: 's', }, { marginTop: '5rem', }),
  ],
});

const StyledPricingHeader = createComponent(pricingHeaderStyle);

// will come from apollo
// todo: change naming according to papi
const mainHeaderRows = [
  { id: 'testId', text: 'כל התכנים', },
  { id: 'testId2', text: 'בכל מכשיר, בכל זמן', },
];

// todo: dynamic data instead of hardcoded
function LandingHeader({
  router,
  theme: { landingHeader: { underLogoText, }, },
}) {
  return (
    <StyledCont>
      <StyledInnerCont>
        <StyledIconsCont>
          {/* todo: dynamically import icons? */}
          <IconHaaretzFullLogo
            fill="primary"
            size={15}
            miscStyles={{ paddingTop: '-2rem', }}
          />
        </StyledIconsCont>
        <StyledUnderLogoHeader>{underLogoText}</StyledUnderLogoHeader>
        <StyledMainHeaderCont>
          {mainHeaderRows.map((rowContent, idx) => (
            <StyledMainHeader key={rowContent.id}>
              {rowContent.text}
            </StyledMainHeader>
          ))}
        </StyledMainHeaderCont>
        {/* todo: get dynamically */}
        <StyledPricingHeader>החל מ 4.9 שח בחודש הראשון</StyledPricingHeader>
        <BIAction>
          {action => (
            <Button
              href={{ pathname: '/promotions-page/stage1', }}
              asPath={`${router.asPath}/${friendlyRoutes.stage1}`}
              onClick={() => {
                action({
                  actionCode: 11,
                  additionalInfo: {
                    info: 'is additional',
                  },
                });
              }}
              prefetch
              variant="salesOpaque"
              boxModel={{ hp: 3, vp: 1, }}
              miscStyles={{
                marginTop: [
                  { until: 's', value: '5rem', },
                  { from: 's', value: '7rem', },
                  { from: 'l', value: '9rem', },
                ],
                marginBottom: [
                  { until: 's', value: '15rem', },
                  { from: 's', until: 'l', value: '20rem', },
                  { from: 'l', value: '25rem', },
                ],
              }}
            >
              {/* todo: get dynamically */}
              לכל מסלולי המנויים
            </Button>
          )}
        </BIAction>
      </StyledInnerCont>
    </StyledCont>
  );
}

LandingHeader.propTypes = propTypes;

LandingHeader.defaultProps = defaultProps;

export default withRouter(withTheme(LandingHeader));
