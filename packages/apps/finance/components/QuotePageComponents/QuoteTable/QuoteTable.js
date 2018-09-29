// @flow
import React from 'react';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { StatelessFunctionalComponent, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import { Query, } from '../../ApolloBoundary/ApolloBoundary';
import { TdComponent, } from '../../StockTable/StockTable';

type Field = {
  name: string,
  display: string,
};

type Props = {
  id: string,
  fields: Array<Field>,
  tradingStatus?: boolean,
  fixed?: boolean,
  miscStyles?: Object,
};

type TrComponentProps = {
  title: string,
  value: string | number,
  miscStyles?: Object,
};

const TradeStatsQuery: (Array<Field>, boolean) => DocumentNode = (fields, tradingStatus) => gql`
  query TradeStatsTable($assetsId: [String]){
    financeTable(assetsId: $assetsId){
      assets {
        ${tradingStatus ? 'tradingStatus\n' : ''}
        ${fields.map(field => `${field.name}\n`)}
      }
    }
  }
`;
const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

const TrComponent: StatelessFunctionalComponent<TrComponentProps> =
  // eslint-disable-next-line react/prop-types
  ({ miscStyles, title, value, }) => (
    <FelaComponent
      style={theme => ({
        backgroundColor: theme.color('neutral', '-10'),
        extend: [
          borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render="tr"
    >
      <TdComponent
        miscStyles={{
          paddingStart: '2rem',
          fontWeight: '700',
          width: '50%',
        }}
      >
        {title}
      </TdComponent>
      <TdComponent
        miscStyles={{
          paddingStart: '2rem',
          direction: 'ltr',
          textAlign: 'start',
        }}
      >
        {typeof value === 'number' ? numToString(value) : value}
      </TdComponent>
    </FelaComponent>
  );

const QuoteTable: StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ id, fields, tradingStatus = false, fixed = false, miscStyles, }) => (
    <Query
      query={TradeStatsQuery(fields, tradingStatus)}
      variables={{ assetsId: [ id, ], }}
    >
      {({ error, loading, data: { financeTable: { assets, }, }, }) => {
        if (error) return null;
        if (loading) return null;
        return (
          <FelaComponent
            style={(theme: Object) => ({
              ...theme.type(-2),
              ...(fixed ? { tableLayout: 'fixed', } : {}),
              whiteSpace: 'nowrap',
              width: '100%',
              extend: [
                ...(miscStyles
                  ? parseStyleProps(miscStyles, theme.mq, theme.type)
                  : []),
              ],
            })}
            render="table"
          >
            {
              tradingStatus ?
                <FelaComponent
                  style={theme => ({
                    color: theme.color('neutral', '-3'),
                    marginBottom: '1rem',
                    marginTop: '1rem',
                    textAlign: 'start',
                  })}
                  render="caption"
                >
                  <FelaComponent
                    render="span"
                    style={{
                      ':after': {
                        content: '": "',
                      },
                    }}
                  >
                    שלב מסחר
                  </FelaComponent>
                  {assets[0].tradingStatus}
                </FelaComponent>
                : null
            }

            <tbody>
              {fields.map(field => (
                <TrComponent title={field.display} value={assets[0][field.name]} />
              ))}
            </tbody>
          </FelaComponent>
        );
      }}
    </Query>
  );
export default QuoteTable;
