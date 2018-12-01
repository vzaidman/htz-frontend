import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseTypographyProp, borderTop, } from '@haaretz/htz-css-tools';
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

const benderWrapperRules = ({ theme, }) => ({
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

const itemRule = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const authorRule = ({ theme, }) => ({
  color: theme.color('neutral', '-3'),
  fontWeight: 'bold',
  marginTop: 'auto',
  extend: [ theme.type(-2), ],
});

const itemsType = PropTypes.shape({
  /**
   * Article's author name to display.
   */
  author: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ),
  /**
   * Article's image to display (image object or image url).
   */
  image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, ]),
  /**
   * Article's url.
   */

  path: PropTypes.string.isRequired,
  /**
   * Article's title to display.
   */
  title: PropTypes.string.isRequired,
});

Bender.propTypes = {
  biAction: PropTypes.func.isRequired,
  gaAction: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  /**
   * data object from polopoly
   */
  list: PropTypes.shape({ items: PropTypes.arrayOf(itemsType).isRequired, })
    .isRequired,
  /**
   * Determine if the component should be lazyloaded. Defaults to `false`.
   * If lazyloaded, indicates how many pixels before entering the screen
   * should the image be loaded.
   * For example, when `{lazyLoad: true}`, the image will be
   * lazyloaded as soon as it enters the screen. When `{lazyLoad: '400px'}`
   * the image will be lazyloaded 400px before entering the screen.
   * Strings should be in css length units.
   */
  lazyLoad: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string, ]),
};
Bender.defaultProps = {
  lazyLoad: '1000px',
};

export default function Bender({ list, lazyLoad, gaAction, biAction, listId, }) {
  const imgOptions = {
    transforms: {
      aspect: 'vertical',
      width: '500',
    },
  };

  const BenderItem = (item, i, itemsToRender) => (
    <GridItem width={1 / itemsToRender} key={item.contentId}>
      <ListItem>
        <BlockLink
          href={item.path}
          miscStyles={itemRule}
          onClick={() => {
            biAction({
              actionCode: 109,
              additionalInfo: {
                ArticleId: item.path.match(/(?:.*-?)(1\.\d+.*)/)[1],
                ListId: listId,
                Platform: 'desktop',
                NoInList: i + 1,
                ViewName: 'Bender',
              },
            });
          }}
        >
          <Section isFragment>
            <FelaComponent
              render={({ className, theme, }) => {
                // eslint-disable-next-line no-unused-vars
                const { image, title, } = theme.benderStyle;
                return (
                  <div className={className}>
                    <Image
                      data={item.image}
                      imgOptions={imgOptions}
                      lazyLoad={lazyLoad}
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
                    {({ className, theme, }) => (
                      <span className={className}>
                        {item.authors.map(author => {
                          if (author.url) {
                            return (
                              <HtzLink
                                href={author.url}
                                content={author.contentName}
                              />
                            );
                          }
                          return (
                            <span key={author.contentName || author.name}>
                              {author.contentName || author.name}
                            </span>
                          );
                        })}
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

  const { items, } = list;

  const content = itemsToRender => (itemsToRender
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
              <H className={className}>{theme.benderStyle.mainTitle.text}</H>
            )}
          />
          <Media query={{ from: 's', until: 'l', }}>
            {renderThreeItems => (
              <Media query={{ from: 'l', until: 'xl', }}>
                {renderFourItems => (
                  <Media query={{ from: 'xl', }}>
                    {renderSixItems => {
                      const itemsToRender = renderThreeItems
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
