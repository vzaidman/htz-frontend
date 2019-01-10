// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { ImageDataType, } from '../../../../flowTypes/ImageDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ClickTrackerBannerType, } from '../../../../flowTypes/ClickTrackerBannerType';

import ListItem from '../../elements/ListItem';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import BlockLink from '../../../BlockLink/BlockLink';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Image from '../../../Image/Image';
import { isClickTrackerWrapper, } from '../../../../utils/validateType';

type PromotedItemProps = {
  path: string,
  title: ?string,
  image: ImageDataType,
  suffix?: boolean,
  paragraphHeight?: Object,
  textType?: number,
};

export function PromotedItem({
  path,
  title,
  image,
  suffix,
  paragraphHeight,
  textType,
}: PromotedItemProps): Node {
  return (
    /* eslint-enable react/prop-types */
    <FelaTheme
      render={theme => (
        <Fragment>
          <div>
            <Image
              data={image}
              imgOptions={{
                transforms: {
                  width: '125',
                  aspect: 'regular',
                  quality: 'auto',
                },
              }}
              miscStyles={{
                width: '18rem',
                flexShrink: '0',
                flexGrow: '0',
              }}
            />
          </div>
          <div>
            <FelaComponent
              style={{
                flexGrow: '1',
                fontWeight: '700',
                marginStart: '1rem',
                marginEnd: '1rem',
                marginTop: '1rem',
                maxHeight: '12rem',
                overflow: 'hidden',
                extend: [ theme.type(textType || -1), paragraphHeight || {}, ],
              }}
              render={({ className, }) => <H className={className}>{title}</H>}
            />
            {suffix ? (
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
            ) : null}
          </div>
        </Fragment>
      )}
    />
  );
}

type Props = {
  gaAction: () => void,
  biAction: ListBiActionType,
  /**
   * data object from polopoly
   */
  list: ListDataType,
  /**
   * Determine if the images should be lazyloaded.
   */
  lazyLoadImages: boolean,
};

// eslint-disable-next-line react/prop-types
function Leela({ list, lazyLoadImages, gaAction, biAction, }: Props): Node {
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
        render={({ className, }) => <H className={className}>{list.title}</H>}
      />
      <Section>
        {list.items.map((item, index) => (isClickTrackerWrapper ? (
          <ListItem key={item.contentId}>
            <ClickTracker
              {...item}
              render={(banner: ClickTrackerBannerType) => {
                const { text, link, clicktrackerimage, } = banner;
                return (
                  <FelaTheme
                    render={theme => (
                      <BlockLink
                        miscStyles={{
                          display: 'flex',
                          marginBottom: '2rem',
                          border: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                          borderEnd: [ '4px', 0, 'solid', theme.color('neutral', '-4'), ],
                        }}
                        href={link}
                        onClick={() => biAction({ index, articleId: item.contentId, })}
                      >
                        <PromotedItem title={text} image={clicktrackerimage} path={link} />
                      </BlockLink>
                    )}
                  />
                );
              }}
            />
          </ListItem>
        ) : null)
        )}
      </Section>
    </FelaComponent>
  );
}

export default Leela;
