import gql from 'graphql-tag';
import {
  seoData,

} from '@haaretz/app-utils';

export default gql`
  query ArticleBIContent($path: String!) {
    page(path: $path) {
      pageType
      ...PageSeoData
      slots {
        article {
          ... on ArticleData {
            authors {
              ... on CreditObject {
                name
              }
              ... on AuthorObject {
                contentName
              }
            }
          }
        }
      }
    }
  }
  ${seoData}
`;
