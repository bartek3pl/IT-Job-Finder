import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput) {
    createUser(input: $input) {
      code
      message
      success
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginUserInput) {
    login(input: $input) {
      code
      message
      success
      accessToken
      refreshToken
      user {
        _id
        firstName
      }
    }
  }
`;
