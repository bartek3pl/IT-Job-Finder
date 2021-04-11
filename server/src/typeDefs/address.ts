import { gql } from 'apollo-server-express';

const typeDefs = gql`
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
