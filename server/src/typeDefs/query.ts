import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    """
    Gets all users.
    """
    getAllUsers: UsersResponse

    """
    Gets one user by user ID.
    """
    getUserById(id: ID!): UserResponse
  }
`;

export default typeDefs;
