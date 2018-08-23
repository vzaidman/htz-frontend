import React from 'react';
import NoSSR from './../NoSSR/NoSSR';

const tryExecSideEffect = (sideEffect, data) => {
  try {
    sideEffect(data);
  }
  catch (err) {
    console.err('Unable to execute dfp side effcect', err);
  }
  return null;
};

const ExecSideEffect = ({ sideEffect, data, }) =>
  tryExecSideEffect(sideEffect, data);

const withDfpSideEffect = (Component, { sideEffect, }) => props => (
  <React.Fragment>
    <NoSSR>
      <ExecSideEffect sideEffect={sideEffect} data={props} />
    </NoSSR>
    <Component {...props} />
  </React.Fragment>
);

export default withDfpSideEffect;
