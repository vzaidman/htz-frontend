/* eslint-disable react/prop-types */
/* global window, fetch, Headers  */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import {
  Query,
  ApolloConsumer,
  Mutation,
} from '../ApolloBoundary/ApolloBoundary';
import Button from '../Button/Button';
import EventTracker from '../../utils/EventTracker';

import IconComment from '../Icon/icons/IconComment';
import IconFacebook from '../Icon/icons/IconFacebook';
import IconFacebookLogo from '../Icon/icons/IconFacebookLogo';
import IconGPlus from '../Icon/icons/IconGPlus';
import IconMail from '../Icon/icons/IconMail';
import IconMailAlert from '../Icon/icons/IconMailAlert';
import IconMessenger from '../Icon/icons/IconMessenger';
import IconPrint from '../Icon/icons/IconPrint';
import IconTwitter from '../Icon/icons/IconTwitter';
import IconWhatsapp from '../Icon/icons/IconWhatsapp';
import IconZen from '../Icon/icons/IconZen';

const GET_COMMENTS_ID = gql`
  query GetCommentsId {
    commentsElementId @client
  }
`;

const GET_COMMENTS_COUNT = gql`
  query CommentsCount($path: String!) {
    commentsElement(path: $path) {
      totalHits
    }
  }
`;

const TOGGLE_ZEN = gql`
  mutation ToggleZen {
    toggleZen @client
  }
`;

const GET_PLATFORM_AND_HOST = gql`
  query GetPlatformAndHost {
    platform @client
    hostname @client
  }
`;

const fbAcceessTokens = new Map([
  [
    'haaretz.co.il',
    'EAABkq33GsqwBAMhelXM0V7xJQmgJ1sf0nvxZAyZBZAtStCyZC6Is1m1OgnsL1Jxsw6BJx0zaZA1TOZBrZAYVMiNNEqLwb4ZARsYUZCEKZAG6r4Wnuminzgi41WQUZCCKvpdhjuHKgh1s3R3fWKjZA4rXvYEoHxgWRSzvFrRMkALfoQUAVwZDZD',
  ],
  [
    'themarker.com',
    'EAAAADFLekyEBALCakiZCjSqF8OZClwH0jTjp4I5zpkZAU8iaq12cX3QPu6I2ZCoOUyc8JEYwDp8U0isTAW7LbM8ZAsQExXz1ZAlKSkx1gVYfrpC8YPThdcp34RYyf2cQww8QJGRTdacCPZCOxiC160ahXowzJyrUMdtCgbNo2490wZDZD',
  ],
  [
    'haaretz.com',
    'EAAEFgePToDMBAIgqIXUST4t21Tyb8ZCOeNGZBV6jjMmYqcR7TjeTaW21ubz11ES8u7PLHfdIbUpSnFeHcw2rZCfZB1xDtWv5CADnNN7bLhQLmnfZCOShaB181P6RHRj44wWZBxZASo3pZBZBu4BoAnEUZAkcD4RDPmNpAc1FbYapYoywZDZD',
  ],
]);

const fbAppIds = new Map([
  [ 'haaretz.co.il', '204189766612580', ],
  [ 'themarker.com', '865781296889153', ],
  [ 'haaretz.com', '1173232469385534', ],
]);

const ActionButton = ({ styles, render, }) => (
  <Query query={GET_PLATFORM_AND_HOST}>
    {({ loading, error, data, client, }) => {
      if (loading) return null;
      if (error) console.log(error);
      const { platform, hostname, } = data;
      const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
      return (
        <EventTracker>
          {({ biAction, }) => (
            <FelaComponent
              style={{
                ...styles,
              }}
              render={({ className, }) =>
                render({ className, platform, biAction, host, })
              }
            />
          )}
        </EventTracker>
      );
    }}
  </Query>
);

