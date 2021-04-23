import { gql } from 'apollo-server-express';

const typeDefs = gql`
  "Full details about posted job offer"
  type JobOffer {
    title: String!
    description: String
    employer: Company!
    salary: Salary
    skills: [String!]!
    experienceYears: Int
    level: Level
    contractType: ContractType
    createdDateTime: DateTime!
    updatedDateTime: DateTime!
  }
`;

export default typeDefs;
