import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type AccessTokenResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    accessToken: String
  }

  type AccessRefreshTokenResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    accessToken: String
    refreshToken: String
  }

  "Full JWT token payload details."
  type Token {
    typ: String!
    exp: Int!
    sub: Int!
    iss: String!
    aud: String!
    iat: String!
  }
`;

export default typeDefs;
