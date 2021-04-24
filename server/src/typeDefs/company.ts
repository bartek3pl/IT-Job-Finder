import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input UpdateCompanyInput {
    name: String
    address: UpdateAddressInput
    employeesNumber: Int
    logo: FileInput
  }

  "Full details about company"
  type Company {
    _id: ID!
    name: String!
    address: Address
    employeesNumber: Int
    logo: File
  }
`;

export default typeDefs;
