/* global document */
import React, { Fragment, } from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import IconClose from '../Icon/icons/IconClose';
import IconSearch from '../Icon/icons/IconSearch';
import Link from '../Link/Link';
import TextInput from '../TextInput/TextInput';

const wrapperStyle = ({ theme, miscStyles, }) => ({
  display: 'flex',
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const myButtonStyle = ({ theme, isOpen, goSearch, }) => ({
  ...theme.type(-2),
  color: theme.color('neutral', '-3'),
  border: 'none',
  fontWeight: '700',
  minWidth: '6rem',
  padding: '1rem',
  ...(isOpen && {
    backgroundColor: theme.color('primary'),
    color: theme.color('neutral', '-10'),
  }),
  ...(goSearch && {
    backgroundColor: theme.color('primary', '-4'),
  }),
});
const MyButton = createComponent(myButtonStyle, 'button', [
  'onClick',
  'role',
  'aria-expanded',
]);

const Input = createComponent(({ theme, }) => ({
  flexGrow: '2',
  backgroundColor: theme.color('primary', '-4'),
}));

class NavigationSearch extends React.Component {
  state = {
    isOpen: false,
    query: null,
  };

  componentDidUpdate() {
    this.state.isOpen
      ? document.addEventListener('keydown', this.handleGlobalKeydown)
      : document.removeEventListener('keydown', this.handleGlobalKeydown);
  }

  changeState = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  focusOnInput = inputRef => inputRef && inputRef.focus();

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.changeState();
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
    // eslint-disable-next-line react/prop-types
    const { miscStyles, } = this.props;
    return (
      <FelaComponent
        miscStyles={miscStyles}
        rule={wrapperStyle}
        render={({
          className,
          theme: { navigationSearchI18n: { button, placeHolder, queryUrl, }, },
        }) => (
          <div className={className}>
            <MyButton
              isOpen={this.state.isOpen}
              onClick={this.changeState}
              role="button"
              aria-expanded={this.state.isOpen}
            >
              {this.state.isOpen ? (
                <IconClose size={3} color={[ 'neutral', '-10', ]} />
              ) : (
                <Fragment>
                  <IconSearch
                    size={3}
                    color="primary"
                    miscStyles={{
                      marginEnd: '2rem',
                    }}
                  />
                  <span>{button}</span>
                </Fragment>
              )}
            </MyButton>
            {this.state.isOpen && (
              <Fragment>
                <Input>
                  <TextInput
                    label={button}
                    labelHidden
                    placeholder={placeHolder}
                    type="text"
                    refFunc={this.focusOnInput}
                    onChange={this.recordQuery}
                    onBlur={this.changeState}
                    miscStyles={{
                      height: '100%',
                      marginTop: 'unset',
                      backgroundColor: 'transparent',
                      ':hover': {
                        backgroundColor: 'transparent',
                      },
                      ':focus-within': {
                        border: 'none',
                      },
                    }}
                  />
                </Input>
                <FelaComponent
                  rule={myButtonStyle}
                  goSearch
                  render={({ className, }) => (
                    <Link
                      // TODO: Change to Next link.
                      href={queryUrl(this.state.query) || '#'}
                      // eslint-disable-next-line no-return-assign
                      refFunc={linkRef => (this.linkRef = linkRef)}
                      className={className}
                      content={<IconSearch size={3} color="primary" />}
                    />
                  )}
                />
              </Fragment>
            )}
          </div>
        )}
      />
    );
  }
}

export default NavigationSearch;
