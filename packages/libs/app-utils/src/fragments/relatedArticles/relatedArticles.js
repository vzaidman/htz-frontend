// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { teaserForRelatedArticles, } from '../teaser/teaser';

export default gql`
  fragment RelatedArticles on RelatedArticles {
    articles {
      ...TeaserForRelatedArticles
    }
    kind
  }
  ${teaserForRelatedArticles}
`;
