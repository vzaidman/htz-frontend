import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import {
  parseComponentProp,
  parseStyleProps,
  parseTypographyProp,
} from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const setColor = (prop, value, getColor) => {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
};

const captionWrapper = ({
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

const CaptionWrapper = createComponent(captionWrapper);

const credit = ({ theme, prefix, floatCredit, }) => {
  const { fontWeight, } = theme.captionStyles.creditStyles || {};
  return {
    fontWeight,
    ':before': {
      content: `'${prefix}: '`,
    },
    extend: [
      ...(floatCredit ? [ { float: 'inline-end', }, ] : [ { marginRight: '1rem', }, ]),
    ],
  };
};

const Credit = createComponent(credit, 'span');

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
      {props.caption}
      {props.credit ? (
        <Credit prefix={props.creditprefix} floatCredit={props.floatCredit}>
          {props.credit}
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
