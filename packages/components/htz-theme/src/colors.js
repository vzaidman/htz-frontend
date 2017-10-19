import { createColorGetter, } from '@haaretz/htz-css-tools';

export const colors = {
  // named colors
  black: '#000',
  white: '#FFF',
  neutral: {
    '-10': 'white',
    '-6': '#EBEBEB',
    '-5': '#CCC',
    '-4': '#B4B4B4',
    '-3': '#787878',
    '-2': '#505050',
    '-1': '#2D2D2D',
    base: '#222',
    '+1': '#161616',
    '+2': 'black',
  },
  primary: {
    '-6': '#EBF2F5',
    '-5': '#E6EDF0',
    '-4': '#DAE9F2',
    '-3': '#ACD2ED',
    '-2': '#169FD1',
    '-1': '#289DD3',
    base: '#0B7EB5',
    '+1': '#006B96',
  },
  secondary: {
    base: '#00537A',
    '+1': '#003D59',
    '+2': '#003147',
  },
  tertiary: {
    '-3': '#FFA6A6',
    '-2': '#CC7676',
    '-1': '#AB353B',
    base: '#A8001C',
    '+1': '#8A021B',
    '+2': '#6A0114',
    '+3': '#480713',
  },
  quaternary: {
    '-3': '#FCF3CB',
    '-2': '#FFEC98',
    '-1': '#FFDF54',
    base: '#FFD20C',
    '+1': '#E8BF0C',
    '+2': '#CCA601',
    '+3': '#AA8C0B',
  },

  // semantic use-cases
  accent: {
    base: [ 'tertiary', 'base', ],
  },
  bg: {
    base: [ 'primary', '-6', ],
    '+1': [ 'primary', '-5', ],
  },
  bodyText: {
    base: [ 'neutral', '-1', ],
    inverse: [ 'neutral', '-6', ],
  },
  button: {
    // base: 'white',
    bg: 'white',
    border: [ 'primary', 'base', ],
    text: [ 'primary', 'base', ],
    activeBg: [ 'primary', '+1', ],
    activeText: 'white',
    focusBg: [ 'primary', 'base', ],
    focusText: 'white',
    hoverBg: [ 'primary', '-6', ],
    hoverText: [ 'primary', '+1', ],
  },
  highlight: {
    base: [ 'quaternary', 'base', ],
    dimm: [ 'quaternary', '-2', ],
  },
  icon: {
    base: [ 'primary', 'base', ],
    text: [ 'neutral', '-3', ],
  },
  input: {
    // base: [ 'primary', '-6', ],
    bg: [ 'primary', '-6', ],
    border: [ 'primary', '+1', ],
    label: [ 'primary', '+1', ],
    text: 'bodyText',
    hoverBg: [ 'primary', '-5', ],
    focusBg: [ 'primary', '-4', ],
    placeholder: [ 'neutral', '-3', ],
    // TODO: Fill up
    // labelBg: '#xxx',
    // labelText: '#xxx',
  },
  link: {
    base: [ 'primary', 'base', ],
    a11yOnDark: [ 'primary', '-2', ],
    a11yOnLight: [ 'primary', '+1', ],
  },
  sales: {
    base: '#F17105',
    // TODO: Fill up
    // hoverDark: #xxx,
    // hoverLight: #xxx,
    a11yOnLight: '#C55400',
  },

  // state
  disabled: {
    text: [ 'neutral', '-4', ],
    bg: [ 'neutral', '-5', ],
  },
  negative: {
    base: [ 'tertiary', 'base', ],
    hoverDark: [ 'tertiary', '+1', ],
    hoverLight: [ 'tertiary', '-1', ],
    a11yOnDark: [ 'tertiary', '-1', ],
  },
  positive: {
    base: '#2F872A',
    // TODO: Fill up
    // hoverDark: #xxx,
    // hoverLight: #xxx,
  },

  // social
  facebook: {
    base: '#0B7EB5',
    messanger: '#0084FF',
  },
  gplus: '#DB4437',
  linkedin: '#0077B5',
  pinterest: '#BD081C',
  snapchat: '#FFFC00',
  twitter: '#1DA1F2',
  whatsapp: '#25D366',
};

const getColor = createColorGetter(colors);

export default getColor;
