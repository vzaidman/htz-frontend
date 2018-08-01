/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import { Mutation, } from 'react-apollo';
import gql from 'graphql-tag';

import { Query, } from '../ApolloBoundary/ApolloBoundary';
import UserDispenser from '../User/UserDispenser';
import NavigationQuery from './navigationQuery';
import DropdownList from '../DropdownList/DropdownList';
import Hamburger from '../Animations/Hamburger';
import Item from '../DropdownList/DropdownItem';
import {
  dropdownItemStyle,
  dropdownListStyle,
} from '../Masthead/mastheadDropdownListStyle';

// TODO: remove this when optOut item is deprecated
const OPT_OUT = gql`
  mutation SetReactHtzArticleOptIn($id: String!, $value: Boolean!) {
    setReactHtzArticleOptOut(id: $id, value: $value)
  }
`;

const menuButtonStyle = ({ theme, isOpen, isHovered, }) => ({
  border: 'none',
  color: theme.color('neutral', '-3'),
  display: 'block',
  fontWeight: '700',
  height: '100%',
  // this padding affects all the items in the masthead
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingRight: '1rem',
  paddingLeft: '1rem',
  ...(isOpen && {
    backgroundColor: theme.color('secondary'),
    color: theme.color('neutral', '-10'),
  }),
  // ':hover': {
  //   backgroundColor: theme.color('primary'),
  //   color: theme.color('neutral', '-10'),
  // },
  // ':focus': {
  //   backgroundColor: theme.color('primary'),
  //   color: theme.color('neutral', '-10'),
  // },
  extend: [
    isHovered
      ? {
        backgroundColor: theme.color('primary'),
        color: theme.color('neutral', '-10'),
      }
      : {},
    theme.type(-1),
    theme.getTransition(1, 'swiftOut'),
    theme.mq({ until: 's', }, { display: 'none', }),
    theme.mq({ until: 'm', misc: 'landscape', }, { display: 'none', }),
  ],
});

const baseProp = {
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
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The page's name to display.
       */
      name: PropTypes.string,
      /**
       * page's destination.
       */
      url: PropTypes.string,
      /**
       * page's sub-pages as described above.
       */
      pages: PropTypes.arrayOf(PropTypes.object),
    })
  ),
};

/**
 * A menu component for the page header. A recursive component which receives an array
 * of sections that may contain pages and sub-section, and the later may also contain
 * pages and sub-section and so on...
 */
class NavigationMenu extends React.Component {
  static propTypes = {
    /**
     * An object of sections to be listed, each with a different styling.
     */
    menuSections: PropTypes.shape({
      /**
       * An array of main menu items.
       */
      items: PropTypes.arrayOf(PropTypes.shape(baseProp)),
      /**
       * An array of sites links.
       */
      sites: PropTypes.arrayOf(PropTypes.shape(baseProp)),
      /**
       * An array of promotion items.
       */
      promotions: PropTypes.arrayOf(PropTypes.shape(baseProp)),
    }).isRequired,
  };

  state = { isHovered: false, };

  handleMouseEnter = () => this.setState({ isHovered: true, });
  handleMouseLeave = () => this.setState({ isHovered: false, });

  optOut = (id, optOutMutation) => {
    const domain = config.has('domain') && config.get('domain');
    // CookieUtils.deleteCookie('react');
    CookieUtils.modifyCookie('react', false, '/', `.${domain}`);
    // mutation function MongoDB
    optOutMutation({ variables: { id, value: true, }, })
      .then(success => {
        document.location.reload();
      })
      .catch(err => console.warn('err mutation:', err));
  };

  render() {
    return (
      <FelaTheme
        render={theme => {
          const { isHovered, } = this.state;
          const { items, sites, promotions, } = this.props.menuSections;

          // TODO: remove this when optOut item is deprecated
          const optOut = (
            <UserDispenser
              render={({ user: { id, }, }) =>
                (!id ? null : (
                  <Mutation mutation={OPT_OUT}>
                    {(optOutMutation, { data, }) => (
                      <Item
                        key="item HardCoded חזרה לכתבה רגילה"
                        name="חזרה לכתבה רגילה"
                        onClick={() => this.optOut(id, optOutMutation)}
                        miscStyles={{
                          backgroundColor: theme.color('primary', '+1'),
                        }}
                      />
                    )}
                  </Mutation>
                ))
              }
            />
          );

          const combinedItems =
            items &&
            items.map(item => <Item key={`item ${item.name}`} {...item} />);

          // TODO: remove this when optOut item is deprecated
          if (combinedItems !== undefined && combinedItems.length > 2) {
            combinedItems.splice(combinedItems.length - 1, 0, optOut);
          }

          const combinedSites =
            sites &&
            sites.map(site => (
              <Item
                key={`site ${site.name}`}
                miscStyles={{
                  textDecoration: 'underline',
                  fontWeight: 'normal',
                  backgroundColor: theme.color('primary', '+1'),
                }}
                {...site}
              />
            ));

          const combinedPromotions =
            promotions &&
            promotions.map(promotion => (
              <Item
                key={`promotion ${promotion.name}`}
                variant="salesOpaque"
                miscStyles={{ justifyContent: 'center', }}
                {...promotion}
              />
            ));

          const combinedMenu = [
            ...(combinedItems || []),
            ...(combinedSites || []),
            ...(combinedPromotions || []),
          ];

          return (
            <DropdownList
              mainMenuStyle={{ position: 'relative', }}
              render={({ renderButton, ListWrapper, isOpen, }) => (
                <Fragment>
                  {renderButton(({ toggleState, }) => (
                    <FelaComponent
                      rule={menuButtonStyle}
                      isOpen={isOpen}
                      isHovered={isHovered}
                      render={({ className, }) => (
                        <button
                          className={className}
                          onClick={toggleState}
                          aria-expanded={isOpen}
                          onMouseEnter={this.handleMouseEnter}
                          onMouseLeave={this.handleMouseLeave}
                          onFocus={this.handleMouseEnter}
                          onBlur={this.handleMouseLeave}
                          type="button"
                        >
                          <FelaComponent
                            style={{
                              marginStart: '2rem',
                              marginEnd: '2rem',
                              position: 'relative',
                            }}
                            render="span"
                          >
                            <Hamburger
                              isOpen={isOpen}
                              color={{
                                close: isHovered
                                  ? [ 'neutral', '-10', ]
                                  : [ 'neutral', '-3', ],
                                open: [ 'neutral', '-10', ],
                              }}
                              size={2.5}
                              isTransition
                            />
                          </FelaComponent>
                          <span>{theme.navigationMenuI18n.buttonText}</span>
                        </button>
                      )}
                    />
                  ))}
                  {isOpen && (
                    <ListWrapper
                      listStyle={{
                        ...dropdownListStyle(theme),
                        minWidth: '29rem',
                      }}
                      itemStyle={dropdownItemStyle(theme)}
                    >
                      {combinedMenu}
                    </ListWrapper>
                  )}
                </Fragment>
              )}
            />
          );
        }}
      />
    );
  }
}

// eslint-disable-next-line react/prop-types
export default ({ contentId, }) => (
  <Query query={NavigationQuery} variables={{ path: contentId, }}>
    {({ data, loading, error, }) => {
      if (error) return null;
      if (loading) return <NavigationMenu menuSections={{}} />;
      const { navMenu: { menu, }, } = data;
      return <NavigationMenu menuSections={menu} />;
    }}
  </Query>
);
