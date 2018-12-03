import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import {
  parseComponentProp,
  parseStyleProps,
  parseTypographyProp,
} from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const captionWrapperStyle = ({
  theme,
  backgroundColor,
  color,
  typeStyles,
  miscStyles,
}) => {
  const { bgc, captionColor, captionTypeSettings, fontFamily, fontWeight, } =
    theme.captionStyles || {};
  const typeSettings = typeStyles || captionTypeSettings;

  return {
    fontFamily,
    fontWeight,

    extend: [
      // Set background color
      ...(backgroundColor || bgc
        ? [
          parseComponentProp(
            'backgroundColor',
            backgroundColor || bgc,
            theme.mq,
            setColor,
            theme.color
          ),
        ]
        : []),

      // Set color
      ...(captionColor || color
        ? [
          parseComponentProp(
            'color',
            color || captionColor,
            theme.mq,
            setColor,
            theme.color
          ),
        ]
        : []),
      // set typographic styles (line height and font-size)
      ...(typeSettings ? [ parseTypographyProp(typeSettings, theme.type), ] : []),
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
};

const CaptionWrapper = ({
  backgroundColor, // eslint-disable-line react/prop-types
  color, // eslint-disable-line react/prop-types
  typeStyles, // eslint-disable-line react/prop-types
  miscStyles, // eslint-disable-line react/prop-types
  children, // eslint-disable-line react/prop-types
}) => (
  <FelaComponent
    backgroundColor={backgroundColor}
    color={color}
    typeStyles={typeStyles}
    miscStyles={miscStyles}
    rule={captionWrapperStyle}
  >
    {children}
  </FelaComponent>
);

const creditRule = ({ theme, prefix, floatCredit, }) => {
  const { fontWeight, } = theme.captionStyles.creditStyles || {};
  return {
    display: 'inline',
    fontWeight,
    extend: [ ...(floatCredit ? [ { float: 'inline-end', }, ] : []), ],
  };
};

// eslint-disable-next-line react/prop-types
const Credit = ({ floatCredit, children, }) => (
  <FelaComponent
    floatCredit={floatCredit}
    rule={creditRule}
    render="span"
  >
    {children}
  </FelaComponent>
);

/**
 * A Caption for Images, Embeds, Videos, etc.
 * @param {Object} props
 */
const Caption = props => {
  if (!props.caption && !props.credit) {
    return null;
  }
  return (
    <CaptionWrapper {...props}>
      <FelaComponent style={{ marginEnd: '1rem', }} render="span">
        {props.caption}
      </FelaComponent>
      {props.credit ? (
        <Credit floatCredit={props.floatCredit}>
          {props.creditprefix}: {props.credit}
        </Credit>
      ) : (
        ''
      )}
    </CaptionWrapper>
  );
};

Caption.propTypes = {
  /**
   * Input for the caption.
   */
  caption: PropTypes.string,
  /**
   * Input for the credit.
   */
  credit: PropTypes.string,
  /**
   * The credits prefix.
   */
  creditprefix: PropTypes.string,
  /**
   * Should the credit float.
   */
  floatCredit: PropTypes.bool,
  /**
   * The color of the background.
   */
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * The color of the inner text.
   */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * The typography of the text.
   */
  typeStyles: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

Caption.defaultProps = {
  caption: null,
  credit: null,
  creditprefix: 'קרדיט',
  floatCredit: false,
  backgroundColor: null,
  color: null,
  typeStyles: null,
  miscStyles: null,
};

export default Caption;
