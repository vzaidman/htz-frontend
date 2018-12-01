/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { FelaComponent, } from 'react-fela';
import { borderEnd, } from '@haaretz/htz-css-tools';
import IconSearch from '../../Icon/icons/IconSearch';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';

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
    query: '',
  };

  focusOnInput = inputRef => inputRef && inputRef.focus();

  recordQuery = event => this.setState({
    query: event.target.value,
  });

  submitHandler = (event, searchUrl) => {
    event.preventDefault();
    Router.push(searchUrl || '#');
  }

  render() {
    const { onClick, searchIsOpen, } = this.props;
    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          flexGrow: searchIsOpen ? '1' : '0',
          overflow: 'hidden',
          extend: [ borderEnd('1px', 'solid', theme.color('primary', '+1')), ],
        })}
        render={({
          className,
          theme: {
            color,
            getDuration,
            getTimingFunction,
            getTransition,
            mobileSearchI18n: { buttonText, placeHolder, queryUrl, },
            type,
          },
        }) => (
          <div className={className}>
            <Button
              boxModel={{ vp: 2, hp: 2, }}
              variant="secondaryOpaque"
              fontSize={-1}
              onClick={onClick}
              aria-expanded={searchIsOpen}
              miscStyles={{
                ...(searchIsOpen
                  ? {
                    display: 'none',
                  }
                  : {}),
              }}
            >
              {searchIsOpen ? null : (
                <Fragment>
                  <IconSearch
                    size={3}
                    miscStyles={{
                      marginEnd: '1rem',
                      extend: [ getTransition(1, 'swiftOut'), ],
                    }}
                  />
                  <span>{buttonText}</span>
                </Fragment>
              )}
            </Button>
            {searchIsOpen ? (
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
                  <form
                    className={className}
                    onSubmit={event => this.submitHandler(event, queryUrl(this.state.query))}
                  >
                    <TextInput
                      label={buttonText}
                      labelHidden
                      placeholder={placeHolder}
                      type="search"
                      refFunc={this.focusOnInput}
                      onChange={this.recordQuery}
                      boxModel={{ vp: 1, }}
                      variant="search"
                      miscStyles={{
                        height: '100%',
                        paddingInlineEnd: '6rem',
                      }}
                      wrapperStyle={{
                        flexGrow: 1,
                      }}
                    />
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
                        <Button
                          isSubmit
                          variant="primaryOpaque"
                          boxModel={{ hp: 2, vp: 2, }}
                          className={className}
                        >
                          <IconSearch size={3} />
                        </Button>
                      )}
                    />
                  </form>
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
