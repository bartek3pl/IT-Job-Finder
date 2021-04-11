import { gql } from 'apollo-server-express';

const typeDefs = gql`
  "Full address details of user or company"
  type Address {
    country: String
    city: String
    street: String
    postalCode: PostalCode
    buildingNumber: Int
    apartmentNumber: Int
  }
`;

export default typeDefs;
