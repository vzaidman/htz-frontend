import pageSchema from '../pageSchema';

export default () => ({
  a11yToggle: false,
  articleId: null,
  articleSection: {
    name: null,
    id: null,
    url: null,
    __typename: 'ArticleSection',
  },
  canonicalUrl: '',
  commentsElementId: null,
  //  makes sure that if we have another outbrain element on the page it calls outbrains
  // reload function script before calling the outbrain json api
  isOsakaDisplayed: false,
  osakaCanRender: false,
  pageSchema,
  platform: null,
  readingListArray: [],
  zenMode: false,
});
