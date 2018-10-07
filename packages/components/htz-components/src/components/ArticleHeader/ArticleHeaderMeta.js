import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderVertical, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';

import { stylesPropType, } from '../../propTypes/stylesPropType';
import { Query, } from '../ApolloBoundary/ApolloBoundary';

import CreditArticle from '../Credit/CreditArticle';
import Alerts from '../Alerts/Alerts';
import Image from '../Image/Image';
import IconAlefLogo from '../Icon/icons/IconAlefLogo';
import Time from '../Time/Time';
import AuthorNotificationsRegistration from '../ServiceByMailRegistration/AuthorNotificationsRegistration';
import SlideinBox from '../Transitions/SlideinBox';
import EventTracker from '../../utils/EventTracker';

const PLATFORM_QUERY = gql`
  query GetPlatform {
    platform @client
  }
`;

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
    theme.type(-2, { fromBp: 'xl', }),
    theme.type(-2, { untilBp: 'xl', }),
  ],
});

const imageAuthorsAndMobileTimeContStyle = theme => ({
  display: 'flex',
  alignItems: 'center',
  extend: [ theme.mq({ from: 'l', }, { flexDirection: 'column', alignItems: 'flex-start', }), ],
});

const authorsAndTimeContStyle = theme => ({
  extend: [ theme.mq({ from: 'l', }, { marginTop: '1rem', }), ],
});

const alertsAndDesktopTimeContStyle = theme => ({
  extend: [ theme.mq({ from: 'l', }, { marginTop: '1rem', }), ],
});

const shouldShowDate = ({ startTime, endTime, hours = 18, }) => {
  const MILISECS_IN_HOUR = 3600 * 1000;
  return new Date(startTime).getTime() - new Date(endTime).getTime() < hours * MILISECS_IN_HOUR;
};

const articleTimeFormat = (startTime, endTime) =>
  (shouldShowDate({ startTime, endTime, }) ? 'HH:mm' : 'DD.MM.YYYY');

class ArticleHeaderMeta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAuthorAlertsForm: false,
    };

    // this.toggleAuthorAlertsForm = this.toggleAuthorAlertsForm.bind(this);
    this.alertsToggleBtnRef = React.createRef();
  }

  setModifiedDate = (modifiedDate, className) => {
    if (!modifiedDate) {
      return null;
    }
    const format = articleTimeFormat(new Date(), modifiedDate);
    return <Time time={modifiedDate} format={`עודכן ב-${format}`} className={className} />;
  };

  displayDates = (publishDate, modifiedDate, className) => {
    if (new Date(publishDate).toDateString() === new Date(modifiedDate).toDateString()) {
      const format = new Date().toDateString() === new Date(modifiedDate).toDateString() ? 'HH:mm' : 'DD.MM.YYYY';
      return (
        <Fragment>
          <Time time={modifiedDate} format={format} className={className} />
        </Fragment>
      );
    }
    const format = new Date().toDateString() === new Date(publishDate).toDateString() ? 'HH:mm' : 'DD.MM.YYYY';
    return (
      <FelaComponent
        style={theme => ({ extend: [ theme.mq({ from: 's', until: 'l', }, { display: 'inline', }), ], })}
      >
        <Time time={publishDate} format={format} className={className} />{' '}
        {this.setModifiedDate(modifiedDate, className)}
      </FelaComponent>
    );
  };

  toggleAuthorAlertsForm = (biAction, platform) => {
    this.setState(
      prevState => ({
        isShowAuthorAlertsForm: !prevState.isShowAuthorAlertsForm,
      }),
      () => {
        if (!this.state.isShowAuthorAlertsForm) {
          this.alertsToggleBtnRef.current.focus();
        }
        else {
          biAction({
            actionCode: 91,
            additionalInfo: {
              writer_id: this.props.authors[0].contentId,
              platform,
            },
          });
        }
      }
    );
  };

  render() {
    const { authors, publishDate, reportingFrom, miscStyles, modifiedDate, } = this.props;
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
                            {authors.length > 1 || !authors[0].image ? (
                              <IconAlefLogo
                                color="primary"
                                size={[ { until: 'l', value: 6, }, { from: 'l', value: 10, }, ]}
                                miscStyles={{
                                  display: [
                                    { until: 's', value: 'inline-block', },
                                    { from: 's', until: 'l', value: 'none', },
                                    { from: 'l', value: 'block', },
                                  ],
                                  marginInlineEnd: '1rem',
                                }}
                              />
                            ) : (
                              <Image
                                data={authors[0].image}
                                imgOptions={{
                                  transforms: {
                                    width: '100',
                                    aspect: 'square',
                                    quality: 'auto',
                                    gravity: 'face',
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
                              {authors.map((author, idx) => (
                                <CreditArticle
                                  key={author.contentId || author.name}
                                  contentName={author.name || author.contentName}
                                  url={author.url}
                                  onClick={() =>
                                    biAction({
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
                              {reportingFrom ? (
                                <FelaComponent
                                  style={{
                                    color: theme.color('primary'),
                                    extend: [
                                      theme.type(-2, { fromBp: 'xl', }),
                                      theme.type(-1, { fromBp: 's', untilBp: 'xl', }),
                                      theme.type(-2, { untilBp: 's', }),
                                      theme.mq({ from: 'l', }, { display: 'block', }),
                                      theme.mq(
                                        {
                                          until: 'l',
                                        },
                                        {
                                          ':before': {
                                            content: '" | "',
                                          },
                                        }
                                      ),
                                    ],
                                  }}
                                  render="span"
                                >
                                  {reportingFrom}
                                </FelaComponent>
                              ) : null}

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
                          {/* alerts and desktop time */}
                          <FelaComponent style={alertsAndDesktopTimeContStyle}>
                            {authors.length === 1 && authors[0].hasEmailAlerts ? (
                              <Alerts
                                author={authors[0]}
                                onToggle={() => this.toggleAuthorAlertsForm(biAction, platform)}
                                ref={this.alertsToggleBtnRef}
                              />
                            ) : null}
                          </FelaComponent>
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
                        <SlideinBox
                          show={authors[0].hasEmailAlerts && this.state.isShowAuthorAlertsForm}
                          duration={2}
                          focus
                          maxHeight={100}
                        >
                          <AuthorNotificationsRegistration
                            author={authors[0]}
                            platform={platform}
                            biAction={biAction}
                            onCancel={() => this.toggleAuthorAlertsForm(biAction, platform)}
                          />
                        </SlideinBox>
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

ArticleHeaderMeta.propTypes = {
  /**
   * An array of Article's authors
   */
  authors: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])).isRequired,
  /**
   * The publishing date of the article
   */
  publishDate: PropTypes.instanceOf(Date).isRequired,
  /**
   * The modified date of the article
   */
  modifiedDate: PropTypes.instanceOf(Date),

  reportingFrom: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

ArticleHeaderMeta.defaultProps = {
  reportingFrom: null,
  modifiedDate: null,
  miscStyles: null,
};

export default ArticleHeaderMeta;
