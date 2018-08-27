import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';

import HtzLink from '../HtzLink/HtzLink';
import Query from '../ApolloBoundary/Query';
import Mutation from '../ApolloBoundary/Mutation';

const propTypes = {
  className: PropTypes.string,
  updateArticleSection: PropTypes.func.isRequired,
  crumbs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const defaultProps = {
  className: null,
};

const GET_BREADCRUMBS = gql`
  query Breadcrumbs($path: String!) {
    page(path: $path) {
      ...PageBreadcrumbs
    }
  }
  ${breadcrumbs}
`;

const UPDATE_SECTION = gql`
  mutation updateArticleSection($id: String!, $name: String!, $url: String!) {
    updateArticleSection(id: $id, name: $name, url: $url) @client
  }
`;

// eslint-disable-next-line react/prop-types
const ColoredLink = ({ crumb, index, length, }) => (
  <FelaComponent
    key={crumb.contentId}
    style={theme => ({
      ...theme.type(-1),
      fontWeight: '700',
      marginInlineEnd: '1rem',
      color: theme.color('neutral', '-2'),
      ':hover': {
        color: theme.color('neutral', '-1'),
        textDecoration: 'underline',
        underlineSkip: 'ink',
      },
      extend: [
        theme.mq(
          { until: 's', },
          index !== length - 1 ? { display: 'none', } : {}
        ),
        (index === 0 
          ? {
            '&::after': {
              content: '" > "',
            },
          }
          : {}
        ),
        {
          ':nth-child(odd)': {
            color: theme.color('primary', 'base'),
            ':hover': {
              color: theme.color('primary', '+1'),
            },
          },
        },
      ],
    })}
    render={({ className, }) => (
      <HtzLink className={className} content={crumb.name} href={crumb.url} />
    )}
  />
);

class Breadcrumbs extends React.Component {
  componentDidMount() {
    const { updateArticleSection, crumbs, } = this.props;
    const variables = {
      name: null,
      id: null,
      url: null,
    };
    const length = crumbs.length;
    if (length > 0) {
      variables.name = crumbs[length - 1].name;
      variables.id = crumbs[length - 1].contentId;
      variables.url = crumbs[length - 1].url;
    }
    updateArticleSection({
      variables,
    });
  }

  render() {
    const { className, crumbs, } = this.props;
    return (
      <FelaTheme
        render={theme => {
          const {
            breadcrumbsI18n: { ariaLabel, },
          } = theme;
          const breadcrumbsSchema = {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [],
          };
          return (
            <Fragment>
              <nav aria-label={ariaLabel} className={className}>
                {crumbs.slice(-2).map((crumb, index) => {
                  breadcrumbsSchema.itemListElement.push({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                      '@id': crumb.url,
                      name: crumb.name,
                    },
                  });
                  return (
                    <ColoredLink
                      crumb={crumb}
                      index={index}
                      length={crumbs.length}
                    />
                  );
                })}
              </nav>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(breadcrumbsSchema, null, 2),
                }}
              />
            </Fragment>
          );
        }}
      />
    );
  }
}

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

// eslint-disable-next-line react/prop-types
export default ({ articleId, ...props }) => (
  <Query
    query={GET_BREADCRUMBS}
    variables={{ path: articleId, }}
    errorPolicy="all"
  >
    {({ data, loading, error, }) => {
      if (loading) return null;
      if (error) return null;
      if (!data || !data.page) throw new TypeError('no data !!');
      const { lineage, } = data.page;
      // creating a copy because when the 'steps' array is received from apollo, he is sealed.
      const crumbs = [ ...lineage, ].reverse();
      crumbs.shift();
      crumbs.pop();
      return (
        <Mutation mutation={UPDATE_SECTION}>
          {updateArticleSection => (
            <Breadcrumbs
              crumbs={crumbs}
              {...props}
              updateArticleSection={updateArticleSection}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);
