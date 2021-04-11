import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    login: String!
    password: String!
    firstName: String
    lastName: String
    email: Email!
    age: Int
    gender: String
    address: Address
    skills: [String!]
    experienceYears: Int
    level: Level
    salary: Salary
    githubLink: String
    linkedinLink: String
    favouriteJobOffers: [JobOffer!]
    emailNotification: Boolean!
    createdDate: DateTime!
    updatedDate: DateTime!
  }
`;

export default typeDefs;
