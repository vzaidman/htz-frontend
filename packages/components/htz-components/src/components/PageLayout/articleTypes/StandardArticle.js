import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloConsumer, } from 'react-apollo';
import { borderTop, } from '@haaretz/htz-css-tools';

import LayoutContainer from '../LayoutContainer';
import getComponent from '../../../utils/componentFromInputTemplate';
import ArticleBody from '../../ArticleBody/ArticleBody';
import ArticleHeaderMeta from '../../ArticleHeader/ArticleHeaderMeta';
import H from '../../AutoLevels/H';
import Section from '../../AutoLevels/Section';
import StandardArticleHeader from './StandardArticleElements/StandardArticleHeader';
import SideBar from '../../SideBar/SideBar';
import Zen from '../../Zen/Zen';
import { buildUrl, } from '../../../utils/buildImgURLs';

const margineliaStyle = ({
  theme,
  theme: { layoutStyle, },
  hideUnderLargeBreakPoint,
}) => ({
  extend: [
    ...(hideUnderLargeBreakPoint
      ? [ theme.mq({ until: 'l', }, { display: 'none', }), ]
      : []),
    theme.mq(
      { from: 'l', },
      {
        position: 'absolute',
      }
    ),
    theme.mq(
      { from: 'l', until: 'xl', },
      {
        start: `${layoutStyle.startColumnPadding}rem`,
        maxWidth: `${layoutStyle.startColumnWidthL -
          layoutStyle.startColumnPadding}rem`,
      }
    ),
    theme.mq(
      { from: 'xl', },
      {
        start: `${layoutStyle.startColumnPaddingXL}rem`,
        maxWidth: `${layoutStyle.startColumnWidthXL -
          layoutStyle.startColumnPaddingXL}rem`,
      }
    ),
  ],
});

