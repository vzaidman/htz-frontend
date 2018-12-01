// @flow
/* eslint-disable react/default-props-match-prop-types */
import { FelaComponent, } from 'react-fela';
import * as React from 'react';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';

import type { Node, ElementType, } from 'react';
import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';

import ButtonCore from '../Button/ButtonCore';
import Ripple from '../Animations/Ripple';

import type { attrFlowType, } from '../../flowTypes/attrTypes';

const { Component, } = React;

// ////////////////////////////////////////////////////////////////// //
//                               Types                                //
// ////////////////////////////////////////////////////////////////// //

type ClickAreaState = {
  isActive: boolean,
};

type SizeType = number | ComponentPropResponsiveObject<number>[];
type RippleColorType =
  | string
  | [string, ]
  | [string, string, ]
  | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[];
type ClickAreaProps = {
  /**
   * attributes to be passed to the DOM element
   */
  attrs: attrFlowType,
  /**
   * Nodes rendered inside `Button`.
   * Passed to the underlying react element
   */
  children: Node,
  /**
   * A url to be assigned to the DOM element, converts the button to an `'<a>'`
   * DOM element inside a Wrapped Next JS `<HtzLink />`
   */
  href:
    | Node
    | string
    | {
        pathname: string,
        asPath: string,
      },
  asPath: string,
  /**
   * A value for the `button`s `id` attribute.
   * Passed to the underlying react element
   */
  id: string,
  /**
   * Indicates if a button is currently disabled.
   * Passed to the underlying react element
   */
  isDisabled: boolean,
  /**
   * Indicates if a button is a `reset` button.
   * Passed to the underlying react element
   */
  isReset: boolean,
  /**
   * Indicates if a button is a `submit` button.
   * Passed to the underlying react element
   */
  isSubmit: boolean,
  /**
   * A callback that get called when the user clicks on the button.
   * Passed to the underlying react element
   *
   * @param {SyntheticEvent} event -
   *   The react [`SyntheticEvent`](https://reactjs.org/docs/events.html) that initiated
   *   the callback
   */
  onClick: (event: SyntheticEvent<HTMLElement>) => void, // eslint-disable-line no-undef
  /** Indicates if a link should be perfetched (only relevant when `href` prop is defined) */
  prefetch: boolean,
  /** The HTML tag to render the `<Button />` as */
  tagName: ElementType,
  /**
   * The minimal height and width of the ClickArea element
   * Can be:
   *   - a number, representing basic spacing units
   *   - an array of Objects repersenting media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: number, // as mentioned above
   *     }
   *     ```
   */
  size: SizeType,
  /**
   * The color of the focus indicator.
   * Can be:
   *   - A `string` representing a named color.
   *   - A `tuple` of two `string`s, the first representing
   *     a named color, and the second representing a variant
   *     of that named color.
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: string or tuple, as mentioned above,
   *     }
   *     ```
   */
  rippleColor: ?RippleColorType,
  miscStyles: StyleProps,
};

class ClickAreaInner extends Component<any, ClickAreaState> {
  static defaultProps = {
    attrs: null,
    children: null,
    href: null,
    asPath: null,
    id: null,
    isDisabled: false,
    isSubmit: false,
    isReset: false,
    onClick: null,
    prefetch: false,
    tagName: null,
    buttonRef: null,

    rippleColor: [ 'primary', 'base', ],
    miscStyles: null,
  };

  state = {
    isActive: false,
  };

  ripple = React.createRef();

  componentDidMount() {
    if (this.ripple.current) {
      this.ripple.current.addEventListener('animationend', this.deactivate);
    }
  }

  componentWillUnmount() {
    if (this.ripple.current) {
      this.ripple.current.addEventListener('animationend', this.deactivate);
    }
  }

  deactivate = () => this.setState(() => ({ isActive: false, }));

  handleFocus = (evt: SyntheticEvent<*>) => {
    const onFocus = (this.props.attrs || {}).onFocus;
    this.setState(() => ({ isActive: true, }));
    if (typeof onFocus === 'function') onFocus(evt);
  };

  handleBlur = (evt: SyntheticEvent<*>) => {
    const onBlur = (this.props.attrs || {}).onBlur;
    this.deactivate();
    if (typeof onBlur === 'function') onBlur(evt);
  };

  render() {
    const {
      rippleColor,
      size,
      miscStyles,
      children,
      attrs,
      isDisabled,
      buttonRef,
      ...props
    } = this.props;

    const mergedAttrs = {
      ...(attrs || {}),
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseUp: this.handleFocus,
      onMouseDown: this.handleBlur,
    };

    return (
      <FelaComponent
        size={size}
        isDisabled={isDisabled}
        miscStyles={miscStyles}
        rule={clickAreaStyle}
        render={({ className, theme, }) => (
          <ButtonCore
            ref={buttonRef}
            className={className}
            isDisabled={isDisabled}
            attrs={mergedAttrs}
            {...props}
          >
            {children}
            <FelaComponent style={{ fontSize: size / 2, }} render="span">
              <Ripple
                time={1}
                isActive={this.state.isActive}
                bgNamedColor={rippleColor}
                ref={this.ripple}
              />
            </FelaComponent>
          </ButtonCore>
        )}
      />
    );
  }
}

/* eslint-disable */
// TODO: remove when https://github.com/facebook/flow/pull/6510 is fixed
// $FlowFixMe
export default React.forwardRef(function ClickArea(props: ClickAreaProps, ref) {
  return <ClickAreaInner {...props} buttonRef={ref} />;
});
/* eslint-enable */

// ////////////////////////////////////////////////////////////////// //
//                               Style                                //
// ////////////////////////////////////////////////////////////////// //

type ClickAreaStyleOptions = {
  theme: Object,
  isDisabled: boolean,
  rippleColor: ?RippleColorType,
  size: SizeType,
  miscStyles?: ?StyleProps,
};

function clickAreaStyle({
  theme,
  rippleColor,
  size,
  isDisabled,
  miscStyles,
}: ClickAreaStyleOptions): Object {
  return {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    ...(isDisabled ? { opacity: 0.4, } : undefined),
    // `<a>` elements may not have a `disabled` attribute, so we
    // mimic its behavior to the extent possible.
    ...(isDisabled
      ? {
        pointerEvents: 'none',
        userSelect: 'none',
      }
      : {}),
    '::moz-focus-inner': {
      border: 0,
      padding: 0,
    },
    '&:hover': {
      textDecoration: 'none',
    },
    '&:active': {
      textDecoration: 'none',
      outline: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
      outline: 'none',
    },
    extend: [
      // Set the minimum width and height on the click area
      ...(size
        ? [
          // eslint-disable-next-line space-infix-ops, no-mixed-operators
          parseComponentProp<SizeType>('size', size, theme.mq, setSize),
        ]
        : []),
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}

// ////////////////// //
//  helper functions  //
// ////////////////// //

function setSize(
  prop: string,
  value: number
): { minHeight: string, minWidth: string, } {
  if (typeof value === 'number') {
    return {
      minHeight: `${value}rem`,
      minWidth: `${value}rem`,
    };
  }

  throw new Error(
    `An <ClickArea />'s "size" prop may only be passed a "number", which will be set in "rem" units. you passed "${value}".`
  );
}
