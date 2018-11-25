// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { StatelessFunctionalComponent, } from 'react';

import { TdComponent, } from '../AssetsTable/AssetsTable';

type Column = {
  name: string,
  title: string,
  styles?: Object,
  render: any => string,
}

type Props = {
  data: Array<any>,
  columns: Array<Column>,
  miscStyles?: Object,
};

const StaticTable: StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ data, columns, miscStyles, }) => (
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
          {columns.map(({ title, }: Column) => (
            <TdComponent
              miscStyles={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
                paddingStart: '2rem',
              }}
            >
              {title}
            </TdComponent>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(asset => (
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
            {columns.map(({ name, styles, render, }: Column) => (
              <TdComponent
                miscStyles={styles}
              >
                {render(asset[name])}
              </TdComponent>
            ))}
          </FelaComponent>
        ))}
      </tbody>
    </FelaComponent>

  );
export default StaticTable;
