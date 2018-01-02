import React from 'react';
import PropTypes from 'prop-types';
import getComponent from '../../lib/componentFromTemplate';

const propTypes = {
  /**
   * The title of the article.
   */
  title: PropTypes.string.isRequired,
  /**
   * The article’s subtitle.
   */
  subtitle: PropTypes.string,
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
};

const defaultProps = {
  subtitle: null,
};

export function StandardArticle(props) {

  return (
    <article>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
      {props.body.map(
        (graf, i) => {
          const Comp = getComponent(graf.elementType || graf.inputTemplate);
          return Comp ? <Comp key={i} {...graf}/> : null;
        }
          /*(typeof graf === 'string' ? (
            // eslint-disable-next-line react/no-danger, react/no-array-index-key
            <div dangerouslySetInnerHTML={{ __html: graf, }} key={i} />
          ) : (
            getComponent(graf.elementType || graf.inputTemplate)
          ))*/
      )}
    </article>
  );
}

StandardArticle.propTypes = propTypes;
StandardArticle.defaultProps = defaultProps;

export default StandardArticle;
