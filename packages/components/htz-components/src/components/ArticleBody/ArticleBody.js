import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../utils/componentFromInputTemplate';
import ArticleImage from '../ArticleBodyImage/ArticleBodyImage';
import Caption from '../Caption/Caption';
import NoSSR from '../NoSSR/NoSSR';

const propTypes = {
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])).isRequired,
};

const defaultProps = {};

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

const buildImgOptions = (aspect, isFullScreen) => ({
  sizes: isFullScreen ? '100vw' : '(min-width:1280px) 627px,(min-width:1024px) 460px,(min-width:600px) 540px, calc(100vw - 6rem)',
  transforms: [
    {
      width: '1920',
      aspect,
      quality: 'auto',
    },
    {
      width: '1440',
      aspect,
      quality: 'auto',
    },
    {
      width: '1280',
      aspect,
      quality: 'auto',
    },
    {
      width: '1028',
      aspect,
      quality: 'auto',
    },
    {
      width: '768',
      aspect,
      quality: 'auto',
    },
    {
      width: '600',
      aspect,
      quality: 'auto',
    },
    {
      width: '425',
      aspect,
      quality: 'auto',
    },
    {
      width: '375',
      aspect,
      quality: 'auto',
    },
  ],
});

const buildComponent = (context, index, isLastItem) => {
  const uniqueId = context.elementType || context.inputTemplate || context.tag || null;

  if ([ 'com.tm.Image', 'com.tm.BlogImage', ].includes(uniqueId)) {
    return (
      <ArticleImage
        key={context.contentId}
        lastItem={isLastItem}
        {...context}
        imgOptions={(aspect, isFullScreen) => buildImgOptions(aspect, isFullScreen)}
      />
    );
  }

  const Component = getComponent(uniqueId);
  switch (uniqueId) {
    case 'embedElement':
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
            imgOptions={(aspect, isFullScreen) => buildImgOptions(aspect, isFullScreen)}
          />
          {context.title || context.caption || context.credit ? (
            <Caption caption={context.title || context.caption} credit={context.credit} />
          ) : null}
        </Figure>
      );
    case 'interactiveElement':
    case 'com.tm.Video': // eslint-disable-line no-case-declarations
      return (
        <Figure key={context.contentId} lastItem={isLastItem}>
          <Component {...context} />
          {context.title || context.caption || context.credit ? (
            <Caption caption={context.title || context.caption} credit={context.credit} />
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
      return <Component key={context.contentId} {...context} {...context.properties} />;
    case 'com.tm.newsLetterQuickRegistrationRespAuto':
      return (
        <NoSSR key={context.contentId}>
          <Component {...context} miscStyles={{ marginTop: '4rem', marginBottom: '4rem', }} />
        </NoSSR>
      );
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
};

function ArticleBody({ body, showSurvey, }) {
  return (
    <FelaComponent
      style={theme => ({
        maxWidth: theme.articleStyle.body.maxWidth,
        marginRight: 'auto',
        marginLeft: 'auto',
      })}
    >
      {body.map((component, i) => buildComponent(component, i, i === body.length - 1))}
    </FelaComponent>
  );
}

ArticleBody.propTypes = propTypes;
ArticleBody.defaultProps = defaultProps;

export default ArticleBody;
