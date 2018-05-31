import React from 'react';
import { createComponent, } from 'react-fela';
import { ApolloConsumer, } from 'react-apollo';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { parseComponentProp, borderBottom, } from '@haaretz/htz-css-tools';
import getComponent from '../../../utils/componentFromInputTemplate';
import Article from '../../Article/Article';
import SideBar from '../../SideBar/SideBar';
import { buildUrl, } from '../../../utils/buildImgURLs';

const Osaka = dynamic(import('../../Osaka/OsakaController'), { ssr: false, });

const propTypes = {
  content: PropTypes.shape({
    article: PropTypes.arrayOf(PropTypes.shape({})),
    aside: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  seo: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    metaKeywords: PropTypes.string,
    canonicalUrl: PropTypes.string,
    ogTitle: PropTypes.string,
    ogDescription: PropTypes.string,
    ogImage: PropTypes.shape({}),
    obTitle: PropTypes.string,
  }).isRequired,
  lineage: PropTypes.arrayOf(
    PropTypes.shape({
      pathSegment: PropTypes.string,
      contentId: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
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
  backgroundColor: theme.color('neutral', '-10'),
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
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
    articleHeight: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleWidth: this.container.offsetWidth,
      articleHeight: this.sideBar.offsetHeight,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.articleId !== nextState.articleId ||
      this.props !== nextProps ||
      this.state.articleHeight !== nextState.articleHeight
    );
  }

  extractContent = content =>
    content.map(element => {
      if (element.inputTemplate === 'com.htz.StandardArticle') {
        return (
          <ArticleSection>
            <Article
              {...element}
              breadcrumbs={this.props.lineage}
              setCommentsData={this.updateState}
            />
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
    const {
      metaTitle,
      metaDescription,
      metaKeywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      obTitle,
    } = this.props.seo;
    const { contentId, imgArray, aspects, } = ogImage || {};
    const ogImageUrl = ogImage
      ? buildUrl(
        contentId,
        { ...imgArray[0], aspects, },
        {
          width: '1200',
          aspect: 'full',
          quality: 'auto',
        }
      )
      : '';
    return (
      <ApolloConsumer>
        {cache => {
          cache.writeData({
            data: {
              canonicalUrl,
            },
          });
          return (
            <ArticleContainer
              // eslint-disable-next-line no-return-assign
              innerRef={container => (this.container = container)}
            >
              <Head>
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="ob:title" content={obTitle} />
              </Head>
              <Osaka width={this.state.articleWidth} />
              {this.extractContent(article)}
              <ArticleAside
                // eslint-disable-next-line no-return-assign
                innerRef={sideBar => (this.sideBar = sideBar)}
              >
                <SideBar height={this.state.articleHeight}>
                  {this.extractContent(aside)}
                </SideBar>
              </ArticleAside>
            </ArticleContainer>
          );
        }}
      </ApolloConsumer>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
