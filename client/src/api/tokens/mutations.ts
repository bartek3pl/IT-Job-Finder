import { gql } from '@apollo/client';

export const VERIFY_ACCESS_TOKEN = gql`
  mutation verifyAccessToken($accessToken: String) {
    verifyAccessToken(accessToken: $accessToken) {
      code
      message
      success
    }
  }
`;
