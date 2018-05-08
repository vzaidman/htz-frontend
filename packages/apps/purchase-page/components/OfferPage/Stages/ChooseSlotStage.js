import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { withRouter, } from 'next/router';
import { parseTypographyProp, } from '@haaretz/htz-css-tools';
import { Button, } from '@haaretz/htz-components';
import DesktopView from './ChooseSlotsStageElements/DesktopView';
import MobileView from './ChooseSlotsStageElements/MobileView';
import SubHeader from './ChooseSlotsStageElements/SubHeader';
import UserMessage from './Elements/UserMessage';

const propTypes = {
  hostname: PropTypes.string.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionName: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(PropTypes.object),
      couponExist: PropTypes.bool,
    })
  ).isRequired,
  subStage: PropTypes.number.isRequired,
  userMessage: PropTypes.arrayOf(PropTypes.string),
  /** passed by next withRouter */
  router: PropTypes.shape().isRequired,
};

const defaultProps = {
  userMessage: null,
};

const contStyle = theme => ({
  textAlign: 'center',
  marginBottom: '11rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  extend: [ theme.mq({ from: 'm', }, { maxWidth: '90%', }), ],
});

const moreOptionsContStyle = ({ theme, }) => ({
  marginTop: '6rem',
  color: theme.color('offerPage', 'buttonText'),
  marginBottom: '11rem',
  flexDirection: 'column',
  extend: [
    theme.mq(
      { until: 'l', },
      {
        display: 'inline-flex',
      }
    ),
    theme.mq(
      { from: 'l', },
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    ),
  ],
});

const StyledMoreOptionsCont = createComponent(moreOptionsContStyle);

const headingStyle = ({ theme, }) => ({
  textAlign: 'center',
  fontWeight: 'normal',
  paddingInlineStart: '4rem',
  paddingInlineEnd: '4rem',
  extend: [
    parseTypographyProp(
      [ { until: 'l', value: 3, }, { from: 'l', value: 5, }, ],
      theme.type
    ),
  ],
});

const moreOptionsButtonsMiscStyles = {
  marginTop: '4rem',
  marginInlineStart: [ { from: 'l', value: '3rem', }, ],
  type: -1,
};

const StyledHeading = createComponent(headingStyle, 'h1');

function ChooseSlotStage({
  hostname,
  tableData,
  subStage,
  userMessage,
  router,
}) {
  const pathName = '/promotions-page/stage2';

  const continueToNextStage = ({ cache, idx, routerPush = false, }) => {
    cache.writeData({
      data: {
        promotionsPageState: {
          stage: 3,
          subStage: subStage === 3 ? 4 : subStage === 4 ? 3 : subStage,
          chosenSlotIndex: idx,
          __typename: 'PromotionsPageState',
        },
      },
    });
    if (routerPush) {
      router.push(pathName, router.asPath);
    }
  };

  const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
  return (
    <FelaComponent
      style={contStyle}
      render={({ className, theme, }) => (
        <Fragment>
          <StyledHeading>{theme.stage1.headerText}</StyledHeading>
          <SubHeader isTheMarker={host === 'themarker.com'} />
          <div className={className}>
            <UserMessage userMessage={userMessage} />
            <DesktopView
              tableData={tableData}
              staticTableData={theme.stage1}
              continueToNextStage={continueToNextStage}
              pathName={pathName}
              asPath={router.asPath}
            />
            <MobileView
              tableData={tableData}
              staticTableData={theme.stage1}
              continueToNextStage={continueToNextStage}
              pathName={pathName}
              asPath={router.asPath}
            />
            <StyledMoreOptionsCont>
              {subStage < 2 && (
                <Button
                  variant="primary"
                  miscStyles={moreOptionsButtonsMiscStyles}
                  href={theme.stage1.buttons.subscribed.url}
                >
                  {theme.stage1.buttons.subscribed.text}
                </Button>
              )}
              <Button
                variant="primary"
                miscStyles={moreOptionsButtonsMiscStyles}
                href={theme.stage1.buttons.organizationSubscription.url}
              >
                {theme.stage1.buttons.organizationSubscription.text}
              </Button>
            </StyledMoreOptionsCont>
          </div>
        </Fragment>
      )}
    />
  );
}

ChooseSlotStage.propTypes = propTypes;
ChooseSlotStage.defaultProps = defaultProps;

export default withRouter(ChooseSlotStage);
