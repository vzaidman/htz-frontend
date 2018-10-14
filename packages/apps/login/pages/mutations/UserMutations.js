import gql from 'graphql-tag';

const GENERATE_HASH = gql`
  mutation GenerateHash($typeId: String!) {
    generateOtp(typeId: $typeId) {
      success
      msg
      hash
    }
  }
`;

export { GENERATE_HASH, };
