import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import ReactGA from 'react-ga';
import {
  borderBottom,
  borderEnd,
  borderStart,
  borderTop,
} from '@haaretz/htz-css-tools';

import {
  Button,
  Grid,
  GridItem,
  H,
  EventTracker,
  AriaDescription,
  ApolloConsumer,
} from '@haaretz/htz-components';
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
  sale: PropTypes.arrayOf(PropTypes.oneOf([ 'HTZ', 'TM', 'BOTH', ])),
  staticTableData: PropTypes.shape({
    thead: PropTypes.object.isRequired,
    tbody: PropTypes.object.isRequired,
    tfoot: PropTypes.string.isRequired,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
};

const defaultProps = {
  sale: null,
};

const tableStyle = ({ theme, }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '8.5rem',

  extend: [ theme.mq({ until: 'l', }, { display: 'none', }), ],
});

const StyledTable = createComponent(tableStyle, 'div');

const theadStyle = () => ({
  display: 'table',
  width: '100%',
  textAlign: 'center',
  top: 0,
});

const StyledThead = createComponent(theadStyle, 'div');

const tFootStyle = () => ({
  display: 'table',
  width: '100%',
});

const StyledTFoot = createComponent(tFootStyle, 'div');

const tBodyStyle = () => ({
  display: 'table',
  width: '100%',
});
const StyledTBody = createComponent(tBodyStyle, 'div');

const thInnerContStyle = ({
  hasBorderTop = false,
  hasBorderStart = false,
  hasBorderEnd = false,
  isHighlighted = false,
  theme,
}) => ({
  backgroundColor: 'white',
  cursor: 'pointer',
  ...(isHighlighted
    ? { backgroundColor: theme.color('offerPage', 'bgHighlighted'), }
    : {}),
  extend: [
    borderBottom(
      theme.tableStyle.borderWidth,
      4,
      theme.tableStyle.borderStyle,
      theme.color('offerPage', 'border')
    ),
    {
      ...(hasBorderTop
        ? {
          ...borderTop(
            theme.tableStyle.borderWidth,
            isHighlighted ? 10 : 3,
            theme.tableStyle.borderStyle,
            theme.color('offerPage', 'borderHighlighted')
          ),
        }
        : {}),
    },
    {
      ...(hasBorderStart
        ? {
          ...borderStart(
            theme.tableStyle.borderWidth,
            theme.tableStyle.borderStyle,
            theme.color('offerPage', 'borderHighlighted')
          ),
          marginInlineStart: '-1px',
        }
        : {}),
    },
    {
      ...(hasBorderEnd
        ? {
          ...borderEnd(
            theme.tableStyle.borderWidth,
            theme.tableStyle.borderStyle,
            theme.color('offerPage', 'borderHighlighted')
          ),
        }
        : {}),
    },
  ],
});
const StyledThInnerCont = createComponent(thInnerContStyle, 'div', [ 'onClick', ]);

const tdFootInnerContStyle = ({
  hasBorderBottom = false,
  hasBorderEnd = false,
  hasBorderStart = false,
  isHighlighted = false,
  theme,
}) => ({
  color: theme.color('offerPage', isHighlighted ? 'tableFooterTextHighlighted' : 'tableFooterText'),
  cursor: 'pointer',
  fontWeight: 'bold',
  paddingTop: '4rem',
  ...(isHighlighted
    ? { backgroundColor: theme.color('offerPage', 'bgHighlighted'), }
    : {}),
  extend: [
    theme.type(-2),
    {
      ...(hasBorderBottom
        ? {
          ...borderBottom(
            theme.tableStyle.borderWidth,
            isHighlighted ? 7.5 : 4,
            theme.tableStyle.borderStyle,
            theme.color('offerPage', 'borderHighlighted')
          ),
        }
        : {}),
    },
    {
      ...(hasBorderStart
        ? {
          ...borderStart(
            theme.tableStyle.borderWidth,
            theme.tableStyle.borderStyle,
            theme.color('offerPage', 'borderHighlighted')
          ),
          marginInlineStart: '-1px',
        }
        : {}),
    },
    {
      ...(hasBorderEnd
        ? {
          ...borderEnd(
            theme.tableStyle.borderWidth,
            theme.tableStyle.borderStyle,
            theme.color('offerPage', 'borderHighlighted')
          ),
        }
        : {}),
    },
  ],
});
const StyledTdFootInnerCont = createComponent(tdFootInnerContStyle, 'div', [
  'onClick',
]);

