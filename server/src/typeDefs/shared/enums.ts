import { gql } from 'apollo-server-express';

const typeDefs = gql`
  enum Level {
    JUNIOR
    MID
    SENIOR
  }

  enum ContractType {
    UOP
    B2B
  }
`;

export default typeDefs;
