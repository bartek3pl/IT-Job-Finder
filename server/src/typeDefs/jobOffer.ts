import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type JobOffer {
    title: String!
    description: String
    employer: Company!
    salary: Salary
    skills: [String!]!
    experienceYears: Int
    level: Level
    contractType: ContractType
    createdDate: DateTime!
    updatedDate: DateTime!
  }
`;

export default typeDefs;
