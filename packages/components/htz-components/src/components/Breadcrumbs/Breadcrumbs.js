import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';

import HtzLink from '../HtzLink/HtzLink';
import { Query, } from '../ApolloBoundary/ApolloBoundary';

const propTypes = {
  articleId: PropTypes.string.isRequired,
  className: PropTypes.string,
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

function Breadcrumbs({ articleId, className, }) {
  return (
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
          <FelaTheme
            render={theme => {
              const { breadcrumbsI18n: { ariaLabel, }, } = theme;
              return (
                <nav aria-label={ariaLabel} className={className}>
                  {crumbs.map((crumb, index) => (
                    <FelaComponent
                      key={crumb.contentId}
                      style={{
                        ...theme.type(-1),
                        fontWeight: '700',
                        marginInlineEnd: '1rem',
                        color: theme.color('neutral', '-4'),
                        ':hover': {
                          color: theme.color('neutral', '-3'),
                          textDecoration: 'underline',
                          underlineSkip: 'ink',
                        },
                        extend: [
                          theme.mq(
                            { until: 's', },
                            index !== crumbs.length - 1
                              ? { display: 'none', }
                              : {}
                          ),
                          {
                            ':nth-child(odd)': {
                              color: theme.color('neutral', '-2'),
                              ':hover': {
                                color: theme.color('neutral', '-1'),
                              },
                            },
                          },
                        ],
                      }}
                      render={({ className, }) => (
                        <HtzLink
                          className={className}
                          content={crumb.name}
                          href={crumb.url}
                        />
                      )}
                    />
                  ))}
                </nav>
              );
            }}
          />
        );
      }}
    </Query>
  );
}

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
