import React, { Fragment, } from 'react';
import { createComponent, withTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import IconClose from '../Icon/icons/IconClose';
import IconSearch from '../Icon/icons/IconSearch';
import TextInput from '../TextInput/TextInput';

const wrapperStyle = ({ theme, miscStyles, }) => ({
  display: 'flex',
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});
const Wrapper = createComponent(wrapperStyle);

const myButtonStyle = ({ theme, isOpen, }) => ({
  ...(theme.type(-2)),
  color: theme.color('neutral', '-3'),
  border: 'none',
  fontWeight: '700',
  minWidth: '6rem',
  padding: '1rem',
  ...(isOpen &&
    {
      backgroundColor: theme.color('primary'),
      color: theme.color('neutral', '-10'),
    }
  ),
});
const MyButton = createComponent(myButtonStyle, 'button', [ 'onClick', 'role', 'aria-expanded', ]);

const Input = createComponent(() => ({ flexGrow: '2', }));

class NavigationSearch extends React.Component {
  state = {
    isOpen: false,
  };

  changeState = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { theme, miscStyles, } = this.props;
    return (
      <Wrapper miscStyles={miscStyles}>
        <MyButton
          isOpen={this.state.isOpen}
          onClick={this.changeState}
          role="button"
          aria-expanded={this.state.isOpen}
          innerRef={navButt => this.navButt = navButt} // eslint-disable-line no-return-assign
        >
          {this.state.isOpen ?
            <IconClose
              size={3}
              color={[ 'neutral', '-10', ]}
            />
            :
            <Fragment>
              <IconSearch
                size={3}
                color="primary"
                miscStyles={{
                  marginEnd: '2rem',
                }}
              />
              <span>{theme.searchI18n.button}</span>
            </Fragment>
          }
        </MyButton>
        {this.state.isOpen &&
          <Input>
            <TextInput
              label={theme.searchI18n.button}
              labelHidden
              placeholder={theme.searchI18n.placeHolder}
              type="search"
              miscStyles={{
                height: '100%',
                marginTop: 'unset',
              }}
            />
          </Input>
        }
      </Wrapper>
    );
  }
}

export default withTheme(NavigationSearch);
