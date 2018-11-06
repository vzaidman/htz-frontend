// @flow
import React from 'react';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { Query, } from '@haaretz/htz-components';

import type { StatelessFunctionalComponent, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import { TdComponent, } from '../../AssetsTable/AssetsTable';

type Field = {
  name: string,
  display: string,
  type?: string,
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
  type?: string,
  miscStyles?: Object,
};

const TradeStatsQuery: (Array<Field>, boolean) => DocumentNode = (
  fields,
  tradingStatus
) => gql`
  query TradeStatsTable($assetsId: [String]){
    assetsList(assetsId: $assetsId){
      ${tradingStatus ? 'tradingStatus\n' : ''}
      ${fields.map(field => `${field.name}\n`)}
    }
  }
`;
const numToString: number => string = num =>
  num.toLocaleString('he', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const TrComponent: StatelessFunctionalComponent<TrComponentProps> =
  // eslint-disable-next-line react/prop-types
  ({ miscStyles, title, value, type, }) => (
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
        {type && type === 'date'
          ? new Date(value).toLocaleString('it-It', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          : typeof value === 'number'
            ? numToString(value)
            : value}
      </TdComponent>
    </FelaComponent>
  );

const QuoteInfoTable: StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ id, fields, tradingStatus = false, fixed = false, miscStyles, }) => (
    <Query
      query={TradeStatsQuery(fields, tradingStatus)}
      variables={{ assetsId: [ id, ], }}
    >
      {({ error, loading, data: { assetsList: assets, }, }) => {
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
            {tradingStatus ? (
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
            ) : null}

            <tbody>
              {fields.map(field => (
                <TrComponent
                  title={field.display}
                  value={assets[0][field.name]}
                  type={field.type}
                />
              ))}
            </tbody>
          </FelaComponent>
        );
      }}
    </Query>
  );
export default QuoteInfoTable;
