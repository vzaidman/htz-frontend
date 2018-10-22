/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import FlippingArrow from '../../Animations/FlippingArrow';
import MobileMenuLink from './MobileMenuItemLink';


const typeSize = 0;
const indentedStyle = {
  marginInlineStart: '7rem',
};

export default class MobileMenuSection extends React.Component {
  static propTypes = {
    /**
     * The section name for aria-label.
     */
    sectionName: PropTypes.string.isRequired,
    /**
     * The pages (sub-items) object.
     */
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
  };

  state = { isOpen: false, };

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick);
    }
    else {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = evt => {
    if (this.state.isOpen && !this.wrapper.contains(evt.target)) {
      this.toggleOpen();
    }
  };

  toggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isOpen, } = this.state;
    const { pages, sectionName, } = this.props;

    return (
      <ul
        ref={wrapper => {
          this.wrapper = wrapper;
        }}
      >
        {pages.map(
          (page, index) =>
            (index < 2 || isOpen ? (
              <FelaComponent
                style={theme => ({
                  ...indentedStyle,
                  extend: [ theme.type(typeSize), ],
                })}
                render={({ className, }) => (
                  <li key={page.name} className={className} >
                    <MobileMenuLink {...page} />
                  </li>
                )}
              />
            ) : null)
        )}
        {pages.length > 2 ? (
          <li>
            <FelaComponent
              style={theme => ({
                borderBottomWidth: '2px',
                borderBottomStyle: 'solid',
                borderBottomColor: theme.color('primary', '+1'),
                color: theme.color('neutral', '-10'),
                display: 'flex',
                justifyContent: 'flex-start',
                paddingBottom: '2rem',
                paddingTop: '2rem',
                width: '100%',
                extend: [ theme.type(typeSize - 1), ],
                ':focus': {
                  outline: 'none',
                },
                ...indentedStyle,
              })}
              render={({ theme, className, }) => (
                <button
                  className={className}
                  onClick={this.toggleOpen}
                  aria-expanded={isOpen}
                  aria-label={`more ${sectionName}`}
                >
                  <FelaComponent
                    style={theme => ({ color: theme.color('neutral', '-10'), })}
                    render={({ theme, className, }) => (
                      <Fragment>
                        <span className={className}>
                          {isOpen
                            ? theme.mobileNavigationMenuI18n.subClose
                            : theme.mobileNavigationMenuI18n.subOpen}
                        </span>
                        <span
                          style={{
                            position: 'relative',
                            paddingRight: '4rem',
                          }}
                        >
                          <FlippingArrow
                            isOpen={isOpen}
                            color={[ 'neutral', '-10', ]}
                            size={1.5}
                            direction="dtu"
                          />
                        </span>
                      </Fragment>
                    )}
                  />
                </button>
              )}
            />
          </li>
        ) : null}
      </ul>
    );
  }
}
