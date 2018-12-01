// @flow
import React, { Fragment, } from 'react';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { Query, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, } from '../../../types/asset';

import { TdComponent, } from '../../AssetsTable/AssetsTable';

type Field = {
  name: string, // eslint-disable-line react/no-unused-prop-types
  display?: string, // eslint-disable-line react/no-unused-prop-types
  fields?: Array<Field>,
  type?: string, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  id: string,
  fields: Array<Field>,
  tradingStatus: boolean,
  fixed: boolean,
  miscStyles: ?Object,
};

type TrComponentProps = {
  title: string,
  value: string | number,
  type?: string,
  miscStyles?: ?Object,
};

type DisplayBodyProps = {
  fields: Array<Field>,
  assets: Array<Asset>,
};

const getFields: (Array<Field>) => string = fields => fields
  .map(
    ({ name, display, type, fields, }: Field) => (fields ? `${name}\n { ${getFields(fields)} }` : `${name}\n`)
  )
  .join('\n');

const DisplayBody = ({ fields, assets, }: DisplayBodyProps): Node => (
  <Fragment>
    {fields.map(
      ({ display, name, type, fields, }: Field) => (fields ? (
        <DisplayBody fields={fields} assets={assets[0][name]} />
      ) : (
        <TrComponent
          key={name}
          title={display || ''}
          value={assets[0][name]}
          type={type}
        />
      ))
    )}
  </Fragment>
);

const TradeStatsQuery = (
  fields: Array<Field>,
  tradingStatus: boolean
): DocumentNode => gql`
  query TradeStatsTable($assetsId: [String]){
    assetsList(assetsId: $assetsId){
      ${tradingStatus ? 'tradingStatus\n' : ''}
      ${getFields(fields)}
    }
  }
`;
const numToString: number => string = num => num.toLocaleString('he', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const TrComponent = ({
  miscStyles,
  title,
  value,
  type,
}: TrComponentProps): Node => (
  <FelaComponent
    style={theme => ({
      backgroundColor: theme.color('neutral', '-10'),
      extend: [
        borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
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

TrComponent.defaultProps = {
  type: null,
  miscStyles: null,
};

const QuoteInfoTable = ({
  id,
  fields,
  tradingStatus,
  fixed,
  miscStyles,
}: Props): Node => (
  <Query
    query={TradeStatsQuery(fields, tradingStatus)}
    variables={{ assetsId: [ id, ], }}
  >
    {({ error, loading, data: { assetsList, }, }) => {
      if (error) return null;
      if (loading) return null;
      const assets: Array<Asset> = assetsList;
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
            <DisplayBody fields={fields} assets={assets} />
          </tbody>
        </FelaComponent>
      );
    }}
  </Query>
);

QuoteInfoTable.defaultProps = {
  tradingStatus: false,
  fixed: false,
  miscStyles: null,
};
export default QuoteInfoTable;
