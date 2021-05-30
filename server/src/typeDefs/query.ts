import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    """
    Gets all offset-based paginated users.
    """
    getAllUsers(
      first: Int
      offset: Int
      sorting: String
      search: UserSearch
    ): UsersResponse

    """
    Gets one user by user ID.
    """
    getUserById(id: ID!): UserResponse

    """
    Gets all offset-based paginated job offers.
    """
    getAllJobOffers(
      first: Int
      offset: Int
      sorting: String
      search: JobOfferSearch
    ): JobOffersResponse

    """
    Gets one job offer by job offer ID.
    """
    getJobOfferById(id: ID!): JobOfferResponse

    """
    Gets all favourite job offers of chosen user.
    """
    getUserFavouriteJobOffers(id: ID!): JobOffersResponse

    """
    Gets all offset-based paginated companies.
    """
    getAllCompanies(
      first: Int
      offset: Int
      sorting: String
      search: CompanySearch
    ): CompaniesResponse

    """
    Gets one company by company ID.
    """
    getCompanyById(id: ID!): CompanyResponse
  }
`;

export default typeDefs;
