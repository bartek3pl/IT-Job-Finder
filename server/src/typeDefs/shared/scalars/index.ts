import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar DateTime
  scalar Email
  scalar Salary
  scalar PostalCode
`;

export default typeDefs;
