import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, } from 'react-fela';
import Button from '../../Button/Button';

ItemButton.propTypes = {
  /**
   * The item's name to display.
   */
  name: PropTypes.string.isRequired,
  /**
   * Item's destination.
   */
  url: PropTypes.string.isRequired,
  /**
   * Button's variant to be used.
   */
  variant: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  miscStyles: PropTypes.object,
};

ItemButton.defaultProps = {
  miscStyles: {},
};

export default function ItemButton({ name, url, variant, miscStyles, }) {
  return (
    <FelaTheme
      render={theme => (
        <Button
          boxModel={{ vp: 2, hp: 2, }}
          isFull
          fontSize={-1}
          variant={variant}
          href={url}
          miscStyles={{
            display: 'flex',
            transition: 'none',
            ...miscStyles,
          }}
        >
          <span>{name}</span>
        </Button>
      )}
    />
  );
}
