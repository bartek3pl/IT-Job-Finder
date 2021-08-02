import { gql } from '@apollo/client';

export const ADD_JOB_OFFER_TO_USER_FAVOURITE = gql`
  mutation addJobOfferToUserFavourite($userId: ID, $jobOfferId: ID) {
    addJobOfferToUserFavourite(userId: $userId, jobOfferId: $jobOfferId) {
      code
      message
      success
    }
  }
`;

export const DELETE_JOB_OFFER_FROM_USER_FAVOURITE = gql`
  mutation deleteJobOfferFromUserFavourite($userId: ID, $jobOfferId: ID) {
    deleteJobOfferFromUserFavourite(userId: $userId, jobOfferId: $jobOfferId) {
      code
      message
      success
    }
  }
`;

export const CHECK_JOB_OFFER_USER_FAVOURITE = gql`
  mutation checkJobOfferUserFavourite($userId: ID, $jobOfferId: ID) {
    checkJobOfferUserFavourite(userId: $userId, jobOfferId: $jobOfferId) {
      code
      message
      success
      isFavourite
    }
  }
`;
