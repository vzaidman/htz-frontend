import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { borderBottom, } from '@haaretz/htz-css-tools';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import MastheadLogo from './MastheadLogo';
import MastheadSearch from './MastheadSearch/MastheadSearch';
import MastheadUserTools from './MastheadUserTools';
import Media from '../Media/Media';
import MobileNavigation from '../MobileNavigationMenu/MobileNavigationController';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

const hostQuery = gql`
  query Hostname($path: String!) {
    hostname @client
  }
`;

class Masthead extends React.Component {
  static propTypes = {
    /**
     * Navigation Menu's content Id.
     */
    contentId: PropTypes.string.isRequired,
    /**
     * A string of the host: `tm` for `themarker.com`, `htz` for `haaretz.co.il` and `hdz` for `haaretz.com`.
     */
    hostname: PropTypes.string.isRequired,
  };

  state = { searchIsOpen: false, };

  toggleSearchState = () => {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
    });
  };

  render() {
    const { contentId, hostname, } = this.props;
    const hostMatch = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
    let host;
    switch (hostMatch) {
      case 'haaretz.com':
        host = 'hdc';
        break;
      case 'themarker.com':
        host = 'tm';
        break;
      default:
        host = 'htz';
    }

    return (
      <Media query={{ until: 's', misc: 'portrait', }}>
        {mobilePortrait => (
          <Media query={{ until: 'm', misc: 'landscape', }}>
            {mobileLandscape => {
              const isMobile = mobilePortrait || mobileLandscape;
              return isMobile ? (
                <header>
                  <MobileNavigation contentId={contentId} />
                </header>
              ) : (
                <FelaComponent
                  style={theme => ({
                    alignItems: 'stretch',
                    backgroundColor: theme.color('neutral', '-10'),
                    display: 'flex',
                    position: 'relative',
                    width: '100%',
                    extend: [
                      borderBottom(
                        '1px',
                        0,
                        'solid',
                        theme.color('mastheadBorder', 'borderColor')
                      ),
                    ],
                  })}
                  render={({ className, }) => (
                    <header className={className}>
                      <NavigationMenu contentId={contentId} />
                      <MastheadSearch
                        searchIsOpen={this.state.searchIsOpen}
                        onClick={this.toggleSearchState}
                      />
                      {this.state.searchIsOpen ? null : (
                        <MastheadLogo host={host} />
                      )}
                      {this.state.searchIsOpen ? null : <MastheadUserTools />}
                    </header>
                  )}
                />
              );
            }}
          </Media>
        )}
      </Media>
    );
  }
}

export default props => (
  <Query query={hostQuery}>
    {({ loading, error, data, }) => {
      if (loading) return null;
      if (error) return null;
      return (
        <LayoutContainer>
          <Masthead hostname={data.hostname} {...props} />
        </LayoutContainer>
      );
    }}
  </Query>
);
