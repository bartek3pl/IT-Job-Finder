import { gql } from '@apollo/client';

export const GET_ALL_JOB_OFFERS = gql`
  query getAllJobOffers(
    $offset: Int
    $first: Int
    $sorting: String
    $search: JobOfferSearch
  ) {
    getAllJobOffers(
      offset: $offset
      first: $first
      sorting: $sorting
      search: $search
    ) {
      code
      message
      success
      results {
        pageInfo {
          totalCount
          currentCount
          hasMore
        }
        jobOffers {
          _id
          title
          description
          employer {
            name
            address {
              country
              city
              street
              postalCode
              buildingNumber
              apartmentNumber
            }
            employeesNumber
            logo
          }
          minSalary
          maxSalary
          skills
          experienceYears
          levels
          contractType
        }
      }
    }
  }
`;
