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

const figureStyle = ({ theme, lastItem, }) => (
  !lastItem ?
    {
      ...parseComponentProp(
        'marginBottom',
        theme.articleStyle.body.marginBottom,
        theme.mq,
        (prop, value) => ({ [prop]: value, })
      ),
    }
    :
    {}
);

const Figure = createComponent(figureStyle, 'figure');

const wrappedWithFigure = [ 'embedElement', 'com.tm.Image', 'com.tm.Video', ];

const buildComponent = (componentType, index, isLastItem, theme) => {
  const uniqueId = componentType.elementType || componentType.inputTemplate || componentType.tag;
  const Component = getComponent(uniqueId);
  return (
    wrappedWithFigure.includes(uniqueId) ?
      <Figure key={index} lastItem={isLastItem}>{/*<Component props={componentType} />*/}{Component}</Figure>
      :
      uniqueId ?
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
                (prop, value) => ({ [prop]: value, })
              )
          }
        />
        :
        <p key={index}>{componentType}</p>
  );
};

function ArticleBody(props) {
  return (
    <div>
      {props.body.map((component, i) =>
        buildComponent(component, i, i === props.body.length - 1, props.theme))
      }
    </div>
    // eslint-disable-next-line react/no-array-index-key
    // return Comp ? <Comp key={i} {...component, props.theme.articleStyle.body} /> : <p>{component}</p>;
  );
}


ArticleBody.propTypes = propTypes;

export default withTheme(ArticleBody);
