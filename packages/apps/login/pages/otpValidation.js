import React, { Fragment, } from 'react';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';

const OtpValidation = () => (
  <Fragment>
    <MainLayout>
      {({ currentState, findTransitionFunction, transition, }) => (
        <Fragment>
          <Link href={`${findTransitionFunction('actionx')()}`}>
            <button onClick={transition('actionx')}>OTP validation</button>
          </Link>
        </Fragment>
      )}
    </MainLayout>
  </Fragment>
);

export default OtpValidation;
