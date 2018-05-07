import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Newsletter, } from '@haaretz/htz-components';
import Phones from './Elements/Phones';

const GET_HOST_NAME = gql`
  query {
    hostname @client
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
  marginTop: '6rem',
  maxWidth: '84rem',
});

const headerStyle = ({ theme, }) => ({
  marginTop: '3rem',
  extend: [ theme.type(3), ],
});

const StyledHeader = createComponent(headerStyle, 'h1');

const secondaryHeaderStyle = ({ theme, }) => ({
  // todo: should we add padding or get 2 lines?
  paddingInlineStart: '8rem',
  paddingInlineEnd: '8rem',
  fontWeight: 'normal',
  marginTop: '1rem',
  extend: [ theme.type(3), ],
});

const StyledSecondaryHeader = createComponent(secondaryHeaderStyle, 'h2');

const overLinkTextStyle = ({ theme, }) => ({
  // todo: should we add padding or get 2 lines?
  display: 'block',
  marginTop: '3rem',
  extend: [ theme.type(1), ],
});

const StyledOverlinkText = createComponent(overLinkTextStyle, 'span');

const linkStyle = ({ theme, }) => ({
  marginTop: '2rem',
  textDecoration: 'underline',
  color: theme.color('offerPage', 'link'),
  ':hover': {
    cursor: 'pointer',
  },
  extend: [ theme.type(1), ],
});

const StyledLink = createComponent(linkStyle, Link, [ 'content', 'href', ]);

const newsLetterPlaceholder = ({ theme, }) => ({
  height: '19rem',
  backgroundColor: 'teal',
  marginTop: '9rem',
  extend: [ theme.type(1), ],
});

const StyledNewLetterPlaceholder = createComponent(newsLetterPlaceholder);

function StageThankYou({ userEmail, product, userMessage, }) {
  return (
    <Query query={GET_HOST_NAME}>
      {({ data: { hostname, }, }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        return (
          <FelaComponent
            rule={contStyle}
            render={({
              className,
              theme: {
                thankYou: {
                  afterPurchase,
                  secondaryHeader,
                  backToArticleText,
                  backToArticleContent,
                },
              },
            }) => (
              <div className={className}>
                {product && <Phones subscription={product} size={3.5} />}
                <StyledHeader>
                  {product ? (
                    <p>{afterPurchase(product)}</p>
                  ) : (
                    userMessage.map(line => <p>{line}</p>)
                  )}
                </StyledHeader>
                <StyledSecondaryHeader>{secondaryHeader}</StyledSecondaryHeader>

                {/* TODO: Redo these links `href` */}
                <StyledOverlinkText>{backToArticleText}</StyledOverlinkText>
                <StyledLink content={backToArticleContent} href="#" />
                <StyledNewLetterPlaceholder>
                  <Newsletter
                    variant="primary"
                    segmentId={host === 'themarker.com' ? 1338618 : 1338625}
                    userEmail={userEmail}
                  />
                </StyledNewLetterPlaceholder>
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
