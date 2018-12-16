// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { teaserForRelatedArticles, } from '../teaser/teaser';

export default gql`
  fragment SeriesOrBlockArticles on SeriesOrBlockArticles {
    articles {
      ...TeaserForRelatedArticles
    }
    seriesTitle
    sort
    itemsPerPage
    usePagination
    inputTemplate
    contentId
    contentName
    kind
  }
  ${teaserForRelatedArticles}
`;
