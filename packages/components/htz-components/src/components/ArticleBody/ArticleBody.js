import React from 'react';
import PropTypes from 'prop-types';
import { withTheme, createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../utils/componentFromInputTemplate';
import Caption from '../Caption/Caption';

const propTypes = {
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ])
  ).isRequired,
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
    { width: '26rem', position: 'absolute', textAlign: 'end', start: '6rem', }
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

const bodyWrapperStyle = ({ theme, }) => ({
  ...parseComponentProp(
    'width',
    theme.articleStyle.body.width,
    theme.mq,
    mediaQueryCallback
  ),
});

const BodyWrapper = createComponent(bodyWrapperStyle);

const mediaComponents = [ 'embedElement', 'com.tm.Image', 'com.tm.Video', ];

const imgOptions = {
  transforms: {
    width: '700',
    aspect: 'regular',
    quality: 'auto',
  },
};

const buildComponent = (context, index, isLastItem, theme) => {
  const uniqueId =
    context.elementType ||
    context.inputTemplate ||
    context.tag ||
    null;
  const Component = getComponent(uniqueId);

  switch (uniqueId) {
    case 'com.tm.Image' :
      return (
        <Figure
          key={index}
          lastItem={isLastItem}
        >
          <Component
            data={context}
            imgOptions={imgOptions}
          />
          {(context.title || context.credit) &&
            <Caption
              caption={context.title}
              credit={context.credit}
            />
          }
        </Figure>
      );
    case mediaComponents.includes(uniqueId) :
      return (
        <Figure
          key={index}
          lastItem={isLastItem}
        >
          <Component {...context} />
          {(context.caption || context.credit) &&
          <Caption
            caption={context.caption}
            credit={context.credit}
          />
          }
        </Figure>
      );
    case 'com.htz.MagazineArticleQuote' :
      return (
        <Aside key={index}>
          <Component {...context} />
        </Aside>
      );
    default :
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

function ArticleBody(props) {
  return (
    <BodyWrapper>
      {props.body.map((component, i) =>
        buildComponent(
          component,
          i,
          i === props.body.length - 1,
          props.theme
        )
      )}
    </BodyWrapper>
  );
}

ArticleBody.propTypes = propTypes;

export default withTheme(ArticleBody);
