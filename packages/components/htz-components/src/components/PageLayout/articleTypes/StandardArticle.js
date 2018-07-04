/* global fetch, Headers */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloConsumer, } from 'react-apollo';
import { borderTop, } from '@haaretz/htz-css-tools';

import getComponent from '../../../utils/componentFromInputTemplate';
import ArticleBody from '../../ArticleBody/ArticleBody';
import ArticleHeaderMeta from '../../ArticleHeader/ArticleHeaderMeta';
import H from '../../AutoLevels/H';
import Section from '../../AutoLevels/Section';
import StandardArticleHeader from './StandardArticleElements/StandardArticleHeader';
import LayoutRow from '../../PageLayout/LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from '../../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default
import SideBar from '../../SideBar/SideBar';
import Zen from '../../Zen/Zen';
import { buildUrl, } from '../../../utils/buildImgURLs';

// const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const startSideElementStyle = ({ theme, hideUnderLargeBreakPoint, }) => ({
  extend: [
    ...(hideUnderLargeBreakPoint
      ? [ theme.mq({ until: 'l', }, { display: 'none', }), ]
      : []),
    theme.mq(
      { from: 'l', },
      {
        position: 'absolute',
        start: '2rem',
        maxWidth: '25rem',
      }
    ),
  ],
});

// eslint-disable-next-line react/prop-types
const SectionTitle = ({ title, }) => (
  <FelaComponent
    style={theme => ({
      color: theme.color('primary'),
      fontWeight: 'bold',
      extend: [
        theme.type(3, { fromBp: 'l', }),
        theme.type(1, { untilBp: 'l', }),
        theme.mq({ until: 'l', }, { marginInlineStart: '2rem', }),
      ],
    })}
    render={({ className, }) => <H className={className}>{title}</H>}
  />
);
/* eslint-disable react/prop-types */
const StandardLayoutRow = ({
  children,
  publishDate,
  authors,
  title,
  isArticleBody,
  /* eslint-enable react/prop-types */
}) => (
  <FelaComponent
    style={theme => ({
      extend: [
        borderTop(
          '2px',
          isArticleBody ? 0 : 6,
          'solid',
          isArticleBody ? 'transparent' : theme.color('primary')
        ),
      ],
    })}
    render={({ className, }) => (
      <Section className={className}>
        <FelaComponent
          style={theme => ({
            position: 'relative',
            paddingInlineStart: [ { from: 'l', value: '44rem', }, ],
            extend: [ theme.mq({ from: 'l', }, { paddingInlineStart: '25rem', }), ],
          })}
        >
          <FelaComponent
            rule={startSideElementStyle}
            hideUnderLargeBreakPoint={!!authors}
          >
            {authors && (
              <ArticleHeaderMeta authors={authors} publishDate={publishDate} />
            )}
            {title && <SectionTitle title={title} />}
          </FelaComponent>
          <FelaComponent
            style={theme => ({
              extend: [
                theme.mq(
                  { until: 'l', },
                  { paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }
                ),
                theme.mq(
                  { from: 'l', },
                  { paddingInlineStart: '5rem', paddingInlineEnd: '5rem', }
                ),
              ],
            })}
          >
            {children}
          </FelaComponent>
        </FelaComponent>
      </Section>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const WideLayoutRow = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      extend: [ borderTop('2px', 6, 'solid', theme.color('primary')), ],
    })}
    render={({ className, }) => (
      <Section className={className}>{children}</Section>
    )}
  />
);

class StandardArticle extends React.Component {
  static propTypes = {
    /**
     * Article's ID
     */
    articleId: PropTypes.string.isRequired,
    article: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    aside: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    seoData: PropTypes.shape({}).isRequired,
  };

