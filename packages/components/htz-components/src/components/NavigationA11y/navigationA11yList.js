import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import { createComponent, } from 'react-fela';
import FocusLock from 'react-focus-lock';
import gql from 'graphql-tag';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Link from '../Link/Link';
import Button from '../Button/Button';

const GET_A11Y_STATE = gql`
  query {
    a11yToggle @client
  }
`;

const propTypes = {
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
      /**
       * Section's pages (may contain pages or sub-sections with their own pages).
       */
      pages: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
  /**
   * The app's theme.
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * List's StartMargin, so it will be positioned next to it's parent list (in case it is a sub-list).
   */
  startOffset: PropTypes.number,
};

const defaultProps = {
  startOffset: 0,
};

const listStyle = ({ theme, startOffset, }) => ({
  position: 'absolute',
  zIndex: '100',
  backgroundColor: theme.color('secondary'),
  color: theme.color('neutral', '-10'),
  fontWeight: '700',
  minWidth: '28rem',
  display: 'inline-block',
  end: `${startOffset}px` || '0',
  '& *': {
    ':focus': {
      outline: 'none',
    },
  },
});
const StyledList = createComponent(listStyle, 'ul', [ 'role', ]);

const itemStyle = ({ theme, selected, lastItem, }) => {
  const hoverFocusStyle = {
    backgroundColor: theme.color('secondary', '+2'),
  };
  return {
    ...borderBottom('1px', 0.1, 'solid', theme.color('primary', '+1')),
    ...theme.type(-2),
    cursor: 'pointer',
    display: 'flex',
    ...(selected && { backgroundColor: theme.color('secondary', '+2'), }),
    ...(lastItem && { paddingBottom: '2rem', }),
    ':hover': hoverFocusStyle,
    ':focus': hoverFocusStyle,
  };
};
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
    const { items, startOffset = 0, theme, } = this.props;

    return (
      <Fragment>
        <FocusLock>
          {items && (
            <StyledList
              innerRef={listRef => (this.listRef = listRef)} // eslint-disable-line no-return-assign
              startOffset={startOffset}
              role="region"
            >
              <Query query={GET_A11Y_STATE}>
                {({ data, loading, client, }) => {
                  const { a11yToggle, } = data;
                  return (
                    <li>
                      <Button
                        boxModel={{ vp: 1, hp: 2, }}
                        isFlat
                        isFull
                        isHard
                        fontSize={-2}
                        variant="neutral"
                        miscStyles={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                        }}
                        onClick={() => {
                          client.writeData({
                            data: {
                              a11yToggle: !a11yToggle,
                            },
                          });
                        }}
                      >
                        <ItemName>
                          {theme.navigationA11yI18n.a11yToggle(a11yToggle)}
                        </ItemName>
                      </Button>
                    </li>
                  );
                }}
              </Query>
              {items.map((item, i) => (
                <Item key={item.name}>
                  <StyledLink
                    href={item.url}
                    content={<ItemName>{item.name}</ItemName>}
                  />
                </Item>
                ))}
            </StyledList>
          )}
        </FocusLock>
      </Fragment>
    );
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
