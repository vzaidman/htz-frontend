/* eslint-disable import/no-unresolved */
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

import AdSlot from '../../../Ads/AdSlot';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import HtzLink from '../../../HtzLink/HtzLink';
import Image from '../../../Image/Image';
import { PromotedItem, } from '../Leela/Leela.view';

// eslint-disable-next-line react/prop-types
const ItemWrapper = ({ render, }) => (
  <FelaComponent
    style={theme => ({
      display: 'flex',
      paddingTop: '1rem',
      ':not(:last-child)': {
        ...borderBottom('1px', 1, 'solid', theme.color('neutral', '-4')),
      },
    })}
    render={({ className, theme, }) => render({ className, theme, })}
  />
);

// eslint-disable-next-line react/prop-types
const ClickTrackerItem = ({ item, }) => (
  <ClickTracker
    {...item}
    render={banner => {
      const { text, link, clicktrackerimage, } = banner;
      return (
        <PromotedItem
          title={text}
          image={clicktrackerimage}
          path={link}
          suffix
        />
      );
    }}
  />
);

// eslint-disable-next-line react/prop-types
const Item = ({ title, image, path, }) => (
  <ItemWrapper
    render={({ className, theme, }) => (
      <HtzLink
        className={className}
        href={path}
        content={
          <Fragment>
            <FelaComponent
              style={{
                width: `${124 / 7}rem`,
                flexShrink: '0',
              }}
            >
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
            </FelaComponent>
            <FelaComponent
              style={{
                ...theme.type(-1),
                fontWeight: '700',
                marginStart: `${10 / 7}rem`,
              }}
              render="p"
            >
              {title}
            </FelaComponent>
          </Fragment>
        }
      />
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Zoidberg = ({ list, }) => {
  const { title, items, } = list;
  return (
    <FelaComponent
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: `${300 / 7}rem`,
      }}
    >
      <FelaComponent
        style={theme => ({
          ...theme.type(1),
          fontWeight: '700',
          color: theme.color('primary'),
          ...borderBottom('2px', 1, 'solid', theme.color('primary')),
          marginBottom: '1rem',
        })}
      >
        {title}
      </FelaComponent>
      {items.map(item => (
        <ListItem key={item.contentId}>
          {item.inputTemplate ? (
            item.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper' ? (
              <ClickTrackerItem item={item} />
            ) : item.inputTemplate === 'com.polobase.DfpBannerElement' ? (
              <ItemWrapper
                render={({ className, }) => (
                  <div className={className}>
                    <AdSlot {...item} />
                  </div>
                )}
              />
            ) : null
          ) : (
            <Item {...item} />
          )}
        </ListItem>
      ))}
    </FelaComponent>
  );
};

export default Zoidberg;
