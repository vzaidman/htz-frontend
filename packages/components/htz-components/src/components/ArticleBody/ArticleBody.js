import React from 'react';
import PropTypes from 'prop-types';
import { withTheme, createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../utils/componentFromInputTemplate';
import ArticleImage from '../ArticleImage/ArticleImage';
import Caption from '../Caption/Caption';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const propTypes = {
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
  /**
   * A callback to the parent component (`<Article />`)
   * with the Headline Element (position 0)
   * if present.
   */
  setHeadlineElement: PropTypes.func.isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  miscStyles: null,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const figureStyle = ({ theme, lastItem, }) =>
  (!lastItem
    ? {
      ...parseComponentProp(
        'marginBottom',
        theme.articleStyle.body.marginBottom,
        theme.mq,
        mediaQueryCallback
      ),
    }
    : {});
const Figure = createComponent(figureStyle, 'figure');

const asideStyle = ({ theme, }) => ({
  ...theme.mq(
    { from: 'l', },
    {
      width: '26rem',
      position: 'absolute',
      textAlign: 'end',
      start: '-6rem',
      transform: 'translateX(100%)',
    }
  ),
  extend: [
    ...[
      parseComponentProp(
        'marginBottom',
        theme.articleStyle.body.marginBottom,
        theme.mq,
        mediaQueryCallback
      ),
    ],
  ],
});
const Aside = createComponent(asideStyle, 'aside');

const bodyWrapperStyle = ({ miscStyles, theme, }) => ({
  position: 'relative',
  ...parseComponentProp(
    'width',
    theme.articleStyle.body.width,
    theme.mq,
    mediaQueryCallback
  ),
  ...(miscStyles || {}),
});

const BodyWrapper = createComponent(bodyWrapperStyle, 'section');

const mediaComponents = [
  'embedElement',
  'com.tm.Image',
  'com.tm.Video',
  'com.tm.ImageGalleryElement',
];

const buildComponent = (
  context,
  index,
  isLastItem,
  theme,
  setHeadlineElement
) => {
  const uniqueId =
    context.elementType || context.inputTemplate || context.tag || null;
  const Component =
    uniqueId === 'com.tm.Image' ? ArticleImage : getComponent(uniqueId);

  if (index === 0 && mediaComponents.includes(uniqueId)) {
    setHeadlineElement(context);
    return null;
  }

  switch (uniqueId) {
    case 'com.tm.Image':
      return <Component key={index} lastItem={isLastItem} {...context} />;
    case 'embedElement':
    case 'com.tm.Video': // eslint-disable-line no-case-declarations
      return (
        <Figure key={index} lastItem={isLastItem}>
          <Component {...context} />
          {(context.caption || context.credit) && (
            <Caption caption={context.caption} credit={context.credit} />
          )}
        </Figure>
      );
    case 'com.htz.MagazineArticleQuote':
      return (
        <Aside key={index}>
          <Component {...context} />
        </Aside>
      );
    default:
      return (
        <Component
          key={index}
          {...context}
          marginBottom={
            isLastItem
              ? null
              : parseComponentProp(
                  'marginBottom',
                  theme.articleStyle.body.marginBottom,
                  theme.mq,
                  mediaQueryCallback
                )
          }
        />
      );
  }
};

function ArticleBody({ body, setHeadlineElement, miscStyles, theme, }) {
  return (
    <BodyWrapper miscStyles={miscStyles}>
      {body.map((component, i) =>
        buildComponent(
          component,
          i,
          i === body.length - 1,
          theme,
          setHeadlineElement
        )
      )}
    </BodyWrapper>
  );
}

ArticleBody.propTypes = propTypes;
ArticleBody.defaultProps = defaultProps;

export default withTheme(ArticleBody);
