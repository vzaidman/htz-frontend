import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { borderBottom, borderStart, } from '@haaretz/htz-css-tools';
import Link from '../Link/Link';
import FlippingArrow from '../Animations/FlippingArrow';

const listStyle = ({ theme, isSub, startOffset, }) => ({
  position: 'absolute',
  zIndex: '100',
  backgroundColor: theme.color('secondary'),
  color: theme.color('neutral', '-10'),
  fontWeight: '700',
  minWidth: '28rem',
  display: 'inline-block',
  start: `${startOffset}px` || '0',
  extend: [
    ...(isSub
      ? [
        {
          backgroundColor: theme.color('secondary', '+2'),
          fontWeight: '300',
          minWidth: `${149 / 7}rem`,
          ...borderStart('1px', 'solid', theme.color('primary', '+1')),
        },
      ]
      : []),
  ],
  '& *': {
    ':focus': {
      outline: 'none',
    },
  },
});
const StyledList = createComponent(listStyle, 'ul', [ 'role', ]);

const itemStyle = ({ theme, selected, lastItem, isSub, }) => {
  const hoverFocusStyle = {
    backgroundColor: isSub
      ? theme.color('secondary', '+1')
      : theme.color('secondary', '+2'),
  };
  return {
    ...borderBottom('1px', 0.1, 'solid', theme.color('primary', '+1')),
    ...theme.type(-2),
    cursor: 'pointer',
    display: 'flex',
    ...(selected && { backgroundColor: theme.color('secondary', '+2'), }),
    // ...(lastItem && { paddingBottom: '2rem', }),
    ':hover': hoverFocusStyle,
    ':focus': hoverFocusStyle,
  };
};
const Item = createComponent(itemStyle, 'li');

const siteItemStyle = () => ({
  border: 'none',
  fontWeight: '300',
});
const SiteItem = createComponent(siteItemStyle, Item);

const itemNameStyle = ({ theme, }) => ({
  color: theme.color('neutral', '-10'),
});
const ItemName = createComponent(itemNameStyle, 'span');

const siteNameStyle = () => ({
  textDecoration: 'underline',
  textDecorationSkip: 'ink',
});
const SiteName = createComponent(siteNameStyle, ItemName);

const arrowWrapperStyle = ({ theme, selected, }) => ({
  backgroundColor: selected
    ? theme.color('secondary', '+2')
    : theme.color('secondary', '+1'),
  position: 'relative',
  width: '4rem',
  ':focus': {
    backgroundColor: theme.color('secondary', '+2'),
  },
});
const ArrowWrapper = createComponent(arrowWrapperStyle, 'button', [
  'onClick',
  'role',
  'focus',
  'aria-expanded',
  'aria-label',
]);

