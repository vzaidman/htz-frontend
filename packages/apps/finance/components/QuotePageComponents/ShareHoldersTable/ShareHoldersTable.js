// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { StatelessFunctionalComponent, } from 'react';

import { TdComponent, } from '../../AssetsTable/AssetsTable';

type shareHolder = {
  shareHolderName: string,
  equityHolderPercentage: number,
  holdingMarketCap: number,
};

type Props = {
  shareHolders: Array<shareHolder>,
  miscStyles?: Object,
};

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

const ShareHoldersTable: StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ shareHolders, miscStyles, }) => (
    <FelaComponent
      style={(theme: Object) => ({
        ...theme.type(-2),
        tableLayout: 'fixed',
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
      <thead>
        <tr>
          <TdComponent
            miscStyles={{
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingStart: '2rem',
            }}
          >
            שם
          </TdComponent>
          <TdComponent
            miscStyles={{
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingStart: '2rem',
            }}
          >
            % החזקה בהון
          </TdComponent>
          <TdComponent
            miscStyles={{
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingStart: '2rem',
            }}
          >
            שווי שוק
          </TdComponent>
        </tr>
      </thead>
      <tbody>
        {shareHolders.map(
          ({ shareHolderName, equityHolderPercentage, holdingMarketCap, }: shareHolder) => (
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
                {shareHolderName}
              </TdComponent>
              <TdComponent
                miscStyles={{
                  paddingStart: '2rem',
                  direction: 'ltr',
                  textAlign: 'start',
                }}
              >
                {numToString(equityHolderPercentage)}%
              </TdComponent>
              <TdComponent
                miscStyles={{
                  paddingStart: '2rem',
                  direction: 'ltr',
                  textAlign: 'start',
                }}
              >
                {numToString(holdingMarketCap)}
              </TdComponent>
            </FelaComponent>
          )
        )}
      </tbody>
    </FelaComponent>

  );
export default ShareHoldersTable;
