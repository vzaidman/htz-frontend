import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import ArticleBody from '../ArticleBody/ArticleBody';

const propTypes = {
  // author: PropTypes.node,
  body: PropTypes.node,
  // title: PropTypes.node,
};
const defaultProps = {
  // author: null,
  body: null,
  // title: null,
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default function Article(props) {
  return (
    <Fragment>
      <ArticleBody body={props.body} />
    </Fragment>
  );
}
