import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import Query from '../../ApolloBoundary/Query';
import Button from '../../Button/Button';
import ClickArea from '../../ClickArea/ClickArea';
import hoverableButtonRule from '../../ClickArea/hoverableButtonRule';
import DropdownList from '../../DropdownList/DropdownList';
import IconAccessibility from '../../Icon/icons/IconAccessibility';
import Item from '../../DropdownList/DropdownItem';
import { dropdownItemStyle, dropdownListStyle, } from '../mastheadDropdownListStyle';

const GET_A11Y_STATE = gql`
  query GetA11yStatus {
    a11yToggle @client
  }
`;

/**
 * A menu component for the page header. A component which generate
 * two options: toggle accessibility on apollo link state and report a problem via email
 */
class MastheadA11yMenu extends React.Component {
  buttonRef = React.createRef();

  render() {
    return (
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
              onClose={() => {
                setImmediate(() => {
                  this.buttonRef.current.focus();
                });
              }}
              render={({ renderButton, ListWrapper, isOpen, closeList, }) => (
                <Fragment>
                  {renderButton(({ toggleState, }) => (
                    <FelaComponent
                      rule={hoverableButtonRule}
                      isOpen={isOpen}
                      render={({ theme, className, }) => (
                        <button type="button" className={className} ref={this.buttonRef} onClick={toggleState}>
                          <ClickArea tagName="span" size={6}>
                            <IconAccessibility size={3.5} />
                          </ClickArea>
                        </button>
                      )}
                    />
                  ))}
                  {isOpen ? (
                    <FelaTheme
                      render={theme => (
                        <ListWrapper
                          listStyle={{ ...dropdownListStyle(theme), end: '0', }}
                          itemStyle={dropdownItemStyle(theme)}
                          closeList={closeList}
                        >
                          {combinedItems}
                        </ListWrapper>
                      )}
                    />
                  ) : null}
                </Fragment>
              )}
            />
          );
        }}
      />
    );
  }
}

export default MastheadA11yMenu;
