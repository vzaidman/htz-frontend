import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Link from '../Link/Link';
import Media from '../Media/Media';

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
    <Media query={{ until: 's', }}>
      {matches =>
        [ ...(matches ? crumbs.slice(-1) : crumbs), ].map(crumb => (
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
        ))
      }
    </Media>
  );
}

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
