import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderVertical, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';

import { stylesPropType, } from '../../propTypes/stylesPropType';
import Query from '../ApolloBoundary/Query';

import CreditArticle from '../Credit/CreditArticle';
import Alerts from '../Alerts/Alerts';
import Image from '../Image/Image';
import IconAlefLogo from '../Icon/icons/IconAlefLogo';
import TeaserTime from '../TeaserTime/TeaserTime';
import AuthorNotificationsRegistration from '../ServiceByMailRegistration/AuthorNotificationsRegistration';
import SlideinBox from '../Transitions/SlideinBox';
import EventTracker from '../../utils/EventTracker';

const PLATFORM_QUERY = gql`
  query GetPlatform {
    platform @client
  }
`;

const outerStyle = ({ theme, miscStyles, }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});
const wrapperStyle = ({ theme, miscStyles, variationMq, }) => ({
  display: 'flex',
  alignItems: 'center',
  extend: [
    ...(variationMq.a
      ? [
        // the media query rule is passed through the variationMq.a prop,
        // this pattern is used through the whole component
        theme.mq(variationMq.a, {
          flexGrow: 1,
          justifyContent: 'space-between',
          ...borderVertical({
            width: '1px',
            lines: 1,
            style: 'solid',
            color: theme.color('articleHeader', 'metaBorder'),
          }),
        }),
      ]
      : []),
    ...(variationMq.b ? [ theme.mq(variationMq.b, { justifyContent: 'flex-start', }), ] : []),
    ...(variationMq.c
      ? [
        theme.mq(variationMq.c, {
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }),
      ]
      : []),
  ],
});

// the time needs to render in different locations for mobile
// mobileTime indicates if this is the mobile location
const timeStyle = ({ theme, mobileTime, variationMq, }) => ({
  extend: [
    ...(variationMq.a ? [ theme.mq(variationMq.a, { display: mobileTime ? 'block' : 'none', }), ] : []),
    ...(variationMq.b
      ? [
        theme.mq(variationMq.b, {
          marginInlineStart: '1rem',
          marginInlineEnd: '1rem',
          ...(mobileTime ? {} : { display: 'none', }),
        }),
      ]
      : []),
    ...(variationMq.c
      ? [
        theme.mq(variationMq.c, {
          marginTop: '0.5rem',
          display: mobileTime ? 'none' : 'inline-block',
        }),
      ]
      : []),
    theme.type(-3),
  ],
});

const imageAuthorsAndMobileTimeContStyle = ({ theme, variationMq, }) => ({
  display: 'flex',
  alignItems: 'center',
  extend: [
    ...(variationMq.c
      ? [ theme.mq(variationMq.c, { flexDirection: 'column', alignItems: 'flex-start', }), ]
      : []),
  ],
});

const authorsAndTimeContStyle = ({ theme, variationMq, }) => ({
  extend: [
    ...(variationMq.a ? [ theme.mq(variationMq.a, {}), ] : []),
    ...(variationMq.b ? [ theme.mq(variationMq.b, {}), ] : []),
    ...(variationMq.c ? [ theme.mq(variationMq.c, { marginTop: '0.5rem', }), ] : []),
  ],
});

const alertsAndDesktopTimeContStyle = ({ theme, variationMq, }) => ({
  extend: [
    ...(variationMq.a ? [ theme.mq(variationMq.a, { marginStart: 'auto', }), ] : []),
    ...(variationMq.b ? [ theme.mq(variationMq.b, { marginStart: 'auto', }), ] : []),
    ...(variationMq.c ? [ theme.mq(variationMq.c, { marginTop: '1rem', }), ] : []),
  ],
});

