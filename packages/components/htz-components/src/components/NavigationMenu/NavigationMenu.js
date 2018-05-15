/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import List from './navigationList';
import Hamburger from '../Animations/Hamburger';

const propTypes = {
  /**
   * An array of sections to be listed, which may contain pages or their own sub-section.
   */
  sections: PropTypes.arrayOf(
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
      pages: PropTypes.arrayOf(
        PropTypes.object,
      ),
    }),
  ).isRequired,
};

const menuStyle = () => ({
  position: 'relative',
});
const Menu = createComponent(menuStyle);

const myButtonStyle = ({ theme, collapsed, }) => ({
  ...(theme.type(-2)),
  color: theme.color('neutral', '-3'),
  border: 'none',
  padding: '1rem',
  fontWeight: '700',
  ...(collapsed &&
    {
      backgroundColor: theme.color('secondary'),
      color: theme.color('neutral', '-10'),
    }
  ),
});
const MyButton = createComponent(myButtonStyle, 'button', [ 'onClick', 'role', 'aria-expanded', ]);

const hamburgerWrapperStyle = () => ({
  marginStart: '2rem',
  marginEnd: '2rem',
  position: 'relative',
});
const HamburgerWrapper = createComponent(hamburgerWrapperStyle, 'span');

/**
 * A menu component for the page header. A recursive component which receives an array
 * of sections that may contain pages and sub-section, and the later may also contain
 * pages and sub-section and so on...
 */
class NavigationMenu extends React.Component {
  componentWillMount() {
    this.setState({
      collapsed: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.collapsed !== nextState.collapsed;
  }

  componentDidUpdate() {
    if (this.state.collapsed) {
      document.addEventListener('click', this.handleGlobalClick);
      document.addEventListener('keydown', this.handleGlobalKeydown);
    }
    else {
      document.removeEventListener('click', this.handleGlobalClick);
      document.removeEventListener('keydown', this.handleGlobalKeydown);
    }
  }

  handleGlobalClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.changeState();
    }
  };

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.changeState();
      this.navButt.focus();
    }
  };

  changeState = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <FelaComponent
        innerRef={wrapper => this.wrapper = wrapper} // eslint-disable-line no-return-assign
        style={{ display: 'inline', }}
        render={({ theme, }) => (
          <Fragment>
            <MyButton
              collapsed={this.state.collapsed}
              onClick={this.changeState}
              role="button"
              aria-expanded={this.state.collapsed}
              innerRef={navButt => this.navButt = navButt} // eslint-disable-line no-return-assign
            >
              <HamburgerWrapper>
                <Hamburger
                  isOpen={this.state.collapsed}
                  color={{
                    close: [ 'neutral', '-3', ],
                    open: [ 'neutral', '-10', ],
                  }}
                  size={2.5}
                />
              </HamburgerWrapper>
              <span>{theme.navigationI18n.button}</span>
            </MyButton>
            <Menu>
              {this.state.collapsed &&
              <List
                items={this.props.sections}
                theme={theme}
              />
              }
            </Menu>
          </Fragment>
        )}
      />
    );
  }
}

NavigationMenu.propTypes = propTypes;

export default NavigationMenu;
