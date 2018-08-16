/* eslint-disable import/no-unresolved */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

import BlockLink from '../../../BlockLink/BlockLink';
import H from '../../../AutoLevels/H';
import Image from '../../../Image/Image';

const imgOptions = {
  transforms: {
    aspect: 'headline',
    width: '600',
  },
};

// eslint-disable-next-line react/prop-types
const Farnsworth = ({ list, lazyLoad, gaAction, biAction, listId, }) => {
  const { title, items, } = list;
  return (
    <FelaComponent
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FelaComponent
        style={theme => ({
          ...theme.type(1),
          fontWeight: '700',
          color: theme.color('primary'),
          ...borderTop('2px', 1, 'solid', theme.color('primary')),
          marginBottom: '1rem',
        })}
      >
        <H>{title}</H>
      </FelaComponent>
      {items.map((item, index) => (
        <ListItem key={item.contentId}>
          <BlockLink
            href={item.path}
            onClick={() => {
              biAction({
                actionCode: 109,
                additionalInfo: {
                  ArticleId: item.contentId,
                  ListId: listId,
                  Platform: 'mobile',
                  NoInList: index + 1,
                  ViewName: 'Farnsworth',
                },
              });
            }}
          >
            <FelaComponent style={{ marginBottom: '2rem', }}>
              <Image
                data={item.image}
                imgOptions={imgOptions}
                lazyLoad={lazyLoad}
              />
              <FelaComponent
                style={theme => ({
                  fontWeight: 'bold',
                  color: theme.color('neutral'),
                  marginTop: '1rem',
                })}
                render={({ className, }) => (
                  <H className={className}>{item.title}</H>
                )}
              />
            </FelaComponent>
          </BlockLink>
        </ListItem>
      ))}
    </FelaComponent>
  );
};

export default Farnsworth;
