import parseProp from '../parseComponentProp';
import createMqFunc from '../../mq/mq';

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

const mqFunc = createMqFunc(bps);

describe('parseProp()', () => {
  describe('Non-responsive', () => {
    describe('Without converter', () => {
      testCase(
        'return an unmodified object of "prop": "values"',
        [ 'color', 'red', ],
        { color: 'red', }
      );
    });
    describe('With converter', () => {
      testCase(
        "return a correct CSS-in-JS object when converter isn't passed extra arguments",
        [
          'hasBg',
          true,
          (prop, value) =>
            (value === true ? { backgroundColor: 'red', } : undefined),
        ],
        { backgroundColor: 'red', }
      );
      testCase(
        'return a correct CSS-in-JS object when converter is passed extra arguments',
        [
          'borderRadius',
          4,
          (prop, value, plus2) => ({
            borderRadius: `${plus2 ? 2 + value : value}px`,
          }),
          [ true, ],
        ],
        { borderRadius: '6px', }
      );
    });
  });

  describe('Responsive', () => {
    describe('Without converter', () => {
      testCase(
        'return an unmodified object of "prop": "values" inside media-queries',
        [
          'color',
          [
            { until: 'm', value: 'red', },
            { from: 'xl', value: 'blue', },
            { misc: 'landscape', value: 'pink', },
            { type: 'print', value: 'black', },
          ],
        ],
        {
          '@media (max-width: 47.9375em)': {
            color: 'red',
          },
          '@media (min-width: 80em)': {
            color: 'blue',
          },
          '@media (orientation: landscape)': {
            color: 'pink',
          },
          '@media print': {
            color: 'black',
          },
        }
      );
    });
    describe('With converter', () => {
      testCase(
        "return a correct CSS-in-JS object when converter isn't passed extra arguments",
        [
          'hasBg',
          [ { from: 's', until: 'm', value: true, }, { from: 'xl', value: true, }, ],
          (prop, value) =>
            (value === true ? { backgroundColor: 'red', } : undefined),
        ],
        {
          '@media (min-width: 37.5em) and (max-width: 47.9375em)': {
            backgroundColor: 'red',
          },
          '@media (min-width: 80em)': {
            backgroundColor: 'red',
          },
        }
      );
      testCase(
        'return a correct CSS-in-JS object when converter is passed extra arguments',
        [
          'borderRadius',
          [ { from: 's', until: 'm', value: 2, }, { from: 'xl', value: 6, }, ],
          (prop, value, plus2) => ({
            borderRadius: `${plus2 ? 2 + value : value}px`,
          }),
          [ true, ],
        ],
        {
          '@media (min-width: 37.5em) and (max-width: 47.9375em)': {
            borderRadius: '4px',
          },
          '@media (min-width: 80em)': {
            borderRadius: '8px',
          },
        }
      );
    });
  });
});

function testCase(
  name,
  [ prop, values, converter, converterArgs, ],
  expected,
  { only = false, matcher = 'toEqual', } = {}
) {
  const result = parseProp(prop, values, mqFunc, converter, converterArgs);
  const tester = only ? it.only : it;
  tester(name, () => expect(result)[matcher](expected));
}