class ArticleHeaderMeta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAuthorAlertsForm: false,
    };
    this.alertsToggleBtnRef = React.createRef();
  }

  displayDates = (publishDate, modifiedDate, className, variationMq) => (
    <FelaComponent
      style={theme => ({
        extend: [
          ...(variationMq.a ? [ theme.mq(variationMq.a, {}), ] : []),
          ...(variationMq.b ? [ theme.mq(variationMq.b, { display: 'inline', }), ] : []),
          ...(variationMq.c ? [ theme.mq(variationMq.c, {}), ] : []),
        ],
      })}
    >
      <TeaserTime publishDate={publishDate} lastUpdate={modifiedDate} className={className} />
    </FelaComponent>
  );

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
          biAction
            && biAction({
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
    const {
      authors,
      publishDate,
      reportingFrom,
      miscStyles,
      modifiedDate,
      variationMq,
    } = this.props;
    return (
      authors.length > 0 && (
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
                      variationMq={variationMq}
                      render={({ className, theme, }) => (
                        <Fragment>
                          <div className={className}>
                            <FelaComponent
                              rule={imageAuthorsAndMobileTimeContStyle}
                              variationMq={variationMq}
                            >
                              {/*  Author image */}
                              {authors.length > 1 || !authors[0].image ? (
                                <IconAlefLogo
                                  color="primary"
                                  size={[ { until: 'l', value: 6, }, { from: 'l', value: 10, }, ]}
                                  miscStyles={{
                                    display: [
                                      ...(variationMq.a
                                        ? [ { ...variationMq.a, value: 'inline-block', }, ]
                                        : []),
                                      ...(variationMq.b
                                        ? [ { ...variationMq.b, value: 'none', }, ]
                                        : []),
                                      ...(variationMq.c
                                        ? [ { ...variationMq.c, value: 'block', }, ]
                                        : []),
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
                                      ...(variationMq.a
                                        ? [ { ...variationMq.a, value: '6rem', }, ]
                                        : []),
                                      ...(variationMq.b
                                        ? [ { ...variationMq.b, value: '6rem', }, ]
                                        : []),
                                      ...(variationMq.c
                                        ? [ { ...variationMq.c, value: '10rem', }, ]
                                        : []),
                                    ],
                                    height: [
                                      ...(variationMq.a
                                        ? [ { ...variationMq.a, value: '6rem', }, ]
                                        : []),
                                      ...(variationMq.b
                                        ? [ { ...variationMq.b, value: '6rem', }, ]
                                        : []),
                                      ...(variationMq.c
                                        ? [ { ...variationMq.c, value: '10rem', }, ]
                                        : []),
                                    ],
                                    paddingBottom: '6rem',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    display: [
                                      ...(variationMq.a
                                        ? [ { ...variationMq.a, value: 'inline-block', }, ]
                                        : []),
                                      ...(variationMq.b
                                        ? [ { ...variationMq.b, value: 'none', }, ]
                                        : []),
                                      ...(variationMq.c
                                        ? [ { ...variationMq.c, value: 'block', }, ]
                                        : []),
                                    ],
                                    marginInlineEnd: '1rem',
                                  }}
                                />
                              )}

                              {/* Author name and publish-date */}
                              <FelaComponent
                                rule={authorsAndTimeContStyle}
                                variationMq={variationMq}
                              >
                                {authors.map((author, idx) => (
                                  <CreditArticle
                                    key={author.contentId || author.name}
                                    contentName={author.name || author.contentName}
                                    url={author.url}
                                    onClick={
                                      biAction
                                        ? () => biAction({
                                          actionCode: 109,
                                          additionalInfo: {
                                            writer_id: author.contentId || author.contentName,
                                            platform,
                                          },
                                        })
                                        : null
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
                                        theme.type(-1, {
                                          fromBp: 's',
                                          untilBp: 'xl',
                                        }),
                                        theme.type(-2, { untilBp: 's', }),
                                        ...(variationMq.a
                                          ? [
                                            theme.mq(variationMq.a, {
                                              ':before': {
                                                content: '" | "',
                                              },
                                            }),
                                          ]
                                          : []),
                                        ...(variationMq.b
                                          ? [
                                            theme.mq(variationMq.b, {
                                              ':before': {
                                                content: '" | "',
                                              },
                                            }),
                                          ]
                                          : []),
                                        ...(variationMq.c
                                          ? [ theme.mq(variationMq.c, { display: 'block', }), ]
                                          : []),
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
                                  variationMq={variationMq}
                                  render={({ className, }) => (
                                    <Fragment>
                                      {this.displayDates(
                                        publishDate,
                                        modifiedDate,
                                        className,
                                        variationMq
                                      )}
                                    </Fragment>
                                  )}
                                />
                              </FelaComponent>
                            </FelaComponent>
                            {/* alerts and desktop time */}
                            <FelaComponent
                              rule={alertsAndDesktopTimeContStyle}
                              variationMq={variationMq}
                            >
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
                              variationMq={variationMq}
                              mobileTime={false}
                              render={({ className, }) => (
                                <Fragment>
                                  {this.displayDates(
                                    publishDate,
                                    modifiedDate,
                                    className,
                                    variationMq
                                  )}
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
      )
    );
  }
}

ArticleHeaderMeta.propTypes = {
  /**
   * An array of Article's authors
   */
  authors: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.object, ])).isRequired,
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
  /**
   * This component has three view variation,
   * by default:
   * variation a is used up to 's' bp,
   * variation b is used from 's' to 'l',
   * variation c from: 'l'.
   * In cases that we want to use each view from different  breakpoints,
   * we pass the variationMq prop, specifying which variation should be used for each bp.
   * you can skip one of the variation if not needed but make sure to cover all breakpoints
   * e.g :
   * variationMq: {
   * a: { until: 's', },
   * b: {},
   * c: { from: 's', },
   *   },
   *
   */
  variationMq: PropTypes.shape({
    a: PropTypes.shape({
      until: PropTypes.oneOf([ 's', 'm', 'l', 'xl', ]),
      from: PropTypes.oneOf([ 's', 'm', 'l', 'xl', ]),
    }),
    b: PropTypes.shape({
      until: PropTypes.oneOf([ 's', 'm', 'l', 'xl', ]),
      from: PropTypes.oneOf([ 's', 'm', 'l', 'xl', ]),
    }),
    c: PropTypes.shape({
      until: PropTypes.oneOf([ 's', 'm', 'l', 'xl', ]),
      from: PropTypes.oneOf([ 's', 'm', 'l', 'xl', ]),
    }),
  }),
};

ArticleHeaderMeta.defaultProps = {
  reportingFrom: null,
  modifiedDate: null,
  miscStyles: null,
  variationMq: {
    a: { until: 's', },
    b: { from: 's', until: 'l', },
    c: { from: 'l', },
  },
};

export default ArticleHeaderMeta;
