// @flow
import React from 'react';
import type { StatelessFunctionalComponent, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { H, } from '@haaretz/htz-components';
import SectionLink from '../SectionLink/SectionLink';
import getMarketData from '../dummyData/marketSummary';

type MarketData = {
  name: string,
  points: string,
  change: string,
  indexId: string,
  section: string,
}

type Props = {
  marketId: string,
  miscStyles? : Object,
};

const Item: StatelessFunctionalComponent<any> = ({ children, title, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      alignItems: 'center',
      display: 'flex',
      flexBasis: '100%',
      flexDirection: 'column',
      flexGrow: '1',
      flexShrink: '1',
      justifyContent: 'center',
      position: 'relative',
      ':not(:last-child)': {
        ':after': {
          backgroundColor: theme.color('neutral', '-4'),
          content: '""',
          end: '0',
          height: '80%',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
        },
      },
    })}
  >
    <FelaComponent
      style={theme => ({
      fontWeight: '700',
        ...theme.type(-1),
      })}
      render="span"
    >
      {title}
    </FelaComponent>
    <FelaComponent
      style={theme => ({
        flexGrow: '1',
        ...theme.type(2),
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({ className, }) => children(className)}
    />
  </FelaComponent>
);


const MarketSummary:StatelessFunctionalComponent<Props> = ({ marketId, miscStyles, }) => {
  const { name, indexId, section, points, change, }: MarketData = getMarketData(marketId);
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            extend: [
              ...(miscStyles
                ? parseStyleProps(miscStyles, theme.mq, theme.type)
                : []),
            ],
          }}
        >
          <FelaComponent
            style={{
              backgroundColor: theme.color('neutral', '-10'),
              marginBottom: '1px',
              paddingTop: '1rem',
              textAlign: 'center',
            }}
          >
            <FelaComponent
              style={{
                ...theme.type(1),
                marginBottom: '1rem',
              }}
              render={({ className, }) => (
                <H
                  className={className}
                >
                  {name}
                </H>
              )}
            />
            <FelaComponent
              style={{
                display: 'flex',
              }}
            >
              <Item
                title="שער"
              >
                {className => (
                  <span className={className}>
                    {points}
                  </span>
                )}
              </Item>
              <Item
                title="% שינוי"
                miscStyles={{
                  color: Number(change) < 0 ? 'red' : 'green',
                  direction: 'ltr',
                  ':before': {
                    content: Number(change) > 0 ? '"+"' : Number(change) < 0 ? '"-"' : '""',
                  },
                  ':after': {
                    content: '"%"',
                  },
                }}
              >
                {className => (
                  <span className={className}>
                    {Math.abs(Number(change))}
                  </span>
                )}
              </Item>
            </FelaComponent>
          </FelaComponent>
          <SectionLink
            href={{
              pathname: `/${section || ''}`,
              query: {
                id: indexId,
              },
            }}
            as={`/${section || ''}/${name || ''}`}
            miscStyles={{
              backgroundColor: theme.color('neutral', '-10'),
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            <span>לבורסת {name}</span>
          </SectionLink>
        </FelaComponent>
      )}
    />
  );
};

export default MarketSummary;
