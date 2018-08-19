/* eslint-disable import/no-unresolved */
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

import AdSlot from '../../../Ads/AdSlot';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import Image from '../../../Image/Image';
import { PromotedItem, } from '../Leela/Leela.view';
import BlockLink from '../../../BlockLink/BlockLink';
import H from '../../../AutoLevels/H';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';
import HtzLink from '../../../HtzLink/HtzLink';
import Section from '../../../AutoLevels/Section';

// eslint-disable-next-line react/prop-types
const Zoidberg = ({ list, lazyLoad, gaAction, biAction, listId, }) => {
  // eslint-disable-next-line react/prop-types
  const ItemWrapper = ({ children, href, index, contentId, }) => (
    <FelaTheme
      render={theme => (
        <BlockLink
          miscStyles={{
            alignItems: 'flex-start',
            display: 'flex',
            paddingTop: '1rem',
            borderBottom: [ '1px', '1', 'solid', theme.color('neutral', '-4'), ],
            ':last-child': {
              paddingBottom: '0',
              borderBottomWidth: '0',
              borderBottomStyle: 'none',
            },
          }}
          href={href}
          onClick={() => {
            biAction({
              actionCode: 109,
              additionalInfo: {
                ArticleId: contentId,
                ListId: listId,
                Platform: 'desktop',
                NoInList: index + 1,
                ViewName: 'Zoidberg',
              },
            });
          }}
        >
          {children}
        </BlockLink>
      )}
    />
  );

  // eslint-disable-next-line react/prop-types
  const ClickTrackerItem = ({ item, index, }) => (
    <ClickTracker
      {...item}
      render={banner => {
        const { text, link, clicktrackerimage, } = banner;
        return (
          <BlockLink
            href={link}
            onClick={() => {
              biAction({
                actionCode: 109,
                additionalInfo: {
                  ArticleId: item.contentId,
                  ListId: listId,
                  Platform: 'desktop',
                  NoInList: index + 1,
                  ViewName: 'Zoidberg',
                },
              });
            }}
          >
            <PromotedItem
              title={text}
              image={clicktrackerimage}
              path={link}
              suffix
            />
          </BlockLink>
        );
      }}
    />
  );

  // eslint-disable-next-line react/prop-types
  const Item = ({ title, image, path, index, contentId, }) => (
    <ItemWrapper href={path} index={index} contentId={contentId}>
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
        <AboveBlockLink>
          {({ className, }) => {
            const aboveBlockLinkClasses = className;
            return (
              <FelaComponent
                style={theme => ({
                  fontWeight: '700',
                  marginStart: '1rem',
                  flexGrow: '1',
                  extend: [ theme.type(-1), ],
                })}
                render={({ className, }) => (
                  <H className={`${aboveBlockLinkClasses} ${className}`}>
                    <HtzLink href={path}>{title}</HtzLink>
                  </H>
                )}
              />
            );
          }}
        </AboveBlockLink>
      </Fragment>
    </ItemWrapper>
  );

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
        render={({ className, }) => <H className={className}>{title}</H>}
      />
      <Section>
        {items.map((item, index) => (
          <ListItem key={item.contentId}>
            {item.inputTemplate ? (
              item.inputTemplate ===
              'com.polobase.ClickTrackerBannersWrapper' ? (
                <ClickTrackerItem
                  item={item}
                  index={index}
                  gaAction={gaAction}
                  biAction={biAction}
                  listId={listId}
                />
              ) : item.inputTemplate === 'com.polobase.DfpBannerElement' ? (
                <FelaComponent
                  style={theme => ({
                    display: 'flex',
                    paddingTop: '1rem',
                    ':not(:last-child)': {
                      ...borderBottom(
                        '1px',
                        1,
                        'solid',
                        theme.color('neutral', '-4')
                      ),
                    },
                  })}
                >
                  <AdSlot {...item} />
                </FelaComponent>
              ) : null
            ) : (
              <Item {...item} index={index} />
            )}
          </ListItem>
        ))}
      </Section>
    </FelaComponent>
  );
};

export default Zoidberg;
