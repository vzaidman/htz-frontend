import React from 'react';
import { FelaComponent, } from 'react-fela';
import MastheadA11yMenu from './MastheadA11yMenu/MastheadA11yMenu';
import MastheadReadingList from './MastheadReadingList';
import MastheadUserMenu from './MastheadUserMenu/MastheadUserMenu';
import UserDispenser from '../User/UserDispenser';
import EventTracker from '../../utils/EventTracker';

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
          <EventTracker>
            {({ biAction, gaMapper, }) => (
              <UserDispenser
                render={({ user, }) => <MastheadUserMenu userName={user.firstName} biAction={biAction} />}
              />
            )}
          </EventTracker>
          <MastheadReadingList />
          <MastheadA11yMenu />
        </div>
      )}
    />
  );
}
