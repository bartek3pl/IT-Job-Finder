import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input UserInput {
    login: String!
    password: String!
    email: Email!
  }

  type UserMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  "Full details about registered user"
  type User {
    _id: ID!
    login: String!
    password: String!
    firstName: String
    lastName: String
    email: Email!
    age: Int
    gender: Gender
    address: Address
    skills: [String!]
    experienceYears: Int
    level: Level
    salary: Salary
    githubLink: String
    linkedinLink: String
    favouriteJobOffers: [JobOffer!]
    emailNotification: Boolean
    createdDate: DateTime!
    updatedDate: DateTime!
  }
`;

export default typeDefs;
