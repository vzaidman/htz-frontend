import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import {
  AboveBlockLink,
  BlockLink,
  Button,
  EventTracker,
  Image,
  Newsletter,
  TextLink,
} from '@haaretz/htz-components';
import { breakUrl, } from '@haaretz/app-utils';

const GET_HOST_NAME = gql`
  query {
    hostname @client
    referer @client
  }
`;

const GET_ARTICLE_DATA = gql`
  query articleLinkData($id: String!) {
    articleLinkData(id: $id) {
      title
      url
    }
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

function StageThankYou({ userEmail, product, userMessage, }) {
  const getArticleID = url => {
    const { path, } = breakUrl(url);
    const regex = /1\.\d+$/;
    return regex.test(path) ? path.match(regex)[0] : null;
  };

  return (
    <Query query={GET_HOST_NAME}>
      {({ data: { hostname, referer, }, }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        const site = host === 'themarker.com' ? 'tm' : 'htz';
        const referringArticleID = getArticleID(referer);

        return (
          <FelaComponent
            rule={contStyle}
            render={({
              className,
              theme: {
                thankYou: {
                  backToArticle,
                  backToHomePage,
                  backToHomePageHref,
                  downloadAppText,
                  downloadAppButtonText,
                  downloadAppHref,
                  imgData,
                },
                newsletterI18n: {
                  texts: { newsletterTitle, newsletterButton, },
                },
              },
            }) => {
              const siteImg = imgData[site];
              return (
                <div className={className}>
                  {referringArticleID ? (
                    <Query
                      query={GET_ARTICLE_DATA}
                      variables={{ id: referringArticleID, }}
                    >
                      {({ data, loading, error, }) => (
                        <FelaComponent style={{ marginTop: '6rem', }}>
                          {loading || error ? null : (
                            <Fragment>
                              <FelaComponent
                                style={{ display: 'block', }}
                                render="span"
                              >
                                {backToArticle}
                              </FelaComponent>
                              <TextLink href={data.articleLinkData.url}>
                                {data.articleLinkData.title}
                              </TextLink>
                            </Fragment>
                          )}
                        </FelaComponent>
                      )}
                    </Query>
                  ) : (
                    <FelaComponent>
                      <TextLink
                        miscStyles={{ fontWeight: 'bold', }}
                        href={backToHomePageHref[site]}
                      >
                        {backToHomePage}
                      </TextLink>
                    </FelaComponent>
                  )}
                  <EventTracker>
                    {({ biAction, }) => (
                      <FelaComponent
                        style={{
                          marginTop: '9rem',
                          marginBottom: '10rem',
                        }}
                      >
                        <BlockLink href={downloadAppHref}>
                          <FelaComponent
                            style={theme => ({
                              backgroundColor: theme.color('neutral', '-6'),
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingInlineStart: '2rem',
                              paddingInlineEnd: '2rem',
                              paddingTop: '2rem',
                              position: 'relative',
                              ':after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '40%',
                                height: '100%',
                                background: `linear-gradient(to right top, ${theme.color(
                                  'primary'
                                )} 50%, transparent 50%)`,
                              },
                              extend: [
                                theme.mq({ from: 's', }, { display: 'none', }),
                              ],
                            })}
                          >
                            <FelaComponent
                              style={theme => ({
                                marginInlineEnd: '2rem',
                                fontWeight: 'bold',
                                extend: [ theme.type(1), ],
                              })}
                            >
                              <FelaComponent>
                                {downloadAppText[site]}
                              </FelaComponent>
                              <AboveBlockLink>
                                {({ className, }) => (
                                  <span className={className}>
                                    <Button
                                      href={downloadAppHref}
                                      variant="primaryOpaque"
                                      miscStyles={{
                                        marginTop: '2rem',
                                        marginBottom: '2rem',
                                      }}
                                    >
                                      {downloadAppButtonText}
                                    </Button>
                                  </span>
                                )}
                              </AboveBlockLink>
                            </FelaComponent>
                            <FelaComponent
                              style={{ zIndex: 1, alignSelf: 'flex-end', }}
                            >
                              <Image
                                hasWrapper={false}
                                data={{
                                  isAnimatedGif: false,
                                  imgArray: [
                                    {
                                      imgName: siteImg.imgName,
                                      version: siteImg.version,
                                    },
                                  ],
                                  credit: siteImg.credit,
                                  alt: siteImg.alt,
                                  contentId: siteImg.contentId,
                                  aspects: {
                                    full: {
                                      width: '220',
                                      height: '300',
                                      x: '0',
                                      y: '0',
                                    },
                                  },
                                }}
                                imgOptions={{
                                  transforms: { width: '220', aspect: 'full', },
                                }}
                              />
                            </FelaComponent>
                          </FelaComponent>
                        </BlockLink>
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
                          miscStyles={{
                            display: [ { until: 's', value: 'none', }, ],
                          }}
                        />
                      </FelaComponent>
                    )}
                  </EventTracker>
                </div>
              );
            }}
          />
        );
      }}
    </Query>
  );
}

StageThankYou.propTypes = propTypes;

StageThankYou.defaultProps = defaultProps;

export default StageThankYou;
