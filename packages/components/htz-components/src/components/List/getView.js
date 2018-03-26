/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import dynamic from 'next/dynamic';

const views = new Map([ [ 'Tokyo', props => <p>{props.title}</p>, ], ]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ viewtype, }) => (
  <p>{`There is no template for ${viewtype} yet`}</p>
);

export default viewType => views.get(viewType) || DefaultComponent;
