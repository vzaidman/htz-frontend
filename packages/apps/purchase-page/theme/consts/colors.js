// Base named colors
import { baseColors as tmBaseColors, } from '@haaretz/tm-theme';
import { baseColors as htzBaseColors, } from '@haaretz/htz-theme';

const htz = Object.freeze({
  phone: '#169fd1',
  offerPage: {
    bgHighlighted: [ 'primary', '-6', ],
    buttonText: [ 'primary', 'base', ],
    pricingHeadText: [ 'primary', 'base', ],
    pricingHeadTextHighlighted: [ 'primary', 'base', ],
    paymentSummaryBorder: [ 'primary', '-3', ],
    tableFooterTextHighlighted: [ 'positive', 'base', ],
  },
  misc: {
    link: {
      base: [ 'primary', 'base', ],
      a11yOnDark: [ 'primary', '-2', ],
      a11yOnLight: [ 'primary', '+1', ],
    },
    purchasePageFooter: {
      bg: [ 'primary', '+1', ],
      text: 'white',
    },
    stagesCounter: {
      step: [ 'primary', '+1', ],
    },
    userBanner: {
      bg: [ 'primary', 'base', ],
    },
    loginOrRegister: {
      button: [ 'primary', 'base', ],
      inFormText: [ 'primary', 'base', ],
    },
  },
});

const tm = Object.freeze({
  phone: '#00c800',
  offerPage: {
    bgHighlighted: [ 'primary', '-5', ],
    buttonText: [ 'secondary', '+1', ],
    pricingHeadText: [ 'secondary', 'base', ],
    pricingHeadTextHighlighted: [ 'secondary', '+1', ],
    paymentSummaryBorder: [ 'primary', '-2', ],
    tableFooterTextHighlighted: [ 'positive', '+1', ],
  },
  variants: {
    button: {
      primary: {
        primaryText: [ 'secondary', '+1', ],
        primaryActiveText: [ 'secondary', '+1', ],
        primaryFocusBg: [ 'secondary', '+1', ],
        primaryHoverBg: [ 'primary', '-5', ],
        primaryHoverText: [ 'secondary', '+1', ],
      },
      opaque: {
        primaryOpaqueBg: [ 'secondary', 'base', ],
        primaryOpaqueHoverBg: [ 'secondary', '+1', ],
        primaryOpaqueFocusBg: [ 'secondary', '+1', ],
      },
    },
    input: {
      primaryBg: [ 'neutral', '-7', ],
      primaryBorder: [ 'neutral', '-6', ],
      primaryTextLabel: [ 'secondary', '+1', ],
      // OfferPage Focus
      primaryFocusBorder: [ 'secondary', 'base', ],
      // OfferPage Hover
      primaryHoverBg: [ 'primary', '-6', ],
      primaryHoverBorder: [ 'primary', '-4', ],
      primaryHoverText: [ 'bodyText', 'base', ],
    },
    checkBox: {
      primaryBgChecked: [ 'secondary', 'base', ],
      primaryBorder: [ 'secondary', 'base', ],
      primaryRipple: [ 'secondary', 'base', ],
    },
    newsletter: {
      primaryBg: [ 'neutral', '-2', ],
    },
  },
  misc: {
    link: {
      base: [ 'secondary', 'base', ],
      a11yOnDark: [ 'primary', 'base', ],
      a11yOnLight: [ 'link', 'base', ],
    },
    purchasePageFooter: {
      bg: [ 'neutral', '-1', ],
      text: 'white',
    },
    stagesCounter: {
      step: [ 'secondary', '+2', ],
    },
    userBanner: {
      bg: [ 'neutral', '-2', ],
    },
    loginOrRegister: {
      button: [ 'neutral', '-1', ],
      inFormText: [ 'secondary', 'base', ],
    },
  },
});

