import React, { Fragment, } from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import ArticleBody from '../ArticleBody/ArticleBody';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import HeadlineElement from '../HeadlineElement/HeadlineElement';

const propTypes = {
  /**
   * Type of the article (comes from polopoly).
   */
  articleType: PropTypes.string.isRequired,
  /**
   * Authors list (comes from polopoly).
   */
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Article's main content (comes from polopoly).
   */
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
  /**
   * The id of this article's CommentsElement (comes from polopoly).
   */
  commentsElementId: PropTypes.string,
  /**
   * This article id (comes from polopoly).
   */
  contentId: PropTypes.string,
  /**
   * A callback that takes this article's id and this article commentsElement's id,
   * and loads the [comments section](./#commentswithapollo)
   */
  setCommentsData: PropTypes.func,
  /**
   * Article's kicker (comes from polopoly).
   */
  exclusive: PropTypes.string,
  /**
   * Article's modification date (comes from polopoly).
   */
  modDate: PropTypes.number,
  /**
   * Article's publication date (comes from polopoly).
   */
  pubDate: PropTypes.number.isRequired,
  /**
   * Article's secondary headline (comes from polopoly).
   */
  subtitle: PropTypes.string.isRequired,
  /**
   * Article's main headline (comes from polopoly).
   */
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  commentsElementId: null,
  contentId: null,
  setCommentsData: null,
  exclusive: null,
  modDate: null,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const wrapperStyle = () => ({
  display: 'flex',
});
const ArticleWrapper = createComponent(wrapperStyle, 'article');

const contentStyle = ({ theme, }) => ({
  ...parseComponentProp(
    'width',
    theme.articleStyle.article.width,
    theme.mq,
    mediaQueryCallback
  ),
});
const ArticleContent = createComponent(contentStyle);

const asideStyle = ({ theme, }) => ({
  ...parseComponentProp(
    'width',
    theme.articleStyle.aside.width,
    theme.mq,
    mediaQueryCallback
  ),
  ...parseComponentProp(
    'display',
    theme.articleStyle.aside.display,
    theme.mq,
    mediaQueryCallback
  ),
  backgroundColor: theme.color('primary', '-6'),
});
const ArticleAside = createComponent(asideStyle, 'aside');

const breadCrumbsStyle = () => ({
  marginTop: '2rem',
  marginBottom: '3rem',
});
const BreadCrumbs = createComponent(breadCrumbsStyle);

const headerStyle = ({ theme, }) => ({
  marginBottom: '3rem',
  extend: [
    ...[
      parseComponentProp(
        'marginStart',
        theme.articleStyle.header.marginStart,
        theme.mq,
        mediaQueryCallback
      ),
    ],
    ...[
      parseComponentProp(
        'marginEnd',
        theme.articleStyle.header.marginEnd,
        theme.mq,
        mediaQueryCallback
      ),
    ],
  ],
});
const Header = createComponent(headerStyle, ArticleHeader, props =>
  Object.keys(props)
);

const bodyStyle = ({ theme, }) => ({
  extend: [
    ...[
      parseComponentProp(
        'width',
        theme.articleStyle.body.width,
        theme.mq,
        mediaQueryCallback
      ),
    ],
    ...[
      parseComponentProp(
        'marginStart',
        theme.articleStyle.body.marginStart,
        theme.mq,
        mediaQueryCallback
      ),
    ],
    ...[
      parseComponentProp(
        'marginEnd',
        theme.articleStyle.body.marginEnd,
        theme.mq,
        mediaQueryCallback
      ),
    ],
  ],
});
const Body = createComponent(bodyStyle, ArticleBody, props =>
  Object.keys(props)
);

const sharingToolsStyle = () => ({
  marginBottom: '2rem',
});
const SharingTools = createComponent(sharingToolsStyle);

class Article extends React.Component {
  state = {
    headlineElement: null,
  };

  componentDidMount() {
    const { commentsElementId, contentId, setCommentsData, } = this.props;
    setCommentsData && setCommentsData(contentId, commentsElementId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.headlineElement !== nextState.headlineElement;
  }

  setHeadlineElement = elementObj =>
    this.setState({
      headlineElement: elementObj,
    });

  render() {
    const {
      articleType, // eslint-disable-line no-unused-vars
      authors,
      body,
      exclusive,
      modDate, // eslint-disable-line no-unused-vars
      pubDate,
      subtitle,
      title,
    } = this.props;
    return (
      <Fragment>
        <ArticleWrapper>
          <ArticleAside />
          <ArticleContent>
            <BreadCrumbs>BreadCrumbs Here</BreadCrumbs>
            <Header
              author={authors[0]}
              kicker={exclusive}
              publishDateTime={pubDate}
              subtitle={subtitle}
              title={title}
            />
            <SharingTools>SharingTools Here</SharingTools>
            {this.state.headlineElement && (
              <HeadlineElement elementObj={this.state.headlineElement} />
            )}
            <Body body={body} setHeadlineElement={this.setHeadlineElement} />
          </ArticleContent>
        </ArticleWrapper>
      </Fragment>
    );
  }
}

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;
