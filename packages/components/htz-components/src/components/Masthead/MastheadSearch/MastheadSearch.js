/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { FelaComponent, } from 'react-fela';
import IconClose from '../../Icon/icons/IconClose';
import IconSearch from '../../Icon/icons/IconSearch';
import HtzLink from '../../HtzLink/HtzLink';
import TextInput from '../../TextInput/TextInput';

class HeaderSearch extends React.Component {
  static propTypes = {
    /**
     * A callback to toggle searchbar state on `NavigationHeader` component.
     */
    onClick: PropTypes.func.isRequired,
  };

  state = {
    isSearchOpen: false,
    query: '',
    isHovered: false,
  };

  searchFormRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    this.state.isSearchOpen
      ? document.addEventListener('keydown', this.handleGlobalKeydown)
      : document.removeEventListener('keydown', this.handleGlobalKeydown);
  }

  focusOnInput = inputRef => inputRef && inputRef.focus();

  handleMouseEnter = () => this.setState({ isHovered: true, });

  handleMouseLeave = () => this.setState({ isHovered: false, });

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.toggleSearch();
      this.searchButton.focus();
    }
    else if (key === 13) {
      if (this.state.isSearchOpen) {
        this.searchFormRef.current.submit();
      }
      else {
        this.toggleSearch();
      }
    }
  };

  recordQuery = event => this.setState({
    query: event.target.value,
  });

  submitHandler = (event, searchUrl) => {
    event.preventDefault();
    Router.push(searchUrl || '#');
  };

  toggleSearch() {
    const { isSearchOpen, } = this.state;
    const { onClick, } = this.props;
    this.setState({ isSearchOpen: !isSearchOpen, }, () => (onClick ? onClick(this.state.isSearchOpen) : null)
    );
  }

  render() {
    const { isHovered, } = this.state;
    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          flexGrow: this.state.isSearchOpen ? '1' : '0',
          overflow: 'hidden',
          extend: [ theme.getTransition(1, 'swiftOut'), ],
        })}
        render={({
          className,
          theme: {
            color,
            getDuration,
            getTimingFunction,
            getTransition,
            headerSearchI18n: { buttonText, placeHolder, queryUrl, },
            type,
          },
        }) => (
          <form
            className={className}
            onSubmit={event => this.submitHandler(event, queryUrl(this.state.query))}
            ref={this.searchFormRef}
          >
            <FelaComponent
              style={{
                alignItems: 'center',
                color: color('headerSearch', 'text'),
                display: 'flex',
                fontWeight: '700',
                paddingInlineEnd: '1rem',
                justifyContent: 'center',
                minWidth: '6rem',
                position: 'relative',
                zIndex: '1',
                ...(this.state.isSearchOpen
                  ? {
                    backgroundColor: color('headerSearch', 'bgHover'),
                    color: color('headerSearch', 'textOpenOrHover'),
                  }
                  : {}),
                extend: [
                  type(-1, { lines: 6, }),
                  isHovered
                    ? {
                      backgroundColor: isHovered
                        ? color('headerSearch', 'bgHover')
                        : color('headerSearch', 'bgOpen'),
                      color: color('headerSearch', 'textOpenOrHover'),
                    }
                    : {},
                  getTransition(1, 'swiftOut'),
                ],
              }}
              render={({ className, }) => (
                <button
                  className={className}
                  onClick={() => {
                    this.toggleSearch();
                  }}
                  ref={el => {
                    this.searchButton = el;
                  }}
                  aria-expanded={this.state.isSearchOpen}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onFocus={this.handleMouseEnter}
                  onBlur={this.handleMouseLeave}
                  type="button"
                >
                  {this.state.isSearchOpen ? (
                    <IconClose size={3.5} color="white" fill="primary" />
                  ) : (
                    <Fragment>
                      <IconSearch
                        size={3.5}
                        miscStyles={{
                          marginEnd: '1rem',
                          ...(isHovered ? {} : { color: color('headerSearch', 'bgHover'), }),
                          extend: [ getTransition(1, 'swiftOut'), ],
                        }}
                      />
                      <span>{buttonText}</span>
                    </Fragment>
                  )}
                </button>
              )}
            />
            {this.state.isSearchOpen ? (
              <FelaComponent
                style={{ display: 'flex', }}
                render={({ className, }) => (
                  <FelaComponent
                    style={{
                      animationName: {
                        '0%': { transform: 'translateX(100%)', },
                        '100%': { transform: 'translateX(0)', },
                      },
                      animationFillMode: 'forwards',
                      backgroundColor: color('headerSearch', 'bgInputOpen'),
                      display: 'flex',
                      flexGrow: '1',
                      ...getDuration('animation', 2),
                      ...getTimingFunction('animation', 'swiftOut'),
                      position: 'relative',
                      transform: 'translateX(-100%)',
                    }}
                    render={({ className, }) => (
                      <div className={className}>
                        <FelaComponent style={{ flexGrow: 1, }}>
                          <TextInput
                            label={buttonText}
                            labelHidden
                            placeholder={placeHolder}
                            type="search"
                            refFunc={this.focusOnInput}
                            onChange={this.recordQuery}
                            onBlur={this.changeState}
                            boxModel={{ vp: 0.5, }}
                            variant="search"
                            miscStyles={{
                              backgroundColor: 'transparent',
                              height: '100%',
                              paddingInlineEnd: '6rem',
                              marginTop: '0',
                              paddingTop: '1rem',
                              paddingBottom: '1rem',
                            }}
                          />
                        </FelaComponent>
                        <FelaComponent
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexGrow: '0',
                            height: '100%',
                            insetInlineEnd: '0',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            position: 'absolute',
                            top: '0',
                          }}
                          render={({ className, }) => (
                            <HtzLink
                              // TODO: Change to Next link.
                              href={queryUrl(this.state.query) || '#'}
                              refFunc={linkRef => {
                                this.linkRef = linkRef;
                              }}
                              className={className}
                              content={<IconSearch size={3.5} color="primary" />}
                            />
                          )}
                        />
                      </div>
                    )}
                  />
                )}
              />
            ) : null}
          </form>
        )}
      />
    );
  }
}

export default HeaderSearch;
