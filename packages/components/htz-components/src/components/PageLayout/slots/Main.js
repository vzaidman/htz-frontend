import React from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { parseComponentProp, borderBottom, } from '@haaretz/htz-css-tools';
import getComponent from '../../../utils/componentFromInputTemplate';
import Article from '../../Article/Article';

const Osaka = dynamic(import('../../Osaka/OsakaController'), { ssr: false, });

const propTypes = {
  content: PropTypes.shape({
    article: PropTypes.object,
    aside: PropTypes.object,
  }).isRequired,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const mainWrapper = ({ theme, }) => ({
  position: 'relative',
  backgroundColor: theme.color('neutral', '-10'),
  paddingBottom: '8rem',
  ...borderBottom('2px', 8, 'solid', theme.color('primary')),
  ':before': {
    backgroundColor: theme.color('primary', '-6'),
    content: '""',
    height: '100%',
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: '0',
    extend: [
      ...[
        parseComponentProp(
          'width',
          theme.articleStyle.article.marginStart,
          theme.mq,
          mediaQueryCallback
        ),
      ],
    ],
  },
});
const ArticleContainer = createComponent(mainWrapper, 'article');

const sectionStyle = ({ theme, }) => ({
  extend: [
    ...[
      parseComponentProp(
        'marginStart',
        theme.articleStyle.article.marginStart,
        theme.mq,
        mediaQueryCallback
      ),
    ],
    ...[
      parseComponentProp(
        'marginEnd',
        theme.articleStyle.article.marginEnd,
        theme.mq,
        mediaQueryCallback
      ),
    ],
  ],
});
const ArticleSection = createComponent(sectionStyle, 'section');

const wideStyle = ({ theme, }) => ({
  position: 'relative',
  backgroundColor: theme.color('neutral', '-10'),
  extend: [
    ...[
      parseComponentProp(
        'marginEnd',
        theme.articleStyle.article.marginEnd,
        theme.mq,
        mediaQueryCallback
      ),
    ],
  ],
});
const ArticleWide = createComponent(wideStyle, 'section');

const asideStyle = ({ theme, }) => ({
  position: 'absolute',
  height: '100%',
  top: '0',
  left: '0',
  extend: [
    ...[
      parseComponentProp(
        'width',
        theme.articleStyle.article.marginEnd,
        theme.mq,
        mediaQueryCallback
      ),
    ],
    ...[
      parseComponentProp(
        'display',
        theme.articleStyle.article.aside,
        theme.mq,
        mediaQueryCallback
      ),
    ],
  ],
});
const ArticleAside = createComponent(asideStyle, 'aside');

const stickyStyle = ({ theme, }) => ({
  backgroundColor: 'red',
  position: 'sticky',
  width: '100%',
  top: '12px',
});
const Sticky = createComponent(stickyStyle);

const commentsStyle = ({ theme, }) => ({
  extend: [
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
const ArticleComments = createComponent(commentsStyle);

class Main extends React.Component {
  state = {
    articleId: null,
    commentsId: null,
    articleWidth: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleWidth: this.container.offsetWidth,
    });
  }

  extractContent = content =>
    content.map(element => {
      if (element.inputTemplate === 'com.htz.StandardArticle') {
        return (
          <ArticleSection>
            <Article {...element} setCommentsData={this.updateState} />
          </ArticleSection>
        );
      }
      const Element = getComponent(element.inputTemplate);
      if (element.inputTemplate === 'com.tm.ArticleCommentsElement') {
        return (
          this.state.commentsId && (
            <ArticleSection>
              <ArticleComments>
                <Element
                  key={element.contentId}
                  contentId={this.state.commentsId}
                  articleId={this.state.articleId}
                />
              </ArticleComments>
            </ArticleSection>
          )
        );
      }
      return (
        <ArticleWide>
          <Element key={element.contentId} {...element} />
        </ArticleWide>
      );
    });

  updateState = (articleId, commentsId) => {
    this.setState({
      articleId,
      commentsId,
    });
  };

  render() {
    const { article, aside, } = this.props.content;
    return (
      <ArticleContainer
        innerRef={container => (this.container = container)} // eslint-disable-line no-return-assign
      >
        <Osaka width={this.state.articleWidth} />
        {this.extractContent(article)}
        <ArticleAside>
          <Sticky>{this.extractContent(aside)}</Sticky>
        </ArticleAside>
      </ArticleContainer>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
