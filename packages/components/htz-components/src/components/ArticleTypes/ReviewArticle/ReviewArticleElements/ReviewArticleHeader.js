/* global fetch, Headers */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import ApolloConsumer from '../../../ApolloBoundary/ApolloConsumer';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import HeaderText from '../../../ArticleHeader/HeaderText';
import ArticleHeaderMeta from '../../../ArticleHeader/ArticleHeaderMeta';
import HeadlineElement from '../../../HeadlineElement/HeadlineElement';
import Breadcrumbs from '../../../Breadcrumbs/Breadcrumbs';
import ShareBar from '../../../ShareBar/ShareBar';

// eslint-disable-next-line react/prop-types
const HeaderElementCont = ({ children, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      marginRight: 'auto',
      marginLeft: 'auto',
      extend: [
        theme.mq({ from: 'm', }, { maxWidth: '80%', }),
        theme.mq({ until: 'm', }, { paddingRight: '2rem', paddingLeft: '2rem', }),
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
  >
    {children}
  </FelaComponent>
);

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
              description: subtitle.substring(0, 198),
              datePublished: pubDate,
              dateModified: modDate || null,
              author: authors.map(author => ({
                type: 'Person',
                name: author.contentName || author.name,
                sameAs: `https://www.haaretz.co.il${author.url}` || null,
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
                <HeaderElementCont>
                  {hasBreadCrumbs ? <Breadcrumbs articleId={articleId} /> : null}
                </HeaderElementCont>
                <HeaderElementCont>
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
                </HeaderElementCont>
                <HeaderElementCont
                  miscStyles={{
                    marginTop: [ { from: 's', until: 'l', value: '2rem', }, ],
                    marginInlineStart: [ { until: 'm', value: '2rem', }, ],
                    marginInlineEnd: [ { until: 'm', value: '2rem', }, ],
                    paddingRight: [ { until: 'm', value: '0rem', }, ],
                    paddingLeft: [ { until: 'm', value: '0rem', }, ],
                    order: [ { until: 's', value: 2, }, ],
                  }}
                >
                  <ArticleHeaderMeta
                    authors={authors}
                    publishDate={pubDate}
                    modifiedDate={modDate}
                    reportingFrom={reportingFrom}
                    miscStyles={{
                      display: [ { until: 'l', value: 'flex', }, { from: 'l', value: 'none', }, ],
                      justifyContent: [ { from: 's', until: 'l', value: 'center', }, ],
                      textAlign: [ { until: 's', value: 'start', }, ],
                      ...theme.mq({ from: 's', until: 'l', }, { ...theme.type(-3), }),
                    }}
                  />
                </HeaderElementCont>
                <HeaderElementCont
                  miscStyles={{
                    marginTop: '3rem',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    display: [ { until: 's', value: 'none', }, ],
                  }}
                >
                  <ShareBar title={title} canonicalUrl={canonicalUrl} />
                </HeaderElementCont>
                {headlineElement ? (
                  <HeadlineElement
                    captionMiscStyles={{
                      paddingStart: [ { until: 'l', value: '2rem', }, { from: 'l', value: 0, }, ],
                    }}
                    elementObj={headlineElement}
                    miscStyles={{
                      marginTop: '4rem',
                      marginBottom: [ { until: 'm', value: 0, }, ],
                      textAlign: 'start',
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
