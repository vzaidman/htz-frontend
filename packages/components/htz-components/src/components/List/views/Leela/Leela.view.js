/* eslint-disable import/no-unresolved */
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { border, borderEnd, borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import HtzLink from '../../../HtzLink/HtzLink';
import Image from '../../../Image/Image';

// eslint-disable-next-line react/prop-types
export const PromotedItem = ({ path, title, image, suffix, }) => (
  <FelaComponent
    style={theme => ({
      display: 'flex',
      height: `${91 / 7}rem`,
      marginBottom: '2rem',
      ...border('1px', 0, 'solid', theme.color('neutral', '-4')),
      ...borderEnd('4px', 'solid', theme.color('neutral', '-4')),
    })}
    render={({ theme, className, }) => (
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
            <div>
              <FelaComponent
                style={{
                  ...theme.type(-1),
                  fontWeight: '700',
                  marginStart: `${10 / 7}rem`,
                  marginEnd: '1rem',
                  marginTop: '1rem',
                }}
                render="p"
              >
                {title}
              </FelaComponent>
              {suffix && (
                <FelaComponent
                  style={{
                    ...theme.type(-3),
                    color: theme.color('primary', '-1'),
                    fontWeight: '700',
                    marginBottom: '0.25rem',
                    marginStart: '1rem',
                    position: 'relative',
                  }}
                  render="p"
                >
                  {theme.osakaI18n.promotedContent}
                </FelaComponent>
              )}
            </div>
          </Fragment>
        }
      />
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Leela = ({ data, }) => {
  if (data.loading) return null;
  if (data.error) return null;
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
          color: theme.color('neutral', '-2'),
          ...borderBottom('2px', 1, 'solid', theme.color('neutral', '-2')),
          marginBottom: '2rem',
        })}
      >
        {data.list.title}
      </FelaComponent>
      {data.list.items.map(item => (
        <ListItem>
          <ClickTracker
            {...item}
            render={banner => {
              const { text, link, clicktrackerimage, } = banner;
              return (
                <PromotedItem
                  title={text}
                  image={clicktrackerimage}
                  path={link}
                />
              );
            }}
          />
        </ListItem>
      ))}
    </FelaComponent>
  );
};

export default Leela;
