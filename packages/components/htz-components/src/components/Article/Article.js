/* global fetch, Headers */
import React, { Fragment, } from 'react';
import { createComponent, withTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import ActionButtons from '../ActionButtons/ActionButtons';
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
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  commentsElementId: null,
  contentId: null,
  setCommentsData: null,
  exclusive: null,
  modDate: null,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const breadCrumbsStyle = () => ({
  marginTop: '2rem',
  marginBottom: '3rem',
});
const BreadCrumbs = createComponent(breadCrumbsStyle);

const headerStyle = ({ theme, }) => ({
  marginBottom: '2rem',
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

const sharingToolsStyle = ({ theme, }) => ({
  ...theme.mq({ until: 'm', }, { display: 'none', }),
  ...headerStyle({ theme, }),
});
const SharingTools = createComponent(sharingToolsStyle, ActionButtons, props =>
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

class Article extends React.Component {
  state = {
    articleUrl: 'https://www.haaretz.co.il/magazine/tozeret/1.5912533', // TODO move all of it to store
    facebookCount: null,
    headlineElement: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.headlineElement !== nextState.headlineElement ||
      this.state.facebookCount !== nextState.facebookCount ||
      this.props !== nextProps
    );
  }

  componentDidUpdate() {
    this.updateArticleMeta();
  }

  setHeadlineElement = elementObj =>
    this.setState({
      headlineElement: elementObj,
    });

  getFacebookCount = () => {
    const accessToken =
      'EAABkq33GsqwBAMhelXM0V7xJQmgJ1sf0nvxZAyZBZAtStCyZC6Is1m1OgnsL1Jxsw6BJx0zaZA1TOZBrZAYVMiNNEqLwb4ZARsYUZCEKZAG6r4Wnuminzgi41WQUZCCKvpdhjuHKgh1s3R3fWKjZA4rXvYEoHxgWRSzvFrRMkALfoQUAVwZDZD';
    const url = `https://graph.facebook.com/?fields=share&access_token=${accessToken}&id=${
      this.state.articleUrl
    }&format=json`;

    return fetch(url, {
      method: 'get',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(data => this.setState({ facebookCount: data.share.share_count, }))
      .catch(error => console.log('error: ', error));
  };

  updateArticleMeta = () => {
    const { commentsElementId, contentId, setCommentsData, } = this.props;
    setCommentsData && setCommentsData(contentId, commentsElementId);
    this.getFacebookCount(this.state.articleUrl);
  };

  render() {
    const {
      articleType, // eslint-disable-line no-unused-vars
      authors,
      body,
      exclusive,
      modDate, // eslint-disable-line no-unused-vars
      pubDate,
      subtitle,
      theme,
      title,
    } = this.props;
    return (
      <Fragment>
        <BreadCrumbs>BreadCrumbs Here</BreadCrumbs>
        <Header
          author={authors[0]}
          kicker={exclusive}
          publishDateTime={pubDate}
          subtitle={subtitle}
          title={title}
        />
        <SharingTools
          articleTitle={title}
          articleUrl={this.state.articleUrl}
          buttons={{
            start: [
              {
                name: 'facebookLogo',
                buttonText: this.state.facebookCount,
                iconStyles: {
                  color: theme.color('facebook'),
                },
              },
              {
                name: 'whatsapp',
                iconStyles: {
                  color: theme.color('whatsapp'),
                },
              },
              'mailAlert',
            ],
            end: [
              {
                name: 'comments',
                buttonText: 78,
              },
              'print',
              {
                name: 'zen',
                buttonText: 'קריאת זן',
              },
            ],
          }}
          globalButtonsStyles={{
            minWidth: '10rem',
          }}
          globalIconsStyles={{
            color: theme.color('primary'),
          }}
          size={2.5}
        />
        {this.state.headlineElement && (
          <HeadlineElement elementObj={this.state.headlineElement} />
        )}
        <Body body={body} setHeadlineElement={this.setHeadlineElement} />
      </Fragment>
    );
  }
}

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default withTheme(Article);
