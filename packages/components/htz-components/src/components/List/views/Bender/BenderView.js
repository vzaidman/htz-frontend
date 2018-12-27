// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseTypographyProp, borderTop, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import ListItem from '../../elements/ListItem';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import HtzLink from '../../../HtzLink/HtzLink';
import Media from '../../../Media/Media';
import Image from '../../../Image/Image';
import BlockLink from '../../../BlockLink/BlockLink';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';
import H from '../../../AutoLevels/H';
import Section from '../../../AutoLevels/Section';

const benderWrapperRules: ({ theme: Object, }) => Object = ({ theme, }) => ({
  width: '100%',
  backgroundColor: theme.color('white'),
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
  paddingBottom: '2rem',
  extend: [
    theme.mq({ until: 's', display: 'none', }),
    borderTop('2px', 1, 'solid', theme.color('primary')),
  ],
});

const itemRule: Object = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const authorRule: ({ theme: Object, }) => Object = ({ theme, }) => ({
  color: theme.color('neutral', '-3'),
  fontWeight: 'bold',
  marginTop: 'auto',
  extend: [ theme.type(-2), ],
});

type Props = {
  gaAction: () => void,
  biAction: ListBiActionType,
  /**
   * data object from polopoly
   */
  list: ListDataType,
  /**
   * Determine if the component images should be lazyloaded.
   */
  lazyLoadImages: boolean,
};

Bender.defaultProps = {
  lazyLoadImages: true,
};

export default function Bender({
  list,
  lazyLoadImages,
  gaAction,
  biAction,
}: Props): Node {
  const imgOptions: Object = {
    transforms: {
      aspect: 'vertical',
      width: '500',
    },
  };

  const BenderItem: (
    item: TeaserDataType,
    i: number,
    itemsToRender: number
  ) => Node = (item, i, itemsToRender) => (
    <GridItem width={1 / itemsToRender} key={item.contentId}>
      <ListItem>
        <BlockLink
          href={item.path}
          miscStyles={itemRule}
          onClick={() => biAction({ index: i, articleId: item.representedContent, })}
        >
          <Section isFragment>
            <FelaComponent
              render={({ className, theme, }) => {
                // eslint-disable-next-line no-unused-vars
                const { title, } = theme.benderStyle;
                return (
                  <div className={className}>
                    <Image
                      data={item.image}
                      imgOptions={imgOptions}
                      lazyLoad={lazyLoadImages}
                    />
                    <FelaComponent
                      style={{
                        fontWeight: 'bold',
                        color: theme.color('neutral'),
                        marginBottom: '1rem',
                        marginTop: '1rem',
                        extend: [
                          parseTypographyProp(title.fontSize, theme.type),
                        ],
                      }}
                      render={({ className, }) => (
                        <H className={className}>
                          <HtzLink href={item.path}>{item.title}</HtzLink>
                        </H>
                      )}
                    />
                  </div>
                );
              }}
            />
            <FelaComponent
              rule={authorRule}
              render={({ className, }) => (
                <footer className={className}>
                  <AboveBlockLink>
                    {({ className, }) => (
                      <span className={className}>
                        {item.authors
                          ? item.authors.map(author => {
                            if (author.url) {
                              return (
                                <HtzLink
                                  href={author.url}
                                  content={author.contentName}
                                />
                              );
                            }
                            return (
                              <span key={author.contentName}>
                                {author.contentName}
                              </span>
                            );
                          })
                          : null
                        }
                      </span>
                    )}
                  </AboveBlockLink>
                </footer>
              )}
            />
          </Section>
        </BlockLink>
      </ListItem>
    </GridItem>
  );

  const { items, title, } = list;

  const content: ?number => Node = itemsToRender => (itemsToRender
    ? items
      .slice(0, itemsToRender)
      .map((item, i) => BenderItem(item, i, itemsToRender))
    : null);

  return (
    <FelaComponent
      rule={benderWrapperRules}
      render={({ className, theme, }) => (
        <Section className={className}>
          <FelaComponent
            style={{
              fontWeight: 'bold',
              color: theme.color('primary'),
              marginBottom: '2rem',
              extend: [
                parseTypographyProp(
                  theme.benderStyle.mainTitle.fontSize,
                  theme.type
                ),
                theme.mq({ until: 's', }, { display: 'none', }),
              ],
            }}
            render={({ className, }) => (
              <H className={className}>{title || theme.benderStyle.mainTitle.text}</H>
            )}
          />
          <Media query={{ from: 's', until: 'l', }}>
            {renderThreeItems => (
              <Media query={{ from: 'l', until: 'xl', }}>
                {renderFourItems => (
                  <Media query={{ from: 'xl', }}>
                    {renderSixItems => {
                      const itemsToRender: ?number = renderThreeItems
                        ? 3
                        : renderFourItems
                          ? 4
                          : renderSixItems
                            ? 6
                            : null;
                      return <Grid gutter={4}>{content(itemsToRender)}</Grid>;
                    }}
                  </Media>
                )}
              </Media>
            )}
          </Media>
        </Section>
      )}
    />
  );
}
