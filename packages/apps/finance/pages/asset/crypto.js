// @flow
import Router from 'next/router';

type Props = {
  url: {
    pathname: string,
    query: {
      assetId: string,
      section: string,
    },
  },
};

function crypto({ url: { query: { assetId, }, }, }: Props): void {
  Router.push({
    pathname: '/asset/exchange',
    query: {
      section: 'crypto',
      assetId,
    },
  }, `/crypto/${assetId}`);
}

export default crypto;
