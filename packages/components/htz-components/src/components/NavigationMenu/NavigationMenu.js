import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import List from './navigationList';

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
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const wrapperStyle = () => ({
  display: 'inline',
});
const Wrapper = createComponent(wrapperStyle);

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

const hamburgerDashStyle = (theme, isOpen) => ({
  height: '2px',
  width: '2.5rem',
  position: 'absolute',
  backgroundColor: isOpen ? theme.color('neutral', '-10') : theme.color('neutral', '-3'),
  transition: 'all .5s',
});

const hamburgerStyle = ({ theme, isOpen, }) => ({
  ...(hamburgerDashStyle(theme, isOpen)),
  ...(isOpen && { background: 'none', }),
  display: 'inline-block',
  left: '50%',
  margin: '0 auto',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: '1',
  ':before': {
    ...(hamburgerDashStyle(theme, isOpen)),
    ...(isOpen && { transform: 'translateY(0.75rem) rotate(45deg)', }),
    left: '0',
    top: '-0.75rem',
    content: '""',
  },
  ':after': {
    ...(hamburgerDashStyle(theme, isOpen)),
    ...(isOpen && { transform: 'translateY(-0.75rem) rotate(-45deg)', }),
    left: '0',
    top: '0.75rem',
    content: '""',
  },
});
const Hamburger = createComponent(hamburgerStyle, 'i');

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
      <Wrapper
        innerRef={wrapper => this.wrapper = wrapper} // eslint-disable-line no-return-assign
      >
        <MyButton
          collapsed={this.state.collapsed}
          onClick={this.changeState}
          role={'button'}
          aria-expanded={this.state.collapsed}
          innerRef={navButt => this.navButt = navButt} // eslint-disable-line no-return-assign
        >
          <HamburgerWrapper>
            <Hamburger isOpen={this.state.collapsed} />
          </HamburgerWrapper>
          <span>{this.props.theme.navigationI18n.button}</span>
        </MyButton>
        <Menu>
          {this.state.collapsed &&
          <List
            items={this.props.sections}
            theme={this.props.theme}
          />
          }
        </Menu>
      </Wrapper>
    );
  }
}

NavigationMenu.propTypes = propTypes;

export default withTheme(NavigationMenu);
