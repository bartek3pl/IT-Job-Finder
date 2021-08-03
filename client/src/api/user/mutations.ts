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
        login
        firstName
        lastName
        email
        age
        gender
        address {
          country
          city
          street
          postalCode
          buildingNumber
          apartmentNumber
        }
        skills
        experienceYears
        levels
        minSalary
        maxSalary
        githubLink
        linkedinLink
        emailNotification
      }
    }
  }
`;
