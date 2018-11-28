// @flow
import React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import { Grid, GridItem, } from '@haaretz/htz-components';
import type { StatelessFunctionalComponent, } from 'react';

import { Stat, } from '../../AssetStats/AssetStats';

type AssetData = {
  title: string,
  value: string | number,
  decimal?: number,
  percentage?: boolean,
}

type Props = {
  valueData: Array<AssetData>,
  date: AssetData,
  assetInfo: Array<AssetData>,
};

type PaperItemProps = {
  value: number | string,
  title: string,
};

const numToString: (number, number) => string = (num, decimal) => (
  num.toLocaleString('he', { minimumFractionDigits: decimal, maximumFractionDigits: decimal, })
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
  ({ valueData, date, assetInfo, }) => (
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
              {
                valueData.map(({ title, value, decimal = 2, percentage, }: AssetData) => (
                  <Stat
                    key={title}
                    title={title}
                    miscStyles={{
                      color: typeof value === 'number'
                        ? Number(value) < 0
                          ? theme.color('negative')
                          : theme.color('positive')
                        : theme.color('neutral', '-1'),
                      ...theme.type(2),
                      ...(percentage
                        ? {
                            ':before': {
                              content: '"% "',
                            },
                          }
                        : {}
                      ),
                    }}
                  >
                    {className => (
                      <span className={className}>
                        {!isNaN(value) // eslint-disable-line no-restricted-globals
                          ? numToString(Number(value), decimal)
                          : value
                        }
                      </span>
                    )}
                  </Stat>
                ))
              }
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
                }}
              >
                {date.title}
              </FelaComponent>
              <span>
                {
                  new Date(date.value).toLocaleString('he', {
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
            {
              assetInfo.map(({ title, value, }: AssetData) => (
                <PaperItem
                  key={title}
                  title={title}
                  value={value}
                />
              ))
            }
          </GridItem>
        </Grid>
      )}
    />
  );

export default QuoteSummary;
