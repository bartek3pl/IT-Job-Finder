import { gql } from 'apollo-server-express';

const typeDefs = gql`
  interface Response {
    code: Int!
    success: Boolean!
    message: String!
  }
`;

export default typeDefs;
