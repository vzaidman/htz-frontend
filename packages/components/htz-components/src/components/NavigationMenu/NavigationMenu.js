/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import List from './navigationMenuList';
import Hamburger from '../Animations/Hamburger';

const menuButtonStyle = ({ theme, isOpen, }) => ({
  height: '100%',
  display: 'block',
  color: theme.color('neutral', '-3'),
  border: 'none',
  padding: '1rem',
  fontWeight: '700',
  ...(isOpen && {
    backgroundColor: theme.color('secondary'),
    color: theme.color('neutral', '-10'),
  }),
  ':hover': {
    backgroundColor: theme.color('primary'),
    color: theme.color('neutral', '-10'),
  },
  extend: [ theme.type(-2), ],
});

/**
 * A menu component for the page header. A recursive component which receives an array
 * of sections that may contain pages and sub-section, and the later may also contain
 * pages and sub-section and so on...
 */
class NavigationMenu extends React.Component {
  static propTypes = {
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
          PropTypes.shape({
            /**
             * The page's name to display.
             */
            name: PropTypes.string,
            /**
             * page's destination.
             */
            url: PropTypes.string,
          })
        ),
      })
    ).isRequired,
  };

  state = {
    isHovered: false,
    isOpen: false,
  };

  shouldComponentUpdate(nextState) {
    return (
      this.state.isOpen !== nextState.isOpen ||
      this.state.isHovered !== nextState.isHovered
    );
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick);
      document.addEventListener('keydown', this.handleEscape);
    }
    else {
      document.removeEventListener('click', this.handleOutsideClick);
      document.removeEventListener('keydown', this.handleEscape);
    }
  }

  handleMouseEnter = () => this.setState({ isHovered: true, });
  handleMouseLeave = () => this.setState({ isHovered: false, });

  handleOutsideClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.changeState();
    }
  };

  handleEscape = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.changeState();
      this.navButt.focus();
    }
  };

  changeState = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isHovered, isOpen, } = this.state;

    return (
      <FelaComponent
        style={theme => ({
          display: 'inline',
          extend: [
            theme.mq({ until: 's', }, { display: 'none', }),
            theme.mq({ until: 'm', misc: 'landscape', }, { display: 'none', }),
          ],
        })}
        render={({ theme, className, }) => (
          <div
            className={className}
            ref={wrapper => (this.wrapper = wrapper)} // eslint-disable-line no-return-assign
          >
            <FelaComponent
              rule={menuButtonStyle}
              isOpen={isOpen}
              render={({ className, }) => (
                <button
                  className={className}
                  onClick={this.changeState}
                  aria-expanded={isOpen}
                  ref={navButt => (this.navButt = navButt)} // eslint-disable-line no-return-assign
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <FelaComponent
                    style={{
                      marginStart: '2rem',
                      marginEnd: '2rem',
                      position: 'relative',
                    }}
                    render="span"
                  >
                    <Hamburger
                      isOpen={isOpen}
                      color={{
                        close: isHovered
                          ? [ 'neutral', '-10', ]
                          : [ 'neutral', '-3', ],
                        open: [ 'neutral', '-10', ],
                      }}
                      size={2.5}
                    />
                  </FelaComponent>
                  <span>{theme.navigationMenuI18n.buttonText}</span>
                </button>
              )}
            />
            {/* TODO: Get list elements from polopoly */}
            <FelaComponent style={{ position: 'relative', }}>
              {isOpen && <List items={this.props.sections} theme={theme} />}
            </FelaComponent>
          </div>
        )}
      />
    );
  }
}

export default NavigationMenu;
