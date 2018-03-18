import React from 'react';
import PropTypes from 'prop-types';
// import { createComponent, } from 'react-fela';
import { FelaComponent, } from 'react-fela';
import {
  borderBottom,
  borderTop,
  parseComponentProp,
  parseStyleProps,
  parseTypographyProp,
} from '@haaretz/htz-css-tools';
import Link from '../Link/Link';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { buttonBoxModelType, } from './buttonBoxModelType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

// ////////////////////////////////////////////////////////////////// //
//                             PROP-TYPES                             //
// ////////////////////////////////////////////////////////////////// //
const btnVariants = PropTypes.oneOf([
  'primary',
  'primaryOpaque',
  'neutral',
  'neutralOpaque',
  'negative',
  'negativeOpaque',
  'positive',
  'positiveOpaque',
  'facebook',
  'facebookOpaque',
  'twitter',
  'twitterOpaque',
  'sales',
  'salesOpaque',
  'whatsapp',
  'whatsappOpaque',
  'formattingOpaque',
]);

/**
 * Properties of a `<StyledButton />`
 */
Button.propTypes = {
  // Underlying component props //
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * Nodes rendered inside `Button`.
   * Passed to the underlying react element
   */
  children: PropTypes.node,
  /**
   * A url to be assigned to the DOM element, converts the button to an `'<a>'`
   * DOM element inside a Next JS `<Link />`
   */
  href: PropTypes.string,
  /**
   * A value for the `button`s `id` attribute.
   * Passed to the underlying react element
   */
  id: PropTypes.string,
  /**
   * Indicates if a button is currently amid an operation (e.g., loading, posting, etc.).
   * Passed to the underlying react element
   */
  isBusy: PropTypes.bool,
  /**
   * Indicates if a button is currently disabled.
   * Passed to the underlying react element
   */
  isDisabled: PropTypes.bool,
  /**
   * Indicates if a button is a `reset` button.
   * Passed to the underlying react element
   */
  isReset: PropTypes.bool,
  /**
   * Indicates if a button is a `submit` button.
   * Passed to the underlying react element
   */
  isSubmit: PropTypes.bool,
  /**
   * A callback that get called when the user clicks on the button.
   * Passed to the underlying react element
   *
   * @param {SyntheticEvent} event -
   *   The react [`SyntheticEvent`](https://reactjs.org/docs/events.html) that initiated
   *   the callback
   * @param {Object} allProps - All the properties of this `Button`
   */
  onClick: PropTypes.func,
  /** Indicates if a link should be perfetched (only relevant when `href` prop is defined) */
  prefetch: PropTypes.bool,
  /** The HTML tag to render the `<Button />` as */
  tagName: PropTypes.string,

  // Styling props //
  /**
   * Either an object of vertical and horizontal padding inside the button,
   * and its placement within a `<ButtonGroup>`, when relevant, or an array
   * of responsive options objects, with the above object as its value property.
   */
  boxModel: PropTypes.oneOfType([
    buttonBoxModelType,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: buttonBoxModelType,
      })
    ),
  ]),
  /**
   * Set the button's font-size based on the pre-defined
   * typographic scale.
   */
  fontSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.number.isRequired,
      })
    ),
  ]),
  /**
   * When inside a `<ButtonGroup>` component, indicates the stacking
   * order of the `<Buttons>` inside the group. The parent `<ButtonGroup>`
   * component will automatically augment its children with this prop,
   * is should never be set directly by the component itself.
   */
  isColumn: PropTypes.bool,
  /** Is the button flat (trumps theme border-color to 'transparent') */
  isFlat: PropTypes.bool,
  /** Does the Button fill the entire width of its container */
  isFull: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.bool.isRequired,
      })
    ),
  ]),
  /** Is the button hard edged (trumps theme border-radius settings with `0`) */
  isHard: PropTypes.bool,
  /** Is the button round (trumps theme border-radius settings with `50%`) */
  isRound: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /** A button's stylistic variant */
  variant: PropTypes.oneOfType([
    btnVariants,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: btnVariants.isRequired,
      })
    ),
  ]),
};

