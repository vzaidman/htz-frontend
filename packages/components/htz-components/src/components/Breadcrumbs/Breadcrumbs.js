import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Link from '../Link/Link';

const propTypes = {
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
  // creating a copy because the 'steps' array is sealed.
  // const crumbs = [ ...steps, ].reverse();
  const crumbs = [
    {
      name: 'פוטין וארדואן - המשכה של ידידות נפלאה',
      url: '/news/world/המזרח-התיכון/.premium-1.2751',
      pathSegment: '.premium',
      contentId: '1.2751',
    },
    {
      name: 'המזרח התיכון',
      url: '/news/world/המזרח-התיכון/2.642',
      pathSegment: 'המזרח-התיכון',
      contentId: '2.642',
    },
    {
      name: 'בעולם',
      url: '/news/world/2.277',
      pathSegment: 'world',
      contentId: '2.277',
    },
    {
      name: 'חדשות',
      url: '/news/2.351',
      pathSegment: 'news',
      contentId: '2.351',
    },
    {
      name: 'הארץ',
      url: '/2.285',
      pathSegment: 'haaretz',
      contentId: '2.285',
    },
  ].reverse();
  crumbs.shift();
  crumbs.pop();
  return crumbs.map(crumb => (
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
        <Link className={className} content={crumb.name} href={crumb.url} />
      )}
    />
  ));
}

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
