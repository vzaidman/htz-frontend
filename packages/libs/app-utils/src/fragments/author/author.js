// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { authorImage, } from '../image/image';

export default {
  authorObj: gql`
    fragment AuthorObj on AuthorObject {
      ...AuthorImage
      contentId
      contentName
      authorType
      email
      facebook
      gplus
      hasEmailAlerts
      hasPushAlerts
      inputTemplate
      twitter
      url
    }
    ${authorImage}
  `,
  creditObj: gql`
    fragment CreditObj on CreditObject {
      name
    }
  `,
};
