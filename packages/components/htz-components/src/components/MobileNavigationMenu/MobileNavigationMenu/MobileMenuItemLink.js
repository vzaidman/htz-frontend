import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import HtzLink from '../../HtzLink/HtzLink';

ItemLink.propTypes = {
  /**
   * The item's name to display.
   */
  name: PropTypes.string.isRequired,
  /**
   * Item's destination.
   */
  url: PropTypes.string.isRequired,
  /**
   * A boolean if the item is in a sub-menu list. Generate automatically.
   */
  isSub: PropTypes.bool,
  isSite: PropTypes.bool,
};

ItemLink.defaultProps = {
  isSub: false,
  isSite: false,
};

export default function ItemLink({ name, url, isSub, isSite, }) {
  return (
    <FelaComponent
      style={theme => ({
        borderBottomColor: theme.color('primary', '+1'),
        borderBottomStyle: 'solid',
        borderBottomWidth: '2px',
        display: 'block',
        paddingBottom: '2rem',
        paddingTop: '2rem',
        ...(isSub
          ? {
              marginInlineStart: '5rem',
            }
          : {
              fontWeight: 'bold',
              paddingInlineStart: '2rem',
            }),
        ...(isSite
          ? {
              backgroundColor: theme.color('primary', '+1'),
              fontWeight: 'normal',
              textDecoration: 'underline',
            }
          : {}),
        extend: [ theme.type(-1), ],
      })}
      render={({ className, }) => (
        <HtzLink href={url} content={name} className={className} />
      )}
    />
  );
}
