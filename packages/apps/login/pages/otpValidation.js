import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

const OtpValidation = () => (
  <FSMLayout>
    {({ currentState, findRout, doTransition, }) => (
      <Fragment>
        otp validation <br />
        <HtzLink
          href={`${findRout('accept')}`}
          onClick={e => {
            e.preventDefault();
            const route = doTransition('accept');
            console.warn(`before push, new state is: ${currentState()}. route is: ${route}`);
            Router.push(route);
          }}
        >
          link to start
        </HtzLink>

      </Fragment>
    )}
  </FSMLayout>
);

export default OtpValidation;
