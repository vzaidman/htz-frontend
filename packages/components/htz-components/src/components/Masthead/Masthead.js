import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { borderBottom, } from '@haaretz/htz-css-tools';

import { Query, } from '../ApolloBoundary/ApolloBoundary';
import LayoutContainer from '../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default
import MastheadSearch from './MastheadSearch/MastheadSearch';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import MastheadLogo from './MastheadLogo';
import MastheadUserTools from './MastheadUserTools';

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
      <FelaComponent
        style={theme => ({
          alignItems: 'stretch',
          backgroundColor: theme.color('neutral', '-10'),
          ...borderBottom(
            '1px',
            0,
            'solid',
            theme.color('mastheadBorder', 'borderColor')
          ),
          display: 'flex',
          position: 'relative',
          width: '100%',
        })}
        render={({ theme, className, }) => (
          <header className={className}>
            <NavigationMenu contentId={contentId} />
            <MastheadSearch
              searchIsOpen={this.state.searchIsOpen}
              onClick={this.toggleSearchState}
            />
            {this.state.searchIsOpen ? null : <MastheadLogo host={host} />}
            {this.state.searchIsOpen ? null : <MastheadUserTools />}
          </header>
        )}
      />
    );
  }
}

export default props => (
  <Query query={hostQuery}>
    {({ loading, error, data, }) => {
      if (loading) return null;
      if (error) return null;
      return <Masthead hostname={data.hostname} {...props} />;
    }}
  </Query>
);
