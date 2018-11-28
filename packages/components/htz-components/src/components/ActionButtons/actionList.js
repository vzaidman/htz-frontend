// @flow
/* eslint-disable react/prop-types */
/* global window, fetch, Headers  */
import React from 'react';
import type { StatelessFunctionalComponent, Node, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import type {
  ActionButtonProps,
  ButtonProps,
  CommentButtonProps,
  FacebookButtonProps,
  FacebookLogoProps,
  FacebookLogoState,
  GooglePlusButtonProps,
  MailAlertButtonProps,
  MailButtonProps,
  MessengerButtonProps,
  PrintButtonProps,
  TwitterButtonProps,
  WhatsappButtonProps,
  ZenButtonProps,
} from './types';

import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import Mutation from '../ApolloBoundary/Mutation';
import Query from '../ApolloBoundary/Query';
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
import AriaDescription from '../AriaDescription/AriaDescription';
import Tooltip from '../Tooltip/Tooltip';

import ClickArea from '../ClickArea/ClickArea';

const GET_COMMENTS_ID: Object = gql`
  query GetCommentsId {
    commentsElementId @client
  }
`;

const GET_COMMENTS_COUNT: Object = gql`
  query CommentsCount($path: String!) {
    commentsElement(path: $path) {
      totalHits
    }
  }
`;

const TOGGLE_ZEN: Object = gql`
  mutation ToggleZen {
    toggleZen @client
  }
`;

const GET_PAGE_DATA: Object = gql`
  query GetPageData {
    platform @client
    hostname @client
    zenMode @client
    articleId @client
    user @client {
      id
    }
  }
`;

const fbAcceessTokens: Object = new Map([
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

const fbAppIds: Object = new Map([
  [ 'haaretz.co.il', '110687712359084', ],
  [ 'themarker.com', '52929925921', ],
  [ 'haaretz.com', '287530407927859', ],
]);

export const ActionButton = ({ render, }: ActionButtonProps): Node => (
  <Query query={GET_PAGE_DATA}>
    {({ loading, error, data, }) => {
      if (loading) return null;
      if (error) console.log(error);
      const {
        platform,
        hostname,
        zenMode,
        articleId,
        user: { id: userId, },
      } = data;
      const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
      return (
        <EventTracker>
          {({ biAction, biActionMapper, }) => render({
            platform,
            biAction,
            biActionMapper,
            host,
            hostname,
            articleId,
            userId,
            zenMode,
          })
          }
        </EventTracker>
      );
    }}
  </Query>
);

export const Button: StatelessFunctionalComponent<ButtonProps> = ({
  children,
  miscStyles,
  title,
  href,
  ...props
}): Node => (
  <FelaTheme
    render={(theme: Object) => (
      <ClickArea
        size={4}
        href={href}
        miscStyles={{
          fontWeight: '700',
          paddingInlineStart: '1rem',
          paddingInlineEnd: '1rem',
          type: -2,
          color: theme.color('primary'),
          ':hover': {
            color: theme.color('secondary'),
          },
          ...miscStyles,
        }}
        attrs={{
          title,
          ...props,
        }}
      >
        <AriaDescription id={title}>{title}</AriaDescription>
        {children}
      </ClickArea>
    )}
  />
);

const Comments: StatelessFunctionalComponent<CommentButtonProps> = ({
  buttonStyles,
  size,
  iconStyles,
  ...props
}): Node => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        title="מעבר לטוקבקים"
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
              <Query query={GET_COMMENTS_COUNT} variables={{ path: commentsElementId, }}>
                {({ loading, error, data, }) => {
                  if (loading) return null;
                  if (error) return null;
                  const commentsNumber: number = Number(data.commentsElement.totalHits);
                  cache.writeData({
                    data: {
                      isCommentsNumberLoaded: true,
                    },
                  });
                  return commentsNumber && commentsNumber > 0 ? (
                    <FelaComponent style={{ marginEnd: '1rem', }} render="span">
                      {commentsNumber}
                    </FelaComponent>
                  ) : null;
                }}
              </Query>
            ) : null;
          }}
        </ApolloConsumer>
        <AriaDescription id="writeCommand">כתוב תגובה</AriaDescription>
        <IconComment size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Facebook: StatelessFunctionalComponent<FacebookButtonProps> = ({
  buttonStyles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  round,
  ...props
}): Node => {
  const FacebookIcon = round ? IconFacebook : IconFacebookLogo;
  return (
    <ActionButton
      render={({ platform, biAction, biActionMapper, host, }) => (
        <Button
          {...props}
          miscStyles={buttonStyles}
          title="שתפו בפייסבוק"
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
          {buttonText ? (
            <FelaComponent style={{ marginEnd: '1rem', }} render="span">
              {buttonText}
            </FelaComponent>
          ) : null}
          <FacebookIcon size={size} miscStyles={iconStyles} />
        </Button>
      )}
    />
  );
};

const FacebookRound = (props: Object) => <Facebook {...props} round />;

class FacebookLogo extends React.Component<FacebookLogoProps, FacebookLogoState> {
  state = {
    host: null,
    facebookCount: 0,
  };

