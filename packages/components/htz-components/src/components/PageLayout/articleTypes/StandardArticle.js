/* global fetch, Headers */
import React from 'react';
import { createComponent, FelaTheme, FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloConsumer, } from 'react-apollo';
import { parseComponentProp, borderBottom, } from '@haaretz/htz-css-tools';

import getComponent from '../../../utils/componentFromInputTemplate';
import ArticleBody from '../../ArticleBody/ArticleBody';
import HeaderText from '../../ArticleHeader/HeaderText';
import ArticleHeaderMeta from '../../ArticleHeader/ArticleHeaderMeta';
import ActionButtons from '../../ActionButtons/ActionButtons';
import Media from '../../Media/Media';
import SideBar from '../../SideBar/SideBar';
import HeadlineElement from '../../HeadlineElement/HeadlineElement';
import Zen from '../../Zen/Zen';
import { buildUrl, } from '../../../utils/buildImgURLs';

const propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
  article: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  aside: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  seoData: PropTypes.shape({}).isRequired,
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

const headerStyle = ({ isSharing = false, theme, }) => ({
  marginTop: isSharing ? '1rem' : '3rem',
  marginBottom: '2rem',
  extend: [
    ...(isSharing ? [ theme.mq({ until: 'm', }, { display: 'none', }), ] : []),
    parseComponentProp(
      'marginStart',
      theme.articleStyle.header.marginStart,
      theme.mq,
      mediaQueryCallback
    ),
    parseComponentProp(
      'marginEnd',
      theme.articleStyle.header.marginEnd,
      theme.mq,
      mediaQueryCallback
    ),
  ],
});

// eslint-disable-next-line react/prop-types
const Header = ({ authors, title, subtitle, publishDate, exclusive, }) => (
  <FelaComponent rule={headerStyle} render="header">
    <HeaderText kicker={exclusive} title={title} subtitle={subtitle} />
    <ArticleHeaderMeta
      publishDateTime={publishDate}
      authors={authors}
      miscStyles={{
        marginTop: [
          { until: 's', value: '3rem', },
          { from: 's', until: 'l', value: '2rem', },
        ],
        display: 'flex',
        justifyContent: 'flexStart',
        position: [ { from: 'l', value: 'absolute', }, ],
        top: [ { from: 'l', value: '3rem', }, ],
        right: [ { from: 'l', value: '3rem', }, ],
      }}
    />
  </FelaComponent>
);

const SharingTools = props => (
  <FelaComponent rule={headerStyle} isSharing>
    <ActionButtons {...props} />
  </FelaComponent>
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
            'margin',
            theme.articleStyle.body.margin,
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
  ],
});
const ArticleAside = createComponent(asideStyle, 'aside');

class StandardArticle extends React.Component {
  state = {
    articleUrl: null,
    articleTitle: null,
    articleWidth: null,
    facebookCount: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleWidth: this.container && this.container.offsetWidth,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props !== nextProps ||
      this.state.articleUrl !== nextState.articleUrl ||
      this.state.articleWidth !== nextState.articleWidth
    );
  }

  componentDidUpdate() {
    if (!this.state.facebookCount && this.state.facebookCount) {
      this.getFacebookCount(this.state.articleUrl);
    }
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

  extractContent = content =>
    content.map(element => {
      // This is the Article Header.
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
      // This is the Article Body.
      if (element.inputTemplate === 'com.htz.StandardArticle') {
        const { body, headlineElement, } = this.extractHeadline(element.body);
        return (
          <ApolloConsumer>
            {cache => {
              const { commentsElementId, } = element;
              cache.writeData({
                data: {
                  commentsElementId,
                },
              });
              return (
                <FelaComponent
                  style={{ marginBottom: '5rem', }}
                  render={({ className, }) => (
                    <ArticleSection className={className}>
                      {headlineElement && (
                        <HeadlineElement elementObj={headlineElement} />
                      )}
                      <BodyWrapper>
                        <ArticleBody body={body} />
                      </BodyWrapper>
                    </ArticleSection>
                  )}
                />
              );
            }}
          </ApolloConsumer>
        );
      }
      const Element = getComponent(element.inputTemplate);
      if (
        element.inputTemplate === 'com.polobase.OutbrainElement' ||
        element.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
      ) {
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

  render() {
    const {
      articleId,
      article,
      aside,
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
    } = this.props;

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
        {this.extractContent(article)}
        <Media
          query={{ from: 'l', }}
          render={() => (
            <Zen animate>
              <ArticleAside>
                <SideBar>
                  {aside.map(element => {
                    const Element = getComponent(element.inputTemplate);
                    return (
                      <Element
                        key={element.contentId}
                        articleId={articleId}
                        {...element}
                      />
                    );
                  })}
                </SideBar>
              </ArticleAside>
            </Zen>
          )}
        />
      </ArticleContainer>
    );
  }
}

StandardArticle.propTypes = propTypes;

export default StandardArticle;
