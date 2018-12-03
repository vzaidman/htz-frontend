import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import ReactGA from 'react-ga';
import { borderTop, borderBottom, } from '@haaretz/htz-css-tools';
import { Button, EventTracker, H, ApolloConsumer, } from '@haaretz/htz-components';
import PositiveCircle from './PositiveCircle';
import Phones from '../Elements/Phones';

const propTypes = {
  continueToNextStage: PropTypes.func.isRequired,
  host: PropTypes.oneOf([ 'HTZ', 'TM', ]).isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionName: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(PropTypes.object),
      couponExist: PropTypes.bool,
    })
  ).isRequired,
  sale: PropTypes.arrayOf(PropTypes.oneOf([ 'HTZ', 'TM', 'BOTH', ])),
  staticTableData: PropTypes.shape({
    thead: PropTypes.object.isRequired,
    tbody: PropTypes.object.isRequired,
    tfoot: PropTypes.string.isRequired,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
  /** facebook instant articles parameters to pass to login page on mobile view */
  accountLinkToken: PropTypes.string,
  /** facebook instant articles parameters to pass to login page on mobile view */
  fbRedirectUri: PropTypes.string,
};

const defaultProps = {
  sale: null,
  fbRedirectUri: null,
  accountLinkToken: null,
};

const contStyle = theme => ({
  marginTop: '4rem',
  paddingInlineEnd: '2rem',
  paddingInlineStart: '2rem',

  extend: [ theme.mq({ from: 'l', }, { display: 'none', }), ],
});

const itemContStyle = ({ theme, isFirst = false, }) => ({
  cursor: 'pointer',
  extend: [
    borderTop(
      theme.tableStyle.borderWidth,
      3,
      theme.tableStyle.borderStyle,
      isFirst ? 'transparent' : theme.color('offerPage', 'borderHighlighted')
    ),
  ],
});

const StyledItemCont = createComponent(itemContStyle, 'div', [ 'onClick', ]);

const itemMainContStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: '3rem',
});

const StyledItemMainCont = createComponent(itemMainContStyle);

const itemStartContStyle = () => ({
  textAlign: 'inline-start',
});

const StyledItemStartCont = createComponent(itemStartContStyle);

const itemEndContStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '0.5rem',
  extend: [ theme.type(-4), ],
});

const StyledItemEndCont = createComponent(itemEndContStyle);

const tableItemStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '3rem',
  paddingInlineEnd: '6rem',
  extend: [
    borderBottom(
      theme.tableStyle.borderWidth,
      3,
      theme.tableStyle.borderStyle,
      theme.color('offerPage', 'border')
    ),
    theme.type(-1),
  ],
});

const StyledTableItem = createComponent(tableItemStyle);

const tableFooterStyle = ({ theme, }) => ({
  paddingTop: '3rem',
  paddingBottom: '3rem',
  textAlign: 'start',
  fontWeight: 'bold',
  color: theme.color('offerPage', 'tableFooterText'),
  extend: [ theme.type(-1), ],
});

const StyledTableFooter = createComponent(tableFooterStyle);

const itemHeadingStyle = ({ theme, }) => ({
  extend: [ theme.type(3), ],
});

const StyledItemHeading = createComponent(itemHeadingStyle, H);

const itemPricingMonthlyStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  color: theme.color('primary'),
  extend: [ theme.type(1), ],
});

const StyledItemPricingMonthly = createComponent(itemPricingMonthlyStyle, H);

class MobileView extends Component {
  state = {
    menuOpen: false,
  };

