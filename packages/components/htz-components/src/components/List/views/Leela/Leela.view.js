/* eslint-disable import/no-unresolved */
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import BlockLink from '../../../BlockLink/BlockLink';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Image from '../../../Image/Image';
import HtzLink from '../../../HtzLink/HtzLink';

// eslint-disable-next-line react/prop-types
export const PromotedItem = ({
	path,
	title,
	image,
	suffix,
	paragraphHeight,
}) => (
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
          <AboveBlockLink>
            {({ className, }) => {
              const aboveBlockLinkClasses = className;
              return (
                <FelaComponent
                  style={{
                    flexGrow: '1',
                    fontWeight: '700',
                    marginStart: '1rem',
                    marginEnd: '1rem',
                    marginTop: '1rem',
                    maxHeight: '12rem',
                    overflow: 'hidden',
                    extend: [
                      theme.type(-1),
                      paragraphHeight || {},
                    ],
                  }}
                  render={({ className, }) => (
                    <H className={`${aboveBlockLinkClasses} ${className}`}>
                      <HtzLink href={path}>{title}</HtzLink>
                    </H>
                  )}
                />
              );
            }}
          </AboveBlockLink>

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

// eslint-disable-next-line react/prop-types
const Leela = ({ list, lazyLoad, gaAction, biAction, listId, }) => (
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
      {list.items.map((item, index) => (
        <ListItem key={item.contentId}>
          <ClickTracker
            {...item}
            render={banner => {
              const { text, link, clicktrackerimage, } = banner;
              return (
                <FelaTheme
                  render={theme => (
                    <BlockLink
                      miscStyles={{
                        display: 'flex',
                        marginBottom: '2rem',
                        border: [
                          '1px',
                          0,
                          'solid',
                          theme.color('neutral', '-4'),
                        ],
                        borderEnd: [
                          '4px',
                          0,
                          'solid',
                          theme.color('neutral', '-4'),
                        ],
                      }}
                      href={link}
                      onClick={() => {
                        biAction({
                          actionCode: 109,
                          additionalInfo: {
                            ArticleId: item.contentId,
                            ListId: listId,
                            Platform: 'desktop',
                            NoInList: index + 1,
                            ViewName: 'Leela',
                          },
                        });
                      }}
                    >
                      <PromotedItem
                        title={text}
                        image={clicktrackerimage}
                        path={link}
                      />
                    </BlockLink>
                  )}
                />
              );
            }}
          />
        </ListItem>
      ))}
    </Section>
  </FelaComponent>
);

export default Leela;
