import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    """
    Create user with login, password and email.
    """
    createUser(input: UserInput): UserMutationResponse
  }
`;

export default typeDefs;
