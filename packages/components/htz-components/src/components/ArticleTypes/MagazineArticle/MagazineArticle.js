import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { FelaComponent, FelaTheme, } from 'react-fela';
import Query from '../../ApolloBoundary/Query';
import ApolloConsumer from '../../ApolloBoundary/ApolloConsumer';
import ArticleLayout from '../../PageLayout/ArticleLayout';
import MAGAZINE_ARTICLE_QUERY from './queries/magazine_article';
import { buildUrl, } from '../../../utils/buildImgURLs';
import MagazineArticleHeader from './MagazineElements/MagazineArticleHeader';
import MagazineArticleBody from './MagazineElements/MagazineArticleBody';
import ArticleHeaderMeta from '../../ArticleHeader/ArticleHeaderMeta';
import WideArticleLayoutRow from '../../PageLayout/WideArticleLayoutRow';
import ArticleLayoutRow from '../../PageLayout/ArticleLayoutRow';
import LayoutContainer from '../../PageLayout/LayoutContainer';

import getComponent from '../../../utils/componentFromInputTemplate';

const magazineLayout = {
  innerPadding: {
    xl: '45rem',
    l: {
      start: '22rem',
      end: '42rem',
    },
    ml: {
      start: '16rem',
      end: '16rem',
    },
    m: '2rem',
    s: '2rem',
  },
  maxWidth: {
    xl: '176rem',
    l: '163rem',
    ml: '126rem',
    m: '100rem',
    s: '100%',
  },
  spacing: {
    xl: '3rem',
    l: '3rem',
    ml: '3rem',
    m: '4rem',
    s: '2rem',
  },
};

