import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Company {
    name: String!
    address: Address
    employeesNumber: Int
    logo: File
  }
`;

export default typeDefs;