const Comments = ({ styles, size, iconStyles, ...props }) => (
  <ApolloConsumer>
    {cache => {
      const { commentsElementId, } = cache.readQuery({
        query: GET_COMMENTS_ID,
      });
      return (
        <Query
          query={GET_COMMENTS_COUNT}
          variables={{ path: commentsElementId, }}
        >
          {({ loading, error, data, }) => {
            const { totalHits, } = data.commentsElement || {};
            return (
              <ActionButton
                styles={styles}
                render={({ className, platform, biAction, }) => (
                  <Button
                    {...props}
                    className={className}
                    href="#"
                    onClick={() => {
                      biAction({
                        actionCode: 111,
                        additionalInfo: {
                          platform,
                          ...(!loading && !error
                            ? { NumOfTalkbacks: totalHits, }
                            : {}),
                        },
                      });
                    }}
                  >
                    {!loading &&
                      !error && (
                        <FelaComponent
                          style={{ marginEnd: '1rem', }}
                          render="span"
                        >
                          {totalHits}
                        </FelaComponent>
                      )}
                    <IconComment size={size} miscStyles={iconStyles} />
                  </Button>
                )}
              />
            );
          }}
        </Query>
      );
    }}
  </ApolloConsumer>
);

const Facebook = ({
  styles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  round,
  ...props
}) => {
  const FacebookIcon = round ? IconFacebook : IconFacebookLogo;
  return (
    <ActionButton
      styles={styles}
      render={({ className, platform, biAction, host, }) => (
        <Button
          {...props}
          className={className}
          href={`https://www.facebook.com/dialog/feed?app_id=${fbAppIds.get(
            host
          )}&redirect_uri=${elementUrl}&link=${elementUrl}&display=popup`}
          onClick={() => {
            biAction({
              actionCode: 10,
              additionalInfo: {
                platform,
                ...(buttonText ? { NumOfTalkbacks: buttonText, } : {}),
              },
            });
          }}
        >
          {buttonText && (
            <FelaComponent style={{ marginEnd: '1rem', }} render="span">
              {buttonText}
            </FelaComponent>
          )}
          <FacebookIcon size={size} miscStyles={iconStyles} />
        </Button>
      )}
    />
  );
};

