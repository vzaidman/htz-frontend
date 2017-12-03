import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';

const iconStyle = ({ color, fill, size, miscStyles, theme, }) => ({
  // A decent default for aligning icons away from the
  // baseline of the surrounding them. Can and should be tweaked
  // per use-case through the `miscStyles` prop on the component.
  verticalAlign: '-0.15em',
  extend: [
    // Set the `color` attribute, which applies to elements with
    // a `fill="currentColor"` attribute
    color
      ? parseComponentProp('color', color, theme.mq, setColor, theme.color)
      : { color: 'inherit', },

    // Set the `fill` attribute, which applies to elements without
    // a `fill` attribute.
    ...(fill
      ? [ parseComponentProp('fill', fill, theme.mq, setColor, theme.color), ]
      : [ { fill: theme.color('white'), }, ]),

    // Set the width and height of an icon. The svgs' "height" attribute is
    // set to 1em, and the "width" is set in ems based on the icon's aspect ratio.
    // "size" will set the "fontSize" of the icon to a number of vertical-rhythm units
    // and by so adjusting width and height in a manner that keeps the icon's aspect ratio.
    ...(size ? [ parseComponentProp(undefined, size, theme.mq, setSize), ] : []),

    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

function setColor(prop, value, getColor) {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
}

function setSize(prop, value) {
  return typeof value === 'number'
    ? { fontSize: `${value}rem`, }
    : (() => {
      throw new Error(
        `An Icon's "size" prop may only be passed a "number", which will be set in "rem" units. you passed "${
          value
        }".`
      );
    })();
}

export default iconStyle;
