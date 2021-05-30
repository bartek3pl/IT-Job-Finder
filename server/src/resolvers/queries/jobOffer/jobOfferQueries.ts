import { AuthenticationError } from 'apollo-server-express';

import {
  JobOfferResponse,
  JobOffersResponse,
  JobOffer as JobOfferType,
  JobOfferSearch,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import C from './constants';
import globalC from '../../../constants';
import JobOffer from '../../../models/jobOffer';
import config from '../../../config';
import { getPageInfo } from '../../../utils/pagination';

const databaseErrorJobOffersResponse: JobOffersResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  results: null,
};

const databaseErrorJobOfferResponse: JobOfferResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  jobOffer: null,
};

const userQueries = {
  getAllJobOffers: async (
    _parent: unknown,
    {
      first = config.PAGE_SIZE,
      offset = 0,
      sorting,
      search: {
        title,
        description,
        employer,
        minSalary,
        maxSalary,
        skills,
        experienceYears,
        level,
        contractType,
      } = {
        title: '',
        description: '',
        employer: {
          name: '',
          address: { country: '', city: '' },
        },
        minSalary: 0,
        maxSalary: 50000,
        skills: [],
        experienceYears: null,
        level: null,
        contractType: null,
      },
    }: {
      first: Scalars['Int'];
      offset: Scalars['Int'];
      sorting: Scalars['String'];
      search: JobOfferSearch;
    },
    { accessToken }: { accessToken: Token }
  ): Promise<JobOffersResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const pageInfo = await getPageInfo(JobOffer, first, offset);
    let jobOffers: Array<JobOfferType>;

    try {
      jobOffers = await JobOffer.find({
        $and: [
          title ? { title: { $regex: title, $options: 'i' } } : {},
          description
            ? { description: { $regex: description, $options: 'i' } }
            : {},
          employer?.name
            ? { 'employer.name': { $regex: employer?.name, $options: 'i' } }
            : {},
          employer?.address?.country
            ? {
                'employer.address.country': {
                  $regex: employer?.address?.country,
                  $options: 'i',
                },
              }
            : {},
          employer?.address?.city
            ? {
                'employer.address.city': {
                  $regex: employer?.address?.city,
                  $options: 'i',
                },
              }
            : {},
          minSalary ? { minSalary: { $gte: minSalary } } : {},
          maxSalary ? { maxSalary: { $lte: maxSalary } } : {},
          skills?.length ? { skills: { $in: skills } } : {},
          experienceYears !== 0
            ? { experienceYears: { $lte: experienceYears } }
            : {},
          level ? { level: { $regex: level, $options: 'i' } } : {},
          contractType
            ? { contractType: { $regex: contractType, $options: 'i' } }
            : {},
        ],
      })
        .sort(sorting)
        .skip(offset)
        .limit(first)
        .lean();

      if (!jobOffers?.length) {
        return {
          code: 404,
          success: true,
          message: C.NO_JOB_OFFERS_IN_DATABASE,
          results: {
            pageInfo,
            jobOffers,
          },
        };
      }
    } catch (error) {
      console.error(error);
      return databaseErrorJobOffersResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.JOB_OFFERS_SUCCESSFULLY_FETCHED,
      results: {
        pageInfo,
        jobOffers,
      },
    };
  },

  getJobOfferById: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    { accessToken }: { accessToken: Token }
  ): Promise<JobOfferResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let jobOffer: JobOfferType;

    try {
      jobOffer = await JobOffer.findById(id).lean();

      if (!jobOffer) {
        return {
          code: 404,
          success: false,
          message: C.JOB_OFFER_NOT_EXISTS,
          jobOffer: null,
        };
      }
    } catch (error) {
      console.error(error);
      return databaseErrorJobOfferResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.JOB_OFFER_SUCCESSFULLY_FETCHED,
      jobOffer,
    };
  },
};

export default userQueries;
