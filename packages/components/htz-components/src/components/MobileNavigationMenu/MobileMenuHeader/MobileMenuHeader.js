import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import MobileSearch from './MobileSearch';
import MobileUser from './MobileUser';
import MobileReadingList from './MobileReadingList';
import UserDispenser from '../../User/UserDispenser';

MobileMenuHeader.propTypes = {
  searchIsOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function MobileMenuHeader({ searchIsOpen, onClick, }) {
  return (
    <FelaComponent
      style={theme => ({
        height: '9rem',
        backgroundColor: theme.color('secondary'),
        display: 'flex',
        justifyContent: 'flex-start',
        position: 'relative',
        width: '100%',
        borderBottomColor: theme.color('primary', '+1'),
        borderBottomStyle: 'solid',
        borderBottomWidth: '2px',
      })}
      render={({ theme, className, }) => (
        <div className={className}>
          <MobileSearch searchIsOpen={searchIsOpen} onClick={onClick} />
          <UserDispenser
            render={({ isLoggedIn, }) => (
              <Fragment>
                {!searchIsOpen && isLoggedIn && <MobileReadingList />}
                {!searchIsOpen && <MobileUser isLoggedIn={isLoggedIn} />}
              </Fragment>
            )}
          />
        </div>
      )}
    />
  );
}
