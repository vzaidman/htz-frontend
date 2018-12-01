import React, { Component, Children, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import {
  parseComponentProp,
  parseStyleProps,
  autospace,
} from '@haaretz/htz-css-tools';
import debounce from 'lodash/debounce';
import checkMatchMedia from '../../utils/hasMatchMedia';
import mediaMatchesQuery from '../../utils/mediaMatchesQuery';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

// ////////////////////////////////////////////////////////////////// //
//                             PROP-TYPES                             //
// ////////////////////////////////////////////////////////////////// //
const alignOptions = PropTypes.oneOf([
  'start',
  'center',
  'end',
  'space-between',
  'space-around',
]);
const vAlignOptions = PropTypes.oneOf([
  'top',
  'center',
  'middle',
  'bottom',
  'stretch',
]);

Grid.propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /** The `<GridItem>`s rendered inside a `<Grid>` */
  children: PropTypes.node,
  /** `id` for the DOM element */
  id: PropTypes.string,
  /** The HTML tag a grid will be rendered as */
  tagName: PropTypes.string,
  /** The alignment and\or distribution of `<GridItem>`s inside the `<Grid>` */
  align: PropTypes.oneOfType([
    alignOptions,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: alignOptions.isRequired,
      })
    ),
  ]),
  /** The space between grid elements */
  gutter: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      /** Indicates the default gutter width on server render (when window size isn't available) */
      onServerRender: PropTypes.number.isRequired,
      /** An object with breakpoint definitions */
      queries: PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: PropTypes.number.isRequired,
        })
      ).isRequired,
    }),
  ]),
  /**
   * Determines if `<GridItem>`s are layed-out opposite to the
   * flow direction of the element, i.e., `rtl` in an `ltr` context
   */
  isRev: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.bool.isRequired,
      })
    ),
  ]),
  /** The spacing between rows of the grid */
  rowSpacing: PropTypes.oneOfType([
    PropTypes.shape({ amount: PropTypes.number, nUp: PropTypes.number, }),
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.shape({
          amount: PropTypes.number,
          nUp: PropTypes.number,
        }),
      })
    ),
  ]),
  /** The vertical alignment `<GridItem>` to one another */
  vAlign: PropTypes.oneOfType([
    vAlignOptions,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: vAlignOptions.isRequired,
      })
    ),
  ]),
  // A fela theme. Automatically passed by the createComponent wrapper.
  // theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

Grid.defaultProps = {
  attrs: null,
  children: null,
  id: null,
  tagName: 'div',
  align: 'start',
  gutter: null,
  isRev: false,
  rowSpacing: null,
  vAlign: 'stretch',
  miscStyles: null,
};

