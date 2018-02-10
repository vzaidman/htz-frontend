import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ArticleBody from '../ArticleBody/ArticleBody';

const propTypes = {
  title: PropTypes.node,
  author: PropTypes.node,
};
const defaultProps = {
  title: null,
  author: null,
};
export default function Article(props) {
  return (
    <React.Fragment>
      <ArticleBody body={props.body}/>
    </React.Fragment>
  );
}
Article.propTypes = propTypes;
Article.defaultProps = defaultProps;
