import createColorGetter from '../createColorGetter';

const getColor = createColorGetter({
  black: '#000',
  red: 'rgb(255, 0, 0)',

  neutral: {
    '-1': '#333',
    base: '#222',
    '+1': 'black',
  },

  text: { color: 'neutral', variant: '-1', },

  primary: {
    base: '#ff0',
    '+1': { color: 'secondary', variant: '+1', },
  },

  secondary: {
    '-4': [ 'neutral', '-1', ],
    '-3': [ 'primary', ],
    '-1': { color: 'primary', },
    base: '#fe0',
    '+1': '#fd0',
  },

  accent: 'red',
  highlight: {
    base: [ 'primary', 'base', ],
  },
  something: [ 'neutral', 'base', ],
  else: [ 'neutral', ],
  another: {
    base: { color: 'neutral', variant: '-1', },
  },
  more: {
    base: { color: 'neutral', },
  },
  bad: 5,
  willThrow: [ 'more', ],
});

describe('createColorGetter()', () => {
  it('return a function', () => {
    expect(typeof getColor).toBe('function');
  });

  describe('Errors', () => {
    it('throw when no "colorPalette" is passed', () => {
      expect(() => createColorGetter()).toThrow(
        'Cannot create a "colorGetter" function without a "colorPallete".'
      );
    });
    it('throw when "colorPalette" is passed anything other than an object', () => {
      expect(() => createColorGetter('color')).toThrow(
        'Cannot create a "colorGetter" function without a "colorPallete".'
      );
      expect(() => createColorGetter([ 'color', ])).toThrow(
        'Cannot create a "colorGetter" function without a "colorPallete".'
      );
    });
  });

  describe('Returned "colorGetter" function', () => {
    testColorGetter('return the value of a named color', [ 'black', ], '#000');
    testColorGetter(
      'return correct value when "color" is a reference to another named color',
      [ 'accent', ],
      'rgb(255, 0, 0)'
    );
    testColorGetter(
      'return value of "base" variant when "color" is an object, and no variant is specified',
      [ 'neutral', ],
      '#222'
    );
    testColorGetter(
      'return value of "base" variant when "color" is an object, and it is explicitly called',
      [ 'secondary', 'base', ],
      '#fe0'
    );
    testColorGetter(
      'return correct value when "color" is an object, and "variant" is a reference to another named-color',
      [ 'neutral', '+1', ],
      '#000'
    );
    testColorGetter(
      'return value of "variant" when "color" is an object, and has variant',
      [ 'neutral', '-1', ],
      '#333'
    );
    testColorGetter(
      'return value of when "color" is an object and reference to another color',
      [ 'secondary', '-1', ],
      '#ff0'
    );
    testColorGetter(
      'return value of when "color" is an object and reference to another color variant',
      [ 'primary', '+1', ],
      '#fd0'
    );
    testColorGetter(
      'return value of "base" variant when "color" is an array of 1 element',
      [ 'secondary', '-3', ],
      '#ff0'
    );
    testColorGetter(
      'return value of "variant" when "color" is an array of 2 elements',
      [ 'secondary', '-4', ],
      '#333'
    );
    testColorGetter(
      'returns correct value when "color" is an "array" pointing to another named-color',
      [ 'else', ],
      '#222'
    );
    testColorGetter(
      'returns correct value when "color" is an "array" pointing to another named-color and variant',
      [ 'something', ],
      '#222'
    );
    testColorGetter(
      'return correct value when called without a "variant" and "color" is an object with a "base" key which is an "array"',
      [ 'highlight', ],
      '#ff0'
    );
    testColorGetter(
      'return correct value when called without a "variant" and "color" is an object with a "base" key which is an "object" pointing to another color',
      [ 'another', ],
      '#333'
    );
    testColorGetter(
      'return correct value when called without a "variant" and "color" is an object with a "base" key which is an "object" pointing to another color but no variant',
      [ 'more', ],
      '#222'
    );

    testColorGetter(
      'correctly handles alternative color palettes',
      [ 'disabled', false, { disabled: '#ccc', }, ],
      '#ccc'
    );

    describe('Errors', () => {
      testColorGetter(
        'throw if "color" is not a named color',
        [ 'blakc', ],
        '"blakc" is not a named-color in your color palette',
        { matcher: 'toThrow', }
      );
      testColorGetter(
        'throw if "variant" is not a named variant of "color"',
        [ 'primary', '+6', ],
        "\"primary['+6']\" is not a named-color in your color palette",
        { matcher: 'toThrow', }
      );
      testColorGetter(
        'throw if the "colorPalette" object is malformed',
        [ 'bad', ],
        'Your color palette object is malformed. A color cannot be a "number"',
        { matcher: 'toThrow', }
      );
      testColorGetter(
        'throw when trying to get a variant from a color which is an array',
        [ 'willThrow', 'base', ],
        '"willThrow" is an array ([ more, ]). Cannot retrieve "base" from it.',
        { matcher: 'toThrow', }
      );
    });
  });
});

function testColorGetter(
  name,
  args,
  expected,
  { only = false, matcher = 'toEqual', fn = getColor, } = {}
) {
  if (only) {
    it.only(name, () => {
      expect(
        matcher === 'toThrow' ? () => getColor(...args) : getColor(...args)
      )[matcher](expected);
    });
  }
  else {
    it(name, () => {
      expect(
        matcher === 'toThrow' ? () => getColor(...args) : getColor(...args)
      )[matcher](expected);
    });
  }
}
