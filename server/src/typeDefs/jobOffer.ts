import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input CreateJobOfferInput {
    title: String!
    description: String
    employer: UpdateCompanyInput!
    minSalary: Salary!
    maxSalary: Salary!
    skills: [String!]!
    experienceYears: Int
    level: Level
    contractType: ContractType
  }

  input UpdateJobOfferInput {
    title: String
    description: String
    employer: UpdateCompanyInput
    minSalary: Salary
    maxSalary: Salary
    skills: [String!]
    experienceYears: Int
    level: Level
    contractType: ContractType
  }

  type JobOfferResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    jobOffer: JobOffer
  }

  type JobOffersResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    jobOffers: [JobOffer]
  }

  "Full details about posted job offer"
  type JobOffer {
    _id: ID!
    title: String!
    description: String
    employer: Company!
    minSalary: Salary!
    maxSalary: Salary!
    skills: [String!]!
    experienceYears: Int
    level: Level
    contractType: ContractType
    createdDateTime: DateTime!
    updatedDateTime: DateTime!
  }
`;

export default typeDefs;