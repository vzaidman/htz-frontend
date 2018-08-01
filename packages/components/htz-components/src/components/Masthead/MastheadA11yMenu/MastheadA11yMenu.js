import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { Query, } from '../../ApolloBoundary/ApolloBoundary';
import Button from '../../Button/Button';
import DropdownList from '../../DropdownList/DropdownList';
import IconAccessibility from '../../Icon/icons/IconAccessibility';
import Item from '../../DropdownList/DropdownItem';
import {
  dropdownItemStyle,
  dropdownListStyle,
} from '../mastheadDropdownListStyle';

const GET_A11Y_STATE = gql`
  query GetA11yStatus {
    a11yToggle @client
  }
`;

const a11yButtonStyle = ({ theme, isOpen, }) => ({
  alignItems: 'center',
  height: '100%',
  border: 'none',
  color: theme.color('a11yMenu', 'text'),
  display: 'flex',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
  ...(isOpen && {
    backgroundColor: theme.color('a11yMenu', 'bgOpen'),
    color: theme.color('a11yMenu', 'textOpenOrHover'),
  }),
  ':hover': {
    backgroundColor: theme.color('a11yMenu', 'bgHover'),
    color: theme.color('a11yMenu', 'textOpenOrHover'),
  },
  ':focus': {
    backgroundColor: theme.color('primary'),
    color: theme.color('neutral', '-10'),
  },
  extend: [ theme.getTransition(1, 'swiftOut'), ],
});

/**
 * A menu component for the page header. A component which generate
 * two options: toggle accessibility on apollo link state and report a problem via email
 */
const MastheadA11yMenu = () => (
  <FelaTheme
    render={theme => {
      const items = theme.a11yMenuI18n.menuItems;
      const initialCombinedItems = items.map((item, index) => (
        <Item key={item.name} {...item} />
      ));
      const combinedItems = [
        <Query query={GET_A11Y_STATE} key="toggleA11y">
          {({ data, loading, client, }) => {
            const { a11yToggle, } = data;
            return (
              <Button
                boxModel={{ vp: 1, hp: 2, }}
                isFull
                isHard
                fontSize={-2}
                variant="secondaryOpaque"
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
                <span>{theme.a11yMenuI18n.a11yToggle(a11yToggle)}</span>
              </Button>
            );
          }}
        </Query>,
        ...initialCombinedItems,
      ];

      return (
        <DropdownList
          mainMenuStyle={{ position: 'relative', }}
          render={({ renderButton, ListWrapper, isOpen, }) => (
            <Fragment>
              {renderButton(({ toggleState, }) => (
                <FelaComponent
                  rule={a11yButtonStyle}
                  isOpen={isOpen}
                  render={({ className, }) => (
                    <button
                      className={className}
                      onClick={toggleState}
                      aria-expanded={isOpen}
                    >
                      <IconAccessibility size={3} />
                    </button>
                  )}
                />
              ))}
              {isOpen && (
                <FelaTheme
                  render={theme => (
                    <ListWrapper
                      listStyle={{ ...dropdownListStyle(theme), end: '0', }}
                      itemStyle={dropdownItemStyle(theme)}
                    >
                      {combinedItems}
                    </ListWrapper>
                  )}
                />
              )}
            </Fragment>
          )}
        />
      );
    }}
  />
);

export default MastheadA11yMenu;
