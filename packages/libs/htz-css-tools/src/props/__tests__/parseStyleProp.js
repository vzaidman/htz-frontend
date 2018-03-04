import parseStyleProp from '../parseStyleProp';
import createMqFunc from '../../mq/mq';
import createTypesetter from '../../typography/createTypesetter';

const bps = {
  widths: {
    s: 600,
    m: 768,
    l: 1024,
    xl: 1280,
  },
  misc: {
    landscape: '(orientation: landscape)',
    partrait: '(orientation: portrait)',
    hidpi: '(min-resolution: 1.5dppx)',
  },
};

const typeConf = {
  default: {
    base: 16,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 6,
    steps: 5,
  },
  xl: {
    base: 18,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 7,
    steps: 5,
  },
};

const mqFunc = createMqFunc(bps);
const typesetter = createTypesetter(mqFunc, typeConf, bps.widths);

describe('parseStyleProp()', () => {
  describe('Non-responsive', () => {
    testCase('return correct simple css values', 'borderRadius', '5px', {
      borderRadius: '5px',
    });
    testCase('return correct typographic values', 'type', 0, {
      '@media (max-width: 79.9375em)': {
        fontSize: '2.6666666666666665rem',
        lineHeight: '1.5em',
      },
      '@media (min-width: 80em)': {
        fontSize: '2.5714285714285716rem',
        lineHeight: '1.5555555555555556em',
      },
    });
    testCase(
      'return correct border values (all sides)',
      'border',
      [ 1, 1, 'solid', 'red', ],
      {
        borderTopWidth: '1px',
        borderInlineEndWidth: '1px',
        borderBottomWidth: '1px',
        borderInlineStartWidth: '1px',
        borderTopColor: 'red',
        borderInlineEndColor: 'red',
        borderBottomColor: 'red',
        borderInlineStartColor: 'red',
        borderTopStyle: 'solid',
        borderInlineEndStyle: 'solid',
        borderBottomStyle: 'solid',
        borderInlineStartStyle: 'solid',
        paddingBottom: 'calc(1rem - 1px)',
        paddingTop: 'calc(1rem - 1px)',
      }
    );
    testCase(
      'return correct border values (single side)',
      'borderStart',
      [ 1, 1, 'solid', 'red', ],
      {
        borderInlineStartWidth: '1px',
        borderInlineStartColor: 'red',
        borderInlineStartStyle: 'solid',
      }
    );
    testCase(
      'ignore invalid border values',
      'border',
      '1px solid red',
      undefined
    );
    testCase(
      'ignore invalid border directions',
      'borderEast',
      [ 1, 1, 'solid', 'red', ],
      undefined
    );
    testCase('return autospace styles', 'autospace', 2, {
      '> * + *': { marginTop: '2rem', },
    });
    testCase(
      'return autospace styles for multi-col layouts',
      'autospace',
      [ 2, 3, ],
      {
        '> * + *:nth-child(n+4)': { marginTop: '2rem', },
      }
    );
    testCase('return visually-hidden styles', 'visuallyHidden', 'hidden', {
      border: '0',
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
    });
    testCase(
      'return visually-hidden styles (focusable)',
      'visuallyHidden',
      'focusable',
      {
        border: '0',
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: '1px',
        ':focus': {
          clip: 'auto',
          clipPath: 'none',
          height: 'auto',
          margin: '0',
          overflow: 'visible',
          position: 'static',
          whiteSpace: 'inherit',
          width: 'auto',
        },
        ':active': {
          clip: 'auto',
          clipPath: 'none',
          height: 'auto',
          margin: '0',
          overflow: 'visible',
          position: 'static',
          whiteSpace: 'inherit',
          width: 'auto',
        },
      }
    );
    describe('Fallback values', () => {
      testCase(
        'return correct prop with array of fallback values',
        'fontSize',
        [ '6px', '1rem', ],
        {
          fontSize: [ '6px', '1rem', ],
        }
      );
    });
    describe('Pseudo elements and selectors', () => {
      testCase(
        'return correct style object when "prop" is a pseudo element',
        ':before',
        { fontSize: '16px', },
        {
          ':before': { fontSize: '16px', },
        }
      );
      testCase(
        'return correct style object when "prop" is a pseudo selector',
        ':hover',
        { color: 'red', },
        {
          ':hover': { color: 'red', },
        }
      );
    });
  });

  describe('Responsive', () => {
    testCase(
      'Return correct style object with "min-width" media query',
      'color',
      [
        {
          from: 's',
          value: 'red',
        },
      ],
      {
        '@media (min-width: 37.5em)': { color: 'red', },
      }
    );
    testCase(
      'Return correct style object with "max-width" media query',
      'color',
      [
        {
          until: 's',
          value: 'red',
        },
      ],
      {
        '@media (max-width: 37.4375em)': { color: 'red', },
      }
    );
    testCase(
      'Return correct style object with "min" and "max-width" media query',
      'color',
      [
        {
          from: 's',
          until: 'm',
          value: 'red',
        },
      ],
      {
        '@media (min-width: 37.5em) and (max-width: 47.9375em)': {
          color: 'red',
        },
      }
    );
    testCase(
      'Return correct style object with all media query features',
      'color',
      [
        {
          from: 's',
          until: 'm',
          misc: 'landscape',
          type: 'print',
          value: 'red',
        },
      ],
      {
        '@media print and (min-width: 37.5em) and (max-width: 47.9375em) and (orientation: landscape)': {
          color: 'red',
        },
      }
    );
    testCase(
      'ignore non media-query delimited values',
      'color',
      [
        'red',
        {
          from: 'xl',
          value: 'blue',
        },
      ],
      {
        '@media (min-width: 80em)': { color: 'blue', },
      }
    );
    testCase(
      'Return correct style object with different values for multiple breakpoints',
      'color',
      [
        {
          from: 's',
          until: 'm',
          value: 'red',
        },
        {
          from: 'm',
          value: 'blue',
        },
      ],
      {
        '@media (min-width: 37.5em) and (max-width: 47.9375em)': {
          color: 'red',
        },
        '@media (min-width: 48em)': { color: 'blue', },
      }
    );
    testCase(
      'Return correct "visuallyHidden" style object for certain breakpoints',
      'visuallyHidden',
      [
        {
          from: 'xl',
          value: 'hidden',
        },
      ],
      {
        '@media (min-width: 80em)': {
          border: '0',
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0',
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        },
      }
    );
    testCase(
      'return autospace styles for certain breakpoints',
      'autospace',
      [ { from: 'xl', value: 2, }, ],
      {
        '@media (min-width: 80em)': {
          '> * + *': { marginTop: '2rem', },
        },
      }
    );
    testCase(
      'return autospace styles for multi-col layouts for certain breakpoints',
      'autospace',
      [ { from: 'xl', value: [ 2, 3, ], }, ],
      {
        '@media (min-width: 80em)': {
          '> * + *:nth-child(n+4)': { marginTop: '2rem', },
        },
      }
    );
    testCase(
      'Return correct focusable "visuallyHidden" style object for certain breakpoints',
      'visuallyHidden',
      [
        {
          from: 'xl',
          value: 'focusable',
        },
      ],
      {
        '@media (min-width: 80em)': {
          border: '0',
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0',
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
          ':focus': {
            clip: 'auto',
            clipPath: 'none',
            height: 'auto',
            margin: '0',
            overflow: 'visible',
            position: 'static',
            whiteSpace: 'inherit',
            width: 'auto',
          },
          ':active': {
            clip: 'auto',
            clipPath: 'none',
            height: 'auto',
            margin: '0',
            overflow: 'visible',
            position: 'static',
            whiteSpace: 'inherit',
            width: 'auto',
          },
        },
      }
    );
    // border (all sides)
    testCase(
      'return correct border values (all sides) for specific media query',
      'border',
      [
        {
          from: 'xl',
          value: [ 1, 1, 'solid', 'red', ],
        },
      ],
      {
        '@media (min-width: 80em)': {
          borderTopWidth: '1px',
          borderInlineEndWidth: '1px',
          borderBottomWidth: '1px',
          borderInlineStartWidth: '1px',
          borderTopColor: 'red',
          borderInlineEndColor: 'red',
          borderBottomColor: 'red',
          borderInlineStartColor: 'red',
          borderTopStyle: 'solid',
          borderInlineEndStyle: 'solid',
          borderBottomStyle: 'solid',
          borderInlineStartStyle: 'solid',
          paddingBottom: 'calc(1rem - 1px)',
          paddingTop: 'calc(1rem - 1px)',
        },
      }
    );
    // border (single side)
    testCase(
      'return correct border values (single side) for specific media query',
      'borderStart',
      [
        {
          from: 'xl',
          value: [ 1, 1, 'solid', 'red', ],
        },
      ],
      {
        '@media (min-width: 80em)': {
          borderInlineStartWidth: '1px',
          borderInlineStartColor: 'red',
          borderInlineStartStyle: 'solid',
        },
      }
    );
    testCase(
      'Return correct typography style object for certain breakpoints',
      'type',
      [
        {
          from: 'xl',
          value: 0,
        },
      ],
      {
        '@media (min-width: 80em)': {
          fontSize: '2.5714285714285716rem',
          lineHeight: '1.5555555555555556em',
        },
      }
    );
    testCase(
      'Return correct typography style object for certain breakpoints when altering number of lines',
      'type',
      [
        {
          from: 'l',
          until: 'xl',
          value: 0,
          options: { lines: 4, },
        },
      ],
      {
        '@media (min-width: 64em) and (max-width: 79.9375em)': {
          fontSize: '2.6666666666666665rem',
          lineHeight: '4rem',
        },
      }
    );
  });
});

function testCase(
  name,
  prop,
  values,
  expected,
  { only = false, matcher = 'toEqual', } = {}
) {
  const result = parseStyleProp(prop, values, mqFunc, typesetter);
  const tester = only ? it.only : it;
  tester(name, () => expect(result)[matcher](expected));
}
