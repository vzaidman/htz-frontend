import React from 'react';
import PropTypes from 'prop-types';

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

export function StandardArticle(props) {
  return (
    <article>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
      {props.body.map(
        (graf, i) =>
          (typeof graf === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: graf, }} key={i} />
          ) : (
            <div key={i}>(image)</div>
          ))
      )}
    </article>
  );
}

StandardArticle.propTypes = propTypes;

export default StandardArticle;
