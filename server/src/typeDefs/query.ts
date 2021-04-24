import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    """
    Gets all users.
    """
    getAllUsers: UsersResponse

    """
    Gets one user by user ID.
    """
    getUserById(id: ID!): UserResponse

    """
    Gets all job offers.
    """
    getAllJobOffers: JobOffersResponse

    """
    Gets one job offer by job offer ID.
    """
    getJobOfferById(id: ID!): JobOfferResponse
  }
`;

export default typeDefs;