function MagazineArticle({ articleId, slots, }) {
  return (
    <ArticleLayout
      articleId={articleId}
      slots={slots}
      rowBgc="white"
      mastheadFullWidthBorder
      renderPostHeader={false}
    >
      <Query query={MAGAZINE_ARTICLE_QUERY} partialRefetch variables={{ path: articleId, }}>
        {({ loading, error, data, }) => {
          if (loading) return null;
          if (error) return null;
          const {
            slots: { article, },
            seoData: {
              metaTitle,
              metaDescription,
              metaKeywords,
              canonicalUrl,
              amphtml,
              ogTitle,
              ogDescription,
              ogImage,
              obTitle,
            },
          } = data.page;

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

          const magazineArticleElement = article.find(
            // todo: change to magazine inputTemplate after updating papi
            element => element.inputTemplate === 'com.htz.StandardArticle'
              || element.inputTemplate === 'com.tm.StandardArticle'
          );

          const {
            authors,
            body,
            // socialMetaData: { articleRankersCounter, articleRankCounter, },
            header,
            headlineElement,
            reportingFrom,
            magazineArticleViewType,
          } = magazineArticleElement;

          return (
            <FelaTheme
              render={theme => (
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
                    <link rel="canonical" href={canonicalUrl} />
                    {amphtml ? <link rel="amphtml" href={amphtml} /> : null}
                  </Head>
                  <MagazineArticleHeader
                    {...header}
                    articleId={articleId}
                    authors={authors}
                    canonicalUrl={canonicalUrl}
                    headlineElement={headlineElement}
                    reportingFrom={reportingFrom}
                    magazineLayout={magazineLayout}
                    variationB={magazineArticleViewType === 'side'}
                  />
                  {authors ? (
                    <FelaComponent
                      style={{
                        maxWidth: magazineLayout.maxWidth.xl,
                        paddingInlineStart: magazineLayout.innerPadding.xl,
                        paddingInlineEnd: magazineLayout.innerPadding.xl,
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        // position: 'relative',
                        extend: [
                          theme.mq(
                            { from: 'l', until: 'xl', },
                            {
                              maxWidth: magazineLayout.maxWidth.l,
                              paddingInlineStart: magazineLayout.innerPadding.l.start,
                              paddingInlineEnd: magazineLayout.innerPadding.l.end,
                            }
                          ),
                          theme.mq({ until: 'l', }, { display: 'none', }),
                        ],
                      }}
                    >
                      <FelaComponent
                        style={{
                          zIndex: 1,
                          paddingTop: '1rem',
                          extend: [
                            theme.mq(
                              { from: 'xl', },
                              {
                                float: 'right',
                                clear: 'right',
                                marginBottom: '4rem',
                                marginInlineStart: `-${magazineLayout.innerPadding.xl}`,
                                paddingInlineEnd: magazineLayout.spacing.xl,
                                width: magazineLayout.innerPadding.xl,
                              }
                            ),
                            theme.mq(
                              { from: 'l', until: 'xl', },
                              {
                                float: 'right',
                                clear: 'right',
                                marginBottom: '4rem',
                                marginInlineStart: `-${magazineLayout.innerPadding.l.start}`,
                                paddingInlineEnd: magazineLayout.spacing.l,
                                width: magazineLayout.innerPadding.l.start,
                              }
                            ),
                          ],
                        }}
                      >
                        <ArticleHeaderMeta
                          authors={authors}
                          reportingFrom={reportingFrom}
                          publishDate={header.pubDate}
                          modifiedDate={header.modDate}
                          miscStyles={{ alignItems: 'flex-start', }}
                        />
                      </FelaComponent>
                    </FelaComponent>
                  ) : null}
                  {article.map(element => {
                    if (
                      element.inputTemplate === 'com.htz.ArticleHeaderElement'
                      || element.inputTemplate === 'com.tm.PageTitle'
                    ) {
                      return null;
                    }

                    if (
                      element.inputTemplate === 'com.htz.StandardArticle'
                      || element.inputTemplate === 'com.mouse.story.MouseStandardStory'
                      || element.inputTemplate === 'com.tm.BlogArticle'
                      || element.inputTemplate === 'com.tm.StandardArticle'
                    ) {
                      return (
                        <ApolloConsumer key={element.contentId}>
                          {cache => {
                            const { commentsElementId, } = element;
                            cache.writeData({
                              data: {
                                commentsElementId,
                              },
                            });

                            return (
                              <MagazineArticleBody body={body} magazineLayout={magazineLayout} />
                            );
                          }}
                        </ApolloConsumer>
                      );
                    }

                    const Element = getComponent(element.inputTemplate);
                    const { properties, ...elementWithoutProperties } = element;
                    if (
                      element.inputTemplate === 'com.polobase.OutbrainElement'
                      || element.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
                    ) {
                      return (
                        <LayoutContainer>
                          <WideArticleLayoutRow
                            key={element.contentId}
                            hideDivider
                            {...(element.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
                              ? {
                                miscStyles: {
                                  display: [ { until: 's', value: 'none', }, ],
                                },
                              }
                              : {})}
                          >
                            <Element
                              articleId={articleId}
                              {...elementWithoutProperties}
                              {...properties}
                            />
                          </WideArticleLayoutRow>
                        </LayoutContainer>
                      );
                    }
                    return (
                      <LayoutContainer miscStyles={{ paddingInlineEnd: '30rem', paddingInlineStart: '30rem', }}>
                        <ArticleLayoutRow
                          key={element.contentId}
                          {...(element.inputTemplate === 'com.tm.ArticleCommentsElement'
                            ? {
                              title: theme.articleLayoutI18n.commentSectionTitle,
                              id: 'commentsSection',
                            }
                            : {})}
                        >
                          <Element
                            articleId={articleId}
                            {...elementWithoutProperties}
                            {...properties}
                          />
                        </ArticleLayoutRow>
                      </LayoutContainer>
                    );
                  })}
                </article>
              )}
            />
          );
        }}
      </Query>
    </ArticleLayout>
  );
}

MagazineArticle.propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,

  slots: PropTypes.shape({}).isRequired,
};
export default MagazineArticle;
