/* eslint-disable import/no-unresolved */
import React, { Fragment, } from 'react';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import HtzLink from '../../../HtzLink/HtzLink';
import Image from '../../../Image/Image';
import { PromotedItem, } from '../Leela/Leela.view';

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
const Link = createComponent(itemStyle, HtzLink, [ 'href', 'content', ]);

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
const Item = ({ title, image, path, promoted, }) => (
  <Link
    href={path}
    content={
      <Fragment>
        <ItemImage>
          <Image
            data={image}
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
        <ItemTitle>{title}</ItemTitle>
      </Fragment>
    }
    promoted={promoted}
  />
);

// eslint-disable-next-line react/prop-types
const Zoidberg = ({ data: { loading, error, list, }, }) => {
  if (loading) return null;
  if (error) return null;
  const { title, items, } = list;
  return (
    <Wrapper>
      <Title>{title}</Title>
      {items.map(item => (
        <ListItem>
          {item.inputTemplate &&
          item.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper' ? (
            <ClickTracker
              {...item}
              render={banner => {
                const { text, link, clicktrackerimage, } = banner;
                return (
                  <PromotedItem
                    title={text}
                    image={clicktrackerimage}
                    path={link}
                    showBanner
                  />
                );
              }}
            />
          ) : (
            <Item {...item} />
          )}
        </ListItem>
      ))}
    </Wrapper>
  );
};

export default Zoidberg;
