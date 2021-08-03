import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID) {
    getUserById(id: $id) {
      code
      message
      success
    }
  }
`;
