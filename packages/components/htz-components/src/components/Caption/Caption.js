import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';

const setColor = (prop, value, getColor) => {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
};

const captionWrapper = ({
  theme,
  bgc,
  color,
  typeStyles, // Not responsive. can only take "number"
  miscStyles,
}) => {
  let {
    backgroundColor,
    captionColor,
    captionTypeSettings,
    fontFamily,
    fontWeight,
  } = theme.captionStyles || {};
  backgroundColor = bgc || backgroundColor;
  captionColor = color || captionColor;
  captionTypeSettings = typeStyles || captionTypeSettings;

  return {
    fontFamily,
    fontWeight,
    // TODO: add clearfix

    extend: [
      // Set background color
      ...(backgroundColor ? [ parseComponentProp('backgroundColor', backgroundColor, theme.mq, setColor, theme.color) ] : []),
      // Set color
      ...(captionColor ? [ parseComponentProp('color', captionColor, theme.mq, setColor, theme.color) ] : []),
      // set typographic styles (line height and font-size)
      ...(captionTypeSettings ? [ setType(captionTypeSettings, theme.type) ] : []),

      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ]

  };
};

const typographyValueType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.shape({
    step: PropTypes.number,
    lines: PropTypes.number,
  }),
]);

const typpographyPropTypes = {
  typeStyles: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      ...responsivePropBaseType,
      value: typographyValueType,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: typographyValueType,
      })
    ),
  ]),
};

/**
 * Set typographic settings responsively
 * @param {number|Object|Object[]} sizes
 * @param {function} typesetter
 *
 * @returns {Object} A CSS-in-JS object with typographic definitions
 */
function setType(sizes, typesetter) {
  const sizesArray = Array.isArray(sizes) ? sizes : [sizes];

  return sizesArray.reduce(
    (styles, size) => ({
      ...styles,
      ...setTypeStyles(size, typesetter),
    })
    ,
    {}
  );
}

function setTypeStyles(size, typesetter) {
  const sizeIsNumber = Number.isFinite(size);
  if (!sizeIsNumber && !isTypographyObject(size)) return {};

  const value = sizeIsNumber
    ? size
    : size.value.step || sizeValue.value;
  const lines = (size.value && size.value.lines) ? size.value.lines : undefined;
  const fromBp = size.from || undefined;
  const untilBp = size.until || undefined;

  return typesetter(
    value,
    {
      lines,
      fromBp,
      untilBp,
    }
  );
}

function isTypographyObject(typeSettings) {
  const { value, } = (typeSettings || {});

  return value
    ? typeof typeSettings.value === 'number' || typeof typeSettings.value.step === 'number'
    : false;
}

const CaptionWrapper = createComponent(captionWrapper, 'div', props => Object.keys(props));

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

const Credit = createComponent(credit, 'span', props => Object.keys(props));

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
        <Credit
          prefix={props.creditprefix}
          floatCredit={props.floatCredit}
        >{props.credit}</Credit>
      ) : ''}
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
  background: PropTypes.oneOfType([
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
};

Caption.defaultProps = {
  caption: null,
  credit: null,
  creditprefix: 'קרדיט',
  floatCredit: false,
  background: null,
  color: null,
};

export default Caption;
