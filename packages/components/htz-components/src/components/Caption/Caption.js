import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const captionWrapperStyle = ({
  theme,
  backgroundColor,
  color,
  typeStyles,
  miscStyles,
  floatCredit,
}) => {
  const { bgc, captionColor, captionTypeSettings, fontFamily, fontWeight, } = theme.captionStyles || {};
  const typeSettings = typeStyles || captionTypeSettings;

  return {
    wordBreak: 'break-word',
    overflowX: 'hidden',
    fontFamily,
    fontWeight,
    ...(floatCredit ? {} : { paddingInlineStart: '1rem', }),
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
        ? [ parseComponentProp('color', color || captionColor, theme.mq, setColor, theme.color), ]
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

const creditRule = ({ theme, prefix, floatCredit, typeStyles, }) => {
  const { fontWeight, creditTypeSettings, } = theme.captionStyles.creditStyles || {};
  const typeSettings = typeStyles || creditTypeSettings;
  return {
    display: 'inline',
    flexShrink: '0',
    fontWeight,
    extend: [
      ...(floatCredit ? [ { float: 'inline-end', }, ] : []),
      // set typographic styles (line height and font-size)
      ...(typeSettings ? [ parseTypographyProp(typeSettings, theme.type), ] : []),
    ],
  };
};

// eslint-disable-next-line react/prop-types
const Credit = ({ floatCredit, children, typeStyles, }) => (
  <FelaComponent floatCredit={floatCredit} rule={creditRule} typeStyles={typeStyles} render="span">
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
  const {
    backgroundColor,
    color,
    typeStyles,
    miscStyles,
    caption,
    credit,
    floatCredit,
    creditTypeStyles,
    creditprefix,
    captionMiscStyles,
  } = props;
  return (
    <CaptionWrapper
      backgroundColor={backgroundColor}
      color={color}
      typeStyles={typeStyles}
      miscStyles={miscStyles}
    >
      <FelaComponent
        style={theme => ({
          marginEnd: '1rem',
          extend: [
            // Trump all other styles with those defined in `miscStyles`
            ...(captionMiscStyles ? parseStyleProps(captionMiscStyles, theme.mq, theme.type) : []),
          ],
        })}
        render="span"
      >
        {caption}
      </FelaComponent>
      {credit ? (
        <Credit floatCredit={floatCredit} typeStyles={creditTypeStyles}>
          {`${creditprefix}: ${credit}`}
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
  backgroundColor: PropTypes.oneOfType([ PropTypes.string, PropTypes.array, PropTypes.object, ]),
  /**
   * The color of the inner text.
   */
  color: PropTypes.oneOfType([ PropTypes.string, PropTypes.array, PropTypes.object, ]),
  /**
   * The typography of the text.
   */
  typeStyles: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, PropTypes.object, ]),
  /**
   * The typography of the credit text.
   */
  creditTypeStyles: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, PropTypes.object, ]),
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  captionMiscStyles: stylesPropType,
};

Caption.defaultProps = {
  caption: null,
  credit: null,
  creditprefix: 'קרדיט',
  floatCredit: false,
  backgroundColor: null,
  color: null,
  typeStyles: null,
  creditTypeStyles: null,
  miscStyles: null,
  captionMiscStyles: null,
};

export default Caption;
