// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { authorImage, } from '../image/image';
import paragraph from '../paragraph/paragraph';

export default gql`
  fragment Author on Author {
    ...AuthorImage
    contentId
    contentName
    authorType
    email
    biography {
      ... on Paragraph {
        ...Paragraph
      }
    }
    facebook
    gplus
    hasEmailAlerts
    hasPushAlerts
    inputTemplate
    twitter
    url
  }
  ${authorImage}
  ${paragraph}
`;
