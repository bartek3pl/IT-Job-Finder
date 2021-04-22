import { gql } from 'apollo-server-express';

const typeDefs = gql`
  interface MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
`;

export default typeDefs;
