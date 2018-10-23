import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import HtzLink from '../HtzLink/HtzLink';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const inlineLinkStyle = ({
  theme: { color, articleStyle, },
  theme,
  miscStyles,
}) => {
  const focusActiveStyles = {
    color: color('link', 'base'),
    borderBottomColor: color('link', 'base'),
  };
  return {
    borderBottomColor: color('link', 'base'),
    borderBottomWidth: articleStyle.paragraphLink.borderBottomWidth,
    borderBottomStyle: articleStyle.paragraphLink.borderBottomStyle,
    transitionProperty: 'all',

    ':hover': {
      ...focusActiveStyles,
      borderBottomColor: 'transparent',
    },
    ':focus': focusActiveStyles,
    ':active': focusActiveStyles,
    ':visited': { color: color('bodyText', 'base'), },
    extend: [
      theme.getTransition(0, 'swiftOut'),
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
};

TextLink.propTypes = {
  /** The HTML tag to render the `<Button />` as */
  tagName: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};
TextLink.defaultProps = {
  tagName: null,
  miscStyles: null,
};

function TextLink({ tagName, miscStyles, ...props }) {
  const Tag = tagName || HtzLink;
  return (
    <FelaComponent
      miscStyles={miscStyles}
      rule={inlineLinkStyle}
      render={({ className, }) => <Tag className={className} {...props} />}
    />
  );
}

export default TextLink;
