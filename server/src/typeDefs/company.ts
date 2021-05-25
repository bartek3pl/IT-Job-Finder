import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input CreateCompanyInput {
    name: String!
    address: UpdateAddressInput
    employeesNumber: Int
    logo: FileInput
  }

  input UpdateCompanyInput {
    name: String
    address: UpdateAddressInput
    employeesNumber: Int
    logo: FileInput
  }

  type CompanyResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    company: Company
  }

  type CompaniesResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    companies: [Company]
  }

  "Full details about company"
  type Company {
    _id: ID!
    name: String!
    address: Address!
    employeesNumber: Int
    logo: File
    createdDateTime: DateTime!
    updatedDateTime: DateTime!
  }
`;

export default typeDefs;