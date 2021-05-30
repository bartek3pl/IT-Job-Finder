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
    getAllJobOffers(first: Int, offset: Int): JobOffersResponse

    """
    Gets one job offer by job offer ID.
    """
    getJobOfferById(id: ID!): JobOfferResponse

    """
    Gets all favourite job offers of chosen user.
    """
    getUserFavouriteJobOffers(id: ID!): JobOffersResponse

    """
    Gets all companies.
    """
    getAllCompanies: CompaniesResponse

    """
    Gets one company by company ID.
    """
    getCompanyById(id: ID!): CompanyResponse
  }
`;

export default typeDefs;
