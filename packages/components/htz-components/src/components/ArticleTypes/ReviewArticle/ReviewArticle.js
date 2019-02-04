import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Query from '../../ApolloBoundary/Query';
import ApolloConsumer from '../../ApolloBoundary/ApolloConsumer';

import LayoutContainer from '../../PageLayout/LayoutContainer';
import WideArticleLayoutRow from '../../PageLayout/WideArticleLayoutRow';
import ArticleLayoutRow from '../../PageLayout/ArticleLayoutRow';
import ArticleLayout from '../../PageLayout/ArticleLayout';
import getComponent from '../../../utils/componentFromInputTemplate';
import ArticleBody from '../../ArticleBody/ArticleBody';
import ArticleHeaderMeta from '../../ArticleHeader/ArticleHeaderMeta';
import ReviewArticleHeader from './ReviewArticleElements/ReviewArticleHeader';
import SideBar from '../../SideBar/SideBar';
import Zen from '../../Zen/Zen';
import ReviewAmenities from './ReviewArticleElements/ReviewAmenities';
import { buildUrl, } from '../../../utils/buildImgURLs';
import ReviewArticleQuery from './queries/review_article';
import ArticleGallery from '../../ArticleGallery/ArticleGallery';

function ReviewArticle({ articleId, slots, path, }) {
  return (
    <ArticleLayout articleId={articleId} slots={slots}>
      <Query query={ReviewArticleQuery} partialRefetch variables={{ path, }}>
        {({ loading, error, data, }) => {
          if (loading) return null;
          if (error) return null;
          const {
            slots: { article, aside, },
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

          const { contentId, imgArray, } = ogImage || {};
          const ogImageUrl = ogImage
            ? buildUrl(
              contentId,
              { ...imgArray[0], },
              {
                width: '1200',
                aspect: 'full',
                quality: 'auto',
              }
            )
            : '';

          const breadCrumbs = article.find(element => element.inputTemplate === 'com.tm.PageTitle');

          const reviewArticleElement = article.find(
            // todo: change to review inputTemplate after updating papi
            element => element.inputTemplate === 'com.htz.StandardArticle'
              || element.inputTemplate === 'com.tm.StandardArticle'
          );

          const {
            amenities,
            authors,
            body,
            header,
            tags,
            reportingFrom,
            reviewType,
            reviewStars,
            headlineElement,
            bookCover,
          } = reviewArticleElement;

          return (
            <FelaTheme
              render={theme => (
                <LayoutContainer tagName="article">
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
                  <ReviewArticleHeader
                    {...header}
                    articleId={articleId}
                    authors={authors}
                    canonicalUrl={canonicalUrl}
                    hasBreadCrumbs={!!breadCrumbs}
                    headlineElement={headlineElement}
                    reportingFrom={reportingFrom}
                  />
                  <FelaComponent style={{ extend: [ theme.mq({ from: 'l', }, { display: 'flex', }), ], }}>
                    <FelaComponent
                      style={{
                        extend: [ theme.mq({ from: 'l', }, { width: 'calc(100% - 300px - 8rem)', }), ],
                      }}
                    >
                      {article.map(element => {
                        if (
                          element.inputTemplate === 'com.htz.ArticleHeaderElement'
                          || element.inputTemplate === 'com.tm.PageTitle'
                          || element.inputTemplate === 'com.tm.element.List'
                        ) {
                          return null;
                        }
                        if (
                          // todo: change to review input template
                          element.inputTemplate === 'com.htz.StandardArticle'
                          || element.inputTemplate === 'com.mouse.story.MouseStandardStory'
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
                                  <ArticleLayoutRow
                                    isArticleBody
                                    hideMargineliaComponentUnderLBp={false}
                                    margineliaComponent={(
                                      <Fragment>
                                        {authors ? (
                                          <ArticleHeaderMeta
                                            authors={authors}
                                            reportingFrom={reportingFrom}
                                            publishDate={header.pubDate}
                                            modifiedDate={header.modDate}
                                            miscStyles={{
                                              display: [ { until: 'l', value: 'none', }, ],
                                            }}
                                          />
                                        ) : null}
                                        <ReviewAmenities
                                          reviewImgData={bookCover}
                                          reviewType={reviewType}
                                          amenitiesItems={amenities}
                                          reviewStars={reviewStars}
                                          miscStyles={{
                                            marginBottom: [ { until: 'l', value: '5rem', }, ],
                                            ...theme.mq(
                                              { until: 'm', },
                                              {
                                                padding: '2rem',
                                                marginInlineStart: '0rem',
                                                marginInlineEnd: '0rem',
                                                marginTop: '-3rem',
                                                backgroundColor: theme.color('primary', '-5'),
                                              }
                                            ),
                                          }}
                                        />
                                      </Fragment>
)}
                                  >
                                    <ArticleBody body={body} tagsList={tags} />
                                  </ArticleLayoutRow>
                                );
                              }}
                            </ApolloConsumer>
                          );
                        }
                        const Element = getComponent(element.kind || element.inputTemplate);
                        const { properties, ...elementWithoutProperties } = element;
                        if (
                          element.inputTemplate === 'com.polobase.OutbrainElement'
                          || element.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
                        ) {
                          return (
                            <WideArticleLayoutRow
                              key={element.contentId}
                              hideDivider
                              {...(element.inputTemplate
                              === 'com.polobase.ClickTrackerBannersWrapper'
                                ? {
                                  hideDivider: true,
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
                          );
                        }
                        return (
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
                        );
                      })}
                    </FelaComponent>

                    <FelaComponent
                      style={{
                        backgroundColor: 'white',
                        flexShrink: '0',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        extend: [
                          theme.mq({ until: 'l', }, { display: 'none', }),
                          theme.mq({ from: 'l', }, { width: 'calc(300px + 8rem)', }),
                        ],
                      }}
                      render={({ className, }) => (
                        <aside className={className}>
                          {aside ? (
                            <Zen animate>
                              <FelaComponent
                                style={{
                                  height: '100%',
                                  left: '0',
                                  paddingTop: '4rem',
                                  position: 'absolute',
                                  top: '0',
                                }}
                              >
                                <SideBar content={aside} />
                              </FelaComponent>
                            </Zen>
                          ) : null}
                        </aside>
                      )}
                    />
                  </FelaComponent>
                  <ArticleGallery path={path} />
                </LayoutContainer>
              )}
            />
          );
        }}
      </Query>
    </ArticleLayout>
  );
}

ReviewArticle.propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,

  slots: PropTypes.shape({}).isRequired,
  path: PropTypes.string.isRequired,
};

export default ReviewArticle;
