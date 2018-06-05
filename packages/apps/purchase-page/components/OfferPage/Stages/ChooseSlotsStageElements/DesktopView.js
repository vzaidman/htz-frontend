import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import {
  borderBottom,
  borderEnd,
  borderStart,
  borderTop,
} from '@haaretz/htz-css-tools';

import { Button, Grid, GridItem, BIAction, } from '@haaretz/htz-components';
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
  asPath: PropTypes.string.isRequired,
};

const defaultProps = {};

const tableStyle = ({ theme, }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '8.5rem',

  extend: [ theme.mq({ until: 'l', }, { display: 'none', }), ],
});

const StyledTable = createComponent(tableStyle, 'table');

const theadStyle = () => ({
  display: 'table',
  width: '100%',
  textAlign: 'center',
  top: 0,
});

const StyledThead = createComponent(theadStyle, 'thead');

const tFootStyle = () => ({
  display: 'table',
  width: '100%',
});

const StyledTFoot = createComponent(tFootStyle, 'tfoot');

const tBodyStyle = () => ({
  display: 'table',
  width: '100%',
});
const StyledTBody = createComponent(tBodyStyle, 'tbody');

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
  color: theme.color('offerPage', 'tableFooterText'),
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
  isBold = false,
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
  ...(isBold ? { fontWeight: 'bold', } : {}),
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

const pricingHeadStyle = ({ theme, }) => ({
  color: theme.color('offerPage', 'pricingHeadText'),
  marginTop: '1rem',
  extend: [ theme.type(-1), ],
});
const StyledPricingHead = createComponent(pricingHeadStyle, 'h5');

const colHeadStyle = ({ theme, }) => ({
  marginTop: '2rem',
  extend: [ theme.type(2), ],
});
const StyledColHead = createComponent(colHeadStyle, 'h2');

function buildThead(dynamicData, staticTheadData) {
  return dynamicData.map(col => ({
    subscriptionName: col.subscriptionName,
    ...staticTheadData[col.subscriptionName],
    pricingHead: col.pricingHead,
  }));
}

function buildTbody(dynamicData, staticTbodyData, cols) {
  const pricingRows = [
    dynamicData[0].pricingMonthly
      ? [
        staticTbodyData.pricingMonthlyText,
        dynamicData[0].pricingMonthly,
        ...(dynamicData[1] ? [ dynamicData[1].pricingMonthly, ] : []),
        ...(dynamicData[2] ? [ dynamicData[2].pricingMonthly, ] : []),
      ]
      : [],
    dynamicData[0].pricingYearly
      ? [
        staticTbodyData.pricingYearlyText,
        dynamicData[0].pricingYearly,
        ...(dynamicData[1] ? [ dynamicData[1].pricingYearly, ] : []),
        ...(dynamicData[2] ? [ dynamicData[2].pricingYearly, ] : []),
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
  staticTableData,
  pathName,
  asPath,
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
                tagName="tr"
                gutter={0}
                align="center"
                vAlign="bottom"
                miscStyles={{ backgroundColor: 'transparent', }}
              >
                <GridItem width={1 / 4} tagName="th">
                  <StyledThInnerCont />
                </GridItem>
                {tHeadData.map((item, idx) => (
                  <GridItem width={1 / 4} tagName="th" key={item.heading}>
                    <BIAction>
                      {action => (
                        <StyledThInnerCont
                          hasBorderTop
                          hasBorderStart
                          hasBorderEnd
                          isHighlighted={idx === highlightedIndex}
                          onClick={() => {
                            action({
                              actionCode: 105,
                              additionalInfo: {
                                productId:
                                  tableData[idx].subscriptionName === 'HTZ'
                                    ? '243'
                                    : '273',
                                stage: 'slot',
                              },
                            });
                            continueToNextStage({
                              cache,
                              idx,
                              routerPush: true,
                            });
                          }}
                        >
                          <Phones
                            subscription={item.subscriptionName}
                            size={7}
                          />
                          <StyledColHead>{item.heading}</StyledColHead>
                          <StyledPricingHead>
                            {item.pricingHead}
                          </StyledPricingHead>

                          <Button
                            href={pathName}
                            // asPath={asPath}
                            variant="salesOpaque"
                            boxModel={{ vp: 1, hp: 5, }}
                            miscStyles={{ marginTop: '3rem', }}
                            onClick={() => {
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
                    </BIAction>
                  </GridItem>
                ))}
              </Grid>
            </StyledThead>
            <StyledTBody>
              {tBodyData.map((row, rowNum) => (
                <Grid
                  tagName="tr"
                  gutter={0}
                  align="center"
                  vAlign="stretch"
                  key={Math.random()}
                >
                  {row.map((cellData, idx) => (
                    <GridItem width={1 / 4} tagName="td" key={Math.random()}>
                      <StyledTdInnerCont
                        isHighlighted={highlightedIndex + 1 === idx}
                        isDescription={idx === 0}
                        isBold={rowNum === tBodyData.length - 2 && idx !== 0}
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
                          cellData.map(line => (
                            <div key={Math.random()}>{line}</div>
                          ))
                        ) : cellData ? (
                          <PositiveCircle />
                        ) : (
                          ''
                        )}
                      </StyledTdInnerCont>
                    </GridItem>
                  ))}
                </Grid>
              ))}
            </StyledTBody>
            <StyledTFoot>
              <Grid tagName="tr" gutter={0} align="center" vAlign="top">
                <GridItem width={1 / 4} tagName="td">
                  <StyledTdFootInnerCont />
                </GridItem>
                {tHeadData.map((item, idx) => (
                  <GridItem width={1 / 4} tagName="td" key={Math.random()}>
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
