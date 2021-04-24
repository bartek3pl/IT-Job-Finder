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
  }
`;

export default typeDefs;
