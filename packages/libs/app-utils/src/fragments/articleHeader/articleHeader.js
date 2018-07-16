// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment ArticleHeader on ArticleHeader {
    contentId
    contentName
    inputTemplate
    data {
      exclusive
      lastUpdate
      publishDate
      subtitle
      title
    }
  }
`;
