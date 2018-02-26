// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  mutation ReportAbuse(
    $commentId: ID!
    $commentElementId: ID!
    $captchaKey: String!
  ) {
    reportAbuse(
      newAbuseReport: {
        commentId: $commentId
        commentElementId: $commentElementId
        captchaKey: $captchaKey
      }
    ) {
      status
    }
  }
`;