const linkStyle = ({ theme, isSub, }) => {
  const hoverFocusStyle = {
    backgroundColor: isSub
      ? theme.color('secondary', '+1')
      : theme.color('secondary', '+2'),
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

const promotionStyle = ({ theme, }) => ({
  display: 'block',
  textAlign: 'center',
  fontWeight: '700',
  backgroundColor: theme.color('sales'),
  paddingTop: '1rem',
  paddingBottom: '1rem',
  ...theme.type(-2),
  ':hover': {
    backgroundColor: theme.color('sales', 'a11yOnLight'),
  },
});
const PromotionItem = createComponent(promotionStyle, Link, props =>
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
    /**
     * A callback function passed down by the parent to its sub-list.
     */
    clearParentSelection: PropTypes.func,
    /**
     * Is this list is a sub-list.
     */
    isSub: PropTypes.bool,
  };

  static defaultProps = {
    startOffset: 0,
    clearParentSelection: null,
    isSub: false,
  };

  state = {
    lastSelectedIndex: 0,
    selectedIndex: null,
    focused: true,
  };

  componentDidMount() {
    this.addKeysListener();
  }

  componentDidUpdate() {
    this.state.selectedIndex === null &&
      !this.props.items &&
      this.props.clearParentSelection();
    this.state.focused ? this.addKeysListener() : this.removeKeysListener();
  }

  componentWillUnmount() {
    this.removeKeysListener();
  }

  changeState = selectedIndex => {
    if (selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex,
        focused: false,
      });
    }
    else {
      this.clearSelection();
    }
  };

  clearSelection = () => {
    this.setState({
      lastSelectedIndex: this.state.selectedIndex,
      selectedIndex: null,
      focused: true,
    });
  };

  handleKeydown = e => {
    const key = e.which || e.keyCode;
    if (
      (this.props.theme.direction === 'rtl' && key === 39) ||
      (this.props.theme.direction === 'ltr' && key === 37)
    ) {
      this.props.clearParentSelection();
    }
  };

  addKeysListener() {
    this.listRef &&
      this.listRef.addEventListener('keydown', this.handleKeydown);
  }

  removeKeysListener() {
    this.listRef &&
      this.listRef.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    const { items, theme, isSub, startOffset = 0, } = this.props;
    const { sections, promotions, sites, } = !isSub
      ? theme.navigationMenuI18n.menuItems
      : {};

    return (
      <Fragment>
        {items && (
          <StyledList
            innerRef={listRef => {
              this.listRef = listRef;
            }}
            isSub={isSub}
            startOffset={startOffset}
            role="region"
          >
            {items.map((item, i) => {
              const isSelected = this.state.selectedIndex === i;
              return (
                <Item key={item.name} selected={isSelected} isSub={isSub}>
                  <StyledLink
                    attrs={{
                      onKeyDown:
                        isSub && items.length === i + 1
                          ? e => {
                              e.preventDefault();
                              this.setState({
                                lastSelectedIndex: 0,
                              });
                            }
                          : null,
                    }}
                    focus={this.state.lastSelectedIndex === i}
                    href={item.url}
                    content={<ItemName>{item.name}</ItemName>}
                  />
                  {item.pages &&
                    item.pages.length > 0 && (
                      <ArrowWrapper
                        onClick={() => this.changeState(i)}
                        role="button"
                        aria-expanded={isSelected}
                        selected={isSelected}
                        aria-label={item.name}
                      >
                        <FlippingArrow
                          isOpen={this.state.selectedIndex === i}
                          color={[ 'neutral', '-10', ]}
                          size={1.5}
                          direction={theme.direction}
                        />
                      </ArrowWrapper>
                    )}
                </Item>
              );
            })}
            {isSub || (
              <Fragment>
                {sections.map(section => (
                  <Item key={section.name}>
                    <StyledLink
                      href={section.url}
                      content={<ItemName>{section.name}</ItemName>}
                    />
                  </Item>
                ))}
                {sites.map((site, i) => (
                  <SiteItem key={site.name} lastItem={sites.length === i + 1}>
                    <StyledLink
                      href={site.url}
                      content={<SiteName>{site.name}</SiteName>}
                    />
                  </SiteItem>
                ))}
                {promotions.map((promotion, i) => (
                  <PromotionItem
                    attrs={{
                      onKeyDown:
                        promotions.length === i + 1
                          ? e => {
                              if (e.keyCode === 9) {
                                e.preventDefault();
                                this.setState({
                                  lastSelectedIndex: 0,
                                });
                              }
                            }
                          : null,
                    }}
                    key={promotion.name}
                    href={promotion.url}
                    content={<ItemName>{promotion.name}</ItemName>}
                  />
                ))}
              </Fragment>
            )}
          </StyledList>
        )}
        {this.state.selectedIndex !== null && (
          <List
            items={items[this.state.selectedIndex].pages}
            theme={theme}
            startOffset={startOffset + this.listRef.offsetWidth}
            clearParentSelection={this.clearSelection}
            isSub
          />
        )}
      </Fragment>
    );
  }
}

export default List;
