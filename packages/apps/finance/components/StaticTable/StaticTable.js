// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';

import { TdComponent, } from '../AssetsTable/AssetsTable';

type Column = {
  name: string, // eslint-disable-line react/no-unused-prop-types
  title: string, // eslint-disable-line react/no-unused-prop-types
  styles?: Object, // eslint-disable-line react/no-unused-prop-types
  render: any => string, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  data: Array<any>,
  columns: Array<Column>,
  miscStyles?: ?Object,
};

const StaticTable = ({ data, columns, miscStyles, }: Props): Node => (
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
    render="table"
  >
    <thead>
      <tr>
        {columns.map(({ title, name, }: Column) => (
          <TdComponent
            key={name}
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
          key={asset[Object.keys(asset)[0]]}
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
              key={`${name}-${asset[Object.keys(asset)[0]]}`}
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

StaticTable.defaultProps = { miscStyles: null, };
export default StaticTable;
