import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type AccessTokenResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    accessToken: Token
  }

  type RefreshTokenResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    refreshToken: Token
  }

  "Full JWT token details."
  type Token {
    alg: String!
    typ: String!
    iss: String!
    exp: String!
    sub: String!
    aud: String!
    iat: String!
    jti: String!
  }
`;

export default typeDefs;
