/* global fetch, Headers */
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { ApolloConsumer, } from 'react-apollo';

import HeaderText from '../../../ArticleHeader/HeaderText';
// import ArticleHeaderMeta from '../../../ArticleHeader/ArticleHeaderMeta';
import LiveBlogHeaderMeta from './LiveBlogHeaderMeta';
import HeadlineElement from '../../../HeadlineElement/HeadlineElement';
import Breadcrumbs from '../../../Breadcrumbs/Breadcrumbs';
import ShareBar from '../../../ShareBar/ShareBar';

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
              overflow: 'hidden',
              backgroundColor: 'white',
              extend: [
                theme.mq(
                  { until: 'm', },
                  { display: 'flex', flexDirection: 'column', }
                ),
              ],
            })}
            render={({ className, theme, }) => (
              <header className={className}>
                {hasBreadCrumbs ? (
                  <FelaComponent
                    style={{
                      paddingInlineStart: theme.layoutStyle.startColumnPadding,
                      marginTop: '3rem',
                      extend: [
                        theme.mq(
                          { until: 's', },
                          { paddingInlineStart: theme.layoutStyle.contPaddingS, }
                        ),
                        theme.mq(
                          { from: 'xl', },
                          {
                            paddingInlineStart:
                              theme.layoutStyle.startColumnPaddingXL,
                          }
                        ),
                        theme.mq(
                          { until: 's', },
                          { order: -1, marginTop: '2rem', }
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
                ) : null}
                <FelaComponent
                  style={{
                    marginTop: '3rem',
                    paddingInlineStart: '2rem',
                    extend: [
                      theme.mq(
                        { until: 's', },
                        {
                          paddingInlineEnd: '3rem',
                          paddingInlineStart: '3rem',
                          marginTop: '0',
                        }
                      ),
                      theme.mq(
                        { from: 's', until: 'l', },
                        { paddingInlineEnd: '2rem', }
                      ),
                      theme.mq({ from: 'xl', }, { paddingInlineStart: '3rem', }),
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
                <LiveBlogHeaderMeta
                  authors={authors}
                  publishDate={pubDate}
                  modifiedDate={modDate}
                //   reportingFrom={reportingFrom}
                  miscStyles={{
                    marginTop: [
                      { until: 's', value: '3rem', },
                      { from: 's', until: 'l', value: '2rem', },
                    ],
                    marginInlineStart: [
                      {
                        from: 's',
                        value: theme.layoutStyle.startColumnPadding,
                      },
                      { until: 's', value: theme.layoutStyle.contPaddingS, },
                    ],
                    marginInlineEnd: [
                      {
                        from: 's',
                        value: theme.layoutStyle.startColumnPadding,
                      },
                      { until: 's', value: theme.layoutStyle.contPaddingS, },
                    ],
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
                {headlineElement ? (
                  <Fragment>
                    <FelaComponent
                      style={theme => (
                        {
                          ...theme.mq({ from: 'l', }, { display: 'none', }),
                          width: '100%',
                          height: '6rem',
                          backgroundColor: theme.color('tertiary'),
                        }
                      )}
                      render={({ className, }) => (
                        <div className={className}>
                          Live
                        </div>
                      )}
                    />
                    <HeadlineElement
                      elementObj={headlineElement}
                      miscStyles={{
                        backgroundColor: [ { from: 'l', value: theme.color('primary', '-6'), }, ],
                        marginTop: [ { from: 's', value: '2rem', }, ],
                        order: [ { until: 's', value: -2, }, ],
                      }}
                    />
                  </Fragment>
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