  state = {
    articleUrl: null,
    articleTitle: null,
    facebookCount: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props !== nextProps || this.state.articleUrl !== nextState.articleUrl
    );
  }

  componentDidUpdate() {
    if (!this.state.facebookCount) {
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

    const breadCrumbs = article.find(
      element => element.inputTemplate === 'com.tm.PageTitle'
    );

    const header = article.find(
      element => element.inputTemplate === 'com.htz.ArticleHeaderElement'
    );
    const headerData = header.data;
    const standardArticleElement = article.find(
      element =>
        element.inputTemplate === 'com.htz.StandardArticle' ||
        element.inputTemplate === 'com.tm.StandardArticle'
    );

    const authors = standardArticleElement.authors;

    const { body, headlineElement, } = this.extractHeadline(
      standardArticleElement.body
    );

    return (
      <article>
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

        <FelaComponent
          render={({ theme, }) => (
            <LayoutRow
              tagName="div"
              miscStyles={{ display: [ { from: 'l', value: 'flex', }, ], }}
            >
              <LayoutContainer bgc="white">
                <StandardArticleHeader
                  // Guy Kedar:
                  // Overide header data authors with authors from standard article element.
                  // currently papi doesnt export full authors in the headline element,
                  // e.g doesnt export hasEmailAlerts
                  // todo: remove overide when papi exports authors as needed in the headerElement
                  {...{ ...headerData, authors, }}
                  // {...headerData}
                  articleId={articleId}
                  hasBreadCrumbs={!!breadCrumbs}
                  elementName={this.state.articleTitle}
                  elementUrl={this.state.articleUrl}
                  elementObj={headlineElement}
                  facebookCount={this.state.facebookCount}
                />
                {/* Main */}

                <div>
                  {article.map(element => {
                    if (
                      element.inputTemplate ===
                        'com.htz.ArticleHeaderElement' ||
                      element.inputTemplate === 'com.tm.PageTitle'
                    ) {
                      return null;
                    }
                    if (
                      element.inputTemplate === 'com.htz.StandardArticle' ||
                      element.inputTemplate === 'com.tm.StandardArticle'
                    ) {
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
                              <StandardLayoutRow
                                isArticleBody
                                authors={authors}
                                publishDate={headerData.publishDate}
                              >
                                <ArticleBody body={body} />
                              </StandardLayoutRow>
                            );
                          }}
                        </ApolloConsumer>
                      );
                    }
                    const Element = getComponent(element.inputTemplate);
                    const { properties, ...elementWithoutProperties } = element;
                    if (
                      element.inputTemplate ===
                        'com.polobase.OutbrainElement' ||
                      element.inputTemplate ===
                        'com.polobase.ClickTrackerBannersWrapper'
                    ) {
                      return (
                        <WideLayoutRow>
                          <Element
                            key={element.contentId}
                            articleId={this.props.articleId}
                            {...elementWithoutProperties}
                            {...properties}
                          />
                        </WideLayoutRow>
                      );
                    }
                    return (
                      <StandardLayoutRow
                        {...(element.inputTemplate ===
                        'com.tm.ArticleCommentsElement'
                          ? // todo: theme
                            { title: 'תגובות', }
                          : {})}
                      >
                        <Element
                          key={element.contentId}
                          articleId={articleId}
                          {...elementWithoutProperties}
                          {...properties}
                        />
                      </StandardLayoutRow>
                    );
                  })}
                </div>
              </LayoutContainer>

              <FelaComponent
                style={{
                  backgroundColor: 'white',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'flex-start',
                  extend: [
                    theme.mq({ until: 'l', }, { display: 'none', }),
                    theme.mq({ from: 'l', }, { width: '67rem', }),
                  ],
                }}
                render={({ className, }) => (
                  <aside
                    className={className}
                    ref={side => {
                      this.side = side;
                    }}
                  >
                    <Zen animate miscStyles={{ height: '100%', }}>
                      <SideBar height={this.side && this.side.offsetHeight}>
                        {aside.map(element => {
                          const Element = getComponent(element.inputTemplate);
                          const {
                            properties,
                            ...elementWithoutProperties
                          } = element;
                          return (
                            <Element
                              key={element.contentId}
                              articleId={articleId}
                              {...elementWithoutProperties}
                              {...properties}
                            />
                          );
                        })}
                      </SideBar>
                    </Zen>
                  </aside>
                )}
              />
            </LayoutRow>
          )}
        />
      </article>
    );
  }
}

export default StandardArticle;
