// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  mutation SignUpNewsletter(
    $email: String!
    $segmentId: ID!
    $checkBox: Boolean!
  ) {
    signUpNewsletter(
      newsletterSignUp: {
        userEmail: $email
        segmentId: $segmentId
        checkBox: $checkBox
      }
    ) {
      status
    }
  }
`;
