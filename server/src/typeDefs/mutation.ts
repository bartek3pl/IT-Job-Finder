import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    """
    Creates user with required login, password and email fields.
    """
    createUser(input: CreateUserInput): UserResponse

    """
    Deletes user by ID.
    """
    deleteUser(id: ID!): UserResponse

    """
    Updates user by ID.
    """
    updateUser(id: ID!, input: UpdateUserInput): UserResponse

    """
    Creates job offer with with required title and employer fields.
    """
    createJobOffer(input: CreateJobOfferInput): JobOfferResponse

    """
    Deletes job offer by ID.
    """
    deleteJobOffer(id: ID!): JobOfferResponse

    """
    Updates job offer by ID.
    """
    updateJobOffer(id: ID!, input: UpdateJobOfferInput): JobOfferResponse

    """
    Adds chosen job offer to chosen user favourite job offers.
    """
    addJobOfferToUserFavourite(
      userId: ID
      jobOfferId: ID
    ): UserFavouriteJobOffersResponse

    """
    Deletes chosen job offer from chosen user favourite job offers.
    """
    deleteJobOfferFromUserFavourite(
      userId: ID
      jobOfferId: ID
    ): UserFavouriteJobOffersResponse

    """
    Logins and authorizes user with login and password.
    """
    login(input: LoginUserInput): UserTokenResponse

    """
    Verifies access token validity.
    """
    verifyAccessToken(accessToken: String): AccessTokenResponse

    """
    Generates new access and refresh token by refresh token.
    """
    generateTokensByRefreshToken(
      refreshToken: String
    ): AccessRefreshTokenResponse
  }
`;

export default typeDefs;
