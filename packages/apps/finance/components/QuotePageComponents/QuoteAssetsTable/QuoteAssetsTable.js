// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { Asset, } from '../../../types/asset';

import { TdComponent, } from '../../AssetsTable/AssetsTable';
import { TableLink, } from '../../SortableTable/SortableTable';

type Field = {
  display: string,
  value: string,
  miscStyles?: StyleProps,
  colorizedChange?: boolean,
};

type Props = {
  assets: Array<Asset>,
  fields: Array<Field>,
  miscStyles?: ?StyleProps,
};

const numToString: (number | string) => string = value => (typeof value === 'number'
  ? value.toLocaleString('he', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  : value);

const QuoteAssetsTable = ({ assets, fields, miscStyles, }: Props): Node => (
  <FelaComponent
    style={(theme: Object) => ({
      ...theme.type(-2),
      tableLayout: 'fixed',
      whiteSpace: 'nowrap',
      width: '100%',
      extend: [
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
    render={({ className, theme, }) => (
      <table className={className}>
        <thead>
          <tr>
            {fields.map((field: Field) => (
              <TdComponent
                key={field.value}
                miscStyles={{
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  paddingStart: '2rem',
                }}
              >
                {field.display}
              </TdComponent>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map((asset: Asset) => (
            <FelaComponent
              key={asset.id}
              style={{
                backgroundColor: theme.color('neutral', '-10'),
                extend: [
                  borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
                  ...(miscStyles
                    ? parseStyleProps(miscStyles, theme.mq, theme.type)
                    : []),
                ],
              }}
              render="tr"
            >
              {fields.map((field: Field, index: number) => {
                const isNumber: boolean = typeof asset[field.value] === 'number';
                return (
                  <TdComponent
                    key={`${field.value}-${asset.id}`}
                    miscStyles={{
                      paddingStart: '2rem',
                      direction: 'ltr',
                      textAlign: 'start',
                      ...(field.colorizedChange && isNumber
                        ? {
                          color:
                              Number(asset[field.value]) < 0
                                ? theme.color('negative')
                                : theme.color('positive'),
                        }
                        : {}),
                      ...(field.miscStyles || {}),
                    }}
                  >
                    <TableLink
                      allowTab={index === 0}
                      assetId={asset.id}
                      type={asset.type}
                      content={
                        isNumber
                          ? numToString(asset[field.value])
                          : asset[field.value]
                      }
                    />
                  </TdComponent>
                );
              })}
            </FelaComponent>
          ))}
        </tbody>
      </table>
    )}
  />
);

QuoteAssetsTable.defaultProps = { miscStyles: null, };
export default QuoteAssetsTable;
