import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import MainLayout from '../layouts/MainLayout';

const OtpValidation = () => (
  <MainLayout>
    {({ currentState, findRout, doTransition, back, }) => (
      <Fragment>
        otp validation <br />
        <HtzLink
          href={`${findRout('actionx')}`}
          onClick={e => {
            e.preventDefault();
            const route = doTransition('actionx');
            console.warn(`before push, new state is: ${currentState()}. route is: ${route}`);
            Router.push(route);
          }}
        >
          link to start
        </HtzLink>

      </Fragment>
    )}
  </MainLayout>
);

export default OtpValidation;
