/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import IconClose from '../Icon/icons/IconClose';
import IconSearch from '../Icon/icons/IconSearch';
import Link from '../Link/Link';
import TextInput from '../TextInput/TextInput';

class HeaderSearch extends React.Component {
  static propTypes = {
    /**
     * A boolean from header if the searchbar input is open.
     */
    searchIsOpen: PropTypes.bool.isRequired,
    /**
     * A callback to toggle searchbar state on `NavigationHeader` component.
     */
    onClick: PropTypes.func.isRequired,
  };

  state = {
    query: null,
    isHovered: false,
  };

  componentDidUpdate() {
    this.props.searchIsOpen
      ? document.addEventListener('keydown', this.handleGlobalKeydown)
      : document.removeEventListener('keydown', this.handleGlobalKeydown);
  }

  focusOnInput = inputRef => inputRef && inputRef.focus();

  handleMouseEnter = () => this.setState({ isHovered: true, });
  handleMouseLeave = () => this.setState({ isHovered: false, });
  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.props.onClick();
    }
    else if (key === 13) {
      this.linkRef.click();
    }
  };

  recordQuery = e =>
    this.setState({
      query: e.target.value,
    });

  render() {
    const { isHovered, } = this.state;
    const { onClick, searchIsOpen, } = this.props;
    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          flexGrow: searchIsOpen ? '1' : '0',
          overflow: 'hidden',
          extend: [
            theme.mq({ until: 's', }, { display: 'none', }),
            theme.mq({ until: 'm', misc: 'landscape', }, { display: 'none', }),
          ],
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
          <div className={className}>
            <FelaComponent
              style={{
                alignItems: 'center',
                color: color('headerSearch', 'text'),
                display: 'flex',
                // ':focus': { outline: 'none', },
                fontWeight: '700',
                justifyContent: 'center',
                minWidth: '6rem',
                padding: '1rem',
                position: 'relative',
                zIndex: '1',
                ...(searchIsOpen
                  ? {
                      backgroundColor: color('headerSearch', 'bgHover'),
                      color: color('headerSearch', 'textOpenOrHover'),
                    }
                  : {}),
                extend: [
                  type(-1),
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
                  onClick={onClick}
                  aria-expanded={searchIsOpen}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  type="button"
                >
                  {searchIsOpen ? (
                    <IconClose size={3} color="white" fill="primary" />
                  ) : (
                    <Fragment>
                      <IconSearch
                        size={3}
                        miscStyles={{
                          marginEnd: '1rem',
                          ...(isHovered
                            ? {}
                            : { color: color('headerSearch', 'bgHover'), }),
                          extend: [ getTransition(1, 'swiftOut'), ],
                        }}
                      />
                      <span>{buttonText}</span>
                    </Fragment>
                  )}
                </button>
              )}
            />
            {searchIsOpen ? (
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
                            miscStyles={{
                              backgroundColor: 'transparent',
                              height: '100%',
                              paddingInlineEnd: '6rem',
                              ':hover': {
                                backgroundColor: 'transparent',
                              },
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
                            <Link
                              // TODO: Change to Next link.
                              href={queryUrl(this.state.query) || '#'}
                              refFunc={linkRef => {
                                this.linkRef = linkRef;
                              }}
                              className={className}
                              content={<IconSearch size={3} color="primary" />}
                            />
                          )}
                        />
                      </div>
                    )}
                  />
                )}
              />
            ) : null}
          </div>
        )}
      />
    );
  }
}

export default HeaderSearch;
