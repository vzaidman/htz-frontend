import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { withRouter, } from 'next/router';
import ReactGA from 'react-ga';
import { parseTypographyProp, } from '@haaretz/htz-css-tools';
import { EventTracker, HtzLink, } from '@haaretz/htz-components';
import DesktopView from './ChooseSlotsStageElements/DesktopView';
import MobileView from './ChooseSlotsStageElements/MobileView';
import SubHeader from './ChooseSlotsStageElements/SubHeader';
import UserMessage from './Elements/UserMessage';
import StageCounter from './Elements/StageCounter';
import pathGenerator from './utils/pathGenerator';

const propTypes = {
  host: PropTypes.oneOf([ 'HTZ', 'TM', ]).isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionName: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(PropTypes.object),
      couponExist: PropTypes.bool,
    })
  ).isRequired,
  sale: PropTypes.arrayOf(PropTypes.oneOf([ 'HTZ', 'TM', 'BOTH', ])),
  subStage: PropTypes.number.isRequired,
  userMessage: PropTypes.arrayOf(PropTypes.string),
  /** passed by next withRouter */
  router: PropTypes.shape().isRequired,
};

const defaultProps = {
  userMessage: null,
  sale: null,
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
  marginTop: '2rem',
  extend: [
    parseTypographyProp(
      [ { until: 'l', value: 3, }, { from: 'l', value: 5, }, ],
      theme.type
    ),
  ],
});

const StyledHeading = createComponent(headingStyle, 'h1');

class ChooseSlotStage extends React.Component {
  componentDidMount() {
    this.props.tableData.map((item, idx) =>
      ReactGA.ga('ec:addImpression', {
        id: item.subscriptionName,
        name: item.productTitle,
        position: idx + 1,
        price: item.pricingHead,
        list: 'Slot Stage Results',
      })
    );
    ReactGA.ga('send', 'pageview');
  }
  render() {
    const { host, tableData, sale, subStage, userMessage, router, } = this.props;

    const { pathName, asPath, } = pathGenerator('stage2', router);

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
        router.push(pathName, asPath);
      }
      else {
        router.replace(pathName, asPath);
      }
    };

    return (
      <FelaComponent
        style={contStyle}
        render={({
          className,
          theme: {
            stage1,
            stage1: {
              headerText,
              buttons: { entitlements, organizationSubscription, },
            },
          },
        }) => (
          <Fragment>
            <StageCounter stage={1} />
            <StyledHeading>{headerText}</StyledHeading>
            <SubHeader isTheMarker={host === 'TM'} />
            <div className={className}>
              <UserMessage userMessage={userMessage} />
              <DesktopView
                tableData={tableData}
                sale={sale}
                staticTableData={stage1}
                continueToNextStage={continueToNextStage}
                pathName={pathName}
              />
              <MobileView
                tableData={tableData}
                sale={sale}
                staticTableData={stage1}
                continueToNextStage={continueToNextStage}
                pathName={pathName}
              />
              <EventTracker>
                {({ biAction, gaAction, }) => (
                  <StyledMoreOptionsCont>
                    {subStage < 2 && (
                      <FelaComponent
                        style={theme => ({
                          marginTop: '2rem',
                          fontWeight: '700',
                          extend: [ theme.type(-1), ],
                        })}
                        render="p"
                      >
                        <HtzLink
                          href={entitlements.link}
                          content={
                            <Fragment>
                              {entitlements.beforeLinkText}{' '}
                              <FelaComponent
                                render="span"
                                style={theme => ({
                                  textDecoration: 'underline',
                                  textDecorationSkip: 'ink',
                                  extend: [
                                    theme.mq(
                                      { until: 's', },
                                      { display: 'block', }
                                    ),
                                  ],
                                })}
                              >
                                {entitlements.linkText}
                              </FelaComponent>
                            </Fragment>
                          }
                          onClick={() => {
                            biAction({
                              actionCode: 40,
                            });
                            gaAction({
                              category: 'promotions-step 2',
                              action: 'newspaper subscribers',
                            });
                          }}
                        />
                      </FelaComponent>
                    )}
                    <FelaComponent
                      style={theme => ({
                        marginTop: '2rem',
                        extend: [ theme.type(-1), ],
                      })}
                    >
                      <HtzLink
                        href={organizationSubscription.url[host]}
                        onClick={() => {
                          // TODO: fix external url fetch
                          biAction({
                            actionCode: 42,
                            additionalInfo: {
                              organization: organizationSubscription.text,
                            },
                          });
                          gaAction({
                            category: 'promotions-step 2',
                            action: 'org subscription',
                          });
                        }}
                        content={
                          <FelaComponent
                            render="span"
                            style={{
                              textDecoration: 'underline',
                              textDecorationSkip: 'ink',
                            }}
                          >
                            {organizationSubscription.text}
                          </FelaComponent>
                        }
                      />
                    </FelaComponent>
                  </StyledMoreOptionsCont>
                )}
              </EventTracker>
            </div>
          </Fragment>
        )}
      />
    );
  }
}

ChooseSlotStage.propTypes = propTypes;
ChooseSlotStage.defaultProps = defaultProps;

export default withRouter(ChooseSlotStage);
