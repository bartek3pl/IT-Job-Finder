import { gql } from 'apollo-server-express';

const typeDefs = gql`
  "Full details about company"
  type Company {
    name: String!
    address: Address
    employeesNumber: Int
    logo: File
  }
`;

export default typeDefs;
