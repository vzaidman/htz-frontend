import React from 'react';
import PropTypes from 'prop-types';
// import { ArticleBody, } from '@haaretz/htz-components';
import dynamic from 'next/dynamic';

const DynamicScrollListener = dynamic(
  import('../ScrollListener/ScrollListener'),
  {
    ssr: false,
  }
);
const DynamicScroll = dynamic(import('../Scroll/Scroll'), {
  ssr: false,
});
const propTypes = {
  /** The title of the article. */
  title: PropTypes.string.isRequired,
  /** The article’s subtitle. */
  subtitle: PropTypes.string,
  /** The elements composing the article’s body. */
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
      <div>Hello</div>
      <DynamicScrollListener />
      <DynamicScroll
        render={({ x, y, velocity, }) => (
          <div>
            x: {x} y: {y} velocity: {velocity}
          </div>
        )}
      />
      <h2>{props.subtitle}</h2>
      {/* <ArticleBody body={props.body} /> */}
    </article>
  );
}

StandardArticle.propTypes = propTypes;
StandardArticle.defaultProps = defaultProps;

export default StandardArticle;
