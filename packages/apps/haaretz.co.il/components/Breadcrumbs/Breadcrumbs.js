import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { gql, } from 'react-apollo';

const fragments = {
  page: gql`
    fragment BreadcrumbsPage on Page {
      lineage {
        contentId
        name
        url
      }
    }
  `,
};

const propTypes = {
  /**
   * The page being rendered, which will have a `lineage` array containing
   * the breadcrumb links.
   */
  page: PropTypes.shape({
    lineage: PropTypes.arrayOf(
      PropTypes.shape({
        contentId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

function Breadcrumbs({ page, }) {
  const items = page.lineage.slice(1); // Remove the page itself from `lineage`.
  if (items.length) {
    return (
      <div style={{ margin: 2, padding: 5, border: '1px solid #ccc', }}>
        {items.map((taxonomyItem, i) => [
          i ? <span style={{ marginLeft: 10, marginRight: 10, }}>•</span> : null,
          <Link
            href={{
              pathname: '/article',
              query: { contentId: taxonomyItem.contentId, },
            }}
            as={taxonomyItem.url}
            key={taxonomyItem.contentId}
          >
            <a>{taxonomyItem.name}</a>
          </Link>,
        ])}
      </div>
    );
  }
  return null;
}

Breadcrumbs.fragments = fragments;
Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
