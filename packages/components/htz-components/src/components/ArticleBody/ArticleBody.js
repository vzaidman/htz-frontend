import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import getComponent from '../../utils/componentFromInputTemplate';
import ArticleImage from '../ArticleBodyImage/ArticleBodyImage';
import Tags from '../Tags/Tags';
import Caption from '../Caption/Caption';
import NoSSR from '../NoSSR/NoSSR';

const propTypes = {
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
  /**
   * Display newsletter in article body.
   */
  showNewsletter: PropTypes.bool,
  /**
   * An optional tags.
   */
  tagsList: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Tag's url.
       */
      url: PropTypes.string.isRequired,
      /**
       * Tag's name to be displayed.
       */
      contentName: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  attrs: null,
  tagsList: null,
  showNewsletter: true,
  miscStyles: null,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

// eslint-disable-next-line react/prop-types
const Figure = ({ lastItem, children, }) => (
  <FelaComponent
    style={theme => (!lastItem
      ? {
        ...parseComponentProp(
          'marginBottom',
          theme.articleStyle.body.marginBottom,
          theme.mq,
          mediaQueryCallback
        ),
      }
      : {})
    }
    render="figure"
  >
    {children}
  </FelaComponent>
);

// eslint-disable-next-line react/prop-types
const Aside = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      extend: [
        theme.mq(
          { from: 'l', },
          {
            position: 'absolute',
            textAlign: 'start',
            start: theme.layoutStyle.startColumnPadding,
          }
        ),
        theme.mq(
          { from: 'l', until: 'xl', },
          {
            start: theme.layoutStyle.startColumnPadding,
            width: '22rem',
          }
        ),
        theme.mq(
          { from: 'xl', },
          {
            start: theme.layoutStyle.startColumnPaddingXL,
            width: '26rem',
          }
        ),
        parseComponentProp(
          'marginBottom',
          theme.articleStyle.body.marginBottom,
          theme.mq,
          mediaQueryCallback
        ),
      ],
    })}
    render="aside"
  >
    {children}
  </FelaComponent>
);

export const buildImgOptions = (aspect, isFullScreen) => ({
  sizes: isFullScreen
    ? '100vw'
    : '(min-width:1280px) 592px,(min-width:1024px) 490px,(min-width:600px) 540px, calc(100vw - 6rem)',
  transforms: [
    {
      width: '350',
      aspect,
      quality: 'auto',
    },
    {
      width: '490',
      aspect,
      quality: 'auto',
    },
    {
      width: '600',
      aspect,
      quality: 'auto',
    },

    {
      width: '700',
      aspect,
      quality: 'auto',
    },
    {
      width: '1024',
      aspect,
      quality: 'auto',
    },
    {
      width: '1200',
      aspect,
      quality: 'auto',
    },
  ],
});

const buildComponent = (context, index, isLastItem, showNewsletter) => {
  const uniqueId = context.kind || context.inputTemplate || context.tag || null;
  if (uniqueId === 'image') {
    return (
      <ArticleImage
        key={context.contentId}
        lastItem={isLastItem}
        {...context}
        imgOptions={(aspect, isFullScreen) => buildImgOptions(aspect, isFullScreen)
        }
      />
    );
  }

  const Component = getComponent(uniqueId);
  switch (uniqueId) {
    case 'embed':
      return (
        <Figure key={context.contentId} lastItem={isLastItem}>
          <Component {...context} />
        </Figure>
      );
    case 'com.tm.ImageGalleryElement':
      return (
        <Figure key={context.contentId} lastItem={isLastItem}>
          <Component
            {...context}
            imgOptions={(aspect, isFullScreen) => buildImgOptions(aspect, isFullScreen)
            }
          />
          {context.title || context.caption || context.credit ? (
            <Caption
              caption={context.title || context.caption}
              credit={context.credit}
            />
          ) : null}
        </Figure>
      );
    case 'interactiveElement':
    case 'com.tm.Video': // eslint-disable-line no-case-declarations
      return (
        <Figure key={context.contentId} lastItem={isLastItem}>
          <Component {...context} />
          {context.title || context.caption || context.credit ? (
            <Caption
              caption={context.title || context.caption}
              credit={context.credit}
            />
          ) : null}
        </Figure>
      );
    case 'com.htz.MagazineArticleQuote':
      return (
        <Aside key={context.contentId}>
          <Component {...context} />
        </Aside>
      );
    case 'com.polobase.DfpBannerElement':
      return (
        <Component
          key={context.contentId}
          {...context}
          {...context.properties}
        />
      );
    case 'com.tm.newsLetterQuickRegistrationRespAuto':
      if (showNewsletter) {
        return (
          <NoSSR key={context.contentId}>
            <Component
              {...context}
              miscStyles={{ marginTop: '4rem', marginBottom: '4rem', }}
            />
          </NoSSR>
        );
      }
      break;
    default:
      return (
        <FelaTheme
          key={context.contentId || uniqueId + index}
          render={theme => (
            <Component
              {...context}
              miscStyles={
                isLastItem
                  ? null
                  : parseComponentProp(
                    'marginBottom',
                    theme.articleStyle.body.marginBottom,
                    theme.mq,
                    mediaQueryCallback
                  )
              }
              {...(uniqueId === 'p' || uniqueId === 'a' || uniqueId === 'h4'
                ? {
                  renderFirstImpression: !isLastItem,
                }
                : {})}
            />
          )}
        />
      );
  }
  return undefined;
};
const wrapperStyle = ({ miscStyles, theme, }) => ({
  maxWidth: theme.articleStyle.body.maxWidth,
  marginRight: 'auto',
  marginLeft: 'auto',
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

function ArticleBody({ body, miscStyles, tagsList, showNewsletter, }) {
  return body && body.length > 0 ? (
    <FelaComponent miscStyles={miscStyles} rule={wrapperStyle}>
      {body.map((component, i) => buildComponent(component, i, i === body.length - 1, showNewsletter)
      )}
      {tagsList && tagsList.length ? <Tags tagsList={tagsList} /> : null}
    </FelaComponent>
  ) : null;
}

ArticleBody.propTypes = propTypes;
ArticleBody.defaultProps = defaultProps;

export default ArticleBody;
