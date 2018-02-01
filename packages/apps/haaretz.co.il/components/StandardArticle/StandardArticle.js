import React from 'react';
import PropTypes from 'prop-types';
import { ArticleBody, } from '@haaretz/htz-components';

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
      {/*<ArticleBody body={props.body} />*/}
    </article>
  );
}

StandardArticle.propTypes = propTypes;
StandardArticle.defaultProps = defaultProps;

export default StandardArticle;
