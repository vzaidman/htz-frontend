import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import { borderTop, borderBottom, } from '@haaretz/htz-css-tools';
import { Button, } from '@haaretz/htz-components';
import PositiveCircle from './PositiveCircle';
import Phones from '../Elements/Phones';

const propTypes = {
  continueToNextStage: PropTypes.func.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionName: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(PropTypes.object),
      couponExist: PropTypes.bool,
    })
  ).isRequired,
  staticTableData: PropTypes.shape({
    thead: PropTypes.object.isRequired,
    tbody: PropTypes.object.isRequired,
    tfoot: PropTypes.string.isRequired,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
};

const defaultProps = {};

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

const StyledItemHeading = createComponent(itemHeadingStyle, 'h2');

const itemPricingMonthlyStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  extend: [ theme.type(1), ],
});

const StyledItemPricingMonthly = createComponent(itemPricingMonthlyStyle, 'h4');

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
      tableData,
      staticTableData,
      pathName,
      continueToNextStage,
    } = this.props;

    return (
      <ApolloConsumer>
        {cache => (
          <FelaComponent
            style={contStyle}
            render={({ className, theme, }) => (
              <div className={className}>
                {tableData.map((item, idx) => (
                  <StyledItemCont
                    isFirst={idx === 0}
                    key={Math.random()}
                    onClick={() => {
                      continueToNextStage({ cache, idx, routerPush: true, });
                    }}
                  >
                    <StyledItemMainCont>
                      <StyledItemStartCont>
                        <StyledItemHeading>
                          {staticTableData.thead[item.subscriptionName].heading}
                        </StyledItemHeading>
                        <StyledItemPricingMonthly>
                          {item.pricingMonthly}
                        </StyledItemPricingMonthly>
                        {item.pricingYearly && (
                          <div>
                            {item.pricingYearly.map(row => (
                              <div key={Math.random()}>{row}</div>
                            ))}
                          </div>
                        )}
                        <Button
                          href={pathName}
                          // asPath={router.asPath}
                          variant="salesOpaque"
                          miscStyles={{ marginTop: '3rem', }}
                          onClick={() => {
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
                          <Phones subscription={item.subscriptionName} />
                        </FelaComponent>
                        {/* todo: a11y open/close menu */}
                        {/* todo: add a variant with correct focus and active colors */}
                        <Button
                          isFlat
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
                      <div>
                        {staticTableData.tbody.list.map(
                          row =>
                            row[item.subscriptionName] && (
                              <StyledTableItem key={Math.random()}>
                                <div>{row.description}</div> <PositiveCircle />
                              </StyledTableItem>
                            )
                        )}
                        <StyledTableFooter>
                          {staticTableData.tfoot}
                        </StyledTableFooter>
                      </div>
                    ) : null}
                  </StyledItemCont>
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
