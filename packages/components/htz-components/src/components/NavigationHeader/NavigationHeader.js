import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';
import IconReading from '../Icon/icons/IconReading';
import Link from '../Link/Link';
import UserDispenser from '../User/UserDispenser';
import NavigationA11y from '../NavigationA11y/NavigationA11y';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import NavigationSearch from '../NavigationSearch/NavigationSearch';
import NavigationUser from '../NavigationUser/NavigationUser';

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

const navReadingButtonStyle = theme => ({
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

const NavigationReading = () => (
  <FelaComponent
    style={navReadingButtonStyle}
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
          render={({ user, }) => <NavigationUser userName={user.firstName} />}
        />
        <NavigationReading />
        <NavigationA11y />
      </div>
    )}
  />
);

class NavigationHeader extends React.Component {
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
            <NavigationSearch
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

NavigationHeader.propTypes = propTypes;

export default NavigationHeader;
