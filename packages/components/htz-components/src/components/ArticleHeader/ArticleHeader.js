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
  /** Headline (title) of an Article */
  title: PropTypes.string.isRequired,
  /** Subtitle of an Article */
  subtitle: PropTypes.string,
  /** Author/Credit of an Article */
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      authorType: PropTypes.oneOf([
        'themarker',
        'haaretz',
        'exterior',
        'agencies',
        'hct',
        'hcr',
        'phot',
        'col',
        'unknown',
        'none',
      ]).isRequired,
      contentId: PropTypes.string.isRequired,
      contentName: PropTypes.string,
      email: PropTypes.string,
      facebook: PropTypes.string,
      gplus: PropTypes.string,
      hasEmailAlerts: PropTypes.bool,
      hasPushAlerts: PropTypes.bool,
      // eslint-disable-next-line react/forbid-prop-types
      image: PropTypes.object,
      inputTemplate: PropTypes.string,
      twitter: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  ]).isRequired,
  /** publishDateTime of an Article */
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

function ArticleHeaderComponent({
  /* eslint-disable react/prop-types */
  kicker,
  title,
  subtitle,
  author,
  publishDateTime,
  className,
  /* eslint-enable react/prop-types */
}) {
  return (
    <header className={className}>
      {kicker ? (
        <Kicker
          isBlock={false}
          fontSize={[
            { until: 'm', value: 3, },
            { from: 'm', until: 'l', value: 4, },
            { from: 'l', value: 5, },
          ]}
          level={1}
          text={kicker}
        />
      ) : (
        ''
      )}
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

const ArticleHeaderStyled = createComponent(
  styleArticleHeader,
  ArticleHeaderComponent,
  props => Object.keys(props)
);

function ArticleHeader(props) {
  return <ArticleHeaderStyled {...props} />;
}

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;
export default ArticleHeader;
