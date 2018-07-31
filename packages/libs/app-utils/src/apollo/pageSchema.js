export default {
  type: null,
  publisher: {
    type: null,
    name: null,
    url: null,
    sameAs: null,
    logo: {
      type: null,
      image: null,
      url: null,
      __typename: 'Logo',
    },
    __typename: 'Publisher',
  },
  mainEntityOfPage: {
    type: null,
    id: null,
    __typename: 'MainEntityOfPage',
  },
  author: [
    {
      type: null,
      name: null,
      sameAs: null,
      __typename: 'Author',
    },
  ],
  headline: null,
  description: null,
  datePublished: null,
  dateModified: null,
  isAccessibleForFree: 'False',
  hasPart: {
    type: 'WebPageElement',
    isAccessibleForFree: 'False',
    cssSelector: '.paywall',
    __typename: 'HasPart',
  },
  image: [
    {
      type: null,
      url: null,
      description: null,
      name: null,
      width: null,
      height: null,
      __typename: 'Image',
    },
  ],
  __typename: 'PageSchema',
};
