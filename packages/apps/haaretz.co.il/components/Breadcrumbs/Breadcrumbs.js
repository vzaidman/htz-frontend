import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { graphql, gql, } from 'react-apollo';

const propTypes = {
  /**
   * Information about the current GraphQL query.
   */
  /* eslint-disable react/forbid-prop-types */
  data: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

const Lineage = gql`
  query Lineage {
    page {
      contentId
      lineage {
        contentId
        name
        url
      }
    }
  }
`;

export function Breadcrumbs({ data, }) {
  if (data.loading) {
    return null;
  }
  return (
    <div style={{ margin: 2, padding: 5, border: '1px solid #ccc', }}>
      {data.page.lineage.slice(1).map((taxonomyItem, i) => [
        i ? <span style={{ marginLeft: 10, marginRight: 10, }}>•</span> : null,
        <Link
          href={{
            pathname: '/article',
            query: { contentId: taxonomyItem.contentId, },
          }}
          as={taxonomyItem.url}
          key={taxonomyItem.contentId}
        >
          <a>
            {taxonomyItem.name}
          </a>
        </Link>,
      ])}
    </div>
  );
}

Breadcrumbs.propTypes = propTypes;

export default graphql(Lineage)(Breadcrumbs);
