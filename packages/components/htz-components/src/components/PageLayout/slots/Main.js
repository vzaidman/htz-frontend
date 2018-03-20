import React from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, borderBottom, } from '@haaretz/htz-css-tools';
import getComponent from '../../../utils/componentFromInputTemplate';
import Article from '../../Article/Article';

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
  ...parseComponentProp(
    'paddingLeft',
    [
      { until: 'l', value: 'unset', },
      { from: 'l', value: 'calc(300px + 4rem + 4rem)', },
    ],
    theme.mq,
    mediaQueryCallback
  ),
});
const Wrapper = createComponent(mainWrapper, 'main');

const leftSlotWrapper = ({ theme, }) => ({
  position: 'absolute',
  height: '100%',
  width: '300px',
  top: '0',
  left: '4rem',

  ...parseComponentProp(
    'display',
    [ { until: 'l', value: 'none', }, { from: 'l', value: 'block', }, ],
    theme.mq,
    mediaQueryCallback
  ),
});
const LeftSlotWrapper = createComponent(leftSlotWrapper, 'aside');

const leftSlotStyle = ({ theme, }) => ({
  backgroundColor: 'red',
  position: 'sticky',
  width: '100%',
  top: '12px',
});
const LeftSlot = createComponent(leftSlotStyle);

const wrapperStyle = () => ({
  display: 'flex',
});
const CommentsWrapper = createComponent(wrapperStyle, 'section');

const asideStyle = ({ theme, }) => ({
  ...parseComponentProp(
    'minWidth',
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
const CommentsAside = createComponent(asideStyle, 'aside');

const commentsStyle = ({ theme, }) => ({
  width: '100%',
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
  };

  extractContent = content =>
    content.map(element => {
      if (element.inputTemplate === 'com.htz.StandardArticle') {
        return <Article {...element} setCommentsData={this.updateState} />;
      }
      const Element = getComponent(element.inputTemplate);
      if (element.inputTemplate === 'com.tm.ArticleCommentsElement') {
        return (
          this.state.commentsId && (
            <CommentsWrapper>
              <CommentsAside />
              <ArticleComments>
                <Element
                  key={element.contentId}
                  contentId={this.state.commentsId}
                  articleId={this.state.articleId}
                />
              </ArticleComments>
            </CommentsWrapper>
          )
        );
      }
      return <Element key={element.contentId} {...element} />;
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
      <Wrapper>
        <article>{this.extractContent(article)}</article>
        <LeftSlotWrapper>
          <LeftSlot>{this.extractContent(aside)}</LeftSlot>
        </LeftSlotWrapper>
      </Wrapper>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
