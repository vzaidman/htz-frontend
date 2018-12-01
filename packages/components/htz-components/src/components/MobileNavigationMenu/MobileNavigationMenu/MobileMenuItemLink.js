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
  isHeader: PropTypes.bool,
  isSite: PropTypes.bool,
};

ItemLink.defaultProps = {
  isHeader: false,
  isSite: false,
};

export default function ItemLink({ name, url, isHeader, isSite, }) {
  return (
    <FelaComponent
      style={theme => ({
        borderBottomColor: theme.color('primary', '+1'),
        borderBottomStyle: 'solid',
        borderBottomWidth: '2px',
        display: 'block',
        paddingBottom: '2rem',
        paddingTop: '2rem',
        ...(isHeader
          ? {
            fontWeight: 'bold',
            extend: [ theme.type(1), ],
          }
          : !isSite && { textIndent: 0, }
        ),
        ...(isSite
          ? {
            backgroundColor: theme.color('primary', '+1'),
            fontWeight: 'normal',
            textDecoration: 'underline',
          }
          : {}),
      })}
      render={({ className, }) => (
        <HtzLink href={url} content={name} className={className} />
      )}
    />
  );
}
