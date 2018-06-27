import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderVertical, } from '@haaretz/htz-css-tools';

import { stylesPropType, } from '../../propTypes/stylesPropType';

import CreditArticle from '../Credit/CreditArticle';
import Alerts from '../Alerts/Alerts';
import Image from '../Image/Image';
import Time from '../Time/Time';

ArticleHeaderMeta.propTypes = {
  /**
   * An array of Article's authors.
   */
  authors: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
  /**
   * The publishing date of the article
   */
  publishDateTime: PropTypes.instanceOf(Date).isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

ArticleHeaderMeta.defaultProps = {
  miscStyles: null,
};
const wrapperStyle = ({ theme, miscStyles, }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  extend: [
    theme.mq(
      { until: 's', },
      {
        ...borderVertical({
          width: '1px',
          lines: 1,
          style: 'solid',
          color: theme.color('articleHeader', 'metaBorder'),
        }),
      }
    ),
    theme.mq({ from: 's', until: 'l', }, { justifyContent: 'center', }),
    theme.mq(
      { from: 'l', },
      { flexDirection: 'column', alignItems: 'flex-start', }
    ),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

// the time needs to render in different locations for mobile
// mobileTime indicates if this is the mobile location
const timeStyle = ({ theme, mobileTime, }) => ({
  extend: [
    theme.mq({ [mobileTime ? 'from' : 'until']: 'l', }, { display: 'none', }),
    theme.mq(
      { from: 's', until: 'l', },
      { marginInlineStart: '1rem', marginInlineEnd: '1rem', }
    ),
    theme.mq({ from: 'l', }, { marginTop: '2rem', }),
    theme.type(theme.articleStyle.header.bylineFontSize),
  ],
});

const imageAuthorsAndMobileTimeContStyle = theme => ({
  display: 'flex',
  alignItems: 'center',
  extend: [
    theme.mq(
      { from: 'l', },
      { flexDirection: 'column', alignItems: 'flex-start', }
    ),
  ],
});

const authorsAndTimeContStyle = theme => ({
  extend: [
    theme.mq(
      { from: 's', until: 'l', },
      { display: 'flex', flexDirection: 'row', }
    ),
    theme.mq({ from: 'l', }, { marginTop: '2rem', }),
  ],
});

const alertsAndDesktopTimeContStyle = theme => ({
  extend: [ theme.mq({ from: 'l', }, { marginTop: '2rem', }), ],
});

function ArticleHeaderMeta({ authors, publishDateTime, miscStyles, }) {
  return (
    <FelaComponent
      miscStyles={miscStyles}
      rule={wrapperStyle}
      render={({ className, theme, }) => (
        <div className={className}>
          <FelaComponent style={imageAuthorsAndMobileTimeContStyle(theme)}>
            {/*  Author image */}
            {authors[0].image && (
              <Image
                data={authors[0].image}
                imgOptions={{
                  transforms: {
                    width: '100',
                    aspect: 'square',
                    quality: 'auto',
                  },
                }}
                miscStyles={{
                  width: [
                    { until: 'l', value: '6rem', },
                    { from: 'l', value: '10rem', },
                  ],
                  height: [
                    { until: 'l', value: '6rem', },
                    { from: 'l', value: '10rem', },
                  ],
                  paddingBottom: '6rem',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  display: [
                    { until: 's', value: 'inline-block', },
                    { from: 's', until: 'l', value: 'none', },
                    { from: 'l', value: 'block', },
                  ],
                  marginInlineEnd: '1rem',
                }}
              />
            )}

            {/* Author name and publish-date */}
            <FelaComponent style={authorsAndTimeContStyle}>
              <div>
                {authors.map((author, idx) => (
                  <CreditArticle
                    contentName={author.name || author.contentName}
                    url={author.url}
                    miscStyles={{
                      ':after': {
                        content:
                          idx === authors.length - 1
                            ? null
                            : authors.length > 1
                              ? authors.length - 2 === idx
                                ? '" ו"'
                                : '", "'
                              : null,
                      },
                      display: 'inline',
                    }}
                  />
                ))}
              </div>
              <FelaComponent
                rule={timeStyle}
                mobileTime
                render={({ className, }) => (
                  <Time
                    time={publishDateTime}
                    format="DD.MM.YYYY HH:mm"
                    className={className}
                  />
                )}
              />
            </FelaComponent>
          </FelaComponent>
          {/* alerts and desktop time */}
          <FelaComponent style={alertsAndDesktopTimeContStyle(theme)}>
            {/* display alerts only if the firstFollow author,
              guyk: should it be only if there is only one author
            (that was the way it was here before refactoring) */}
            {// authors.length === 1 &&
            authors[0].hasPushAlerts && <Alerts author={authors[0]} />}
          </FelaComponent>
          <FelaComponent
            rule={timeStyle}
            mobileTime={false}
            render={({ className, }) => (
              <Time
                time={publishDateTime}
                format="DD.MM.YYYY HH:mm"
                className={className}
              />
            )}
          />
        </div>
      )}
    />
  );
}

export default ArticleHeaderMeta;
