import React from 'react';

import type { StatelessFunctionalComponent, } from 'react';

import StaticTable from '../../StaticTable/StaticTable';

type Props = {
  data: Object,
};

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

const ShareHolders: StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ data, }) => (
    <StaticTable
      data={data}
      columns={[
        {
          name: 'shareHolderName',
          title: 'שם',
          styles: {
            paddingStart: '2rem',
            fontWeight: '700',
            width: '50%',
          },
          render: value => value,
        },
        {
          name: 'equityHolderPercentage',
          title: '% החזקה בהון',
          styles: {
            paddingStart: '2rem',
            direction: 'ltr',
            textAlign: 'start',
          },
          render: value => `${numToString(value)}%`,
        },
        {
          name: 'holdingMarketCap',
          title: 'שווי שוק',
          styles: {
            paddingStart: '2rem',
            direction: 'ltr',
            textAlign: 'start',
          },
          render: value => numToString(value),
        },
      ]}
    />
  );

export default ShareHolders;
