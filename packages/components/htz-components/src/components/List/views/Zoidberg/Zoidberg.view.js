/* eslint-disable import/no-unresolved */
import React, { Fragment, } from 'react';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

import Link from '../../../Link/Link';
import Image from '../../../Image/Image';

const wrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: `${300 / 7}rem`,
});
const Wrapper = createComponent(wrapperStyle);

const titleStyle = ({ theme, }) => ({
  ...theme.type(1),
  fontWeight: '700',
  color: theme.color('primary'),
  ...borderBottom('2px', 1, 'solid', theme.color('primary')),
  marginBottom: '1rem',
});
const Title = createComponent(titleStyle);

const itemStyle = ({ theme, }) => ({
  display: 'flex',
  height: '15rem',
  paddingTop: '1rem',
  ':not(:last-child)': {
    ...borderBottom('1px', 1, 'solid', theme.color('neutral', '-4')),
  },
});
const Item = createComponent(itemStyle, Link, props => Object.keys(props));

const itemImageStyle = () => ({
  width: `${124 / 7}rem`,
  flexShrink: '0',
});
const ItemImage = createComponent(itemImageStyle);

const itemTitleStyle = ({ theme, }) => ({
  ...theme.type(-1),
  fontWeight: '700',
  marginStart: `${10 / 7}rem`,
});
const ItemTitle = createComponent(itemTitleStyle, 'p');

// eslint-disable-next-line react/prop-types
const Zoidberg = ({ data, }) => {
  if (data.loading) {
    return <div>loading ...</div>;
  }
  if (data.error) {
    return <h1>ERROR</h1>;
  }
  return (
    <Wrapper>
      <Title>
        {data.list.title}
      </Title>
      {data.list.items.map(item => (
        <Item
          href={item.path}
          content={
            <Fragment>
              <ItemImage>
                <Image
                  data={item.image}
                  imgOptions={{
                    transforms: {
                      width: '125',
                      aspect: 'regular',
                      quality: 'auto',
                    },
                  }}
                  hasWrapper={false}
                />
              </ItemImage>
              <ItemTitle>
                {item.title}
              </ItemTitle>
            </Fragment>
          }
        />
      ))}
    </Wrapper>
  );
};

export default Zoidberg;
