import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    empty: String
  }
`;

export default typeDefs;
