import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import MobileMenuButton from './MobileMenuItemButton';
import MobileMenuLink from './MobileMenuItemLink';
import MobileMenuSection from './MobileMenuSection';

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
    })
  ),
};

List.propTypes = {
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
  searchIsOpen: PropTypes.bool.isRequired,
};

export default function List({ menuSections, searchIsOpen, }) {
  const { items, sites, promotions, } = menuSections;
  const combinedItems =
    items &&
    items.map(item => <MobileMenuLink key={`item ${item.name}`} {...item} />);

  const combinedSites = theme =>
    sites &&
    sites.map(site => (
      <MobileMenuLink key={`site ${site.name}`} isSite {...site} />
    ));

  const combinedPromotions =
    promotions &&
    promotions.map(promotion => (
      <MobileMenuButton
        variant="salesOpaque"
        miscStyles={{ justifyContent: 'center', }}
        {...promotion}
      />
    ));

  return (
    <FelaComponent
      style={theme => ({ backgroundColor: theme.color('secondary'), })}
      render={({ className, theme, }) => (
        <ul className={className}>
          <FelaComponent
            style={theme => ({
              color: theme.color('neutral', '-10'),
              ...(searchIsOpen ? { visibility: 'hidden', } : {}),
            })}
            render={({ className, }) => (
              <Fragment>
                {combinedItems.map(item => (
                  <li key={item.key} className={className}>
                    {item}
                    {item.props.pages ? (
                      <MobileMenuSection
                        pages={item.props.pages}
                        sectionName={item.props.name}
                      />
                    ) : null}
                  </li>
                ))}
                {combinedSites(theme).map(site => (
                  <li key={site.key} className={className}>
                    {site}
                  </li>
                ))}
                {combinedPromotions.map(promotion => (
                  <li key={promotion.key} className={className}>
                    {promotion}
                  </li>
                ))}
              </Fragment>
            )}
          />
        </ul>
      )}
    />
  );
}
