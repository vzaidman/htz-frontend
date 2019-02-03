/* global fetch */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import Query from '../../../ApolloBoundary/Query';
import ActionButtons from '../../../ActionButtons/ActionButtons';

const actionBarData = gql`
  query GetActionBarData {
    canonicalUrl @client
    title @client
  }
`;

const iconSize = 5;

const propTypes = {
  shouldMainNavBarDisplay: PropTypes.bool.isRequired,
};

function MobileBarActionButtons({ shouldMainNavBarDisplay, }) {
  return (
    <FelaComponent
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: '1',
      }}
      render={({ theme, className, }) => (
        <div className={className}>
          <Query query={actionBarData}>
            {({ loading, error, data, }) => {
              if (loading) return null;
              if (error) console.log(error);
              const { canonicalUrl: articleUrl, } = data;
              return (
                <Fragment>
                  <ActionButtons
                    elementUrl={articleUrl}
                    isFlat
                    size={iconSize}
                    buttons={{
                      name: 'facebook',
                      iconStyles: {
                        color: theme.color('facebook'),
                      },
                    }}
                  />
                  <ActionButtons
                    elementUrl={articleUrl}
                    isFlat
                    size={iconSize}
                    buttons={{
                      name: 'whatsapp',
                      iconStyles: {
                        color: theme.color('whatsapp'),
                      },
                    }}
                  />
                  <ActionButtons
                    isFlat
                    size={iconSize}
                    buttons={{
                      name: 'save',
                      buttonStyles: isArticleSaved => ({
                        ...(isArticleSaved
                          ? {
                            color: theme.color('neutral', '-10'),
                            backgroundColor: theme.color('primary'),
                          }
                          : {}),
                      }),
                    }}
                  />

                  <ActionButtons
                    isFlat
                    elementUrl={articleUrl}
                    size={iconSize}
                    elementName={data.title}
                    buttons={{
                      name: 'mail',
                      iconStyles: {
                        color: theme.color('primary'),
                      },
                    }}
                  />
                </Fragment>
              );
            }}
          </Query>
        </div>
      )}
    />
  );
}

MobileBarActionButtons.propTypes = propTypes;

export default MobileBarActionButtons;
