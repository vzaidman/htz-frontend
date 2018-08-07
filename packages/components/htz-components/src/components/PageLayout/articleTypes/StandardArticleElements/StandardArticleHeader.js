/* global fetch, Headers */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { ApolloConsumer, } from 'react-apollo';

import HeaderText from '../../../ArticleHeader/HeaderText';
import ArticleHeaderMeta from '../../../ArticleHeader/ArticleHeaderMeta';
import HeadlineElement from '../../../HeadlineElement/HeadlineElement';
import Breadcrumbs from '../../../Breadcrumbs/Breadcrumbs';
import ShareBar from './ShareBar';

Header.propTypes = {
  /**
   * An array of Article's authors.
   */
  authors: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
  articleId: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string.isRequired,
  hasBreadCrumbs: PropTypes.bool.isRequired,
  exclusive: PropTypes.string.isRequired,
  /**
   * The publishing date of the article
   */
  pubDate: PropTypes.instanceOf(Date).isRequired,
  /**
   * The modification date of the article
   */
  modDate: PropTypes.instanceOf(Date),
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headlineElement: PropTypes.shape({}).isRequired,
  reportingFrom: PropTypes.string.isRequired,
};

Header.defaultProps = {
  modDate: null,
};

function Header({
  articleId,
  hasBreadCrumbs,
  canonicalUrl,
  authors,
  exclusive,
  modDate,
  pubDate,
  subtitle,
  title,
  headlineElement,
  reportingFrom,
}) {
  return (
    <ApolloConsumer>
      {cache => {
        cache.writeData({
          data: {
            pageSchema: {
              headline: title,
              description: subtitle,
              datePublished: pubDate,
              dateModified: modDate || null,
              author: authors.map(author => ({
                type: 'Person',
                name: author.contentName || author.name,
                sameAs: author.url || null,
                __typename: 'Author',
              })),
              __typename: 'PageSchema',
            },
          },
        });

        return (
          <FelaComponent
            style={theme => ({
              textAlign: 'start',
              paddingTop: '3rem',
              extend: [
                theme.mq(
                  { until: 'm', },
                  { display: 'flex', flexDirection: 'column', }
                ),
              ],
            })}
            render={({ className, theme, }) => (
              <header className={className}>
                {hasBreadCrumbs && (
                  <FelaComponent
                    style={{
                      paddingInlineStart: '2rem',
                      extend: [
                        theme.mq(
                          { from: 'xl', },
                          { paddingInlineStart: '3rem', }
                        ),
                        theme.mq(
                          { until: 's', },
                          { order: -2, marginTop: '1rem', }
                        ),
                      ],
                    }}
                    render={({ className, }) => (
                      <Breadcrumbs
                        articleId={articleId}
                        className={className}
                      />
                    )}
                  />
                )}
                <FelaComponent
                  style={{
                    marginTop: '3rem',
                    paddingInlineStart: '2rem',
                    extend: [
                      theme.mq({ from: 'xl', }, { paddingInlineStart: '3rem', }),
                      theme.mq({ until: 'l', }, { paddingInlineEnd: '2rem', }),
                    ],
                  }}
                  render={({ className, }) => (
                    <HeaderText
                      className={className}
                      kicker={exclusive}
                      subtitle={subtitle}
                      title={title}
                    />
                  )}
                />
                <ArticleHeaderMeta
                  authors={authors}
                  publishDate={pubDate}
                  modifiedDate={modDate}
                  reportingFrom={reportingFrom}
                  miscStyles={{
                    marginTop: [
                      { until: 's', value: '3rem', },
                      { from: 's', until: 'l', value: '2rem', },
                    ],
                    marginInlineStart: '2rem',
                    marginInlineEnd: '2rem',
                    display: [
                      { until: 'l', value: 'block', },
                      { from: 'l', value: 'none', },
                    ],
                  }}
                />
                <FelaComponent
                  style={{
                    paddingInlineStart: '2rem',
                    extend: [
                      theme.mq({ from: 'xl', }, { paddingInlineStart: '3rem', }),
                    ],
                  }}
                >
                  <ShareBar title={title} canonicalUrl={canonicalUrl} />
                </FelaComponent>
                {headlineElement && (
                  <HeadlineElement
                    elementObj={headlineElement}
                    miscStyles={{
                      marginTop: '2rem',
                      order: [ { until: 's', value: -1, }, ],
                    }}
                  />
                )}
              </header>
            )}
          />
        );
      }}
    </ApolloConsumer>
  );
}

export default Header;
