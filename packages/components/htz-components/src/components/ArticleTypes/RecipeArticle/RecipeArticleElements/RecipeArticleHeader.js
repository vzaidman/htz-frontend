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
  authors: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])).isRequired,
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
              marginRight: 'auto',
              marginLeft: 'auto',
              textAlign: 'center',
              paddingTop: '2rem',
              extend: [
                theme.mq({ from: 'xl', }, { maxWidth: '130rem', }),
                theme.mq({ from: 'l', until: 'xl', }, { maxWidth: '152rem', }),
                theme.mq({ until: 'm', }, { display: 'flex', flexDirection: 'column', }),
              ],
            })}
            render={({ className, theme, }) => (
              <header className={className}>
                <FelaComponent
                  style={{
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    extend: [
                      theme.mq({ from: 's', }, { maxWidth: '80%', }),
                    ],
                  }}
                >
                  {hasBreadCrumbs ? <Breadcrumbs articleId={articleId} /> : null}
                  <FelaComponent
                    style={{
                      marginTop: '3rem',
                      extend: [
                        theme.mq({ until: 's', }, { marginRight: '2rem', marginLeft: '2rem', }),
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
                      marginTop: [ { from: 's', until: 'l', value: '2rem', }, ],
                      marginInlineStart: [ { until: 'm', value: '2rem', }, ],
                      marginInlineEnd: [ { until: 'm', value: '2rem', }, ],
                      justifyContent: [ { from: 's', until: 'l', value: 'center', }, ],
                      display: [ { until: 'l', value: 'flex', }, { from: 'l', value: 'none', }, ],
                      order: [ { until: 's', value: 2, }, ],
                      // justifyContent: 'flex-start',
                    }}
                  />
                  <FelaComponent
                    style={{
                      marginTop: '3rem',
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      extend: [
                        theme.mq(
                          { until: 's', },
                          {
                            display: 'none',
                          }
                        ),
                        theme.mq(
                          { from: 's', until: 'l', },
                          {
                            marginRight: '3rem',
                            marginLeft: '3rem',
                          }
                        ),
                        // theme.mq(
                        //   { from: 'm', until: 'l', },
                        //   {
                        //     maxWidth: '80%',
                        //   }
                        // ),
                        // theme.mq({ from: 'l', }, { maxWidth: '70%', }),
                      ],
                    }}
                  >
                    <ShareBar title={title} canonicalUrl={canonicalUrl} />
                  </FelaComponent>
                </FelaComponent>
                {headlineElement ? (
                  <HeadlineElement
                    elementObj={headlineElement}
                    miscStyles={{
                      marginTop: '2rem',
                      marginBottom: [ { until: 'm', value: 0, }, ],
                    }}
                  />
                ) : null}
              </header>
            )}
          />
        );
      }}
    </ApolloConsumer>
  );
}

export default Header;
