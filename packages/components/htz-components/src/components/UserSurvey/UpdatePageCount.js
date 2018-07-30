import gql from 'graphql-tag';

export default gql`
  mutation SetPageCount($id: String, $value: Int) {
    setPageCount(id: $id, value: $value)
  }
`;
