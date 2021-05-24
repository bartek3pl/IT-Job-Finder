import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input LoginUserInput {
    login: String!
    password: String!
  }

  input CreateUserInput {
    login: String!
    password: String!
    email: Email!
    firstName: String
    lastName: String
    age: Int
    gender: Gender
    address: UpdateAddressInput
    skills: [String!]
    experienceYears: Int
    level: Level
    minSalary: Salary
    maxSalary: Salary
    githubLink: String
    linkedinLink: String
    emailNotification: Boolean
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    age: Int
    gender: Gender
    address: UpdateAddressInput
    skills: [String!]
    experienceYears: Int
    level: Level
    minSalary: Salary
    maxSalary: Salary
    githubLink: String
    linkedinLink: String
    emailNotification: Boolean
  }

  type UserResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type UsersResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    users: [User]
  }

  type UserFavouriteJobOffersResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    user: User
    jobOffers: [JobOffer]
  }

  type UserTokenResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    user: User
    accessToken: String
    refreshToken: String
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
    minSalary: Salary
    maxSalary: Salary
    githubLink: String
    linkedinLink: String
    favouriteJobOffers: [JobOffer!]
    emailNotification: Boolean
    createdDateTime: DateTime!
    updatedDateTime: DateTime!
  }
`;

export default typeDefs;
