import React from 'react';
import { FelaComponent, } from 'react-fela';
import MastheadA11yMenu from './MastheadA11yMenu/MastheadA11yMenu';
import MastheadReadingList from './MastheadReadingList';
import MastheadUserMenu from './MastheadUserMenu/MastheadUserMenu';

export default function MastheadUserTools() {
  return (
    <FelaComponent
      style={theme => ({
        alignItems: 'stretch',
        display: 'flex',
        marginStart: 'auto',
      })}
      render={({ className, }) => (
        <div className={className}>
          <MastheadUserMenu />
          <MastheadReadingList />
          <MastheadA11yMenu />
        </div>
      )}
    />
  );
}
