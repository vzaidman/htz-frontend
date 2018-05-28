import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Link from '../Link/Link';

const propTypes = {
  /**
   * An array of objects with the sections name and path.
   */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      pathSegment: PropTypes.string,
      contentId: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};

function Breadcrumbs({ steps, }) {
  // creating a copy because when the 'steps' array is received from apollo, he is sealed.
  const crumbs = [ ...steps, ].reverse();
  crumbs.shift();
  crumbs.pop();
  return (
    <FelaComponent
      render={({ theme: { breadcrumbsI18n: { ariaLabel, }, }, }) => (
        <nav aria-label={ariaLabel}>
          {crumbs.map((crumb, index) => (
            <FelaComponent
              key={crumb.contentId}
              style={theme => ({
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
                    index !== crumbs.length - 1 ? { display: 'none', } : {}
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
              })}
              render={({ className, }) => (
                <Link
                  className={className}
                  content={crumb.name}
                  href={crumb.url}
                />
              )}
            />
          ))}
        </nav>
      )}
    />
  );
}

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
