import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import Link from '../../../Link/Link';
import Media from '../../../Media/Media';
import Image from '../../../Image/Image';
import Title from '../../../ArticleHeader/Title';
import BlockLink from '../../../BlockLink/BlockLink';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';

const benderWrapperRules = ({ theme, }) => ({
  width: '100%',
  extend: [ theme.mq({ until: 's', display: 'none', }), ],
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
  image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, ]).isRequired,
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
  /**
   * data object from polopoly
   */
  data: PropTypes.shape({
    list: PropTypes.shape({ items: PropTypes.arrayOf(itemsType).isRequired, }),
  }).isRequired,
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
  lazyLoad: '600px',
};

export default function Bender({ data, lazyLoad, }) {
  if (data.loading) {
    return <div>loading ...</div>;
  }
  if (data.error) {
    return <h1>ERROR</h1>;
  }
  const imgOptions = {
    transforms: {
      aspect: 'vertical',
      width: '500',
    },
  };

  const BenderItem = item => (
    <GridItem
      width={[
        { from: 'm', until: 'l', value: 1 / 3, },
        { from: 'l', until: 'xl', value: 1 / 4, },
        { from: 'xl', value: 1 / 6, },
      ]}
      miscStyles={{ marginInlineStart: '1rem', marginInlineEnd: '1rem', }}
    >
      <BlockLink href={item.path} miscStyles={itemRule}>
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
                <Title
                  level={title.level}
                  fontSize={title.fontSize}
                  text={item.title}
                  isBlock
                  miscStyles={{
                    color: theme.color('neutral'),
                    marginBottom: '1rem',
                  }}
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
                      if (typeof author === 'object') {
                        return (
                          <Link
                            href="https://www.haaretz.co.il"
                            content={author.contentName}
                          />
                        );
                      }
                      return <span key={author.contentName}>{author}</span>;
                    })}
                  </span>
                )}
              </AboveBlockLink>
            </footer>
          )}
        />
      </BlockLink>
    </GridItem>
  );
  const iToMedia = {
    0: 'm',
    1: 'm',
    2: 'm',
    3: 'l',
    4: 'xl',
    5: 'xl',
  };
  const { items, } = data.list;

  const content = items
    .slice(items)
    .map(
      (item, i) =>
        (i > 5 ? null : (
          <Media
            query={{ from: iToMedia[i], }}
            render={() => BenderItem(item)}
          />
        ))
    );
  return (
    <FelaComponent
      rule={benderWrapperRules}
      render={({ className, theme, }) => (
        <div className={className}>
          <Title
            isBlock
            fontSize={theme.benderStyle.mainTitle.fontSize}
            level={theme.benderStyle.mainTitle.level}
            text={theme.benderStyle.mainTitle.text}
            miscStyles={{
              color: theme.color('primary'),
              marginBottom: '2rem',
              display: [ { until: 's', value: 'none', }, ],
            }}
          />
          <Grid miscStyles={{ flexWrap: 'nowrap', }}>{content}</Grid>
        </div>
      )}
    />
  );
}
