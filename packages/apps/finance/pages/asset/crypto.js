// @flow
import React from 'react';
import Router from 'next/router';

type Url = {
  pathname: string,
  query: {
    assetId: string,
    section: string,
  },
};

class crypto extends React.Component<{}> {
  static async getInitialProps(url: Url) {
    const { query: { assetId, section, }, } = url;
    Router.push({
      pathname: '/asset/exchange',
      query: {
        section,
        assetId,
      },
    }, `/${section}/${assetId}`);
    return { };
  }
}

export default crypto;