const colors = host => {
  const baseColors = host === 'themarker.com' ? tmBaseColors : htzBaseColors;
  return {
    ...baseColors,
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
      // Primary
      primaryBg: 'white',
      primaryBorder: [ 'button', 'primaryText', ],
      primaryText: [ 'primary', 'base', ],
      primaryActiveBg: '#fff !important',
      primaryActiveBorder: [ 'button', 'primaryText', ],
      primaryActiveText: [ 'primary', 'base', ],
      primaryFocusBg: [ 'primary', 'base', ],
      primaryFocusBorder: [ 'button', 'primaryFocusBg', ],
      primaryFocusText: 'white',
      primaryHoverBg: [ 'primary', '-6', ],
      primaryHoverBorder: [ 'button', 'primaryHoverText', ],
      primaryHoverText: [ 'primary', '+1', ],

      ...(host === 'themarker.com' && tm.variants.button.primary),

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

      ...(host === 'themarker.com' && tm.variants.button.opaque),

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
      secondaryHoverBg: [ 'primary', '-5', ],
      secondaryHoverBorder: [ 'button', 'secondaryHoverText', ],
      secondaryHoverText: [ 'secondary', '+1', ],

      // Secondary Opaque
      secondaryOpaqueBg: [ 'secondary', 'base', ],
      secondaryOpaqueBorder: 'transparent',
      secondaryOpaqueText: 'white',
      secondaryOpaqueActiveBg: [ 'primary', 'base', ],
      secondaryOpaqueActiveBorder: 'transparent',
      secondaryOpaqueActiveText: 'white',
      secondaryOpaqueFocusBg: [ 'primary', '+1', ],
      secondaryOpaqueFocusBorder: 'transparent',
      secondaryOpaqueFocusText: 'white',
      secondaryOpaqueHoverBg: [ 'primary', '+1', ],
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
      neutralFocusText: 'white',
      neutralHoverBg: [ 'neutral', '-6', ],
      neutralHoverBorder: [ 'button', 'neutralHoverText', ],
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
      negativeOpaqueFocusBg: [ 'tertiary', '+2', ],
      negativeOpaqueFocusBorder: 'transparent',
      negativeOpaqueFocusText: '#fff !important',
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
      positiveFocusBg: [ 'positive', 'base', ],
      positiveFocusBorder: 'transparent',
      positiveFocusText: 'rgb(255, 255, 255)',
      positiveHoverBg: [ 'positive', '-2', ],
      positiveHoverBorder: [ 'button', 'positiveHoverText', ],
      positiveHoverText: [ 'positive', '+1', ],

      // Positive Opaque
      positiveOpaqueBg: [ 'positive', 'base', ],
      positiveOpaqueBorder: 'transparent',
      positiveOpaqueText: 'white',
      positiveOpaqueActiveBg: [ 'positive', 'base', ],
      positiveOpaqueActiveBorder: 'transparent',
      positiveOpaqueActiveText: 'white',
      positiveOpaqueFocusBg: [ 'positive', '+2', ],
      positiveOpaqueFocusBorder: 'transparent',
      positiveOpaqueFocusText: 'white',
      positiveOpaqueHoverBg: [ 'positive', '+1', ],
      positiveOpaqueHoverBorder: 'transparent',
      positiveOpaqueHoverText: 'white',

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
    },
    checkBox: {
      // Primary
      primaryBg: 'white',
      primaryBgChecked: [ 'primary', 'base', ],
      primaryBorder: [ 'primary', 'base', ],
      primaryBorderDisabled: [ 'neutral', '-5', ],
      primaryCheck: 'white',
      primaryRipple: [ 'primary', 'base', ],

      ...(host === 'themarker.com' && tm.variants.checkBox),

      // Secondary
      secondaryBg: 'white',
      secondaryBgChecked: [ 'secondary', 'base', ],
      secondaryBorder: [ 'secondary', 'base', ],
      secondaryBorderDisabled: [ 'neutral', '-5', ],
      secondaryCheck: 'white',
      secondaryRipple: [ 'secondary', 'base', ],
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

      ...(host === 'themarker.com' && tm.variants.newsletter),
    },
    highlight: {
      base: [ 'quaternary', 'base', ],
      dimm: [ 'quaternary', '-2', ],
    },
    icon: {
      base: [ 'primary', 'base', ],
      text: [ 'neutral', '-3', ],
    },
    select: {
      // Primary
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

      ...(host === 'themarker.com' && tm.variants.input),

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
      primaryInverseErrorTextNote: [ 'tertiary', '-3', ],

      // PrimaryInverse Hover
      primaryInverseHoverBg: [ 'primary', '-5', ],
      primaryInverseHoverBorder: [ 'primary', '-4', ],
      primaryInverseHoverText: [ 'bodyText', 'base', ],
    },
    header: {
      backLinkText: [ 'neutral', '-3', ],
      badgeBg: 'white',
      badgeBorder: [ 'positive', 'base', ],
      badgeText: [ 'positive', 'base', ],
      border: [ 'neutral', '-4', ],
      // todo: get color for under logo themarker
      underLogoText:
        host === 'themarker.com' ? [ 'neutral', '-1', ] : [ 'secondary', 'base', ],
    },
    image: {
      bgc: [ 'neutral', '-6', ],
    },

    offerPage: {
      bannerColor: [ 'secondary', 'base', ],
      bg: 'white',
      border: [ 'neutral', '-4', ],
      borderDivider: [ 'neutral', '-4', ],
      borderHighlighted: [ 'primary', '-3', ],
      borderPositive: [ 'positive', 'base', ],
      link: [ 'primary', '-1', ],
      linkHome: [ 'primary', 'base', ],
      secondaryOfferText: [ 'neutral', '-3', ],
      tableFooterText: [ 'positive', 'base', ],
      ...(host === 'themarker.com' ? tm.offerPage : htz.offerPage),
    },

    ...(host === 'themarker.com' ? tm.misc : htz.misc),

    purchasePageLandingList: {
      bg: 'white',
      text: 'bodyText',
      iconColor: [ 'primary', '+1', ],
    },
    phones: {
      htz: htz.phone,
      tm: tm.phone,
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

      ...(host === 'themarker.com' && tm.checkBox),
    },
    sales: {
      '-2': '#FFF7E5',
      '-1': '#FFC64D',
      base: '#FFA500',
      '+1': '#FA9E00',
      '+2': '#F59300',
      // '+3': '#ED8600',
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
      '-2': '#F5FFF5',
      '-1': '#5BB856',
      base: '#2F872A',
      '+1': '#266D22',
      '+2': '#194716',
      a11yOnDark: [ 'positive', '-1', ],
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
};

export { colors, };
