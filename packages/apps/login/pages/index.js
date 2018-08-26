import React, { Fragment, } from 'react';
import { HtzLink, } from '@haaretz/htz-components';
import MainLayout from '../layouts/MainLayout';

const Index = () => (
  <Fragment>
    <MainLayout>
      {({ currentState, findTransitionFunction, transition, }) => (
        <Fragment>
          some context
          <HtzLink
            href={`${findTransitionFunction('action1')()}`}
            onClick={transition('action1')}
          >
            link to state1
          </HtzLink>
        </Fragment>
      )}
    </MainLayout>
  </Fragment>
);

export default Index;
