import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { HtzLink, Newsletter, EventTracker, } from '@haaretz/htz-components';

const GET_HOST_NAME = gql`
  query {
    hostname @client
    referrer @client
  }
`;

const propTypes = {
  product: PropTypes.string,
  userEmail: PropTypes.string,
  userMessage: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  product: null,
  userEmail: null,
  userMessage: [],
};

const contStyle = () => ({
  textAlign: 'center',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
  marginTop: '2rem',
  maxWidth: '87rem',
});

const linkStyle = ({ theme, }) => ({
  marginTop: '6rem',
  display: 'block',
  fontWeight: '700',
  textDecoration: 'underline',
  color: theme.color('offerPage', 'link'),
  ':hover': {
    cursor: 'pointer',
  },
  extend: [ theme.type(1), ],
});

const StyledLink = createComponent(linkStyle, HtzLink, [ 'content', 'href', ]);

function StageThankYou({ userEmail, product, userMessage, }) {
  const isArticle = url => {
    const articlePattern = new RegExp('(\\/([^a-z]*-)?1\\.\\d+.*$)');
    console.log('isArticle: ', articlePattern.test(url));
    return articlePattern.test(url);
  };
  return (
    <Query query={GET_HOST_NAME}>
      {({ data: { hostname, referrer, }, }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        const site = host === 'themarker.com' ? 'tm' : 'htz';
        return (
          <FelaComponent
            rule={contStyle}
            render={({
              className,
              theme: {
                thankYou: { backToArticleContent, },
                newsletterI18n: {
                  texts: { newsletterTitle, newsletterButton, },
                },
              },
            }) => (
              <div className={className}>
                {referrer &&
                  isArticle(referrer) && (
                    <EventTracker>
                      {biAction => (
                        <StyledLink
                          content={backToArticleContent}
                          href={referrer}
                        />
                      )}
                    </EventTracker>
                  )}
                <EventTracker>
                  {biAction => (
                    <Newsletter
                      id="ThankYouWrapper-1234"
                      headlineText={newsletterTitle(site)}
                      buttonText={newsletterButton}
                      host={site}
                      icon={site}
                      onSubmit={() => {
                        biAction({
                          actionCode: 38,
                          additionalInfo: {
                            stage: 'thank-you',
                            context: 'purchase-page',
                            segmentId: site === 'tm' ? 1338618 : 1338625,
                          },
                        });
                      }}
                      variant="primary"
                      segmentId={site === 'tm' ? 1338618 : 1338625}
                      userEmail={userEmail}
                      miscStyles={{ marginTop: '9rem', marginBottom: '2rem', }}
                    />
                  )}
                </EventTracker>
              </div>
            )}
          />
        );
      }}
    </Query>
  );
}

StageThankYou.propTypes = propTypes;

StageThankYou.defaultProps = defaultProps;

export default StageThankYou;
