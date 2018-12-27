// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

import ListItem from '../../elements/ListItem';
import BlockLink from '../../../BlockLink/BlockLink';
import H from '../../../AutoLevels/H';
import Image from '../../../Image/Image';
import { isTeaser, } from '../../../../utils/validateType';

const imgOptions: Object = {
  transforms: {
    aspect: 'headline',
    width: '600',
  },
};

type Props = {
  gaAction: () => void,
  biAction: ListBiActionType,
  /**
   * data object from polopoly
   */
  list: ListDataType,
  /**
   * Determine if the component should be lazyload images
   */
  lazyLoadImages: boolean,
};

function Farnsworth({
  list,
  lazyLoadImages,
  gaAction,
  biAction,
}: Props): Node {
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
        isTeaser(item)
          ? (
            <ListItem key={item.contentId}>
              <BlockLink
                href={item.path}
                onClick={() => biAction({ index, articleId: item.representedContent, })}
              >
                <FelaComponent style={{ marginBottom: '2rem', }}>
                  <Image
                    data={item.image}
                    imgOptions={imgOptions}
                    lazyLoad={lazyLoadImages}
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
          )
          : null
      ))}
    </FelaComponent>
  );
}

export default Farnsworth;
