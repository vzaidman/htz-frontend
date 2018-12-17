import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderVertical, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';

import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import Query from '../../../ApolloBoundary/Query';

import CreditArticle from '../../../Credit/CreditArticle';
// import Alerts from '../../../Alerts/Alerts';
// import Image from '../../../Image/Image';
// import IconAlefLogo from '../../../Icon/icons/IconAlefLogo';
import Time from '../../../Time/Time';
// import AuthorNotificationsRegistration from '../../../ServiceByMailRegistration/AuthorNotificationsRegistration';
// import SlideinBox from '../../../Transitions/SlideinBox';
import EventTracker from '../../../../utils/EventTracker';

const PLATFORM_QUERY = gql`
  query GetPlatform {
    platform @client
  }
`;

// //////////////////////////////////////////////////////////////////////
//                               Styles                                //
// //////////////////////////////////////////////////////////////////////

const outerStyle = ({ theme, miscStyles, }) => ({
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});
const wrapperStyle = ({ theme, miscStyles, }) => ({
  display: 'flex',
  alignItems: 'center',
  extend: [
    theme.mq(
      { until: 's', },
      {
        flexGrow: 1,
        justifyContent: 'space-between',
        ...borderVertical({
          width: '1px',
          lines: 1,
          style: 'solid',
          color: theme.color('articleHeader', 'metaBorder'),
        }),
      }
    ),
    theme.mq({ from: 's', }, { justifyContent: 'flex-start', }),
    theme.mq({ from: 'l', }, { flexDirection: 'column', alignItems: 'flex-start', }),
  ],
});

// the time needs to render in different locations for mobile
// mobileTime indicates if this is the mobile location
const timeStyle = ({ theme, mobileTime, }) => ({
  display: 'inline-block',
  extend: [
    theme.mq({ [mobileTime ? 'from' : 'until']: 'l', }, { display: 'none', }),
    theme.mq({ from: 's', until: 'l', }, { marginInlineStart: '1rem', marginInlineEnd: '1rem', }),
    theme.mq({ from: 'l', }, { marginTop: '0.5rem', }),
    theme.type(-3),
  ],
});

const imageAuthorsAndMobileTimeContStyle = theme => ({
  display: 'flex',
  alignItems: 'center',
  extend: [ theme.mq({ from: 'l', }, { flexDirection: 'column', alignItems: 'flex-start', }), ],
});

const authorsAndTimeContStyle = theme => ({
  extend: [ theme.mq({ from: 'l', }, { marginTop: '0.5rem', }), ],
});

// //////////////////////////////////////////////////////////////////////
//                         Time/Date funciton                          //
// //////////////////////////////////////////////////////////////////////

const shouldShowDate = ({ startTime, endTime, hours = 18, }) => {
  const MILISECS_IN_HOUR = 3600 * 1000;
  return new Date(startTime).getTime() - new Date(endTime).getTime() < hours * MILISECS_IN_HOUR;
};

const articleTimeFormat = (startTime, endTime) => (shouldShowDate({ startTime, endTime, }) ? 'HH:mm' : 'DD.MM.YYYY');

// //////////////////////////////////////////////////////////////////////
//                           Main component                            //
// //////////////////////////////////////////////////////////////////////

