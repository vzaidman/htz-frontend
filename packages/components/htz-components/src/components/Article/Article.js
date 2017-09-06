import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.node,
  author: PropTypes.node,
};
const defaultProps = {
  title: null,
  author: null,
};
export default function Article({ title, author, }) {
  return (
    <main>
      <article>
        <h1>{title}</h1>
        <p>{author}</p>
      </article>
    </main>
  );
}
Article.propTypes = propTypes;
Article.defaultProps = defaultProps;
