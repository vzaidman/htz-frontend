import { createApp, InitPixel, } from '@haaretz/htz-components';
import { withData, } from '@haaretz/app-utils';

const initialState = () => ({
  a11yToggle: false,
  articleId: null,
  isCommentsNumberLoaded: false,
  articleSection: {
    name: null,
    id: null,
    url: null,
    __typename: 'ArticleSection',
  },
  canonicalUrl: '',
  commentsElementId: null,
  isMouseStory: false,
  //  makes sure that if we have another outbrain element on the page it calls outbrains
  // reload function script before calling the outbrain json api
  isOsakaDisplayed: false,
  pageGallery: {
    isOpen: false,
    startWith: null,
    __typename: 'PageGallery',
  },
  osakaCanRender: false,
  pageType: null,
  platform: null,
  pageType: null,
  readingListArray: [],
  zenMode: false,
  pageDateTimeString: null,
});

export default withData(createApp(InitPixel), initialState);
