/* @flow */
/**
 * The side(s) of an element a border will be applied to.
 */
export type BorderProperty =
  | "borderTopWidth"
  | "borderRightWidth"
  | "borderBottomWidth"
  | "borderLeftWidth"
  | "borderInlineStartWidth"
  | "borderInlineEndWidth"
  | "borderTopStyle"
  | "borderRightStyle"
  | "borderBottomStyle"
  | "borderLeftStyle"
  | "borderInlineStartStyle"
  | "borderInlineEndStyle"
  | "borderTopColor"
  | "borderRightColor"
  | "borderBottomColor"
  | "borderLeftColor"
  | "borderInlineStartColor"
  | "borderInlineEndColor";

/** value of `side` argument of `setBorder()` */
export type BorderSide =
  | "all"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "inlineStart"
  | "inlineEnd"
  | "start"
  | "end"
  | "horizontal"
  | "vertical";

/** `border-style` value */
export type BorderStyle =
  | "none"
  | "hidden"
  | "dotted"
  | "dashed"
  | "solid"
  | "double"
  | "grove"
  | "ridge"
  | "inset"
  | "outset";

/**
 * Configuration object for border functions
 * @prop {number|string} width - The width of the border.<ul>
 *   <li>`number` values will be interpreted as being in pixels</li>
 *   <li>`string` values will be used as is</li></ul>
 * @prop {number} [lines] - The number of vertical rhythm lines the border +
 *   additional padding should occupy. Only relevant (and mandatory) with borders
 *   on the vertical plane.<br />
 *   Setting `lines` to `0`, will make the element relatively positioned, and
 *   create a pseudo element in the height specified in `width`, stuck to the
 *   relevant endge(s)
 * @prop {string} [style] - The border-style
 * @prop {string} [color] - The border-color<br /><br />
 */
export type BorderOptions = {
  width: number | string,
  lines?: number,
  style?: BorderStyle,
  color?: string
};

/** A css-in-js object of border-related styles */
export type BorderRuleset = {
  [borderSideProp: BorderProperty]: string,
  paddingBottom?: string,
  paddingTop?: string,
  position?: "relative",

  "&::after"?: {
    bottom?: 0,
    content: "",
    height: number,
    position: "absolute",
    top?: 0,
    width: "100%"
  }
};
