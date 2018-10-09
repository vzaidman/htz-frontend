// @flow
import Router from 'next/router';

function crypto(): void {
  Router.push({
    pathname: '/section/exchange',
    query: {
      section: 'crypto',
    },
  }, '/crypto');
}

export default crypto;
