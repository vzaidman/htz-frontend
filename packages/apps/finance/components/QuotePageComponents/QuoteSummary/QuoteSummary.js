// @flow
import React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import { Grid, GridItem, } from '@haaretz/htz-components';
import type { StatelessFunctionalComponent, } from 'react';

import { Stat, } from '../../StockStats/StockStats';


type Props = {
  value: number,
  changePercentage: number,
  changeInCurr: number,
  assetType: string,
  assetNumber: number,
  lastTradeTime: number,
};

type PaperItemProps = {
  value: number | string,
  title: string,
};

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

const PaperItem: StatelessFunctionalComponent<PaperItemProps> =
  // eslint-disable-next-line react/prop-types
  ({ title, value, }) => (
    <FelaComponent
      render="p"
      style={theme => ({
        alignItems: 'center',
        backgroundColor: theme.color('neutral', '-10'),
        display: 'flex',
        flexBasis: '100%',
        flexGrow: '1',
        flexShrink: '1',
        paddingStart: '3.5rem',
        ':not(:last-child)': {
          marginBottom: '0.5rem',
        },
      })}
    >
      <FelaComponent
        render="span"
        style={{
          marginEnd: '1rem',
          ':after': {
            content: '":"',
          },
        }}
      >
        {title}
      </FelaComponent>
      <FelaComponent
        render="span"
        style={{
          fontWeight: '700',
        }}
      >
        {value}
      </FelaComponent>
    </FelaComponent>
  );

const QuoteSummary: StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ value, changePercentage, changeInCurr, assetType, assetNumber, lastTradeTime, }) => (
    <FelaTheme
      render={theme => (
        <Grid
          gutter={2}
          miscStyles={{
            paddingStart: '0rem',
          }}
        >
          <GridItem
            width={2 / 3}
            miscStyles={{
              color: theme.color('neutral', '-3'),
              display: 'flex',
              flexDirection: 'column',
              flexGrow: '2',
            }}
          >
            <FelaComponent
              style={{
                backgroundColor: theme.color('neutral', '-10'),
                display: 'flex',
                height: '9rem',
                paddingBottom: '1rem',
                paddingTop: '1rem',
                marginBottom: '2px',
                ...theme.type(-2),
              }}
            >
              <Stat
                title="שער"
                miscStyles={{
                  color: theme.color('neutral', '-1'),
                  ...theme.type(2),
                }}
              >
                {className => <span className={className}>{numToString(value)}</span>}
              </Stat>
              <Stat
                title="% שינוי"
                miscStyles={{
                  color: Number(changePercentage) < 0 ? 'red' : 'green',
                  ...theme.type(2),
                  direction: 'ltr',
                  ':before': {
                    content: Number(changePercentage) > 0 ? '"+"' : '""',
                  },
                  ':after': {
                    content: '"%"',
                  },
                }}
              >
                {className => <span className={className}>{numToString(changePercentage)}</span>}
              </Stat>
              <Stat
                title="שינוי באג'"
                miscStyles={{
                  color: Number(changeInCurr) < 0 ? 'red' : 'green',
                  ...theme.type(2),
                  direction: 'ltr',
                  ':before': {
                    content: Number(changeInCurr) > 0 ? '"+"' : '""',
                  },
                }}
              >
                {className => <span className={className}>{numToString(changeInCurr)}</span>}
              </Stat>
            </FelaComponent>
            <FelaComponent
              style={{
                backgroundColor: theme.color('neutral', '-10'),
                textAlign: 'center',
                ...theme.type(-2),
              }}
            >
              <FelaComponent
                render="span"
                style={{
                  fontWeight: '700',
                  marginEnd: '1rem',
                  ':after': {
                    content: '":"',
                  },
                }}
              >
                נכון ל
              </FelaComponent>
              <span>
                {
                  new Date(lastTradeTime).toLocaleString('he', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }
              </span>
            </FelaComponent>
          </GridItem>
          <GridItem
            width={1 / 3}
            miscStyles={{
              color: theme.color('neutral', '-1'),
              display: 'flex',
              flexDirection: 'column',
              flexGrow: '1',
              ...theme.type(-2),
            }}
          >
            <PaperItem title="סוג נייר" value={assetType} />
            <PaperItem title="מספר נייר" value={assetNumber} />
          </GridItem>
        </Grid>
      )}
    />
  );

export default QuoteSummary;