// ///////////////////////////////////////////////////////////////// ///
//                               STYLES                               //
// ///////////////////////////////////////////////////////////////// ///
const gridStyles = ({
  gutter,
  align,
  isRev,
  rowSpacing,
  vAlign,
  miscStyles,
  theme,
}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  // Lists can be grids
  listStyle: 'none',
  extend: [
    parseComponentProp('align', align, theme.mq, setHorizontalAlignment),
    parseComponentProp(
      'margin',
      gutter === null
        ? theme.gridStyle.gutterWidth
        : typeof gutter === 'number'
          ? gutter
          : gutter.queries,
      theme.mq,
      setMarginByGutter,
      theme.gridStyle.gutter
    ),
    parseComponentProp('direction', isRev, theme.mq, setDirection),
    ...(rowSpacing
      ? [ parseComponentProp('rowSpacing', rowSpacing, theme.mq, setRowSpacing), ]
      : []),
    parseComponentProp('vAlign', vAlign, theme.mq, setVerticalAlignment),
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

// //////////////// ///
//  Style Functions  //
// //////////////// ///
/**
 * Set the margin between rows of the grid by adding `margin-top` to
 * each grid item, except those on the first row.
 *
 * @param {*} prop - unused
 * @param {Object} rowMarginOpts
 *   The options for setting the margin between grid rows
 * @param {number} rowMarginOpts.amount
 *   The margin, in rems, between grid rows
 * @param {number} rowMarginOpts.nUp
 *   The number of items in the *first* row of the grid, which should not
 *   have `margin-top` applied to them.
 *
 * @return {Object} - A css-in-js object
 */
function setRowSpacing(prop, { amount, nUp, }) {
  return autospace(amount, nUp);
}

/**
 * Set the horizontal alignment and\or distribution of `<GridItem>`s inside the `<Grid>`
 *
 * @param {*} prop - unused
 * @param {'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'} alignment
 *   The alignment and\or distribution of `<GridItem>`s inside the `<Grid>`
 *
 * @return {Object} - A css-in-js object
 */
function setHorizontalAlignment(prop, alignment) {
  const VALUE = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    'space-between': 'space-between',
    'space-around': 'space-around',
  };

  return { justifyContent: VALUE[alignment], };
}

/**
 * Set the vertical alignment of `<GridItem>`s to one another
 *
 * @param {*} prop - unused
 * @param {'top', 'center', 'middle', 'bottom'} alignment
 *   The vertical alignment of `<GridItem>`s to one another
 *
 * @return {Object} - A css-in-js object
 */
function setVerticalAlignment(prop, alignment) {
  const VALUE = {
    bottom: 'flex-end',
    center: 'center',
    middle: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  };

  return { alignItems: VALUE[alignment], };
}

/**
 * Set negative horizontal margins on the `<Grid>` to
 * compensate for the first and last columns' gutter
 *
 * @param {*} prop - unused
 * @param {number} gutterWidth - The width of space between `<GridItem>`s
 * @param {number} defaultGutter - The fallback gutter width between `<GridItem>`s
 *
 * @return {Object} - A css-in-js object
 */
function setMarginByGutter(prop, gutterWidth, defaultGutter) {
  // eslint-disable-next-line eqeqeq
  const gutter = gutterWidth == null ? defaultGutter : gutterWidth;

  return {
    marginStart: `-${gutter / 2}rem`,
    marginEnd: `-${gutter / 2}rem`,
  };
}

/**
 * Set the direction of a `<Grid>`
 *
 * @param {*} prop - unused
 * @param {boolean} isRev
 *   Are `<GridItem>`s layed-out opposite to the flow direction
 *   of the element, i.e., `rtl` in an `ltr` context.
 *
 * @return {Object} - A css-in-js object
 */
function setDirection(prop, isRev) {
  return { flexDirection: isRev ? 'row-reverse' : 'row', };
}

let hasMatchMedia;

/* eslint-disable react/prop-types */
class GridComponent extends Component {
  instanceIsMounted = false;

  constructor(props) {
    super(props);
    this.getUpdatedGutter = debounce(this.getUpdatedGutter.bind(this), 150);
  }

  state = {
    gutter: getInitialGutter(
      this.props.gutter,
      this.props.theme.gridStyle.gutterWidth
    ),
  };

  componentDidMount() {
    const gutterIsResponsive = typeof this.props.gutter === 'object';

    if (typeof hasMatchMedia === 'undefined') {
      hasMatchMedia = checkMatchMedia();
    }

    if (gutterIsResponsive && hasMatchMedia) {
      this.getUpdatedGutter();
      if (!this.instanceIsMounted) {
        // eslint-disable-next-line no-undef
        window.addEventListener('resize', this.getUpdatedGutter);
      }
    }
    this.instanceIsMounted = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.gutter !== nextState.gutter || this.props !== nextProps;
  }

  componentWillUnmount() {
    const gutterIsResponsive = typeof this.props.gutter === 'object';
    if (gutterIsResponsive && hasMatchMedia) {
      // eslint-disable-next-line no-undef
      window.removeEventListener('resize', this.getUpdatedGutter);
    }
    this.instanceIsMounted = false;
  }

  getUpdatedGutter = () => {
    const gutter = this.props.gutter === null
      ? this.props.theme.gridStyle.gutterWidth
      : this.props.gutter;
    const gutterIsResponsive = typeof gutter === 'object';
    const defaultValue = gutterIsResponsive ? gutter.onServerRender : gutter;

    if (
      // When not responsive
      !gutterIsResponsive
      // When matchMedia doesn't exist
      || !hasMatchMedia
    ) {
      if (this.state.gutter !== defaultValue) {
        this.setState({
          gutter: defaultValue,
        });
      }
    }
    else {
      // When responsive and matchMedia exists
      this.setState((prevState, props) => ({
        gutter: mediaMatchesQuery(props.theme.bps, gutter),
      }));
      hasMatchMedia = true;
    }
  };

  render() {
    const { attrs, children, className, id, tagName, } = this.props;
    const GridElement = tagName;
    return (
      <GridElement className={className} id={id} {...attrs}>
        {/* Pass down `gutter` to children */}
        {Children.map(
          children,
          (child, index) => (React.isValidElement(child)
            ? React.cloneElement(child, {
              gutter: this.state.gutter,
            })
            : child)
        )}
      </GridElement>
    );
  }
}

export default function Grid({ children, ...props }) {
  return (
    <FelaComponent
      {...props}
      rule={gridStyles}
      render={({ className, theme, }) => {
        const { attrs, gutter, id, tagName, } = props;
        return (
          <GridComponent
            attrs={attrs}
            className={className}
            gutter={gutter}
            id={id}
            tagName={tagName}
            theme={theme}
          >
            {children}
          </GridComponent>
        );
      }}
    />
  );
}

function getInitialGutter(gutter, defaultGutter) {
  return gutter === null
    ? defaultGutter
    : typeof gutter === 'number'
      ? gutter
      : gutter.onServerRender;
}
