/* eslint-disable import/no-unresolved */
import React from 'react';
import { createComponent, } from 'react-fela';

import Image from '../../../Image/Image';

const wrapperStyle = () => ({
  display: 'flex',
  justifyContent: 'center',
});
const Wrapper = createComponent(wrapperStyle, 'ul');

const itemStyle = () => ({
  width: '200px',
  height: '150xp',
});
const Item = createComponent(itemStyle, 'li');

// eslint-disable-next-line react/prop-types
const Example = ({ data, }) => {
  if (data.loading) {
    return <div>loading ...</div>;
  }
  if (data.error) {
    return <h1>ERROR</h1>;
  }
  return (
    <Wrapper>
      {data.list.items.slice(0, 10).map(item => (
        <Item>
          <Image
            data={item.image}
            imgOptions={{
              transforms: {
                width: '200',
                aspect: 'regular',
                quality: 'auto',
              },
            }}
          />
          {item.title}
        </Item>
      ))}
    </Wrapper>
  );
};

export default Example;
