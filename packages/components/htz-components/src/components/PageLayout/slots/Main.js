/* global fetch, Headers */
import React from 'react';
import { createComponent, FelaTheme, FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { parseComponentProp, borderBottom, } from '@haaretz/htz-css-tools';
import getComponent from '../../../utils/componentFromInputTemplate';

import ArticleBody from '../../ArticleBody/ArticleBody';
import HeadlineElement from '../../HeadlineElement/HeadlineElement';
import ArticleHeader from '../../ArticleHeader/ArticleHeader';
import ActionButtons from '../../ActionButtons/ActionButtons';
import SideBar from '../../SideBar/SideBar';
import { buildUrl, } from '../../../utils/buildImgURLs';
import ArticleContentQuery from '../queries/article_content';

const Osaka = dynamic(import('../../Osaka/OsakaController'), { ssr: false, });

const propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
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
const ArticleSection = createComponent(sectionStyle);

const wideStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral', '-10'),
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
});
const ArticleWide = createComponent(wideStyle);

// eslint-disable-next-line react/prop-types
const BodyWrapper = ({ children, }) => (
  <FelaComponent
    style={theme => ({
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
    })}
  >
    {children}
  </FelaComponent>
);

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
    articleUrl: null,
    articleTitle: null,
    articleWidth: null,
    articleHeight: null,
    facebookCount: null,
  };

  componentDidMount() {
    this.getFacebookCount(this.state.articleUrl);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleWidth: this.container && this.container.offsetWidth,
      articleHeight: this.sideBar && this.sideBar.offsetHeight,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props !== nextProps ||
      this.state.facebookCount !== nextState.facebookCount ||
      this.state.articleUrl !== nextState.articleUrl ||
      this.state.articleHeight !== nextState.articleHeight
    );
  }

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

  extractHeadline = articleBody => {
    const mediaComponents = [
      'embedElement',
      'com.tm.Image',
      'com.tm.Video',
      'com.tm.ImageGalleryElement',
    ];
    // creating a copy because arrays from apollo are sealed.
    const body = [ ...articleBody, ];
    const element = body[0];
    const elementType = element.elementType || element.inputTemplate || null;
    if (mediaComponents.includes(elementType)) {
      body.shift();
      return { body, headlineElement: element, };
    }
    return { body, };
  };

  extractContent = (content, client) =>
    content.map(element => {
      if (element.inputTemplate === 'com.htz.StandardArticle') {
        const { commentsElementId, } = element;
        client.writeData({
          data: {
            commentsElementId,
          },
        });
        const { body, headlineElement, } = this.extractHeadline(element.body);
        return (
          <ArticleSection>
            {headlineElement && (
              <HeadlineElement elementObj={headlineElement} />
            )}
            <BodyWrapper>
              <ArticleBody body={body} />
            </BodyWrapper>
          </ArticleSection>
        );
      }
      if (element.inputTemplate === 'com.htz.ArticleHeaderElement') {
        return (
          <ArticleSection>
            <Header {...element.data} />
            <FelaTheme
              render={theme => (
                <SharingTools
                  elementName={this.state.articleTitle}
                  elementUrl={this.state.articleUrl}
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
              )}
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
                  articleId={this.props.articleId}
                />
              </ArticleComments>
            </ArticleSection>
          )
        );
      }
      if (element.inputTemplate === 'com.polobase.OutbrainElement') {
        return (
          <ArticleWide>
            <Element
              key={element.contentId}
              articleId={this.props.articleId}
              {...element}
            />
          </ArticleWide>
        );
      }
      return (
        <ArticleSection>
          <BodyWrapper>
            <Element
              key={element.contentId}
              articleId={this.props.articleId}
              {...element}
            />
          </BodyWrapper>
        </ArticleSection>
      );
    });

  updateState = commentsId => console.log('commentsId: ', commentsId);

  render() {
    const { articleId, } = this.props;
    return (
      <Query query={ArticleContentQuery} variables={{ path: articleId, }}>
        {({ loading, error, data, client, }) => {
          if (loading) return <p>loading...</p>;
          if (error) return null;
          const {
            slots: { article, aside, },
            seoData: {
              metaTitle,
              metaDescription,
              metaKeywords,
              canonicalUrl,
              ogTitle,
              ogDescription,
              ogImage,
              obTitle,
            },
          } = data.page;
          client.writeData({
            data: {
              canonicalUrl,
            },
          });
          this.setState({
            articleUrl: canonicalUrl,
            articleTitle: metaTitle,
          });
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
              {this.extractContent(article, client)}
              <ArticleAside
                // eslint-disable-next-line no-return-assign
                innerRef={sideBar => (this.sideBar = sideBar)}
              >
                <SideBar height={this.state.articleHeight}>
                  {aside.map(element => {
                    const Element = getComponent(element.inputTemplate);
                    return (
                      <Element
                        key={element.contentId}
                        articleId={this.props.articleId}
                        {...element}
                      />
                    );
                  })}
                </SideBar>
              </ArticleAside>
            </ArticleContainer>
          );
        }}
      </Query>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