const tdInnerContStyle = ({
  isDescription = false,
  isHighlighted = false,
  theme,
}) => ({
  height: '100%',
  display: 'flex',
  cursor: 'pointer',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color('offerPage', 'bg'),
  opacity: 1,
  paddingTop: '1.5rem',
  ...(isDescription
    ? {
      alignItems: 'flex-end',
      paddingInlineEnd: '2.5rem',
      textAlign: 'inline-end',
    }
    : {}),
  ...(isHighlighted
    ? { backgroundColor: theme.color('offerPage', 'bgHighlighted'), }
    : {}),
  extend: [
    theme.type(-1),
    borderBottom(
      theme.tableStyle.borderWidth,
      1.5,
      theme.tableStyle.borderStyle,
      theme.color('offerPage', 'border')
    ),
    borderEnd(
      theme.tableStyle.borderWidth,
      theme.tableStyle.borderStyle,
      theme.color('offerPage', 'borderHighlighted')
    ),
  ],
});
const StyledTdInnerCont = createComponent(tdInnerContStyle, 'div', [ 'onClick', ]);

const pricingHeadStyle = (isHighlighted = false) => theme => ({
  color: theme.color('offerPage', isHighlighted ? 'pricingHeadTextHighlighted' : 'pricingHeadText'),
  marginTop: '1rem',
  extend: [ theme.type(-1), ],
});
// const StyledPricingHead = createComponent(pricingHeadStyle, H);

const colHeadStyle = ({ theme, }) => ({
  marginTop: '2rem',
  extend: [ theme.type(2), ],
});
const StyledColHead = createComponent(colHeadStyle, H);

function buildThead(dynamicData, staticTheadData) {
  return dynamicData.map(col => ({
    subscriptionName: col.subscriptionName,
    ...staticTheadData[col.subscriptionName],
    pricingHead: col.pricingHead,
  }));
}

function buildTbody(dynamicData, staticTbodyData, cols) {
  const pricingRows = [
    dynamicData.some(row => !!row.pricingYearly)
      ? [
        staticTbodyData.pricingYearlyText,
        dynamicData[0].pricingYearly,
        ...(dynamicData[1] ? [ dynamicData[1].pricingYearly, ] : []),
        ...(dynamicData[2] ? [ dynamicData[2].pricingYearly, ] : []),
      ]
      : [],
    dynamicData.some(row => !!row.pricingMonthly)
      ? [
        staticTbodyData.pricingMonthlyText,
        dynamicData[0].pricingMonthly,
        ...(dynamicData[1] ? [ dynamicData[1].pricingMonthly, ] : []),
        ...(dynamicData[2] ? [ dynamicData[2].pricingMonthly, ] : []),
      ]
      : [],
  ];
  const processedStaticTbody = staticTbodyData.list.map(row => [
    row.description,
    row[cols.col1],
    ...(cols.col2 ? [ row[cols.col2], ] : []),
    ...(cols.col3 ? [ row[cols.col3], ] : []),
  ]);
  return [ ...processedStaticTbody, ...pricingRows, ];
}

