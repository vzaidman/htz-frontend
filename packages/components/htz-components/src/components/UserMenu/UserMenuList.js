import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import FocusLock from 'react-focus-lock';
import Link from '../Link/Link';
import Button from '../Button/Button';
import Logout from '../User/Logout';

const listStyle = ({ theme, }) => ({
  position: 'absolute',
  zIndex: '100',
  backgroundColor: theme.color('secondary'),
  color: theme.color('neutral', '-10'),
  fontWeight: '700',
  minWidth: '28rem',
  display: 'inline-block',
  end: '0',
  '& *': {
    ':focus': {
      outline: 'none',
    },
  },
});
const StyledList = createComponent(listStyle, 'ul', [ 'role', ]);

const itemStyle = ({ theme, selected, lastItem, }) => ({
  ...borderBottom('1px', 0.1, 'solid', theme.color('primary', '+1')),
  ...theme.type(-2),
  cursor: 'pointer',
  display: 'flex',
  ...(selected && { backgroundColor: theme.color('secondary', '+2'), }),
  ...(lastItem && { paddingBottom: '2rem', }),
});

const Item = createComponent(itemStyle, 'li');

const itemNameStyle = ({ theme, }) => ({
  marginInlineEnd: 'auto',
  color: theme.color('neutral', '-10'),
});
const ItemName = createComponent(itemNameStyle, 'span');

const linkStyle = ({ theme, }) => {
  const hoverFocusStyle = {
    backgroundColor: theme.color('secondary', '+2'),
  };
  return {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    flexGrow: '1',
    ':focus': hoverFocusStyle,
    ':hover': hoverFocusStyle,
  };
};
const StyledLink = createComponent(linkStyle, Link, props =>
  Object.keys(props)
);

class List extends React.Component {
  static propTypes = {
    /**
     * An array of sections to be listed, which may contain pages or their own sub-section.
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * The section's name to display.
         */
        name: PropTypes.string,
        /**
         * Section's destination.
         */
        url: PropTypes.string,
      })
    ).isRequired,
    /**
     * The app's theme.
     */
    theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    /**
     * A callback to signout.
     */
    onLogout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.addKeysListener();
  }

  componentWillUnmount() {
    this.removeKeysListener();
  }

  addKeysListener() {
    this.listRef &&
      this.listRef.addEventListener('keydown', this.handleKeydown);
  }

  removeKeysListener() {
    this.listRef &&
      this.listRef.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    const { items, theme, } = this.props;

    return (
      <Fragment>
        <FocusLock>
          {items && (
            <StyledList
              innerRef={listRef => (this.listRef = listRef)} // eslint-disable-line no-return-assign
              role="region"
            >
              {items.map((item, i) => (
                <Item key={item.name}>
                  <StyledLink
                    href={item.url}
                    content={<ItemName>{item.name}</ItemName>}
                  />
                </Item>
              ))}
              <Logout
                render={({ logout, }) => (
                  <li>
                    <Button
                      boxModel={{ vp: 1, hp: 2, }}
                      isFlat
                      isFull
                      isHard
                      fontSize={-2}
                      variant="negativeOpaque"
                      miscStyles={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                      onClick={() =>
                        logout().then(() => this.props.onLogout())
                      }
                    >
                      <ItemName>{theme.userMenuI18n.logout}</ItemName>
                    </Button>
                  </li>
                )}
              />
            </StyledList>
          )}
        </FocusLock>
      </Fragment>
    );
  }
}

export default List;
