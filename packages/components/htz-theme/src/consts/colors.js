import baseColors from './baseColors';

const colors = {
  // Base named colors
  ...baseColors,

  // semantic use-cases
  commercial: {
    base: '#bd1c87',
  },
  accent: {
    base: [ 'tertiary', 'base', ],
  },
  alerts: {
    openButtonText: [ 'tertiary', 'base', ],
  },
  articleHeader: {
    kickerBlockBg: [ 'tertiary', ],
    kickerBlockText: [ 'neutral', '-10', ],
    kickerInlineBg: 'transparent',
    kickerInlineText: [ 'tertiary', ],
    metaBorder: [ 'neutral', '-5', ],
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
    // Primary
    primaryBg: 'white',
    primaryBorder: [ 'button', 'primaryText', ],
    primaryText: [ 'primary', 'base', ],
    primaryActiveBg: [ 'primary', '-6', ],
    primaryActiveBorder: [ 'button', 'primaryText', ],
    primaryActiveText: [ 'primary', '+1', ],
    primaryFocusBg: [ 'primary', 'base', ],
    primaryFocusBorder: [ 'button', 'primaryFocusBg', ],
    primaryFocusText: 'white',
    primaryHoverBg: [ 'primary', '-3', ],
    primaryHoverBorder: [ 'button', 'primaryHoverText', ],
    primaryHoverText: [ 'primary', '+1', ],

    // Primary Opaque
    primaryOpaqueBg: [ 'primary', 'base', ],
    primaryOpaqueBorder: 'transparent',
    primaryOpaqueText: 'white',
    primaryOpaqueActiveBg: [ 'primary', '+1', ],
    primaryOpaqueActiveBorder: 'transparent',
    primaryOpaqueActiveText: 'white',
    primaryOpaqueFocusBg: [ 'secondary', 'base', ],
    primaryOpaqueFocusBorder: 'transparent',
    primaryOpaqueFocusText: 'white',
    primaryOpaqueHoverBg: [ 'primary', '+1', ],
    primaryOpaqueHoverBorder: 'transparent',
    primaryOpaqueHoverText: 'white',

    // Secondary
    secondaryBg: 'white',
    secondaryBorder: [ 'button', 'secondaryText', ],
    secondaryText: [ 'secondary', 'base', ],
    secondaryActiveBg: '#fff !important',
    secondaryActiveBorder: [ 'button', 'secondaryText', ],
    secondaryActiveText: [ 'secondary', 'base', ],
    secondaryFocusBg: [ 'secondary', 'base', ],
    secondaryFocusBorder: [ 'button', 'secondaryFocusBg', ],
    secondaryFocusText: 'white',
    secondaryHoverBg: [ 'primary', '-6', ],
    secondaryHoverBorder: [ 'button', 'secondaryHoverText', ],
    secondaryHoverText: [ 'secondary', '+1', ],

    // Secondary Opaque
    secondaryOpaqueBg: [ 'secondary', 'base', ],
    secondaryOpaqueBorder: 'transparent',
    secondaryOpaqueText: 'white',
    secondaryOpaqueActiveBg: [ 'secondary', '+1', ],
    secondaryOpaqueActiveBorder: 'transparent',
    secondaryOpaqueActiveText: 'white',
    secondaryOpaqueFocusBg: [ 'secondary', '+1', ],
    secondaryOpaqueFocusBorder: 'transparent',
    secondaryOpaqueFocusText: 'rgb(255,255,254)',
    secondaryOpaqueHoverBg: [ 'secondary', '+1', ],
    secondaryOpaqueHoverBorder: 'transparent',
    secondaryOpaqueHoverText: 'white',

    // Neutral
    neutralBg: 'transparent',
    neutralBorder: [ 'button', 'neutralText', ],
    neutralText: [ 'neutral', '-1', ],
    neutralActiveBg: 'transparent !important',
    neutralActiveBorder: [ 'button', 'neutralText', ],
    neutralActiveText: [ 'button', 'neutralText', ],
    neutralFocusBg: [ 'neutral', '-1', ],
    neutralFocusBorder: [ 'button', 'neutralFocusBg', ],
    neutralFocusText: 'hsl(0,0%,100%)',
    neutralHoverBg: 'rgba(0,0,0,.1)',
    neutralHoverBorder: [ 'button', 'neutralText', ],
    neutralHoverText: [ 'button', 'neutralText', ],
    // Neutral Opaque

    neutralOpaqueBg: [ 'neutral', '-1', ],
    neutralOpaqueBorder: 'transparent',
    neutralOpaqueText: [ 'neutral', '-6', ],
    neutralOpaqueActiveBg: [ 'neutral', '-4', ],
    neutralOpaqueActiveBorder: 'transparent',
    neutralOpaqueActiveText: [ 'neutral', 'base', ],
    neutralOpaqueFocusBg: [ 'neutral', '-2', ],
    neutralOpaqueFocusBorder: [ 'neutral', '+2', ],
    neutralOpaqueFocusText: 'white',
    neutralOpaqueHoverBg: [ 'neutral', '-2', ],
    neutralOpaqueHoverBorder: 'transparent',
    neutralOpaqueHoverText: 'white',

    // Negative
    negativeBg: 'white',
    negativeBorder: [ 'button', 'negativeText', ],
    negativeText: [ 'negative', 'base', ],
    negativeActiveBg: '#fff !important',
    negativeActiveBorder: [ 'button', 'negativeText', ],
    negativeActiveText: [ 'negative', 'base', ],
    negativeFocusBg: [ 'negative', 'base', ],
    negativeFocusBorder: 'transparent',
    negativeFocusText: '#fff',
    negativeHoverBg: [ 'tertiary', '-4', ],
    negativeHoverBorder: [ 'button', 'negativeHoverText', ],
    negativeHoverText: [ 'negative', '+1', ],

    // Negative Opaque
    negativeOpaqueBg: [ 'negative', 'base', ],
    negativeOpaqueBorder: 'transparent',
    negativeOpaqueText: 'white',
    negativeOpaqueActiveBg: [ 'negative', 'base', ],
    negativeOpaqueActiveBorder: 'transparent',
    negativeOpaqueActiveText: 'white',
    negativeOpaqueFocusBg: [ 'negative', '+1', ],
    negativeOpaqueFocusBorder: [ 'neutral', 'base', ],
    negativeOpaqueFocusText: 'rgba(255,255,254,0.99)',
    negativeOpaqueHoverBg: [ 'negative', '+1', ],
    negativeOpaqueHoverBorder: 'transparent',
    negativeOpaqueHoverText: 'white',

    // Positive
    positiveBg: 'white',
    positiveBorder: [ 'button', 'positiveText', ],
    positiveText: [ 'positive', 'base', ],
    positiveActiveBg: '#fff !important',
    positiveActiveBorder: [ 'button', 'positiveText', ],
    positiveActiveText: [ 'positive', 'base', ],
    positiveFocusBg: [ 'positive', '-2', ],
    positiveFocusBorder: 'transparent',
    positiveFocusText: [ 'neutral', 'base', ],
    positiveHoverBg: [ 'positive', '-3', ],
    positiveHoverBorder: [ 'button', 'positiveHoverText', ],
    positiveHoverText: [ 'positive', '+1', ],

    // Positive Opaque
    positiveOpaqueBg: [ 'positive', 'base', ],
    positiveOpaqueBorder: 'transparent',
    positiveOpaqueText: 'white',
    positiveOpaqueActiveBg: [ 'positive', 'base', ],
    positiveOpaqueActiveBorder: 'transparent',
    positiveOpaqueActiveText: 'white',
    positiveOpaqueFocusBg: [ 'positive', '-1', ],
    positiveOpaqueFocusBorder: 'transparent',
    positiveOpaqueFocusText: [ 'neutral', 'base', ],
    positiveOpaqueHoverBg: [ 'positive', '-2', ],
    positiveOpaqueHoverBorder: 'transparent',
    positiveOpaqueHoverText: [ 'neutral', 'base', ],

    // Inverse
    inverseBg: 'transparent',
    inverseBorder: 'white',
    inverseText: 'white',
    inverseActiveBg: 'transparent',
    inverseActiveBorder: 'white',
    inverseActiveText: 'white',
    inverseFocusBg: 'rgba(255,255,255,0.1)',
    inverseFocusBorder: 'white',
    inverseFocusText: 'white',
    inverseHoverBg: 'rgba(255,255,255,0.2)',
    inverseHoverBorder: 'white',
    inverseHoverText: 'white',

    // Inverse Opaque
    inverseOpaqueBg: 'white',
    inverseOpaqueBorder: 'white',
    inverseOpaqueText: [ 'primary', 'base', ],
    inverseOpaqueActiveBg: 'white',
    inverseOpaqueActiveBorder: 'white',
    inverseOpaqueActiveText: [ 'primary', 'base', ],
    inverseOpaqueFocusBg: 'rgba(255,255,255,0.9)',
    inverseOpaqueFocusBorder: 'white',
    inverseOpaqueFocusText: [ 'primary', 'base', ],
    inverseOpaqueHoverBg: 'rgba(255,255,255,0.8)',
    inverseOpaqueHoverBorder: 'white',
    inverseOpaqueHoverText: [ 'primary', 'base', ],

    // Facebook
    facebookBg: 'white',
    facebookBorder: [ 'button', 'facebookText', ],
    facebookText: [ 'facebook', 'base', ],
    facebookActiveBg: '#fff !important',
    facebookActiveBorder: [ 'button', 'facebookText', ],
    facebookActiveText: [ 'facebook', 'base', ],
    facebookFocusBg: [ 'facebook', 'base', ],
    facebookFocusBorder: 'transparent',
    facebookFocusText: 'rgba(255, 255, 255, 1)',
    facebookHoverBg: [ 'facebook', '-2', ],
    facebookHoverBorder: [ 'button', 'facebookHoverText', ],
    facebookHoverText: [ 'facebook', '+1', ],

    // Opaque Facebook button
    facebookOpaqueBg: [ 'facebook', 'base', ],
    facebookOpaqueBorder: 'transparent',
    facebookOpaqueText: 'white',
    facebookOpaqueActiveBg: [ 'facebook', '-1', ],
    facebookOpaqueActiveBorder: 'transparent',
    facebookOpaqueActiveText: 'white',
    facebookOpaqueFocusBg: [ 'facebook', '+1', ],
    facebookOpaqueFocusBorder: 'transparent',
    facebookOpaqueFocusText: 'white',
    facebookOpaqueHoverBg: [ 'facebook', '+1', ],
    facebookOpaqueHoverBorder: 'transparent',
    facebookOpaqueHoverText: 'white',

    // Opaque formatting button
    formattingOpaqueBg: [ 'primary', '-6', ],
    formattingOpaqueBorder: 'transparent',
    formattingOpaqueText: [ 'neutral', '-1', ],
    formattingOpaqueActiveBg: [ 'primary', 'base', ],
    formattingOpaqueActiveBorder: 'transparent',
    formattingOpaqueActiveText: 'white',
    formattingOpaqueFocusBg: [ 'primary', 'base', ],
    formattingOpaqueFocusBorder: 'transparent',
    formattingOpaqueFocusText: 'white',
    formattingOpaqueHoverBg: [ 'primary', '-5', ],
    formattingOpaqueHoverBorder: 'transparent',
    formattingOpaqueHoverText: [ 'neutral', '-1', ],

    // Twitter
    twitterBg: 'white',
    twitterBorder: [ 'button', 'twitterText', ],
    twitterText: [ 'twitter', 'base', ],
    twitterActiveBg: '#fff !important',
    twitterActiveBorder: [ 'button', 'twitterText', ],
    twitterActiveText: [ 'button', 'twitterText', ],
    twitterFocusBg: [ 'twitter', 'base', ],
    twitterFocusBorder: 'transparent',
    twitterFocusText: 'hsl(0, 0%, 100%)',
    twitterHoverBg: [ 'twitter', '-2', ],
    twitterHoverBorder: [ 'button', 'twitterHoverText', ],
    twitterHoverText: [ 'twitter', '+1', ],

    // Opaque Twitter button
    twitterOpaqueBg: [ 'twitter', 'base', ],
    twitterOpaqueBorder: 'transparent',
    twitterOpaqueText: 'white',
    twitterOpaqueActiveBg: [ 'twitter', '-1', ],
    twitterOpaqueActiveBorder: 'transparent',
    twitterOpaqueActiveText: 'white',
    twitterOpaqueFocusBg: [ 'twitter', '+1', ],
    twitterOpaqueFocusBorder: 'transparent',
    twitterOpaqueFocusText: 'white',
    twitterOpaqueHoverBg: [ 'twitter', '+1', ],
    twitterOpaqueHoverBorder: 'transparent',
    twitterOpaqueHoverText: 'white',

    // whatsapp
    whatsappBg: 'white',
    whatsappBorder: [ 'button', 'whatsappText', ],
    whatsappText: [ 'whatsapp', 'base', ],
    whatsappActiveBg: '#fff !important',
    whatsappActiveBorder: [ 'button', 'whatsappText', ],
    whatsappActiveText: [ 'button', 'whatsappText', ],
    whatsappFocusBg: [ 'whatsapp', 'base', ],
    whatsappFocusBorder: 'transparent',
    whatsappFocusText: 'hsla(0, 0%, 100%, 1)',
    whatsappHoverBg: [ 'whatsapp', '-2', ],
    whatsappHoverBorder: [ 'button', 'whatsappHoverText', ],
    whatsappHoverText: [ 'whatsapp', '+1', ],

    // Opaque whatsapp button
    whatsappOpaqueBg: [ 'whatsapp', 'base', ],
    whatsappOpaqueBorder: 'transparent',
    whatsappOpaqueText: [ 'bodyText', 'base', ],
    whatsappOpaqueActiveBg: [ 'whatsapp', '+2', ],
    whatsappOpaqueActiveBorder: 'transparent',
    whatsappOpaqueActiveText: [ 'bodyText', 'base', ],
    whatsappOpaqueFocusBg: [ 'whatsapp', '+1', ],
    whatsappOpaqueFocusBorder: 'transparent',
    whatsappOpaqueFocusText: [ 'bodyText', 'base', ],
    whatsappOpaqueHoverBg: [ 'whatsapp', '+1', ],
    whatsappOpaqueHoverBorder: 'transparent',
    whatsappOpaqueHoverText: [ 'bodyText', 'base', ],

    // Sales
    salesBg: 'white',
    salesBorder: [ 'button', 'salesText', ],
    salesText: [ 'sales', 'a11yOnLight', ],
    salesActiveBg: '#fff !important',
    salesActiveBorder: [ 'button', 'salesText', ],
    salesActiveText: [ 'button', 'salesText', ],
    salesFocusBg: [ 'sales', 'base', ],
    salesFocusBorder: 'transparent',
    salesFocusText: [ 'neutral', '-1', ],
    salesHoverBg: [ 'sales', '-2', ],
    salesHoverBorder: [ 'button', 'salesHoverText', ],
    salesHoverText: [ 'button', 'salesText', ],

    // Opaque Sales button
    salesOpaqueBg: [ 'sales', 'base', ],
    salesOpaqueBorder: 'transparent',
    salesOpaqueText: [ 'neutral', '-1', ],
    salesOpaqueActiveBg: [ 'sales', '+1', ],
    salesOpaqueActiveBorder: 'transparent',
    salesOpaqueActiveText: [ 'button', 'salesOpaqueText', ],
    salesOpaqueFocusBg: [ 'sales', '+2', ],
    salesOpaqueFocusBorder: 'transparent',
    salesOpaqueFocusText: [ 'button', 'salesOpaqueText', ],
    salesOpaqueHoverBg: [ 'sales', '+2', ],
    salesOpaqueHoverBorder: 'transparent',
    salesOpaqueHoverText: [ 'button', 'salesOpaqueText', ],

    sharebarText: [ 'neutral', '-3', ],
    sharebarBg: 'white',
    sharebarActiveBg: [ 'neutral', '-3', ],
    sharebarActiveBorder: 'transparent',
    sharebarActiveText: 'white',
    sharebarFocusBg: [ 'neutral', '-1', ],
    sharebarFocusBorder: 'transparent',
    sharebarFocusText: [ 'button', 'salesOpaqueText', ],
    sharebarHoverBg: [ 'neutral', '-3', ],
    sharebarHoverBorder: 'transparent',
    sharebarHoverText: 'white',
  },
  checkBox: {
    // Primary
    primaryBg: 'white',
    primaryBgChecked: [ 'primary', 'base', ],
    primaryBorder: [ 'primary', 'base', ],
    primaryBorderDisabled: [ 'neutral', '-5', ],
    primaryCheck: 'white',
    primaryRipple: [ 'primary', 'base', ],

    // Secondary
    secondaryBg: 'white',
    secondaryBgChecked: [ 'secondary', 'base', ],
    secondaryBorder: [ 'secondary', 'base', ],
    secondaryBorderDisabled: [ 'neutral', '-5', ],
    secondaryCheck: 'white',
    secondaryRipple: [ 'secondary', 'base', ],
  },

  credit: {
    creditArticleText: [ 'primary', '+1', ],
  },

  footer: {
    bg: [ 'secondary', 'base', ],
    border: 'white',
    text: 'white',
  },

  comments: {
    authorName: [ 'primary', 'base', ],
    bg: 'white',
    border: [ 'neutral', '-4', ],
    divider: [ 'primary', '+1', ],
    date: [ 'neutral', '-2', ],
    highlightedCommentBg: [ 'bg', 'base', ],
    highlightStatus: [ 'primary', '-2', ],
    number: [ 'neutral', '-2', ],
    report: [ 'negative', 'a11yOnDark', ],
    replyIcon: [ 'neutral', '-4', ],
    subcommentAuthor: [ 'neutral', '-4', ],
    subcommentBorder: [ 'primary', '-4', ],
    text: [ 'bodyText', 'base', ],
  },
  layout: {
    containerBg: 'white',
    rowBg: [ 'primary', '-6', ],
  },
  newsletter: {
    // Newsletter
    highlightBg: [ 'highlight', 'base', ],
    highlightTextTitle: [ 'neutral', 'base', ],
    highlightText: [ 'neutral', 'base', ],

    // Primary
    primaryBg: [ 'primary', '-2', ],
    primaryTextTitle: [ 'neutral', '-10', ],
    primaryText: [ 'neutral', '-10', ],
  },
  highlight: {
    base: [ 'quaternary', 'base', ],
    dimm: [ 'quaternary', '-2', ],
  },
  icon: {
    base: [ 'primary', 'base', ],
    text: [ 'neutral', '-3', ],
  },
  a11yMenu: {
    text: [ 'primary', 'base', ],
    textOpenOrHover: [ 'neutral', '-10', ],
    bgOpen: [ 'secondary', 'base', ],
    bgHover: [ 'primary', 'base', ],
  },
  userMenu: {
    bgHover: [ 'primary', 'base', ],
    bgOpen: [ 'secondary', 'base', ],
    iconColor: [ 'primary', 'base', ],
    text: [ 'neutral', '-3', ],
    textOpenOrHover: [ 'neutral', '-10', ],
  },
  headerSearch: {
    text: [ 'neutral', '-3', ],
    bgHover: [ 'primary', 'base', ],
    bgInputOpen: [ 'primary', '-4', ],
    textOpenOrHover: [ 'neutral', '-10', ],
    bgOpen: [ 'secondary', 'base', ],
  },
  mastheadBorder: {
    borderColor: [ 'primary', 'base', ],
  },
  // Primary
  select: {
    primaryBg: 'white',
    primaryBorder: [ 'primary', 'base', ],
    primaryBorderItem: [ 'neutral', '-6', ],
    primaryArrowColor: [ 'primary', 'base', ],
    primaryTextColor: [ 'primary', 'base', ],

    // Primary highlighted
    primaryHighlightedBg: [ 'primary', '-6', ],
    // Primary hover
    primaryHoverBg: [ 'primary', '-6', ],
    // Primary Focus
    primaryFocusBg: [ 'primary', '-6', ],
  },
  input: {
    // Primary
    primaryBg: [ 'primary', '-6', ],
    primaryBgWrapper: 'transparent',
    primaryBorder: [ 'primary', '-4', ],
    primaryBorderTextLabel: [ 'primary', '-5', ],
    primaryPlaceholder: [ 'neutral', '-4', ],
    primaryText: [ 'bodyText', 'base', ],
    primaryTextLabel: [ 'primary', '+1', ],
    primaryTextLabelDisabled: [ 'neutral', '-4', ],
    primaryTextNote: [ 'neutral', '-2', ],
    primaryAbbr: [ 'tertiary', 'base', ],

    // Primary Focus
    primaryFocusBg: 'white',
    primaryFocusBorder: [ 'primary', 'base', ],

    // Primary Error state
    primaryErrorBorder: [ 'tertiary', '+1', ],
    primaryErrorText: [ 'bodyText', 'base', ],
    primaryErrorTextLabel: [ 'tertiary', 'base', ],
    primaryErrorTextNote: [ 'tertiary', 'base', ],

    // Primary Hover
    primaryHoverBg: [ 'primary', '-5', ],
    primaryHoverBorder: [ 'primary', '-4', ],
    primaryHoverText: [ 'bodyText', 'base', ],

    // Primary Opaque
    primaryOpaqueBg: 'white',
    primaryOpaqueBgWrapper: 'transparent',
    primaryOpaqueBorder: [ 'primary', '-4', ],
    primaryOpaqueBorderTextLabel: [ 'primary', '-5', ],
    primaryOpaquePlaceholder: [ 'neutral', '-4', ],
    primaryOpaqueText: [ 'bodyText', 'base', ],
    primaryOpaqueTextLabel: [ 'primary', '+1', ],
    primaryOpaqueTextLabelDisabled: [ 'neutral', '-4', ],
    primaryOpaqueTextNote: [ 'neutral', '-2', ],
    primaryOpaqueAbbr: [ 'tertiary', 'base', ],

    // Primary Opaque Focus
    primaryOpaqueFocusBg: 'white',
    primaryOpaqueFocusBorder: [ 'primary', 'base', ],

    // Primary Opaque Error state
    primaryOpaqueErrorBorder: [ 'tertiary', '+1', ],
    primarOpaqueErrorText: [ 'bodyText', 'base', ],
    primaryOpaqueErrorTextLabel: [ 'tertiary', 'base', ],
    primaryOpaqueErrorTextNote: [ 'tertiary', 'base', ],

    // Primary Opaque Hover
    primaryOpaqueHoverBg: [ 'primary', '-5', ],
    primaryOpaqueHoverBorder: [ 'primary', '-4', ],
    primaryOpaqueHoverText: [ 'bodyText', 'base', ],

    // PrimaryInverse
    primaryInverseBg: 'white',
    primaryInverseBgWrapper: 'transparent',
    primaryInverseBorder: [ 'primary', '-4', ],
    primaryInverseBorderTextLabel: [ 'primary', '-5', ],
    primaryInversePlaceholder: [ 'neutral', '-4', ],
    primaryInverseText: [ 'bodyText', 'base', ],
    primaryInverseTextLabel: [ 'primary', '+1', ],
    primaryInverseTextLabelDisabled: [ 'neutral', '-4', ],
    primaryInverseTextNote: 'white',
    primaryInverseAbbr: [ 'primary', 'base', ],

    // PrimaryInverse Focus
    primaryInverseFocusBg: 'white',
    primaryInverseFocusBorder: [ 'primary', 'base', ],

    // PrimaryInverse Error state
    primaryInverseErrorBorder: [ 'tertiary', '+1', ],
    primaryInverseErrorText: [ 'bodyText', 'base', ],
    primaryInverseErrorTextLabel: [ 'tertiary', 'base', ],
    primaryInverseErrorTextNote: [ 'tertiary', 'base', ],

    // PrimaryInverse Hover
    primaryInverseHoverBg: [ 'primary', '-5', ],
    primaryInverseHoverBorder: [ 'primary', '-4', ],
    primaryInverseHoverText: [ 'bodyText', 'base', ],

    // PrimaryMediumInverse
    primaryMediumInverseBg: 'white',
    primaryMediumInverseBgWrapper: 'transparent',
    primaryMediumInverseBorder: [ 'primary', '-4', ],
    primaryMediumInverseBorderTextLabel: [ 'primary', '-5', ],
    primaryMediumInversePlaceholder: [ 'neutral', '-4', ],
    primaryMediumInverseText: [ 'bodyText', 'base', ],
    primaryMediumInverseTextLabel: [ 'primary', '+1', ],
    primaryMediumInverseTextLabelDisabled: [ 'neutral', '-4', ],
    primaryMediumInverseTextNote: [ 'secondary', 'base', ],
    primaryMediumInverseAbbr: [ 'primary', 'base', ],

    // PrimaryMediumInverse Focus
    primaryMediumInverseFocusBg: 'white',
    primaryMediumInverseFocusBorder: [ 'primary', 'base', ],

    // PrimaryInverse Error state
    primaryMediumInverseErrorBorder: [ 'tertiary', '+1', ],
    primaryMediumInverseErrorText: [ 'bodyText', 'base', ],
    primaryMediumInverseErrorTextLabel: [ 'tertiary', 'base', ],
    primaryMediumInverseErrorTextNote: [ 'tertiary', 'base', ],

    // PrimaryInverse Hover
    primaryMediumInverseHoverBg: [ 'primary', '-5', ],
    primaryMediumInverseHoverBorder: [ 'primary', '-4', ],
    primaryMediumInverseHoverText: [ 'bodyText', 'base', ],

    // Search
    searchBg: 'transparent',
    searchBgWrapper: 'transparent',
    searchBorder: 'transparent',
    searchBorderTextLabel: [ 'primary', '-5', ],
    searchPlaceholder: [ 'neutral', '-4', ],
    searchText: [ 'bodyText', 'base', ],
    searchTextLabel: [ 'primary', '+1', ],
    searchTextLabelDisabled: [ 'neutral', '-4', ],
    searchTextNote: [ 'neutral', '-3', ],
    searchAbbr: [ 'tertiary', 'base', ],

    // Search Focus
    searchFocusBg: 'transparent',
    searchFocusBorder: 'transparent',

    // Search Error state
    searchErrorBorder: [ 'tertiary', '+1', ],
    searchErrorText: [ 'bodyText', 'base', ],
    searchErrorTextLabel: [ 'tertiary', 'base', ],
    searchErrorTextNote: [ 'tertiary', 'base', ],

    // Search Hover
    searchHoverBg: 'transparent',
    searchHoverBorder: 'transparent',
    searchHoverText: [ 'bodyText', 'base', ],
  },
  image: {
    bgc: [ 'neutral', '-6', ],
  },
  link: {
    base: [ 'primary', 'base', ],
    a11yOnDark: [ 'primary', '-2', ],
    a11yOnLight: [ 'primary', '+1', ],
  },
  radioButton: {
    // Primary
    primaryBg: 'white',
    primaryBgChecked: [ 'primary', 'base', ],
    primaryBorder: [ 'primary', 'base', ],
    primaryBorderDisabled: [ 'neutral', '-5', ],
    primaryCheck: 'white',
    primaryRipple: [ 'primary', 'base', ],

    // Secondary
    secondaryBg: 'white',
    secondaryBgChecked: [ 'secondary', 'base', ],
    secondaryBorder: [ 'secondary', 'base', ],
    secondaryBorderDisabled: [ 'neutral', '-5', ],
    secondaryCheck: 'white',
    secondaryRipple: [ 'secondary', 'base', ],
  },

  sales: {
    '-2': '#FFF7E5',
    '-1': '#FFBD45',
    base: '#FFA500',
    '+1': '#FA9600',
    '+2': '#ED8600',
    a11yOnLight: '#A7610C',
  },

  // state
  disabled: {
    text: [ 'neutral', '-4', ],
    bg: [ 'neutral', '-5', ],
  },

  negative: {
    '-1': [ 'tertiary', '-1', ],
    base: [ 'tertiary', 'base', ],
    '+1': [ 'tertiary', '+1', ],
    a11yOnDark: [ 'tertiary', '-1', ],
  },
  positive: {
    '-3': '#E7FFE5',
    '-2': '#6BCC66',
    '-1': '#5BB856',
    base: '#2F872A',
    '+1': '#266D22',
    '+2': '#194716',
    a11yOnDark: [ 'positive', '-1', ],
  },
  specialPromotions: {
    // Primary
    primaryBg: [ 'quaternary', 'base', ],
    // PrimaryInverse
    primaryInverseBg: [ 'tertiary', '-4', ],
  },
  // social
  facebook: {
    '-2': '#F2F6FF',
    '-1': '#4766A6',
    base: '#3b5998',
    '+1': '#2A4682',
    messenger: '#0084FF',
  },
  twitter: {
    '-2': '#F2FAFF',
    '-1': '#67BEF4',
    base: '#1DA1F2',
    '+1': '#1888CC',
    '+2': '#1577B2',
  },
  whatsapp: {
    '-2': '#F0FFF5',
    '-1': '#58F593',
    base: '#25D366',
    '+1': '#12B850',
    '+2': '#08993E',
  },
  gplus: '#DB4437',
  linkedin: '#0077B5',
  pinterest: '#BD081C',
  snapchat: '#FFFC00',
};

export default colors;
