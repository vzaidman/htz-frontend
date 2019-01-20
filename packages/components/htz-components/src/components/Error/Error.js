// @flow
import React from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import type { Node, } from 'react';
import type { ErrorType, } from '../../flowTypes/ErrorType';

import logger from '../../componentsLogger';

const Debug = dynamic(import('../Debug/Debug'), {
  loading: () => null,
});


function Error({ message, errorCode, }: ErrorType): Node {
  logger.trace(message);
  if (errorCode === 1) {
    const isClient = typeof document !== 'undefined';
    isClient && Router.replace('/error');
  }
  return <Debug>{message}</Debug>;
}

export default Error;
