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
    levels: [Level]
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
    levels: [Level]
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

  type UserResults implements Page @cacheControl(maxAge: 10) {
    pageInfo: PageInfo!
    users: [User]
  }

  type UsersResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    results: UserResults
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

  input UserSearch {
    login: String
    firstName: String
    lastName: String
    email: Email
    age: Int
    gender: Gender
    address: SearchAddress
    skills: [String!]
    experienceYears: Int
    levels: [Level]
    minSalary: Salary
    maxSalary: Salary
  }

  "Full details about registered user"
  type User {
    _id: ID!
    login: String! @cacheControl(maxAge: 3600, scope: PRIVATE)
    password: String!
    firstName: String
    lastName: String
    email: Email!
    age: Int
    gender: Gender
    address: Address
    skills: [String]
    experienceYears: Int
    levels: [Level]
    minSalary: Salary
    maxSalary: Salary
    githubLink: String
    linkedinLink: String
    favouriteJobOffers: [JobOffer]
    emailNotification: Boolean
    createdDateTime: DateTime!
    updatedDateTime: DateTime!
  }
`;

export default typeDefs;
