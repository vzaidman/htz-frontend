import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import MastheadSearch from './MastheadSearch/MastheadSearch';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import MastheadLogo from './MastheadLogo';
import MastheadUserTools from './MastheadUserTools';

const baseProp = {
  name: PropTypes.string,
  url: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      pages: PropTypes.arrayOf(PropTypes.object),
    })
  ),
};

export default class MastheadElement extends React.Component {
  static propTypes = {
    /**
     * An array of sections to be listed, which may contain pages or their own sub-section.
     */
    menuSections: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape(baseProp)),
      sites: PropTypes.arrayOf(PropTypes.shape(baseProp)),
      promotions: PropTypes.arrayOf(PropTypes.shape(baseProp)),
    }).isRequired,
    /**
     * A string of the host: `tm` for `themarker.com`, `htz` for `haaretz.co.il` and `hdz` for `haaretz.com`.
     */
    // host: PropTypes.oneOf([ 'tm', 'htz', 'hdc', ]).isRequired,
    hostname: PropTypes.string.isRequired,
  };

  state = { searchIsOpen: false, };

  toggleSearchState = () => {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
    });
  };

  render() {
    const { menuSections, hostname, } = this.props;
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
            <NavigationMenu menuSections={menuSections} />
            <MastheadSearch
              searchIsOpen={this.state.searchIsOpen}
              onClick={this.toggleSearchState}
            />
            {this.state.searchIsOpen ? null : <MastheadLogo host={host} />}
            {this.state.searchIsOpen ? null : <MastheadUserTools host={host} />}
          </header>
        )}
      />
    );
  }
}
