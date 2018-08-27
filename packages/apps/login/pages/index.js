import React, { Fragment, } from 'react';
import { HtzLink, } from '@haaretz/htz-components';
// import { StyleProvider } from '@haaretz/fela-utils';
// import htzTheme from '@haaretz/htz-theme';

import MainLayout from '../layouts/MainLayout';
// import styleRenderer from '../../haaretz.co.il/components/styleRenderer/styleRenderer';

const Index = () => (
  <Fragment>
    {/* <StyleProvider renderer={styleRenderer} theme={htzTheme}> */}
    {/* <div> */}
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
    {/* </div> */}
    {/* </StyleProvider> */}
  </Fragment>
);

export default Index;