class FacebookLogo extends React.Component {
  state = {
    facebookCount: null,
    host: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.host !== this.state.host) {
      this.getFacebookCount(this.state.host);
    }
  }

  getFacebookCount = host => {
    const accessToken = fbAcceessTokens.get(host);
    const url = `https://graph.facebook.com/?fields=share&access_token=${accessToken}&id=${
      this.props.elementUrl
    }&format=json`;

    return fetch(url, {
      method: 'get',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(data => this.setState({ facebookCount: data.share.share_count, }))
      .catch(error => console.log('error: ', error));
  };

  render() {
    const { styles, size, iconStyles, elementUrl, ...props } = this.props;

    const { facebookCount, } = this.state;
    return (
      <ActionButton
        styles={styles}
        render={({ className, platform, biAction, host, }) => {
          if (!this.state.host) this.setState({ host, });
          return (
            <Button
              {...props}
              className={className}
              href={`https://www.facebook.com/sharer/sharer.php?&u=${elementUrl}`}
              onClick={() => {
                window.open(
                  'https://www.facebook.com/sharer/sharer.php?&amp;u=https://www.haaretz.co.il/news/science/.premium-1.6248935',
                  'popup',
                  'width=635,height=342,scrollbars=no,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no'
                );
                biAction({
                  actionCode: 10,
                  additionalInfo: {
                    platform,
                    ...(facebookCount ? { NumOfTalkbacks: facebookCount, } : {}),
                  },
                });
              }}
            >
              {facebookCount ? (
                <FelaComponent style={{ marginEnd: '1rem', }} render="span">
                  {facebookCount}
                </FelaComponent>
              ) : null}
              <IconFacebookLogo size={size} miscStyles={iconStyles} />
            </Button>
          );
        }}
      />
    );
  }
}

const GooglePlus = ({
  styles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  ...props
}) => (
  <ActionButton
    styles={styles}
    render={({ className, platform, biAction, }) => (
      <Button
        {...props}
        className={className}
        href={`https://plus.google.com/share?url=${elementUrl}`}
        onClick={() => {
          biAction({
            actionCode: '',
            additionalInfo: {
              platform,
              ...(buttonText ? { NumOfTalkbacks: buttonText, } : {}),
            },
          });
        }}
      >
        {buttonText && (
          <FelaComponent style={{ marginEnd: '1rem', }} render="span">
            {buttonText}
          </FelaComponent>
        )}
        <IconGPlus size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Mail = ({
  styles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}) => (
  <ActionButton
    styles={styles}
    render={({ className, platform, biAction, }) => (
      <Button
        {...props}
        className={className}
        href={`mailto:?subject=${elementName}&body=${elementUrl}`}
        onClick={() => {
          biAction({
            actionCode: 13,
            additionalInfo: {
              platform,
            },
          });
        }}
      >
        <IconMail size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const MailAlert = ({
  styles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}) => (
  <ActionButton
    styles={styles}
    render={({ className, platform, biAction, }) => (
      <Button
        {...props}
        className={className}
        href={`mailto:?subject=${elementName}&body=${elementUrl}`}
        onClick={() => {
          biAction({
            actionCode: 13,
            additionalInfo: {
              platform,
            },
          });
        }}
      >
        <IconMailAlert size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Messenger = ({
  styles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  ...props
}) => (
  <ActionButton
    styles={styles}
    render={({ className, platform, biAction, host, }) => (
      <Button
        {...props}
        className={className}
        href={`fb-messenger://share/?link=${elementUrl}&app_id=${fbAppIds.get(
          host
        )}`}
        onClick={() => {
          biAction({
            actionCode: '',
            additionalInfo: {
              platform,
              ...(buttonText ? { NumOfTalkbacks: buttonText, } : {}),
            },
          });
        }}
      >
        {buttonText && (
          <FelaComponent style={{ marginEnd: '1rem', }} render="span">
            {buttonText}
          </FelaComponent>
        )}
        <IconMessenger size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Print = ({
  styles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}) => (
  <ActionButton
    styles={styles}
    render={({ className, platform, biAction, }) => (
      <Button
        {...props}
        className={className}
        href={`/misc/article-print-page/${elementUrl}`}
        onClick={() => {
          biAction({
            actionCode: 112,
            additionalInfo: {
              platform,
            },
          });
        }}
      >
        <IconPrint size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Twitter = ({
  styles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}) => (
  <ActionButton
    styles={styles}
    render={({ className, platform, biAction, }) => (
      <Button
        {...props}
        className={className}
        href={`https://twitter.com/intent/tweet?text=${elementName}&url=${elementUrl}`}
        onClick={() => {
          biAction({
            actionCode: '',
            additionalInfo: {
              platform,
            },
          });
        }}
      >
        <IconTwitter size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Whatsapp = ({ styles, size, iconStyles, elementUrl, ...props }) => (
  <ActionButton
    styles={styles}
    render={({ className, platform, biAction, }) => (
      <Button
        {...props}
        className={className}
        onClick={() => {
          window.open(
            `https://web.whatsapp.com/send?text=${elementUrl}` + // eslint-disable-line prefer-template
              encodeURIComponent(
                '?utm_source=Web_Share&utm_medium=Whatsapp&utm_campaign=Share'
              ),
            'popup',
            'width=635,height=800,scrollbars=no,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no'
          );

          biAction({
            actionCode: 11,
            additionalInfo: {
              platform,
            },
          });
          return false;
        }}
      >
        <IconWhatsapp size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Zen = ({
  styles,
  size,
  buttonText,
  iconStyles,
  elementUrl,
  ...props
}) => (
  <Mutation mutation={TOGGLE_ZEN}>
    {toggleZen => (
      <ActionButton
        styles={styles}
        render={({ className, platform, biAction, }) => (
          <Button
            {...props}
            className={className}
            onClick={() => {
              toggleZen();
              biAction({
                actionCode: 92,
                additionalInfo: {
                  platform,
                  ...(buttonText ? { NumOfTalkbacks: buttonText, } : {}),
                },
              });
              return false;
            }}
          >
            <IconZen size={size} miscStyles={iconStyles} />
          </Button>
        )}
      />
    )}
  </Mutation>
);

const getIcon = iconName => {
  const icons = new Map([
    [ 'comments', Comments, ],
    [ 'facebook', Facebook, ],
    [ 'facebooklogo', FacebookLogo, ],
    [ 'googleplus', GooglePlus, ],
    [ 'mail', Mail, ],
    [ 'mailalert', MailAlert, ],
    [ 'messenger', Messenger, ],
    [ 'print', Print, ],
    [ 'twitter', Twitter, ],
    [ 'whatsapp', Whatsapp, ],
    [ 'zen', Zen, ],
  ]);

  return icons.get(iconName.toLowerCase());
};

export default getIcon;
