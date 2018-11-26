import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloConsumer, } from 'react-apollo';
import Query from '../../ApolloBoundary/Query';

import LayoutContainer from '../../PageLayout/LayoutContainer';
import WideArticleLayoutRow from '../../PageLayout/WideArticleLayoutRow';
import ArticleLayout from '../../PageLayout/ArticleLayout';
import getComponent from '../../../utils/componentFromInputTemplate';
import ArticleBody from '../../ArticleBody/ArticleBody';
import SideBar from '../../SideBar/SideBar';
import Zen from '../../Zen/Zen';
import Tags from '../../Tags/Tags';
import { buildUrl, } from '../../../utils/buildImgURLs';
import BloggerInfo from '../../BloggerInfo/BloggerInfo';
import LiveBlogQuery from './queries/live_blog_article';

import LiveBlogLayoutRow from './LiveBlogElements/LiveBlogLayoutRow';
import LiveBlogHeader from './LiveBlogElements/LiveBlogHeader';
import LiveBlogHeaderMeta from './LiveBlogElements/LiveBlogHeaderMeta';
import TimeLine from './LiveBlogElements/TimeLine';
import LiveBlogContainer from './LiveBlogElements/LiveBlogContainer';

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

          const { authors, body, headlineElement, reportingFrom, pubDate, modDate, liveblogItems, keyEvents, isLiveUpdate, isDisplayBlogitemsDatetime, tags, } = LiveBlogElement;
          const header = isMouse ? { pubDate, modDate, } : LiveBlogElement.header;

          // const timeLineItems = liveblogItems.filter(value => value.keyEvent);
          // const timeLineItems = liveblogItems.filter(value => value.keyEvent);

          // console.warn('timeLineItems: ', timeLineItems);
          // console.warn('tags: ', tags);
          // console.warn('liveblogItems: ', liveblogItems);
          // console.warn('keyEvents: ', JSON.stringify(keyEvents));
          // keyEvents.map(val => console.warn('get me that shit:'))
          console.warn('isLiveUpdate: ', isLiveUpdate);
          // console.warn('isDisplayBlogitemsDatetime: ', isDisplayBlogitemsDatetime);

          return (
            <FelaTheme
              render={theme => (
                <LayoutContainer
                  tagName="article"
                  bgc={theme.color('primary', '-6')}
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
                    <LiveBlogHeader
                      {...header}
                      articleId={articleId}
                      authors={authors}
                      canonicalUrl={canonicalUrl}
                      hasBreadCrumbs={!!breadCrumbs}
                      headlineElement={headlineElement}
                      reportingFrom={reportingFrom}
                      // todo: change to isLiveUpdate={isLiveUpdate} to set value dynamically
                      isLiveUpdate
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
                                <LiveBlogLayoutRow
                                  isArticleBody
                                  hideMargineliaComponentUnderLBp={!!authors}
                                  margineliaComponent={
                                    <Fragment>
                                      {authors ? (
                                        <LiveBlogHeaderMeta
                                          authors={authors}
                                          isLiveUpdate
                                          isDisplayBlogitemsDatetime={isDisplayBlogitemsDatetime}
                                          liveblogItems={liveblogItems}
                                          publishDate={header.pubDate}
                                          modifiedDate={header.modDate}
                                        />
                                      ) : null}
                                      <TimeLine
                                        keyEvents={keyEvents}
                                        miscStyles={{
                                          position: 'sticky',
                                          top: '2rem',
                                          transform: 'translateY(14rem)',
                                          paddingBottom: '18rem',
                                        }}
                                      />
                                    </Fragment>
                                  }
                                >
                                  <ArticleBody
                                    body={body}
                                    // tagsList={tags}
                                    miscStyles={{
                                     paddingBlockEnd: '3rem',
                                     paddingInlineStart: '3rem',
                                     paddingInlineEnd: '3rem',
                                     paddingBlockStart: '3rem',
                                     backgroundColor: 'white',
                                     maxWidth: '100%',
                                    //  backgroundColor: 'white',
                                    //  ...theme.mq({ from: 'm', }, { backgroudColor: 'white',  }),
                                    //  ...theme.mq({ until: 'l', }, {
                                        // paddingInlineStart: '3rem',
                                        // paddingInlineEnd: '3rem',
                                        // paddingBlockStart: '3rem',
                                      // }),
                                    }}
                                  />
                                  <LiveBlogContainer
                                    liveblogItems={liveblogItems}
                                    canonicalUrl={canonicalUrl}
                                    keyEvents={keyEvents}
                                    showTimeLineText
                                    bps={theme.bps}
                                    typeConf={theme.typeConf}
                                    // miscStyles={{ backgroundColor: theme.color('primary', '-6'), }}
                                  />
                                  <Tags
                                    tagsList={tags}
                                    miscStyles={{
                                      ...theme.mq(
                                        { until: 'l', },
                                        {
                                          marginInlineStart: '1rem',
                                          marginInlineEnd: '1rem',
                                          paddingTop: '2rem',
                                          paddingBottom: '2rem',
                                        }),
                                    }}
                                  />
                                  {bloggerInfo}
                                </LiveBlogLayoutRow>
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
                            hideDivider
                            {...(element.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
                            ? {
                              hideDivider: true,
                              miscStyles: {
                                backgroundColor: theme.color('primary', '-6'),
                                display: [ { until: 's', value: 'none', }, ],
                              },
                            }
                            : {})}
                            // miscStyles={{ backgroundColor: 'white', }}
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
                        <LiveBlogLayoutRow
                          key={element.contentId}
                          {...(element.inputTemplate === 'com.tm.ArticleCommentsElement'
                            ? {
                                title: theme.articleLayoutI18n.commentSectionTitle,
                                id: 'commentsSection',
                              }
                            : {})}
                          isCommentsSection
                          miscStyles={{ backgroundColor: 'white', marginTop: '4rem', }}
                        >
                          <Element
                            articleId={articleId}
                            {...elementWithoutProperties}
                            {...properties}
                          />
                        </LiveBlogLayoutRow>
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
                        theme.mq({ from: 'l', }, { width: 'calc(300px + 8rem)', backgroundColor: theme.color('primary', '-6'), }),
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
