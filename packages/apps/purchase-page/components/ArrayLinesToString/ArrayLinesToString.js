// @flow

import React from 'react';
import type { Node, } from 'react';

type Options = {
  className: string,
  data: Array<string>,
}

export default function ArrayLinesToString({ className, data, }: Options): Node {
  return (
    <div className={className}>
      {
        data.map(e => (
          <div key={e}>
            {e}
          </div>
        ))
      }
    </div>

  );
}
