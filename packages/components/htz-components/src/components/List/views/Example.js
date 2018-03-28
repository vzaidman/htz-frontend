import React from 'react';

// eslint-disable-next-line react/prop-types
const Example = ({ data, }) => {
  if (data.loading) {
    return <div>loading ...</div>;
  }
  if (data.error) {
    return <h1>ERROR</h1>;
  }
  return <div>This is just an example !!</div>;
};

export default Example;
