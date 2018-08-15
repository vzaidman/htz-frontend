import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, } from 'react-fela';
import Button from '../Button/Button';
import FlippingArrow from '../Animations/FlippingArrow';
import DropdownList from './DropdownList';
import {
  dropdownItemStyle,
  dropdownListStyle,
} from '../Masthead/mastheadDropdownListStyle';

Item.propTypes = {
  /**
   * The item's name to display.
   */
  name: PropTypes.string.isRequired,
  /**
   * Item's destination.
   */
  url: PropTypes.string,
  /** An onClick function */
  onClick: PropTypes.func,
  /**
   * Item's pages (may contain pages or sub-pages with their own pages).
   */
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The page's name to display.
       */
      name: PropTypes.string,
      /**
       * Page's destination.
       */
      url: PropTypes.string,
      /**
       * 3rd+ level of sub-pages.
       */
      pages: PropTypes.arrayOf(PropTypes.object),
    })
  ),
  /**
   * Button's variant to be used.
   */
  variant: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  miscStyles: PropTypes.object,
};

Item.defaultProps = {
  onClick: null,
  pages: null,
  url: null,
  variant: 'secondaryOpaque',
  miscStyles: {},
};

export default function Item({
  name,
  url,
  pages,
  variant,
  miscStyles,
  onClick,
}) {
  return (
    <FelaTheme
      render={theme => (
        <Fragment>
          {pages && pages.length > 0 ? (
            <DropdownList
              isLast
              mainMenuStyle={{ width: '100%', display: 'flex', }}
              render={({ renderButton, ListWrapper, isOpen, }) => {
                const combinedItems = pages.map(item => (
                  <Item
                    key={item.name}
                    miscStyles={{
                      backgroundColor: theme.color('secondary', '+1'),
                      ':hover': {
                        backgroundColor: theme.color('secondary', '+2'),
                      },
                      ':focus': {
                        backgroundColor: theme.color('secondary', '+2'),
                      },
                    }}
                    {...item}
                  />
                ));
                return (
                  <Fragment>
                    {renderButton(({ toggleState, }) => (
                      <Fragment>
                        <Button
                          boxModel={{ vp: 1, hp: 2, }}
                          isFull
                          fontSize={-2}
                          variant={variant}
                          onClick={onClick}
                          attrs={{
                            onMouseOver: toggleState,
                            onMouseOut: toggleState,
                          }}
                          href={url}
                          miscStyles={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            ...miscStyles,
                          }}
                        >
                          <span>{name}</span>
                        </Button>
                        <Button
                          boxModel={{ vp: 1, hp: 2, }}
                          variant={variant}
                          isHard
                          onClick={toggleState}
                          aria-expanded={isOpen}
                          aria-label={`more ${name}`}
                          miscStyles={{
                            position: 'static',
                            ...(isOpen
                              ? {
                                  backgroundColor: theme.color(
                                    'secondary',
                                    '+1'
                                  ),
                                }
                              : {}),
                          }}
                        >
                          <FlippingArrow
                            isOpen={isOpen}
                            color={[ 'neutral', '-10', ]}
                            size={1.5}
                            direction={theme.direction}
                          />
                        </Button>

                        {isOpen && (
                          <ListWrapper
                            listStyle={{
                              ...dropdownListStyle(theme),
                              top: '0',
                              start: '100%',
                              position: 'absolute',
                            }}
                            itemStyle={{
                              ...dropdownItemStyle(theme),
                              ':last-child': {
                                borderBottomColor: theme.color('primary', '+1'),
                                borderBottomStyle: 'solid',
                                borderBottomWidth: '1px',
                              },
                            }}
                          >
                            {combinedItems}
                          </ListWrapper>
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                );
              }}
            />
          ) : (
            <Button
              boxModel={{ vp: 1, hp: 2, }}
              isFull
              fontSize={-2}
              variant={variant}
              onClick={onClick}
              href={url}
              miscStyles={{
                display: 'flex',
                justifyContent: 'flex-start',
                ...miscStyles,
              }}
            >
              <span>{name}</span>
            </Button>
          )}
        </Fragment>
      )}
    />
  );
}
