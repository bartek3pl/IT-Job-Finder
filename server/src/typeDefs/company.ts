import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input CreateCompanyInput {
    name: String!
    address: UpdateAddressInput
    employeesNumber: String
    logo: String
  }

  input UpdateCompanyInput {
    name: String
    address: UpdateAddressInput
    employeesNumber: String
    logo: String
  }

  type CompanyResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    company: Company
  }

  type CompanyResults implements Page {
    pageInfo: PageInfo!
    companies: [Company]
  }

  type CompaniesResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    results: CompanyResults
  }

  input CompanySearch {
    name: String
    address: SearchAddress
  }

  "Full details about company"
  type Company @cacheControl(maxAge: 3600) {
    _id: ID!
    name: String!
    address: Address!
    employeesNumber: String
    logo: String
    createdDateTime: DateTime!
    updatedDateTime: DateTime!
  }
`;

export default typeDefs;
