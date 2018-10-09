// @flow
import React from 'react';
import { Button, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import RowItem from '../../components/RowItem/RowItem';
import TableGraphConnector from '../../components/TableGraphConnector/TableGraphConnector';
import PageRow from '../../components/PageRow/PageRow';

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
  },
};

function exchange({ url: { query: { section, }, }, }: Props): Node {
  const crypto: boolean = section === 'crypto';
  return (
    <MainLayout section={section}>
      <PageRow
        miscStyles={{ position: 'relative', }}
      >
        <RowItem
          title={crypto ? 'מטבעות עיקריים' : 'שערים עיקריים'}
        >
          <TableGraphConnector
            assetsId={[ '2', '142', '137', '-2000', '164', '143', '167', '145', '149', ]}
            isExchange
          />
        </RowItem>
        {
          crypto ?
            <Button
              fontSize={-2}
              isFlat
              variant="salesOpaque"
              boxModel={{ hp: 2, vp: 0.5, }}
              miscStyles={{
                borderRadius: '4px',
                position: 'absolute',
                top: '0',
                end: '0',
              }}
              href="https://www.google.com"
            >
              קנו/מכרו ביטקוין
            </Button>
          : null
        }
      </PageRow>
      <PageRow>
        <RowItem
          title={crypto ? 'מטבעות מתעוררים' : 'שערים יציגים'}
        >
          <TableGraphConnector
            assetsId={[ '20', '1420', '1370', '-20000', '1640', '1430', '1670', '1450', '1490', ]}
            exchange
          />
        </RowItem>
      </PageRow>
    </MainLayout>
  );
}

export default exchange;
