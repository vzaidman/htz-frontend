import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
// import { Query, } from 'react-apollo';
import A11yMenu from '../A11yMenu/A11yMenu';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';
import IconMarkerLogo from '../Icon/icons/IconMarkerLogo';
import IconReading from '../Icon/icons/IconReading';
import HtzLink from '../HtzLink/HtzLink';
import NavigationMenu from '../NavigationMenu/NavigationMenu'; // eslint-disable-line no-unused-vars
import UserDispenser from '../User/UserDispenser';
import UserMenu from '../UserMenu/UserMenu';

import mock from './mockData.js';

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

const propTypes = {
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
  host: PropTypes.oneOf([ 'tm', 'htz', 'hdc', ]).isRequired,
};

HeaderLogo.propTypes = {
  host: PropTypes.oneOf([ 'tm', 'htz', 'hdc', ]).isRequired,
};

HeaderReading.propTypes = {
  host: PropTypes.oneOf([ 'tm', 'htz', 'hdc', ]).isRequired,
};

HeaderUserItems.propTypes = {
  host: PropTypes.oneOf([ 'tm', 'htz', 'hdc', ]).isRequired,
};

const headerReadingButtonStyle = theme => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.color('primary'),
  border: 'none',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  ':hover': {
    backgroundColor: theme.color('primary'),
    color: theme.color('neutral', '-10'),
  },
  ':focus': {
    color: theme.color('primary'),
  },
});

function HeaderReading({ host, }) {
  const url =
    host === 'htz'
      ? 'https://www.haaretz.co.il/personal-area/my-account#readingList'
      : host === 'tm'
        ? 'https://www.themarker.com/personal-area/reading-list'
        : // change to haaretz.com valid link
        'https://www.haaretz.com';

  return (
    <FelaComponent
      style={headerReadingButtonStyle}
      render={({ theme, className, }) => (
        <HtzLink className={className} href={url}>
          <IconReading size={3} />
        </HtzLink>
      )}
    />
  );
}

function HeaderLogo({ host, }) {
  return (
    <FelaComponent
      style={theme => ({
        marginLeft: 'auto',
        marginRight: 'auto',
        extend: [
          theme.mq(
            { from: 's', },
            {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }
          ),
        ],
      })}
      render={({ className, }) => {
        if (host === 'tm') {
          return (
            <HtzLink href="http://www.themarker.com" className={className}>
              <IconMarkerLogo size={4} />
            </HtzLink>
          );
        }
 else if (host === 'htz') {
          return (
            <HtzLink href="http://www.haaretz.co.il" className={className}>
              <IconHaaretzLogo size={4} />
            </HtzLink>
          );
        }
        return (
          <HtzLink href="http://www.haaretz.com" className={className}>
            <IconHaaretzLogo size={4} />
          </HtzLink>
        );
      }}
    />
  );
}

function HeaderUserItems({ host, }) {
  return (
    <FelaComponent
      style={theme => ({
        alignItems: 'stretch',
        display: 'flex',
        marginStart: 'auto',
        extend: [
          theme.mq({ until: 's', }, { display: 'none', }),
          theme.mq({ until: 'm', misc: 'landscape', }, { display: 'none', }),
        ],
      })}
      render={({ theme, className, }) => (
        <div className={className}>
          <UserDispenser
            render={({ user, }) => <UserMenu userName={user.firstName} />}
          />
          <HeaderReading host={host} />
          <A11yMenu />
        </div>
      )}
    />
  );
}

class Masthead extends React.Component {
  state = { searchIsOpen: false, };

  toggleSearchState = () => {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
    });
  };

  render() {
    const { menuSections, host, } = this.props;

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
            <HeaderSearch
              searchIsOpen={this.state.searchIsOpen}
              onClick={this.toggleSearchState}
            />
            {this.state.searchIsOpen ? null : <HeaderLogo host={host} />}
            {this.state.searchIsOpen ? null : <HeaderUserItems host={host} />}
          </header>
        )}
      />
    );
  }
}

Masthead.propTypes = propTypes;
// TODO: uncomment when data in papi is ready
/*
const WrappedMasthead = () => (
  <Query>
    {({ loading, error, data, }) => {
      if (loading) return null;
      if (error) return null;
      const { menuSections, host, } = this.data;
      return (
        <Masthead
          menuSections={menuSections}
          host={host}
        />
      );
    }}
  </Query>
);
*/

const WrappedMasthead = () => {
  const { menuSections, host, } = mock;
  return <Masthead menuSections={menuSections} host={host} />;
};

export default WrappedMasthead;
