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
import Save from './ActionSave';

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

const GET_PAGE_DATA = gql`
  query GetPageData {
    platform @client
    hostname @client
    articleId @client
    user @client {
      id
    }
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
  [ 'haaretz.co.il', '110687712359084', ],
  [ 'themarker.com', '52929925921', ],
  [ 'haaretz.com', '287530407927859', ],
]);

export const ActionButton = ({ render, }) => (
  <Query query={GET_PAGE_DATA}>
    {({ loading, error, data, }) => {
      if (loading) return null;
      if (error) console.log(error);
      const { platform, hostname, articleId, user: { id: userId, }, } = data;
      const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
      return (
        <EventTracker>
          {({ biAction, biActionMapper, }) =>
            render({
              platform,
              biAction,
              biActionMapper,
              host,
              hostname,
              articleId,
              userId,
            })
          }
        </EventTracker>
      );
    }}
  </Query>
);

const Comments = ({ buttonStyles, size, iconStyles, ...props }) => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        href="#commentsSection"
        onClick={() => {
          biAction({
            actionCode: biActionMapper.get('go_to_comments'),
            additionalInfo: {
              platform,
            },
          });
        }}
      >
        <ApolloConsumer>
          {cache => {
            const { commentsElementId, } = cache.readQuery({
              query: GET_COMMENTS_ID,
            });
            return commentsElementId ? (
              <Query
                query={GET_COMMENTS_COUNT}
                variables={{ path: commentsElementId, }}
              >
                {({ loading, error, data, }) => {
                  if (loading) return null;
                  if (error) return null;
                  const { totalHits, } = data.commentsElement;
                  return (
                    <FelaComponent style={{ marginEnd: '1rem', }} render="span">
                      {totalHits}
                    </FelaComponent>
                  );
                }}
              </Query>
            ) : null;
          }}
        </ApolloConsumer>
        <IconComment size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Facebook = ({
  buttonStyles,
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
      render={({ platform, biAction, biActionMapper, host, }) => (
        <Button
          {...props}
          miscStyles={buttonStyles}
          href={`https://www.facebook.com/dialog/feed?app_id=${fbAppIds.get(
            host
          )}&redirect_uri=${elementUrl}&link=${elementUrl}&display=popup`}
          onClick={() => {
            biAction({
              actionCode: biActionMapper.get('facebook_share'),
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

const FacebookRound = props => <Facebook {...props} round />;

class FacebookLogo extends React.Component {
  state = {
    facebookCount: null,
    host: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const eligibleForFacebookFetch = prevState.host !== this.state.host;
    if (eligibleForFacebookFetch) {
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
    const { buttonStyles, size, iconStyles, elementUrl, ...props } = this.props;

    const { facebookCount, } = this.state;
    return (
      <ActionButton
        render={({ platform, biAction, biActionMapper, host, }) => {
          if (!this.state.host) this.setState({ host, });
          return (
            <Button
              {...props}
              miscStyles={buttonStyles}
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?&amp;u=${elementUrl}`,
                  'popup',
                  'width=635,height=342,scrollbars=no,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no'
                );
                biAction({
                  actionCode: biActionMapper.get('facebook_share'),
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
  buttonStyles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  ...props
}) => (
  <ActionButton
    render={({ platform, biAction, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
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
  buttonStyles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}) => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        href={`mailto:?subject=${elementName}&body=${elementUrl}`}
        onClick={() => {
          biAction({
            actionCode: biActionMapper.get('mail_share'),
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
  buttonStyles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}) => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        href={`mailto:?subject=${elementName}&body=${elementUrl}`}
        onClick={() => {
          biAction({
            actionCode: biActionMapper.get('author_alert'),
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
  buttonStyles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  ...props
}) => (
  <ActionButton
    render={({ platform, biAction, host, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
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

const Print = ({ buttonStyles, size, iconStyles, ...props }) => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, articleId, hostname, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        href={`http://${hostname}/misc/article-print-page/${articleId}`}
        onClick={() => {
          biAction({
            actionCode: biActionMapper.get('print'),
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

// Save component is set from ActionSave.js

const Twitter = ({
  buttonStyles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}) => (
  <ActionButton
    render={({ platform, biAction, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
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

const Whatsapp = ({ buttonStyles, size, iconStyles, elementUrl, ...props }) => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
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
            actionCode: biActionMapper.get('whatsApp_share'),
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
  buttonStyles,
  size,
  buttonText,
  iconStyles,
  elementUrl,
  ...props
}) => (
  <Mutation mutation={TOGGLE_ZEN}>
    {toggleZen => (
      <ActionButton
        render={({ platform, biAction, biActionMapper, }) => (
          <Button
            {...props}
            miscStyles={buttonStyles}
            onClick={() => {
              toggleZen();
              biAction({
                actionCode: biActionMapper.get('zen_mode'),
                additionalInfo: {
                  platform,
                  ...(buttonText ? { NumOfTalkbacks: buttonText, } : {}),
                },
              });
              return false;
            }}
          >
            <FelaComponent
              style={{ marginEnd: '1rem', }}
              render={({ className, theme: { zenTextI18n, }, }) => (
                <span className={className}>{zenTextI18n}</span>
              )}
            />
            <IconZen size={size} miscStyles={iconStyles} />
          </Button>
        )}
      />
    )}
  </Mutation>
);

const getAction = iconName => {
  const actions = new Map([
    [ 'comments', Comments, ],
    [ 'facebook', Facebook, ],
    [ 'facebooklogo', FacebookLogo, ],
    [ 'facebookround', FacebookRound, ],
    [ 'googleplus', GooglePlus, ],
    [ 'mail', Mail, ],
    [ 'mailalert', MailAlert, ],
    [ 'messenger', Messenger, ],
    [ 'print', Print, ],
    [ 'save', Save, ],
    [ 'twitter', Twitter, ],
    [ 'whatsapp', Whatsapp, ],
    [ 'zen', Zen, ],
  ]);

  return actions.get(iconName.toLowerCase());
};

export default getAction;