function DesktopView({
  continueToNextStage,
  tableData,
  sale,
  staticTableData,
  pathName,
}) {
  const cols = {
    col1: tableData[0].subscriptionName,
    ...(tableData[1] ? { col2: tableData[1].subscriptionName, } : {}),
    ...(tableData[2] ? { col3: tableData[2].subscriptionName, } : {}),
  };

  const tHeadData = buildThead(tableData, staticTableData.thead);

  const highlightedIndex = tHeadData
    .map(col => col.subscriptionName)
    .indexOf('BOTH');

  const tBodyData = buildTbody(tableData, staticTableData.tbody, cols);
  return (
    <ApolloConsumer>
      {cache => (
        <FelaComponent
          style={{
            maxWidth: '190rem',
            marginInlineStart: 'auto',
            marginInlineEnd: 'auto',
          }}
        >
          <StyledTable>
            <StyledThead>
              <Grid
                tagName="div"
                gutter={0}
                align="center"
                vAlign="bottom"
                miscStyles={{ backgroundColor: 'transparent', }}
              >
                <GridItem width={1 / 4} tagName="div">
                  <StyledThInnerCont />
                </GridItem>
                {tHeadData.map((item, idx) => (
                  <GridItem
                    width={1 / 4}
                    tagName="div"
                    key={item.heading}
                  >
                    <EventTracker>
                      {({ biAction, gaAction, }) => (
                        <StyledThInnerCont
                          hasBorderTop
                          hasBorderStart
                          hasBorderEnd
                          isHighlighted={idx === highlightedIndex}
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
                                    : 'themsarker',
                            });
                            ReactGA.ga('ec:addProduct', {
                              id: item.subscriptionName,
                              name: tableData[idx].productTitle,
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
                          <Phones
                            {...(sale ? { sale, } : {})}
                            subscription={item.subscriptionName}
                            size={7}
                          />
                          <StyledColHead>{item.heading}</StyledColHead>

                          <FelaComponent style={pricingHeadStyle(idx === highlightedIndex)} render="p">
                            {item.pricingHead}
                          </FelaComponent>

                          <Button
                            href={pathName}
                            // asPath={asPath}
                            variant="salesOpaque"
                            boxModel={{ vp: 1, hp: 5, }}
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
                            {item.btnText}
                          </Button>
                        </StyledThInnerCont>
                      )}
                    </EventTracker>
                  </GridItem>
                ))}
              </Grid>
            </StyledThead>
            <StyledTBody>
              {tBodyData.map((row, rowNum) => (
                <Grid
                  tagName="div"
                  gutter={0}
                  align="center"
                  vAlign="stretch"
                  key={Math.random()}
                >
                  {row.map((cellData, idx) => (
                    <GridItem
                      width={1 / 4}
                      tagName="div"
                      key={Math.random()}
                    >
                      <StyledTdInnerCont
                        isHighlighted={highlightedIndex + 1 === idx}
                        isDescription={idx === 0}
                        onClick={() => {
                          continueToNextStage({
                            cache,
                            idx: idx - 1,
                            routerPush: true,
                          });
                        }}
                      >
                        {typeof cellData === 'string' ? (
                          cellData
                        ) : Array.isArray(cellData) ? (
                          cellData.map((line, jdx) => (
                            <FelaComponent
                              style={{
                                ...(jdx === 0 && rowNum === tBodyData.length - 2
                                  ? { fontWeight: 'bold', }
                                  : {}),
                              }}
                              key={Math.random()}
                            >
                              {line}
                            </FelaComponent>
                          ))
                        ) : cellData ? (
                          <React.Fragment>
                            <AriaDescription id={`Description${idx + rowNum}`}>
                              כלול ב-
                              {tHeadData[idx - 1].heading}
                            </AriaDescription>
                            <PositiveCircle />
                          </React.Fragment>
                        ) : (
                          <AriaDescription id={`Description${idx + rowNum}`}>
                              לא כלול ב
                            {tHeadData[idx - 1].heading}
                          </AriaDescription>
                        )}
                      </StyledTdInnerCont>
                    </GridItem>
                  ))}
                </Grid>
              ))}
            </StyledTBody>
            <StyledTFoot>
              <Grid tagName="div" gutter={0} align="center" vAlign="top">
                <GridItem width={1 / 4} tagName="div">
                  <StyledTdFootInnerCont />
                </GridItem>
                {tHeadData.map((item, idx) => (
                  <GridItem width={1 / 4} tagName="div" key={Math.random()}>
                    <StyledTdFootInnerCont
                      hasBorderBottom
                      hasBorderStart
                      hasBorderEnd
                      isHighlighted={highlightedIndex === idx}
                      onClick={() => {
                        continueToNextStage({ cache, idx, routerPush: true, });
                      }}
                    >
                      {staticTableData.tfoot}
                    </StyledTdFootInnerCont>
                  </GridItem>
                ))}
              </Grid>
            </StyledTFoot>
          </StyledTable>
        </FelaComponent>
      )}
    </ApolloConsumer>
  );
}

DesktopView.propTypes = propTypes;

DesktopView.defaultProps = defaultProps;

export default DesktopView;
