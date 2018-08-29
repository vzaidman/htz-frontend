import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import MainLayout from '../layouts/MainLayout';

const Index = () => (
  <MainLayout>
    {({ currentState, findRout, doTransition, }) => (
      <Fragment>
        some context<br />
        <HtzLink
          href={`${findRout('action1')}`}
          onClick={e => {
            e.preventDefault();
            const route = doTransition('action1');
            console.warn(`before push, new state is: ${currentState()}. route is: ${route}`);
            Router.push(route);
          }}
        >
          link to state1
        </HtzLink>
      </Fragment>
    )}
  </MainLayout>
);

export default Index;