class LiveBlogHeaderMeta extends React.Component {
  static propTypes = {
    /**
     * An array of Article's authors
     */
    authors: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ]))
      .isRequired,
    /**
     * The publishing date of the article
     */
    publishDate: PropTypes.instanceOf(Date).isRequired,
    /**
     * The modified date of the article
     */
    modifiedDate: PropTypes.instanceOf(Date),

    isLiveUpdate: PropTypes.bool,
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
  };

  static defaultProps = {
    isLiveUpdate: false,
    modifiedDate: null,
    miscStyles: null,
  };

  setModifiedDate = (modifiedDate, className) => {
    if (!modifiedDate) {
      return null;
    }
    const format = articleTimeFormat(new Date(), modifiedDate);
    return <Time time={modifiedDate} format={`עודכן ב-${format}`} className={className} />;
  };

  displayDates = (publishDate, modifiedDate, className) => {
    if (new Date(publishDate).toDateString() === new Date(modifiedDate).toDateString()) {
      const format = new Date().toDateString() === new Date(modifiedDate).toDateString()
        ? 'HH:mm'
        : 'DD.MM.YYYY';
      return (
        <Fragment>
          <Time time={modifiedDate} format={format} className={className} />
        </Fragment>
      );
    }
    const format = new Date().toDateString() === new Date(publishDate).toDateString() ? 'HH:mm' : 'DD.MM.YYYY';
    return (
      <FelaComponent
        style={theme => ({
          extend: [ theme.mq({ from: 's', until: 'l', }, { display: 'inline', }), ],
        })}
      >
        <Time time={publishDate} format={format} className={className} />
        {' '}
        {this.setModifiedDate(modifiedDate, className)}
      </FelaComponent>
    );
  };

  render() {
    const { authors, publishDate, miscStyles, modifiedDate, isLiveUpdate, } = this.props;
    return (
      <EventTracker>
        {({ biAction, }) => (
          <FelaComponent rule={outerStyle} miscStyles={miscStyles}>
            <Query query={PLATFORM_QUERY}>
              {({ loading, error, data, client, }) => {
                if (loading) return null;
                if (error) console.log(error);
                const { platform, } = data;
                return (
                  <FelaComponent
                    rule={wrapperStyle}
                    render={({ className, theme, }) => (
                      <Fragment>
                        <div className={className}>
                          <FelaComponent style={imageAuthorsAndMobileTimeContStyle}>
                            {/*  Author image */}

                            {/* Author name and publish-date */}
                            <FelaComponent style={authorsAndTimeContStyle}>
                              {authors.map((author, idx) => (
                                <CreditArticle
                                  key={author.contentId || author.name}
                                  contentName={author.name || author.contentName}
                                  url={author.url}
                                  onClick={() => biAction({
                                    actionCode: 109,
                                    additionalInfo: {
                                      writer_id: author.contentId || author.contentName,
                                      platform,
                                    },
                                  })
                                  }
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
                              <FelaComponent
                                rule={timeStyle}
                                mobileTime
                                render={({ className, }) => (
                                  <Fragment>
                                    {this.displayDates(publishDate, modifiedDate, className)}
                                  </Fragment>
                                )}
                              />
                            </FelaComponent>
                          </FelaComponent>
                          {isLiveUpdate ? (
                            <FelaComponent
                              style={{
                                marginTop: '3rem',
                                extend: [
                                  theme.mq({ from: 'l', }, { display: 'flex', }),
                                  theme.mq({ until: 'l', }, { display: 'none', }),
                                ],
                              }}
                              render={({ className, theme, }) => (
                                <span className={className}>
                                  <FelaComponent
                                    style={{
                                      color: theme.color('tertiary'),
                                      margin: 'auto',
                                      fontWeight: 'bold',
                                      extend: [ theme.type(-2), ],
                                    }}
                                    render={({ className, }) => (
                                      <span className={className}>
                                        {theme.liveBlogI18n.liveUpdate}
                                      </span>
                                    )}
                                  />
                                  <FelaComponent
                                    style={{
                                      height: '1.5rem',
                                      width: '1.5rem',
                                      borderRadius: '50%',
                                      backgroundColor: theme.color('tertiary'),
                                      marginInlineStart: '1rem',
                                      marginTop: '0.5rem',
                                    }}
                                    render={({ className, }) => <span className={className} />}
                                  />
                                </span>
                              )}
                            />
                          ) : null}
                          <FelaComponent
                            rule={timeStyle}
                            mobileTime={false}
                            render={({ className, }) => (
                              <Fragment>
                                {this.displayDates(publishDate, modifiedDate, className)}
                              </Fragment>
                            )}
                          />
                        </div>
                      </Fragment>
                    )}
                  />
                );
              }}
            </Query>
          </FelaComponent>
        )}
      </EventTracker>
    );
  }
}

export default LiveBlogHeaderMeta;
