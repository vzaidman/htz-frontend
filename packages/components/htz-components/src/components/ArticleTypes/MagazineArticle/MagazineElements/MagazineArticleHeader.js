/* global fetch, Headers */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
// import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { borderBottom, } from '@haaretz/htz-css-tools';

import LayoutContainer from '../../../PageLayout/LayoutContainer';
import ArticleHeaderMeta from '../../../ArticleHeader/ArticleHeaderMeta';
import MagazineHeadlineElement from './MagazineHeadlineElement';
import MagazineShareBar from './MagazineShareBar';
import MagazineHeaderText from './MagazineHeaderText';
import Paywall from '../../../Paywall/Paywall';
import { parseLayout, } from '../utils';

// eslint-disable-next-line react/prop-types
const HeaderElementCont = ({ children, miscStyles, theme, }) => (
  <LayoutContainer
    miscStyles={{
      maxWidth: [ { from: 'xl', value: '148rem', }, { from: 'l', until: 'xl', value: '164rem', }, ],
      paddingRight: [ { until: 'm', value: '2rem', }, ],
      paddingLeft: [ { until: 'm', value: '2rem', }, ],
      ...miscStyles,
    }}
  >
    {children}
  </LayoutContainer>
);

Header.propTypes = {
  /**
   * An array of Article's authors.
   */
  authors: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])).isRequired,
  articleId: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string.isRequired,
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
  /**
   * Should the magazine article header display in bet variation
   */
  variationB: PropTypes.bool,
  /** various layout consts */
  magazineLayout: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
  modDate: null,
  variationB: false,
};

function Header({
  articleId,
  canonicalUrl,
  authors,
  modDate,
  pubDate,
  subtitle,
  title,
  headlineElement,
  reportingFrom,
  magazineLayout,
  variationB,
}) {
  return (
    <FelaComponent
      style={theme => ({
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        extend: [
          theme.mq(
            { from: 'l', },
            { marginBottom: '6rem', ...(variationB ? {} : { marginTop: '6rem', }), }
          ),
        ],
      })}
      render={({ className, theme, }) => (
        <header className={className}>
          <HeaderElementCont
            miscStyles={{
              ...theme.mq(
                { from: 'l', },
                {
                  ...(variationB
                    ? {
                      ...borderBottom('2px', 0, 'solid', theme.color('neutral', '-6')),
                      paddingBottom: '0px',
                    }
                    : {}),
                }
              ),
              ...(variationB
                ? {
                  width: '100%',
                  // need to specify all breakpoints to beat specificity
                  maxWidth: [
                    { from: 's', until: 'm', value: '100%', },
                    { from: 'm', until: 'l', value: '100%', },
                    { from: 'l', until: 'xl', value: '100%', },
                    { from: 'xl', value: '100%', },
                  ],
                  paddingRight: 0,
                  paddingLeft: 0,
                  display: [ { from: 'l', value: 'flex', }, ],
                  alignItems: [ { from: 'l', value: 'center', }, ],
                }
                : {
                  maxWidth: [ { from: 'xl', value: '144rem', }, ],
                }),
            }}
          >
            <FelaComponent
              style={{
                marginInlineStart: 'auto',
                marginInlineEnd: 'auto',
                extend: [
                  theme.mq(
                    { until: 'l', },
                    { paddingInlineStart: '2rem', paddingInlineEnd: '2rem', marginTop: '4rem', }
                  ),
                  theme.mq({ until: 'm', }, { maxWidth: '100rem', }),
                  theme.mq({ from: 'm', until: 'l', }, { maxWidth: '110rem', }),
                  ...(variationB
                    ? [
                      theme.mq(
                        { from: 'l', },
                        {
                          paddingInlineStart: '4rem',
                          paddingInlineEnd: '4rem',
                          maxWidth: '70rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        }
                      ),
                    ]
                    : []),
                ],
              }}
            >
              <MagazineHeaderText subtitle={subtitle} title={title} variationB={variationB} />
              {/* under text share bar */}
              {variationB ? <MagazineShareBar title={title} canonicalUrl={canonicalUrl} /> : null}
            </FelaComponent>
            {headlineElement && variationB ? (
              <MagazineHeadlineElement
                isVariationB
                elementObj={headlineElement}
                miscStyles={{
                  marginTop: [ { until: 'l', value: '3rem', }, ],
                  width: [ { from: 'l', value: '60%', }, ],
                  display: [ { from: 'l', value: 'inline-block', }, ],
                  textAlign: 'start',
                }}
              />
            ) : null}
          </HeaderElementCont>
          <HeaderElementCont
            miscStyles={{
              marginTop: [ { from: 's', until: 'l', value: '4rem', }, { until: 's', value: '2rem', }, ],
              paddingRight: [ { until: 'l', value: '2rem', }, ],
              paddingLeft: [ { until: 's', value: '2rem', }, ],
              order: [ { until: 'l', value: 2, }, ],
              maxWidth: [ { from: 's', until: 'l', value: magazineLayout.maxWidth.m, }, ],
              textAlign: 'start',
              marginBottom: [
                { from: 's', until: 'l', value: '4rem', },
                { until: 's', value: '2rem', },
              ],
            }}
          >
            <ArticleHeaderMeta
              authors={authors}
              publishDate={pubDate}
              modifiedDate={modDate}
              reportingFrom={reportingFrom}
              miscStyles={{
                flexDirection: 'column',
                display: [ { until: 'l', value: 'flex', }, { from: 'l', value: 'none', }, ],
                justifyContent: [
                  { from: 's', until: 'l', value: 'center', },
                  { from: 's', until: 'l', value: 'flex-start', },
                ],
                textAlign: [ { until: 's', value: 'start', }, ],
              }}
              variationMq={{
                a: { until: 'l', },
                c: { from: 'l', },
              }}
            />
          </HeaderElementCont>
          {variationB ? null : (
            <HeaderElementCont
              miscStyles={{
                // need this in order to run over specificity with mq's
                maxWidth: [
                  { from: 'm', until: 'l', value: '120rem', },
                  { from: 'xl', value: '145rem', },
                  { from: 'l', until: 'xl', value: '145rem', },
                ],
                marginRight: 'auto',
                marginLeft: 'auto',
                marginTop: [ { until: 'l', value: '1rem', }, ],
              }}
            >
              <MagazineShareBar
                title={title}
                canonicalUrl={canonicalUrl}
                miscStyles={{ marginTop: [ { from: 'l', value: 3, }, ], }}
              />
            </HeaderElementCont>
          )}
          {headlineElement && !variationB ? (
            <MagazineHeadlineElement
              elementObj={headlineElement}
              miscStyles={{
                marginTop: [ { from: 'm', value: '5rem', }, { until: 'm', value: '2rem', }, ],
                marginBottom: [ { until: 'm', value: 0, }, ],
                textAlign: 'start',
              }}
            />
          ) : null}
          <Paywall
            layouts={[ 'top', ]}
            miscStyles={{
              width: '100%',
              marginTop: '7rem',
              ...parseLayout(magazineLayout),
            }}
          />
        </header>
      )}
    />
  );
}

export default Header;