  toggleMenu = subscriptionName => {
    this.setState((prevState, props) => {
      if (prevState.menuOpen === subscriptionName) return { menuOpen: false, };
      return { menuOpen: subscriptionName, };
    });
  };
  render() {
    const {
      host,
      tableData,
      sale,
      staticTableData,
      pathName,
      continueToNextStage,
      fbRedirectUri,
      accountLinkToken,
    } = this.props;

    return (
      <ApolloConsumer>
        {cache => (
          <FelaComponent
            style={contStyle}
            render={({
              className,
              theme,
              theme: {
                stage1: {
                  buttons: { loginRedirect, },
                },
              },
            }) => (
              <div className={className}>
                {accountLinkToken && fbRedirectUri ? (
                  <FelaComponent
                    style={{
                      marginTop: '3rem',
                      marginBottom: '3rem',
                      fontWeight: '700',
                      color: theme.color('offerPage', 'buttonText'),
                      extend: [ theme.type(2), ],
                    }}
                    render="p"
                  >
                    <a
                      href={`${loginRedirect.url[host]}?account_linking_token=${accountLinkToken}&redirect_uri=${fbRedirectUri}`}
                    >
                      <Fragment>
                        {loginRedirect.beforeLinkText}{' '}
                        <FelaComponent
                          render="span"
                          style={theme => ({
                            textDecoration: 'underline',
                            textDecorationSkip: 'ink',
                          })}
                        >
                          {loginRedirect.linkText}
                        </FelaComponent>
                      </Fragment>
                    </a>
                  </FelaComponent>
                ) : null}
                {tableData.map((item, idx) => (
                  <Fragment key={tableData[idx].subscriptionName}>
                    <EventTracker>
                      {({ biAction, gaAction, }) => (
                        <StyledItemCont
                          isFirst={idx === 0}
                          key={Math.random()}
                          onClick={() => {
                            biAction({
                              actionCode: 105,
                              additionalInfo: {
                                productId:
                                  tableData[idx].subscriptionName === 'BOTH'
                                    ? '274'
                                    : tableData[idx].subscriptionName === 'HTZ'
                                      ? '243'
                                      : '273',
                                stage: 'slot',
                              },
                            });
                            gaAction({
                              category: 'promotions-step 2',
                              action: 'continue button',
                              label:
                                tableData[idx].subscriptionName === 'BOTH'
                                  ? 'dual'
                                  : tableData[idx].subscriptionName === 'HTZ'
                                    ? 'haaretz'
                                    : 'themarker',
                            });
                            ReactGA.ga('ec:addProduct', {
                              id: item.subscriptionName,
                              name: item.productTitle,
                              position: idx + 1,
                              brand: item.pricingHead,
                            });

                            ReactGA.ga('ec:setAction', 'click', {
                              list: 'Slot Stage Results',
                            });
                            continueToNextStage({
                              cache,
                              idx,
                              routerPush: true,
                            });
                          }}
                        >
                          <StyledItemMainCont>
                            <StyledItemStartCont>
                              <StyledItemHeading>
                                {staticTableData.thead[item.subscriptionName].heading}
                              </StyledItemHeading>
                              <StyledItemPricingMonthly>
                                {item.pricingHead}
                              </StyledItemPricingMonthly>
                              <div>
                                {
                                  staticTableData.thead.mobileUnderPricing[
                                    idx !== 0 ? 'default' : 'firstItem'
                                  ]
                                }
                              </div>
                              <Button
                                href={pathName}
                                variant="salesOpaque"
                                miscStyles={{ marginTop: '3rem', }}
                                onClick={evt => {
                                  evt.preventDefault();
                                  continueToNextStage({
                                    cache,
                                    idx,
                                    routerPush: true,
                                  });
                                }}
                              >
                                {staticTableData.thead[item.subscriptionName].btnText}
                              </Button>
                            </StyledItemStartCont>
                            <StyledItemEndCont>
                              <FelaComponent style={{ marginBottom: '2rem', }}>
                                <Phones
                                  {...(sale ? { sale, } : {})}
                                  subscription={item.subscriptionName}
                                />
                              </FelaComponent>
                              {/* todo: a11y open/close menu */}
                              {/* todo: add a variant with correct focus and active colors */}
                              <Button
                                isFlat
                                attrs={{
                                  'aria-controls': `${
                                    tableData[idx].subscriptionName
                                  }HTZExpendedArea`,
                                  'aria-expanded':
                                    this.state.menuOpen === tableData[idx].subscriptionName,
                                }}
                                onClick={evt => {
                                  evt.stopPropagation();
                                  this.toggleMenu(item.subscriptionName);
                                }}
                              >
                                <FelaComponent
                                  style={{
                                    ...theme.type(-2),
                                    fontWeight: '400',
                                    ...borderBottom(
                                      '1px',
                                      0.25,
                                      'solid',
                                      theme.color('offerPage', 'borderHighlighted')
                                    ),
                                  }}
                                  render={({ className, }) => (
                                    <span className={className}>
                                      {staticTableData.mobileExpandBtn}
                                    </span>
                                  )}
                                />
                              </Button>
                            </StyledItemEndCont>
                          </StyledItemMainCont>
                          {this.state.menuOpen === item.subscriptionName ? (
                            <div id="HTZExpendedArea">
                              {staticTableData.tbody.list.map(
                                row =>
                                  row[item.subscriptionName] && (
                                    <StyledTableItem key={Math.random()}>
                                      <div>{row.description}</div> <PositiveCircle />
                                    </StyledTableItem>
                                  )
                              )}
                              {item.pricingYearly && (
                                <StyledTableItem>
                                  <div>{staticTableData.tbody.pricingYearlyText}</div>
                                  <FelaComponent style={{ textAlign: 'end', }}>
                                    {item.pricingYearly.map((row, jdx) => (
                                      <FelaComponent
                                        style={{
                                          ...(jdx === 0 ? { fontWeight: 'bold', } : {}),
                                        }}
                                      >
                                        {row}
                                      </FelaComponent>
                                    ))}
                                  </FelaComponent>
                                </StyledTableItem>
                              )}
                              {item.pricingMonthly && (
                                <StyledTableItem>
                                  <div>{staticTableData.tbody.pricingMonthlyText}</div>
                                  <FelaComponent style={{ textAlign: 'end', }}>
                                    {item.pricingMonthly.map(row => (
                                      <div>{row}</div>
                                    ))}
                                  </FelaComponent>
                                </StyledTableItem>
                              )}
                              <StyledTableFooter>{staticTableData.tfoot}</StyledTableFooter>
                            </div>
                          ) : null}
                        </StyledItemCont>
                      )}
                    </EventTracker>
                  </Fragment>
                ))}
              </div>
            )}
          />
        )}
      </ApolloConsumer>
    );
  }
}

MobileView.propTypes = propTypes;

MobileView.defaultProps = defaultProps;

export default MobileView;
