import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import A11yMenu from '../A11yMenu/A11yMenu';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';
import IconReading from '../Icon/icons/IconReading';
import Link from '../Link/Link';
import NavigationMenu from '../NavigationMenu/NavigationMenu'; // eslint-disable-line no-unused-vars
import UserDispenser from '../User/UserDispenser';
import UserMenu from '../UserMenu/UserMenu';

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
        style={{
          alignItems: 'stretch',
          display: 'flex',
          position: 'relative',
          width: '100%',
        }}
        render={({ theme, className, }) => (
          <header className={className}>
            <NavigationMenu menuSections={menuSections} />
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