// eslint-disable-next-line react/prop-types
const SectionTitleA = ({ title, isInMargin, id, }) => (
  <FelaComponent
    style={({ layoutStyle, ...theme }) => ({
      color: theme.color('primary'),
      fontWeight: 'bold',
      position: 'relative',
      paddingInlineStart: `${layoutStyle.startColumnPadding}rem`,
      extend: [
        theme.mq(
          { from: 'xl', },
          { paddingInlineStart: `${layoutStyle.startColumnPaddingXL}rem`, }
        ),
        theme.type(3, { fromBp: 'l', }),
        theme.type(1, { untilBp: 'l', }),
        borderTop('2px', 2, 'solid', theme.color('primary')),
      ],
    })}
    render={({ className, }) => (
      <H className={className} id={id}>
        {isInMargin ? (
          <FelaComponent
            style={({ layoutStyle, ...theme }) => ({
              extend: [
                theme.mq(
                  { from: 'l', },
                  {
                    position: 'absolute',
                    overflow: 'hidden',
                  }
                ),
                theme.mq(
                  { from: 'l', until: 'xl', },
                  {
                    insetInlineStart: `${layoutStyle.startColumnPadding}rem`,
                    maxWidth: `${layoutStyle.startColumnWidthL -
                      layoutStyle.startColumnPadding}rem`,
                  }
                ),
                theme.mq(
                  { from: 'xl', },
                  {
                    insetInlineStart: `${layoutStyle.startColumnPaddingXL}rem`,
                    maxWidth: `${layoutStyle.startColumnWidthXL -
                      layoutStyle.startColumnPaddingXL}rem`,
                  }
                ),
              ],
            })}
          >
            <span>{title}</span>
          </FelaComponent>
        ) : (
          title
        )}
      </H>
    )}
  />
);
/* eslint-disable react/prop-types */
const StandardLayoutRow = ({
  authors,
  children,
  id,
  isArticleBody,
  key,
  publishDate,
  modifiedDate,
  reportingFrom,
  title,
  /* eslint-enable react/prop-types */
}) => (
  <FelaComponent
    style={theme => ({
      marginTop: '3rem',
      extend: [ theme.mq({ from: 'xl', }, { marginTop: '4rem', }), ],
    })}
    render={({ className, }) => (
      <Section className={className} key={key}>
        {title ? (
          <SectionTitleA
            isInMargin={!!(id === 'commentsSection')}
            title={title}
            id={id || null}
          />
        ) : null}
        <FelaComponent
          style={({ layoutStyle, mq, }) => ({
            position: 'relative',
            extend: [
              mq(
                { from: 'l', until: 'xl', },
                { paddingInlineStart: `${layoutStyle.startColumnWidthL}rem`, }
              ),
              mq(
                { from: 'xl', },
                { paddingInlineStart: `${layoutStyle.startColumnWidthXL}rem`, }
              ),
            ],
          })}
        >
          <FelaComponent
            rule={margineliaStyle}
            hideUnderLargeBreakPoint={!!authors}
          >
            {authors ? (
              <ArticleHeaderMeta
                authors={authors}
                reportingFrom={reportingFrom}
                publishDate={publishDate}
                modifiedDate={modifiedDate}
              />
            ) : null}
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
const WideArticleLayoutRow = ({ children, key, hideDivider, }) => (
  <FelaComponent
    style={theme => ({
      marginTop: '3rem',
      extend: [
        borderTop(
          '2px',
          2,
          'solid',
          hideDivider ? 'transparent' : theme.color('primary')
        ),
        theme.mq(
          { from: 'l', until: 'xl', },
          {
            paddingInlineStart: `${theme.layoutStyle.startColumnPadding}rem`,
          }
        ),
        theme.mq(
          { from: 'xl', },
          {
            paddingInlineStart: `${theme.layoutStyle.startColumnPaddingXL}rem`,
          }
        ),
      ],
    })}
    render={({ className, }) => (
      <Section className={className} key={key}>
        {children}
      </Section>
    )}
  />
);

function StandardArticle({
  articleId,
  article,
  aside,
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
}) {
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

  const standardArticleElement = article.find(
    element =>
      element.inputTemplate === 'com.htz.StandardArticle' ||
      element.inputTemplate === 'com.tm.StandardArticle'
  );

  const {
    authors,
    body,
    header,
    headlineElement,
    reportingFrom,
  } = standardArticleElement;

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
              extend: [
                theme.mq({ from: 'l', }, { width: 'calc(100% - 300px - 8rem)', }),
              ],
            }}
          >
            <StandardArticleHeader
              {...header}
              articleId={articleId}
              authors={authors}
              canonicalUrl={canonicalUrl}
              hasBreadCrumbs={!!breadCrumbs}
              headlineElement={headlineElement}
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
                element.inputTemplate ===
                  'com.mouse.story.MouseStandardStory' ||
                element.inputTemplate === 'com.tm.StandardArticle'
              ) {
                return (
                  <ApolloConsumer key={element.contentId}>
                    {cache => {
                      const { commentsElementId, } = element;
                      cache.writeData({
                        data: {
                          commentsElementId,
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
                      return (
                        <StandardLayoutRow
                          isArticleBody
                          authors={authors}
                          reportingFrom={reportingFrom}
                          publishDate={header.pubDate}
                          modifiedDate={header.modDate}
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
                element.inputTemplate === 'com.polobase.OutbrainElement' ||
                element.inputTemplate ===
                  'com.polobase.ClickTrackerBannersWrapper'
              ) {
                return (
                  <WideArticleLayoutRow
                    key={element.contentId}
                    hideDivider={
                      element.inputTemplate ===
                      'com.polobase.ClickTrackerBannersWrapper'
                    }
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
                <StandardLayoutRow
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
                </StandardLayoutRow>
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
                {aside && (
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
                )}
              </aside>
            )}
          />
        </LayoutContainer>
      )}
    />
  );
}

StandardArticle.propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
  article: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  aside: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  seoData: PropTypes.shape({}).isRequired,
};

export default StandardArticle;
