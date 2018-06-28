import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import HtzLink from '../HtzLink/HtzLink';
import IconReading from '../Icon/icons/IconReading';

MastheadReadingList.propTypes = {
  host: PropTypes.oneOf([ 'tm', 'htz', 'hdc', ]).isRequired,
};

const headerReadingButtonStyle = theme => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.color('primary'),
  border: 'none',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  ':hover': {
    backgroundColor: theme.color('primary'),
    color: theme.color('neutral', '-10'),
  },
  ':focus': {
    color: theme.color('primary'),
  },
});

export default function MastheadReadingList({ host, }) {
  const url =
    host === 'htz'
      ? 'https://www.haaretz.co.il/personal-area/my-account#readingList'
      : host === 'tm'
        ? 'https://www.themarker.com/personal-area/reading-list'
        : // change to haaretz.com valid link
        'https://www.haaretz.com';

  return (
    <FelaComponent
      style={headerReadingButtonStyle}
      render={({ theme, className, }) => (
        <HtzLink className={className} href={url}>
          <IconReading size={3} />
        </HtzLink>
      )}
    />
  );
}
