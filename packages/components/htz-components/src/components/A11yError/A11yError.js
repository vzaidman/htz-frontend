import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';

A11yError.propTypes = {
  /** The error text */
  errorText: PropTypes.string,
  /**
   * miscStyles of the label
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

A11yError.defaultProps = {
  errorText: null,
  miscStyles: null,
};

export function A11yError({ errorText, miscStyles, }) {
  return (
    <FelaComponent
      style={theme => ({
        color: theme.color('tertiary'),
        fontWeight: 'bold',
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({ className, }) => (
        <div className={className} aria-live="polite" aria-relevant="additions">
          {errorText}
        </div>
      )}
    />
  );
}

export default A11yError;
