import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, parseComponentProp, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import AdSlot from './AdSlot';

const adSlotVariants = PropTypes.oneOf([
  'primary',
  'primaryOpaque',
  'secondary',
]);

// ////////////////// //
//       STYLES       //
// /////////////////  //

const AdSlotWrapperStyle = ({ theme, wrapperMiscStyles, variant, }) => ({
  textAlign: 'center',
  marginTop: '2rem',
  marginBottom: '4rem',
  extend: [
    parseComponentProp(
      undefined,
      variant,
      theme.mq,
      setWrapperVariant,
      theme.color
    ),
    // Trump all other styles with those defined in `wrapperMiscStyles`
    ...(wrapperMiscStyles
      ? parseStyleProps(wrapperMiscStyles, theme.mq, theme.type)
      : []),
  ],
});

const TextStyle = ({ theme, titleMiscStyles, variant, }) => ({
  extend: [
    theme.type(-2),
    parseComponentProp(
      undefined,
      variant,
      theme.mq,
      setTextVariant,
      theme.color
    ),
    // Trump all other styles with those defined in `titleMiscStyles`
    ...(titleMiscStyles
      ? parseStyleProps(titleMiscStyles, theme.mq, theme.type)
      : []),
  ],
});

// ////////////////////////// //
//    Set Variant functions   //
// ////////////////////////// //
function setWrapperVariant(prop, variant, getColor) {
  const WrapperBGcolor = getColor('adSlots', `${variant}WrapperBGcolor`);
  return {
    backgroundColor: WrapperBGcolor,
  };
}
function setTextVariant(prop, variant, getColor) {
  const textColor = getColor('adSlots', `${variant}Text`);
  const textBGColor = getColor('adSlots', `${variant}TextBGcolor`);
  return {
    color: textColor,
    backgroundColor: textBGColor,
  };
}

// ////////////////////////////////// //
//    Wrapper Ad slots Component     //
// ////////////////////////////////// //
const propTypes = {
  // AdSlot Props
  id: PropTypes.string.isRequired,
  audianceTarget: PropTypes.string.isRequired,
  className: PropTypes.string,

  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  title: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  wrapperMiscStyles: stylesPropType,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  titleMiscStyles: stylesPropType,
  /** AdSlot Wrapper/Text stylistic variant */
  variant: PropTypes.oneOfType([
    adSlotVariants,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: adSlotVariants.isRequired,
      })
    ),
  ]),
};

const defaultProps = {
  className: '',
  title: '- פרסומת -', // TODO: this should be dynamic
  titleMiscStyles: null,
  wrapperMiscStyles: null,
  variant: 'primary',
};

const MarkedAdSlot = ({
  title,
  wrapperMiscStyles,
  titleMiscStyles,
  variant,
  id,
  ...adSlotProps
}) => {
  if (id.includes('inread')) {
    return (
      <React.Fragment>
        <FelaComponent
          {...{
            wrapperMiscStyles,
            variant,
          }}
          rule={AdSlotWrapperStyle}
          render="div"
        >
          <FelaComponent
            {...{
              titleMiscStyles,
              variant,
            }}
            title={title}
            rule={TextStyle}
            render={({ className, }) => (
              <span className={className}>{title}</span>
            )}
          />
          <AdSlot id={id} {...adSlotProps} />
        </FelaComponent>
      </React.Fragment>
    );
  }
  return <AdSlot id={id} {...adSlotProps} />;
};

MarkedAdSlot.propTypes = propTypes;
MarkedAdSlot.defaultProps = defaultProps;

export default MarkedAdSlot;
