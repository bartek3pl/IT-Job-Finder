import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input CreateJobOfferInput {
    title: String!
    description: String
    employer: UpdateCompanyInput!
    minSalary: Salary
    maxSalary: Salary
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

  type JobOfferResults implements Page {
    pageInfo: PageInfo!
    jobOffers: [JobOffer]
  }

  input JobOfferSearch {
    title: String
    description: String
    employer: CompanySearch
    minSalary: Salary
    maxSalary: Salary
    skills: [String!]
    experienceYears: Int
    level: Level
    contractType: ContractType
  }

  type JobOffersResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    results: JobOfferResults
  }

  "Full details about posted job offer"
  type JobOffer @cacheControl(maxAge: 3600) {
    _id: ID!
    title: String!
    description: String
    employer: Company!
    minSalary: Salary
    maxSalary: Salary
    skills: [String!]!
    experienceYears: Int
    level: Level
    contractType: ContractType
    createdDateTime: DateTime!
    updatedDateTime: DateTime!
  }
`;

export default typeDefs;
