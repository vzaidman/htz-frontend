import React from 'react';
import PropTypes from 'prop-types';
import { withTheme, createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../utils/componentFromInputTemplate';

const propTypes = {
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const figureStyle = ({ theme, lastItem, }) => (
  !lastItem ?
    {
      ...parseComponentProp(
        'marginBottom',
        theme.articleStyle.body.marginBottom,
        theme.mq,
        mediaQueryCallback
      ),
    }
    :
    {}
);
const Figure = createComponent(figureStyle, 'figure');

const asideStyle = ({ theme, }) => ({
    ...theme.mq({ from: 'l', }, { width: '26rem', position: 'absolute', textAlign: 'end', start: '6rem', }, ),
    extend: [
      ...([parseComponentProp('marginBottom', theme.articleStyle.body.marginBottom, theme.mq, mediaQueryCallback)]),
    ]
  }
);
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

const wrappedWithFigure = [ 'embedElement', 'com.tm.Image', 'com.tm.Video', ];

const buildComponent = (componentType, index, isLastItem, theme) => {
  const uniqueId = componentType.elementType || componentType.inputTemplate || componentType.tag || null;
  const Component = getComponent(uniqueId);
  return (
    wrappedWithFigure.includes(uniqueId) ?
      <Figure key={index} lastItem={isLastItem}><Component {...componentType} /></Figure>
      :
      uniqueId ?
        uniqueId === 'com.htz.MagazineArticleQuote' ?
          <Aside><Component {...componentType} /></Aside> :
            <Component
              key={index}
              content={componentType}
              marginBottom={
                isLastItem ?
                  null
                  :
                  parseComponentProp(
                    'marginBottom',
                    theme.articleStyle.body.marginBottom,
                    theme.mq,
                    mediaQueryCallback
                  )
              }
            />
        :
        <p key={index}>{componentType}</p>
  );
};

function ArticleBody(props) {
  return (
    <BodyWrapper>
      {props.body.map((component, i) =>
        buildComponent(component, i, i === props.body.length - 1, props.theme))
      }
    </BodyWrapper>
    // eslint-disable-next-line react/no-array-index-key
    // return Comp ? <Comp key={i} {...component, props.theme.articleStyle.body} /> : <p>{component}</p>;
  );
}


ArticleBody.propTypes = propTypes;

export default withTheme(ArticleBody);
