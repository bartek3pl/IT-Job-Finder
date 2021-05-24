import { AuthenticationError } from 'apollo-server-express';

import {
  JobOfferResponse,
  JobOffersResponse,
  JobOffer as JobOfferType,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import C from './constants';
import globalC from '../../../constants';
import JobOffer from '../../../models/jobOffer';

const databaseErrorJobOffersResponse: JobOffersResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  jobOffers: null,
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
    _args: unknown,
    token: Token
  ): Promise<JobOffersResponse> => {
    if (!token) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let jobOffers: Array<JobOfferType>;

    try {
      jobOffers = await JobOffer.find({}).lean();

      if (!jobOffers?.length) {
        return {
          code: 404,
          success: true,
          message: C.NO_JOB_OFFERS_IN_DATABASE,
          jobOffers,
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
      jobOffers,
    };
  },

  getJobOfferById: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    token: Token
  ): Promise<JobOfferResponse> => {
    if (!token) {
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
