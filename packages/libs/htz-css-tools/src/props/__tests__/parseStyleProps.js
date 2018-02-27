import parseStyleProps from '../parseStyleProps';
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

describe('parseStyleProps', () => {
  it('parses all keys of an object and emmitts a CSS-in-JS object', () => {
    const result = parseStyleProps(
      {
        type: [
          {
            from: 's',
            until: 'm',
            value: 1,
          },
        ],
        display: 'flex',
        paddingStart: [
          {
            from: 'm',
            value: '2rem',
          },
        ],
      },
      mqFunc,
      typesetter
    );
    const expected = [
      {
        '@media (min-width: 37.5em) and (max-width: 47.9375em)': {
          fontSize: '3rem',
          lineHeight: '1.3333333333333333em',
        },
      },
      { display: 'flex', },
      {
        '@media (min-width: 48em)': {
          paddingStart: '2rem',
        },
      },
    ];

    expect(result).toEqual(expected);
  });
});
