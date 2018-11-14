import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloConsumer, } from 'react-apollo';
import Query from '../../ApolloBoundary/Query';

import LayoutContainer from '../../PageLayout/LayoutContainer';
import WideArticleLayoutRow from '../../PageLayout/WideArticleLayoutRow';
import ArticleLayoutRow from '../../PageLayout/ArticleLayoutRow';
import ArticleLayout from '../../PageLayout/ArticleLayout';
import getComponent from '../../../utils/componentFromInputTemplate';
import ArticleBody from '../../ArticleBody/ArticleBody';
// import ArticleHeaderMeta from '../../ArticleHeader/ArticleHeaderMeta';
import LiveBlogHeaderMeta from './LiveBlogElements/LiveBlogHeaderMeta';
import TimeLine from './LiveBlogElements/TimeLine';
import StandardArticleHeader from '../StandardArticle/StandardArticleElements/StandardArticleHeader';
import Media from '../../Media/Media';
// import LiveBlogHeader from './LiveBlogElements/LiveBlogHeader';
import SideBar from '../../SideBar/SideBar';
import Zen from '../../Zen/Zen';
import { buildUrl, } from '../../../utils/buildImgURLs';
import BloggerInfo from '../../BloggerInfo/BloggerInfo';

import LiveBlogQuery from './queries/live_blog_article';
import LiveBlogContainer from './LiveBlogElements/LiveBlogContainer';
// import LiveBlogMobileContainer from './LiveBlogElements/LiveBlogMobileContainer';

function LiveBlog({ articleId, slots, }) {
  return (
    <ArticleLayout articleId={articleId} slots={slots}>
      <Query query={LiveBlogQuery} partialRefetch variables={{ path: articleId, }}>
        {({ loading, error, data, }) => {
          if (loading) return null;
          if (error) return null;
          const {
            slots: { article, aside, },
            lineage,
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

          const breadCrumbs = article.find(element => element.inputTemplate === 'com.tm.PageTitle');

          const LiveBlogElement = article.find(
            element =>
              element.inputTemplate === 'com.htz.StandardArticle' ||
              element.inputTemplate === 'com.mouse.story.MouseStandardStory' ||
              element.inputTemplate === 'com.tm.BlogArticle' ||
              element.inputTemplate === 'com.tm.StandardArticle'
          );

          const isMouse = LiveBlogElement.inputTemplate === 'com.mouse.story.MouseStandardStory';

          const { authors, body, headlineElement, reportingFrom, pubDate, modDate, liveblogItems, isLiveUpdate, isDisplayBlogitemsDatetime, } = LiveBlogElement;
          const header = isMouse ? { pubDate, modDate, } : LiveBlogElement.header;

          const timeLineItems = liveblogItems.filter(value => value.keyEvent);

          console.warn('timeLineItems: ', timeLineItems);
          console.warn('liveblogItems: ', liveblogItems);
          console.warn('isLiveUpdate: ', isLiveUpdate);
          console.warn('isDisplayBlogitemsDatetime: ', isDisplayBlogitemsDatetime);

          return (
            <FelaTheme
              render={theme => (
                <LayoutContainer
                  tagName="article"
                  miscStyles={{
                    display: [ { from: 'l', value: 'flex', }, ],
                  }}
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
                    <link rel="canonical" href={canonicalUrl} />
                    {amphtml ? <link rel="amphtml" href={amphtml} /> : null}
                  </Head>

                  <FelaComponent
                    style={{
                      extend: [ theme.mq({ from: 'l', }, { width: 'calc(100% - 300px - 8rem)', }), ],
                    }}
                  >
                    <StandardArticleHeader
                      {...header}
                      articleId={articleId}
                      authors={authors}
                      canonicalUrl={canonicalUrl}
                      hasBreadCrumbs={!!breadCrumbs}
                      headlineElement={headlineElement}
                      reportingFrom={reportingFrom}
                    />

                    {article.map(element => {
                      if (
                        element.inputTemplate === 'com.htz.ArticleHeaderElement' ||
                        element.inputTemplate === 'com.tm.PageTitle'
                      ) {
                        return null;
                      }
                      if (
                        element.inputTemplate === 'com.htz.StandardArticle' ||
                        element.inputTemplate === 'com.mouse.story.MouseStandardStory' ||
                        element.inputTemplate === 'com.tm.BlogArticle' ||
                        element.inputTemplate === 'com.tm.StandardArticle'
                      ) {
                        return (
                          <ApolloConsumer key={element.contentId}>
                            {cache => {
                              const { commentsElementId, } = element;
                              cache.writeData({
                                data: {
                                  commentsElementId,
                                  isMouseStory: isMouse,
                                  pageSchema: {
                                    type: 'NewsArticle',
                                    mainEntityOfPage: {
                                      type: 'WebPage',
                                      id: canonicalUrl,
                                      __typename: 'MainEntityOfPage',
                                    },
                                    __typename: 'PageSchema',
                                  },
                                },
                              });
                              let bloggerInfo;
                              if (authors.length) {
                                const blogName = lineage[1].name;
                                const author = authors[0];
                                bloggerInfo = element.inputTemplate === 'com.tm.BlogArticle' ? (<BloggerInfo author={author} blogName={blogName} />) : null;
                              }
                              return (
                                <ArticleLayoutRow
                                  isArticleBody
                                  hideMargineliaComponentUnderLBp={!!authors}
                                  margineliaComponent={
                                    <Fragment>
                                      {authors ? (
                                        <LiveBlogHeaderMeta
                                          authors={authors}
                                          isLiveUpdate={isLiveUpdate}
                                          isDisplayBlogitemsDatetime={isDisplayBlogitemsDatetime}
                                          liveblogItems={liveblogItems}
                                          publishDate={header.pubDate}
                                          modifiedDate={header.modDate}
                                        />
                                      ) : null}

                                      <TimeLine
                                        timeLineItems={timeLineItems}
                                      />

                                      {/* <TimeLine
                                          reviewImgData={itemCoverImg}
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
                                        /> */}
                                    </Fragment>
                                  }
                                >
                                  <ArticleBody body={body} />
                                  <LiveBlogContainer
                                    liveblogItems={liveblogItems}
                                    canonicalUrl={canonicalUrl}
                                    timeLineItems={timeLineItems}
                                    showTimeLineText
                                    miscStyles={{ backgroundColor: theme.color('neutral', '-6'), }}
                                  />

                                  {bloggerInfo}
                                </ArticleLayoutRow>
                              );
                            }}
                          </ApolloConsumer>
                        );
                      }
                      const Element = getComponent(element.inputTemplate);
                      const { properties, ...elementWithoutProperties } = element;
                      if (
                        element.inputTemplate === 'com.polobase.OutbrainElement' ||
                        element.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
                      ) {
                        return (
                          <WideArticleLayoutRow
                            key={element.contentId}
                            {...(element.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
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
                                paddingTop: '3rem',
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
                </LayoutContainer>
              )}
            />
          );
        }}
      </Query>
    </ArticleLayout>
  );
}

LiveBlog.propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,

  slots: PropTypes.shape({}).isRequired,
};

export default LiveBlog;
