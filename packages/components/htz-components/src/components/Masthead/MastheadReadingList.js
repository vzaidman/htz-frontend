import React from 'react';
import { FelaComponent, } from 'react-fela';
import HtzLink from '../HtzLink/HtzLink';
import IconReading from '../Icon/icons/IconReading';

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
  extend: [ theme.getTransition(1, 'swiftOut'), ],
});

export default function MastheadReadingList() {
  return (
    <FelaComponent
      style={headerReadingButtonStyle}
      render={({ theme, className, }) => {
        const { url, } = theme.readingListMenuI18n;
        return (
          <HtzLink className={className} href={url}>
            <IconReading size={3} />
          </HtzLink>
        );
      }}
    />
  );
}
