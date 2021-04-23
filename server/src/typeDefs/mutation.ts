import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    """
    Creates user with login, password and email.
    """
    createUser(input: CreateUserInput): UserResponse

    """
    Deletes user by ID.
    """
    deleteUser(id: ID!): UserResponse

    """
    Updates user by ID.
    """
    updateUser(id: ID!, input: UpdateUserInput): UserResponse
  }
`;

export default typeDefs;
