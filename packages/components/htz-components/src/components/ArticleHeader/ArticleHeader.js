import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import Kicker from './Kicker';
import Title from './Title';
import Subtitle from './_Subtitle';
import ArticleHeaderMeta from './_ArticleHeaderMeta';

const articleHeaderPropTypes = {
  /**
   * Kicker of Article. A short, catchy word or phrase over a major headline
   */
  kicker: PropTypes.string,
  /**
   * Headline (title) of an Article
   */
  title: PropTypes.string.isRequired,
  /**
   * Subtitle of an Article
   */
  subtitle: PropTypes.string,
  /**
   * Author/Credit of an Article
   */
  author: PropTypes.object.isRequired,
  /**
   * publishDateTime of an Article
   */
  publishDateTime: PropTypes.instanceOf(Date).isRequired,
};

const articleHeaderDefaultProps = {
  kicker: null,
  subtitle: null,
  author: null,
  publishDateTime: null,
};

const styleArticleHeader = ({ theme, }) => ({
  position: 'relative',
});

function ArticleHeaderComponent({ kicker, title, subtitle, author, publishDateTime, className,}) {
  return (
    <header className={className}>
      {
        kicker ?
          <Kicker
            isBlock={false}
            fontSize={[
              { until: 'm', value: 3, },
              { from: 'm', until: 'l', value: 4, },
              { from: 'l', value: 5, },
            ]}
            level={1}
            text={kicker}
          /> :
          ''
      }
      <Title
        isBlock={false}
        fontSize={[
          { until: 'm', value: 3, },
          { from: 'm', until: 'l', value: 4, },
          { from: 'l', value: 5, },
        ]}
        level={1}
        text={title}
      />
      <Subtitle>{subtitle}</Subtitle>
      <ArticleHeaderMeta author={author} publishDateTime={publishDateTime} />
    </header>
  );
}

const ArticleHeaderStyled = createComponent(styleArticleHeader, ArticleHeaderComponent, props => Object.keys(props));

function ArticleHeader(props) {
  return <ArticleHeaderStyled {...props} />;
}

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;
export default ArticleHeader;
