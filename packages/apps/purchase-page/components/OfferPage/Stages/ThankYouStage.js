import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { IconCheck, Link, Newsletter, } from '@haaretz/htz-components';
import Phones from './Elements/Phones';

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
  maxWidth: '84rem',
});

const headerStyle = ({ theme, }) => ({
  marginTop: '3rem',
  extend: [ theme.type(3), ],
});

const StyledHeader = createComponent(headerStyle, 'h1');

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

const StyledLink = createComponent(linkStyle, Link, [ 'content', 'href', ]);

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
                thankYou: {
                  afterPurchase,
                  secondaryHeader,
                  backToArticleContent,
                },
                newsletterI18n: {
                  texts: { newsletterTitle, newsletterButton, },
                },
              },
            }) => (
              <div className={className}>
                {product ? (
                  <Phones subscription={product} size={3.5} />
                ) : (
                  <IconCheck color="positive" size={10} />
                )}
                <StyledHeader>
                  {product ? (
                    <p>{afterPurchase(product)}</p>
                  ) : (
                    userMessage.map(line => <p>{line}</p>)
                  )}
                </StyledHeader>

                {referrer &&
                  isArticle(referrer) && (
                    <StyledLink
                      content={backToArticleContent}
                      href={referrer}
                    />
                  )}
                <Newsletter
                  headlineText={newsletterTitle(site)}
                  buttonText={newsletterButton}
                  host={site}
                  icon={site}
                  variant="primary"
                  segmentId={site === 'tm' ? 1338618 : 1338625}
                  userEmail={userEmail}
                  miscStyles={{ marginTop: '9rem', marginBottom: '2rem', }}
                />
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
