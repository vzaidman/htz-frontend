import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import A11yMenu from '../A11yMenu/A11yMenu';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';
import IconReading from '../Icon/icons/IconReading';
import Link from '../Link/Link';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import UserDispenser from '../User/UserDispenser';
import UserMenu from '../UserMenu/UserMenu';

const propTypes = {
  /**
   * An array of sections to be listed, which may contain pages or their own sub-section.
   */
  menuSections: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The section's name to display.
       */
      name: PropTypes.string,
      /**
       * Section's destination.
       */
      url: PropTypes.string,
      /**
       * Section's pages (may contain pages or sub-sections with their own pages).
       */
      pages: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
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
  extend: [ theme.type(-2), ],
});

const HeaderReading = () => (
  <FelaComponent
    style={headerReadingButtonStyle}
    render={({ theme, className, }) => (
      <Link
        className={className}
        href="https://www.haaretz.co.il/personal-area/my-account#readingList"
      >
        <IconReading size={3} />
      </Link>
    )}
  />
);

const HeaderHaaretzLogo = () => (
  <FelaComponent
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      alignSelf: 'center',
      alignItems: 'center',
    }}
    render={({ className, }) => (
      <Link href="http://www.haaretz.co.il" className={className}>
        <IconHaaretzLogo size={4} />
      </Link>
    )}
  />
);

const HeaderUserItems = () => (
  <FelaComponent
    style={theme => ({
      display: 'flex',
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
        <HeaderReading />
        <A11yMenu />
      </div>
    )}
  />
);

class Masthead extends React.Component {
  state = { searchIsOpen: false, };

  toggleSearchState = () => {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
    });
  };

  render() {
    const { menuSections, } = this.props;

    return (
      <FelaComponent
        style={{ display: 'flex', width: '100%', alignItems: 'stretch', }}
        render={({ theme, className, }) => (
          <header className={className}>
            <NavigationMenu sections={menuSections} />
            <HeaderSearch
              searchIsOpen={this.state.searchIsOpen}
              onClick={this.toggleSearchState}
            />
            {this.state.searchIsOpen ? null : <HeaderHaaretzLogo />}
            {this.state.searchIsOpen ? null : <HeaderUserItems />}
          </header>
        )}
      />
    );
  }
}

Masthead.propTypes = propTypes;

export default Masthead;
