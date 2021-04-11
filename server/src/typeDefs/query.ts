import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    empty: String
  }
`;

export default typeDefs;
