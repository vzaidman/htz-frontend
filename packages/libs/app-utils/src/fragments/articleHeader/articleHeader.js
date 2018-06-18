// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import author from '../author/author';
import { headlineImage, } from '../image/image';

export default gql`
  fragment ArticleHeader on ArticleHeader {
    contentId
    contentName
    inputTemplate
    data {
      authors {
        ... on CreditObject {
          ...CreditObj
        }
        ... on AuthorObject {
          ...AuthorObj
        }
      }
      ...HeadlineImage
      exclusive
      mobileExclusive
      mobileSubtitle
      mobileTitle
      modDate
      pubDate
      reportingFrom
      subtitle
      title
    }
  }
  ${author.authorObj}
  ${author.creditObj}
  ${headlineImage}
`;