/** The default values of a `<StyledButton>`'s props */
Button.defaultProps = {
  attrs: null,
  children: null,
  href: null,
  id: null,
  isBusy: false,
  isDisabled: false,
  isSubmit: false,
  isReset: false,
  onClick: null,
  prefetch: false,
  tagName: 'button',
  boxModel: null,
  fontSize: null,
  isColumn: null,
  isFlat: false,
  isFull: false,
  isHard: false,
  isRound: false,
  miscStyles: null,
  variant: 'primary',
};

// ////////////////////////////////////////////////////////////////// //
//                               STYLES                               //
// ////////////////////////////////////////////////////////////////// //
const buttonStyles = ({
  boxModel,
  fontSize,
  isBusy,
  isColumn,
  isDisabled,
  isFlat,
  isFull,
  isHard,
  isRound,
  miscStyles,
  variant,
  theme,
  ...props
}) => ({
  alignItems: 'center',
  appearance: 'none',
  cursor: isDisabled || isBusy ? 'not-allowed' : 'pointer',
  display: 'inline-flex',
  ...(theme.btnStyle.fontWeight
    ? { fontWeight: theme.btnStyle.fontWeight, }
    : undefined),
  fontSize: 'inherit',
  justifyContent: 'center',
  ...(isDisabled ? { opacity: 0.4, } : undefined),
  // Allows for positioning the busy slider.
  position: 'relative',
  transform: isBusy ? 'scale(0.8, 0.4)' : 'scale(1)',
  transition: `${theme.getTransitionString(
    'all',
    -1,
    'swiftIn'
  )}, ${theme.getTransitionString(
    'transform',
    1,
    'swiftOut',
    1
  )}, ${theme.getTransitionString(
    'backgroundColor',
    0,
    'swiftIn',
    isBusy ? 0 : undefined
  )}`,
  textDecoration: 'none',
  // `<a>` elements may not have a `disabled` attribute, so we
  // mimic its behavior to the extent possible.
  ...(isDisabled || isBusy
    ? {
      pointerEvents: 'none',
      userSelect: 'none',
    }
    : []),
  whiteSpace: 'nowrap',

  '::moz-focus-inner': {
    border: 0,
    padding: 0,
  },

  ':hover': {
    textDecoration: 'none',
    transition: `${theme.getTransitionString(
      'all',
      -1,
      'swiftOut'
    )}, ${theme.getTransitionString(
      'transform',
      1,
      'swiftOut',
      1
    )}, ${theme.getTransitionString(
      'backgroundColor',
      0,
      'swiftOut',
      isBusy ? 0 : undefined
    )}`,
  },
  ':focus': {
    outline: 'none',
    textDecoration: 'none',
    transition: `${theme.getTransitionString(
      'all',
      -1,
      'swiftOut'
    )}, ${theme.getTransitionString(
      'transform',
      1,
      'swiftOut',
      1
    )}, ${theme.getTransitionString(
      'backgroundColor',
      0,
      'swiftOut',
      isBusy ? 0 : undefined
    )}`,
  },
  ':active': {
    outline: 'none',
    textDecoration: 'none',
    transitionDuration: '0s',
  },

  extend: [
    // Set borders (including radius) and padding
    parseComponentProp(
      undefined,
      boxModel || theme.btnStyle.boxModel,
      theme.mq,
      setBoxModel,
      isColumn,
      isHard,
      isRound,
      theme.btnStyle
    ),

    // Set font-size
    // eslint-disable-next-line eqeqeq
    ...(fontSize != undefined
      ? [ parseTypographyProp(fontSize, theme.type), ]
      : []),
    // Set width and display
    parseComponentProp(undefined, isFull, theme.mq, full),
    parseComponentProp(
      undefined,
      variant,
      theme.mq,
      setVariant,
      theme.color,
      isFlat,
      isBusy
    ),
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const contentRule = ({ theme, isBusy, }) => ({
  opacity: isBusy ? '0' : '1',
  transitionProperty: 'opacity',
  ...theme.getTransition(-1, 'swiftOut', isBusy ? undefined : 1),
});

const progressRule = ({ theme, isBusy, }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  height: '100%',
  inlineInsetStart: '0',
  position: 'absolute',
  top: '0',
  transform: 'scaleX(0)',
  transformOrigin: 'logical start',
  width: '100%',

  // Animation
  animationDirection: 'alternate',
  animationIterationCount: 'infinite',
  ...theme.getDuration('animation', 4),
  ...theme.getDelay('animation', 3),
  ...theme.getTimingFunction('animation', 'swiftOut'),
  ...(isBusy
    ? {
      animationName: {
        '0%': { transform: 'scaleX(0)', },
        '100%': { transform: 'scaleX(1)', },
      },
    }
    : []),
});

// ////////////////////////// //
//  Styling helper functions  //
// ////////////////////////// //
function setVariant(prop, variant, getColor, isFlat, isBusy) {
  return {
    backgroundColor: getColor('button', `${variant}${isBusy ? 'Focus' : ''}Bg`),
    borderColor: isFlat
      ? 'transparent'
      : getColor('button', `${variant}Border`),
    color: getColor('button', `${variant}Text`),
    ':hover': {
      backgroundColor: getColor('button', `${variant}HoverBg`),
      borderColor: isFlat
        ? 'transparent'
        : getColor('button', `${variant}HoverBorder`),
      color: getColor('button', `${variant}HoverText`),
    },
    ':active': {
      backgroundColor: getColor('button', `${variant}ActiveBg`),
      borderColor: isFlat
        ? 'transparent'
        : getColor('button', `${variant}ActiveBorder`),
      color: getColor('button', `${variant}ActiveText`),
    },
    ':focus': {
      backgroundColor: getColor('button', `${variant}FocusBg`),
      borderColor: isFlat
        ? 'transparent'
        : getColor('button', `${variant}FocusBorder`),
      color: getColor('button', `${variant}FocusText`),
    },
  };
}

function full(prop, isFull) {
  return typeof isFull === 'undefined' || !isFull
    ? { display: 'inline-flex', }
    : {
      display: 'flex',
      width: '100%',
    };
}

function setBoxModel(prop, boxModel, isColumn, isHard, isRound, btnStyle) {
  if (isHard && isRound) {
    throw new Error(
      'A "<Button>" cannot be "hard" and "round" at the same time'
    );
  }

  const { groupPlacement, hp, vp, } = boxModel;
  // eslint-disble-next-line eqeqeq
  const horizontalPadding = hp != null ? hp : btnStyle.boxModel.hp;
  // eslint-disble-next-line eqeqeq
  const verticalPadding = vp != null ? vp : btnStyle.boxModel.vp;
  const ret = {
    ...setBorder(
      btnStyle,
      isColumn,
      groupPlacement,
      horizontalPadding,
      verticalPadding
    ),
    ...radiusRules(btnStyle.radius, isColumn, groupPlacement, isHard, isRound),
  };

  return ret;
}

function setBorder(values, isColumn, groupPlacement, hp, vp) {
  return {
    // Make button full width if it's inside a column button-group.
    ...(isColumn ? full(undefined, true) : undefined),
    ...(sideHasBorder('bottom', isColumn, groupPlacement)
      ? borderBottom(values.borderBottomWidth, vp, values.borderBottomStyle)
      : {
        borderBottom: '0',
        paddingBottom: `${vp}rem`,
      }),
    ...(sideHasBorder('top', isColumn, groupPlacement)
      ? borderTop(values.borderTopWidth, vp, values.borderTopStyle)
      : {
        borderTop: '0',
        paddingTop: `${vp}rem`,
      }),
    borderStartWidth: sideHasBorder('start', isColumn, groupPlacement)
      ? `${values.borderEndWidth}px`
      : '0',
    borderStartStyle: values.borderStartStyle,
    paddingStart: `${hp}rem`,
    borderEndWidth: sideHasBorder('end', isColumn, groupPlacement)
      ? `${values.borderEndWidth}px`
      : '0',
    borderEndStyle: values.borderEndStyle,
    paddingEnd: `${hp}rem`,
  };
}

function sideHasBorder(side, isColumn, groupPlacement) {
  if (groupPlacement) {
    if (
      (isColumn && groupPlacement === 'start' && side === 'bottom') ||
      (isColumn && groupPlacement === 'end' && side === 'top') ||
      (!isColumn && groupPlacement === 'start' && side === 'end') ||
      (!isColumn && groupPlacement === 'middle' && side === 'end')
    ) {
      return false;
    }
  }
  return true;
}

function radiusRules(value, isColumn, groupPlacement, isHard, isRound) {
  const radius = isHard ? '0' : isRound ? '50%' : value;

  if (!groupPlacement) return { borderRadius: radius, };

  const isFirst = groupPlacement === 'start';
  const isLast = groupPlacement === 'end';

  return isFirst
    ? {
      borderTopStartRadius: radius,
      borderTopEndRadius: isColumn ? radius : '0',
      borderBottomStartRadius: isColumn ? '0' : radius,
      borderBottomEndRadius: '0',
    }
    : isLast
      ? {
        borderTopStartRadius: '0',
        borderTopEndRadius: isColumn ? '0' : radius,
        borderBottomStartRadius: isColumn ? radius : '0',
        borderBottomEndRadius: radius,
      }
      : 0;
}

// ////////////////////////////////////////////////////////////////// //
//                             COMPONENTS                             //
// ////////////////////////////////////////////////////////////////// //
/* eslint-disable react/prop-types */
const ButtonWrapper = ({
  attrs,
  children,
  className,
  href,
  id,
  isBusy,
  isDisabled,
  isReset,
  isSubmit,
  onClick,
  prefetch,
  WrapperElement,
}) =>
  (href ? (
    <Link href={href} prefetch={prefetch}>
      <a
        id={id || null}
        {...attrs}
        className={className}
        {...(isDisabled || isBusy ? { disabled: true, tabIndex: '-1', } : {})}
        {...(onClick ? { onClick, } : {})}
      >
        <React.Fragment>{children}</React.Fragment>
      </a>
    </Link>
  ) : (
    <WrapperElement
      id={id || null}
      className={className}
      {...attrs}
      {...(isDisabled || isBusy ? { disabled: true, tabIndex: '-1', } : {})}
      {...(onClick ? { onClick, } : {})}
      type={isSubmit ? 'submit' : isReset ? 'reset' : 'button'}
    >
      {children}
    </WrapperElement>
  ));
/* eslint-enable react/prop-types */

/* A generic, stylable button component */
export default function Button({
  attrs,
  children,
  href,
  id,
  isBusy,
  isDisabled,
  isReset,
  isSubmit,
  onClick,
  prefetch,
  tagName,
  boxModel,
  fontSize,
  isColumn,
  isFlat,
  isFull,
  isHard,
  isRound,
  miscStyles,
  variant,
}) {
  const WrapperElement = tagName;

  return (
    <FelaComponent
      {...{
        boxModel,
        fontSize,
        isBusy,
        isColumn,
        isDisabled,
        isFlat,
        isFull,
        isHard,
        isRound,
        miscStyles,
        variant,
      }}
      rule={buttonStyles}
      render={({ className, theme, }) => (
        <ButtonWrapper
          {...{
            attrs,
            className,
            href,
            id,
            isBusy,
            isDisabled,
            isReset,
            isSubmit,
            onClick,
            prefetch,
            WrapperElement,
          }}
        >
          <React.Fragment>
            <FelaComponent isBusy={isBusy} rule={contentRule} render="span">
              {children}
            </FelaComponent>
            <FelaComponent isBusy={isBusy} rule={progressRule} render="span" />
          </React.Fragment>
        </ButtonWrapper>
      )}
    />
  );
}
