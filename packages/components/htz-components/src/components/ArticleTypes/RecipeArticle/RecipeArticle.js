import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloConsumer, } from 'react-apollo';

import { Query, } from '../../ApolloBoundary/ApolloBoundary';
import LayoutContainer from '../../PageLayout/LayoutContainer';
import WideArticleLayoutRow from '../../PageLayout/WideArticleLayoutRow';
import ArticleLayoutRow from '../../PageLayout/ArticleLayoutRow';
import ArticleLayout from '../../PageLayout/ArticleLayout';
import getComponent from '../../../utils/componentFromInputTemplate';
import ArticleBody from '../../ArticleBody/ArticleBody';
import ArticleHeaderMeta from '../../ArticleHeader/ArticleHeaderMeta';
import RecipeArticleHeader from './RecipeArticleElements/RecipeArticleHeader';
import SideBar from '../../SideBar/SideBar';
import Zen from '../../Zen/Zen';
import RecipeRating from './RecipeArticleElements/RecipeRating';
import Instructions from './RecipeArticleElements/Instructions';
import Ingredients from './RecipeArticleElements/Ingredients';
import { buildUrl, } from '../../../utils/buildImgURLs';

import RecipeArticleQuery from './queries/recipe_article';


function RecipeArticle({ articleId, slots, }) {
  return (
    <ArticleLayout articleId={articleId} slots={slots}>
      <Query query={RecipeArticleQuery} variables={{ path: articleId, }}>
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

          const recipeArticleElement = article.find(
            // todo: change to recipe inputTemplate after updating papi
            element =>
              element.inputTemplate === 'com.htz.StandardArticle' ||
              element.inputTemplate === 'com.tm.StandardArticle'
          );

          const {
            authors,
            body,
            instructions,
            ingredients,
            totalCookTime,
            numOfServings,
            recipeDifficultyLevel,
            reviewStars,
            header,
            headlineElement,
            reportingFrom,
          } = recipeArticleElement;

          return (
            <FelaTheme
              render={theme => (
                <LayoutContainer
                  tagName="article"
                  // miscStyles={{
                  //   display: [ { from: 'l', value: 'flex', }, ],
                  // }}
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
                  <RecipeArticleHeader
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
                          element.inputTemplate === 'com.htz.ArticleHeaderElement' ||
                          element.inputTemplate === 'com.tm.PageTitle'
                        ) {
                          return null;
                        }
                        if (
                          // todo: change to recipe input template
                          element.inputTemplate === 'com.htz.StandardArticle' ||
                          element.inputTemplate === 'com.mouse.story.MouseStandardStory' ||
                          element.inputTemplate === 'com.tm.StandardArticle'
                        ) {
                          return (
                            <ApolloConsumer key={element.contentId}>
                              {cache => {
                                // todo: get page schema type to write to

                                const { commentsElementId, } = element;
                                cache.writeData({
                                  data: {
                                    commentsElementId,
                                    // pageSchema: {
                                    //   type: 'NewsArticle',
                                    //   mainEntityOfPage: {
                                    //     type: 'WebPage',
                                    //     id: canonicalUrl,
                                    //     __typename: 'MainEntityOfPage',
                                    //   },
                                    //   __typename: 'PageSchema',
                                    // },
                                  },
                                });
                                return (
                                  <ArticleLayoutRow
                                    isArticleBody
                                    hideMargineliaComponentUnderLBp={!!authors}
                                    margineliaComponent={
                                      <Fragment>
                                        {authors ? (
                                          <ArticleHeaderMeta
                                            authors={authors}
                                            reportingFrom={reportingFrom}
                                            publishDate={header.pubDate}
                                            modifiedDate={header.modDate}
                                          />
                                        ) : null}

                                        <RecipeRating
                                          reviewStars={reviewStars}
                                          totalCookTime={totalCookTime}
                                          numOfServings={numOfServings}
                                          recipeDifficultyLevel={recipeDifficultyLevel}
                                          miscStyles={{ marginTop: '6rem', }}
                                        />
                                      </Fragment>
                                    }
                                  >
                                    <RecipeRating
                                      reviewStars={reviewStars}
                                      totalCookTime={totalCookTime}
                                      numOfServings={numOfServings}
                                      recipeDifficultyLevel={recipeDifficultyLevel}
                                      miscStyles={{
                                        marginTop: '6rem',
                                        marginBottom: '4rem',
                                        display: [ { from: 'l', value: 'none', }, ],
                                      }}
                                    />

                                    <ArticleBody body={body} />
                                    <Ingredients ingredientLists={ingredients} />
                                    <Instructions instructions={instructions} />
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
                              {...(element.inputTemplate ===
                              'com.polobase.ClickTrackerBannersWrapper'
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
                              ? // todo: theme
                                { title: 'תגובות', id: 'commentsSection', }
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
                  </FelaComponent>
                </LayoutContainer>
              )}
            />
          );
        }}
      </Query>
    </ArticleLayout>
  );
}

RecipeArticle.propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,

  slots: PropTypes.shape({}).isRequired,
};

export default RecipeArticle;
