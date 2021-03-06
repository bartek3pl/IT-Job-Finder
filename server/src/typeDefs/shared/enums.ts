import { gql } from 'apollo-server-express';

const typeDefs = gql`
  "Expected experience of the employee"
  enum Level {
    TRAINEE
    JUNIOR
    MID
    SENIOR
    EXPERT
    OTHER
  }

  "Employment contract for the employee"
  enum ContractType {
    UOP
    B2B
    UZ
    OTHER
  }

  "Gender of registered user"
  enum Gender {
    MAN
    WOMAN
    OTHER
  }
`;

export default typeDefs;
