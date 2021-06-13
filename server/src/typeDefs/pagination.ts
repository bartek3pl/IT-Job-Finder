import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type PageInfo {
    totalCount: Int!
    currentCount: Int!
    hasMore: Boolean!
  }

  interface Page {
    pageInfo: PageInfo!
  }
`;

export default typeDefs;