  componentDidUpdate(prevProps: FacebookLogoProps, prevState: FacebookLogoState) {
    const eligibleForFacebookFetch: boolean = prevState.host !== this.state.host;
    if (eligibleForFacebookFetch) {
      this.getFacebookCount(this.state.host);
    }
  }

  getFacebookCount = (host: ?string) => {
    const { elementUrl, } = this.props;
    const accessToken: string = fbAcceessTokens.get(host);
    const url: string = `https://graph.facebook.com/?fields=share&access_token=${accessToken}&id=${elementUrl}&format=json`;

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

  render(): Node {
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
              title="שתפו בפייסבוק"
              target="_black"
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?&u=${elementUrl}`,
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

const GooglePlus: StatelessFunctionalComponent<GooglePlusButtonProps> = ({
  buttonStyles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  ...props
}): Node => (
  <ActionButton
    render={({ platform, biAction, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        title="שתפו בגוגל פלוס"
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
        {buttonText ? (
          <FelaComponent style={{ marginEnd: '1rem', }} render="span">
            {buttonText}
          </FelaComponent>
        ) : null}
        <IconGPlus size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Mail: StatelessFunctionalComponent<MailButtonProps> = ({
  buttonStyles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}): Node => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        title="שתפו כתבה במייל"
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
        <AriaDescription id="sendByEmail">שליחת הכתבה באימייל</AriaDescription>
        <IconMail size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const MailAlert: StatelessFunctionalComponent<MailAlertButtonProps> = ({
  buttonStyles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}): Node => (
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

const Messenger: StatelessFunctionalComponent<MessengerButtonProps> = ({
  buttonStyles,
  buttonText,
  size,
  iconStyles,
  elementUrl,
  ...props
}): Node => (
  <ActionButton
    render={({ platform, biAction, host, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        title="שתפו כתבה במסנג'ר"
        href={`fb-messenger://share/?link=${elementUrl}&app_id=${fbAppIds.get(host)}`}
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
        {buttonText ? (
          <FelaComponent style={{ marginEnd: '1rem', }} render="span">
            {buttonText}
          </FelaComponent>
        ) : null}
        <IconMessenger size={size} miscStyles={iconStyles} />
      </Button>
    )}
  />
);

const Print: StatelessFunctionalComponent<PrintButtonProps> = ({
  buttonStyles,
  size,
  iconStyles,
  ...props
}): Node => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, articleId, hostname, }) => (
      <Button
        attrs={{
          target: '_blank',
          tabIndex: '-1',
        }}
        tabIndex="-1"
        {...props}
        title="הדפיסו כתבה"
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

const Twitter: StatelessFunctionalComponent<TwitterButtonProps> = ({
  buttonStyles,
  size,
  iconStyles,
  elementName,
  elementUrl,
  ...props
}): Node => (
  <ActionButton
    render={({ platform, biAction, }) => (
      <Button
        {...props}
        miscStyles={buttonStyles}
        title="שתפו בטוויטר"
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

const Whatsapp: StatelessFunctionalComponent<WhatsappButtonProps> = ({
  buttonStyles,
  size,
  iconStyles,
  elementUrl,
  shouldMainNavBarDisplay,
  ...props
}): Node => (
  <ActionButton
    render={({ platform, biAction, biActionMapper, }) => (
      <FelaTheme
        render={theme => (
          <Tooltip
            text={theme.shareBar.whatsappTooltip}
            storageParam="tooltipCount"
            tooltipMiscStyles={[
              theme.mq({ until: 's', }, { minWidth: '33rem', }),
              theme.mq({ from: 's', }, { whiteSpace: 'nowrap', }),
            ]}
            miscStyles={theme => ({
              extend: [ theme.mq({ until: 'm', }, { paddingTop: '1rem', }), ],
            })}
            openSide="top"
            offsetX={-15}
            hide={shouldMainNavBarDisplay === false}
          >
            <Button
              {...props}
              miscStyles={buttonStyles}
              title="שתפו בוואטסאפ"
              onClick={() => {
                window.open(
                  `${
                    platform === 'mobile' ? 'whatsapp://' : 'https://web.whatsapp.com/'
                  }send?text=${elementUrl}${encodeURIComponent(
                    '?utm_source=Web_Share&utm_medium=Whatsapp&utm_campaign=Share'
                  )}`,
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
          </Tooltip>
        )}
      />
    )}
  />
);

const Zen: StatelessFunctionalComponent<ZenButtonProps> = ({
  buttonStyles,
  size,
  buttonText,
  iconStyles,
  elementUrl,
  ...props
}): Node => (
  <Mutation mutation={TOGGLE_ZEN}>
    {toggleZen => (
      <FelaTheme
        render={theme => (
          <ActionButton
            render={({ platform, biAction, biActionMapper, zenMode, }) => (
              <Button
                {...props}
                miscStyles={
                  !zenMode
                    ? {}
                    : {
                      color: theme.color('secondary'),
                    }
                }
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
                  style={{
                    marginEnd: '1rem',
                    color: theme.color('neutral', '-3'),
                  }}
                  render={({ className, theme: { zenTextI18n, }, }) => (
                    <span className={className}>{zenTextI18n}</span>
                  )}
                />
                <IconZen size={size} miscStyles={iconStyles} />
              </Button>
            )}
          />
        )}
      />
    )}
  </Mutation>
);

const getAction = (iconName: string) => {
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
