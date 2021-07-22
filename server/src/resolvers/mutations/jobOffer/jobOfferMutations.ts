import { AuthenticationError } from 'apollo-server-express';

import {
  CreateJobOfferInput,
  UpdateJobOfferInput,
  JobOfferResponse,
  JobOffer as JobOfferType,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import { timestampToDateTime } from '../../../utils/converters';
import { isNullish } from '../../../utils/checkers';
import C from './constants';
import globalC from '../../../constants';
import JobOffer from '../../../models/jobOffer';

const databaseErrorResponse: JobOfferResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  jobOffer: null,
};

const jobOfferMutations = {
  createJobOffer: async (
    _parent: unknown,
    {
      input: {
        title,
        description,
        employer,
        minSalary,
        maxSalary,
        skills,
        experienceYears,
        levels,
        contractType,
      },
    }: { input: CreateJobOfferInput },
    { accessToken }: { accessToken: Token }
  ): Promise<JobOfferResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const createdDateTime = timestampToDateTime(new Date());
    let jobOffer: JobOfferType;

    try {
      const isJobOfferInDatabase = await JobOffer.exists({
        title,
        contractType,
        levels,
        minSalary,
        maxSalary,
        'employer.name': employer.name,
        'employer.address.country': employer.address?.country || null,
        'employer.address.city': employer.address?.city || null,
      });

      if (isJobOfferInDatabase) {
        return {
          code: 409,
          success: false,
          message: C.JOB_OFFER_ALREADY_EXISTS,
          jobOffer: null,
        };
      }

      jobOffer = await JobOffer.create({
        title,
        description,
        employer,
        minSalary,
        maxSalary,
        skills,
        experienceYears,
        levels,
        contractType,
        createdDateTime,
        updatedDateTime: createdDateTime,
      });
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.JOB_OFFER_SUCCESSFULLY_CREATED,
      jobOffer,
    };
  },

  deleteJobOffer: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    { accessToken }: { accessToken: Token }
  ): Promise<JobOfferResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let jobOffer: JobOfferType;

    try {
      const isJobOfferInDatabase = await JobOffer.exists({ _id: id });

      if (!isJobOfferInDatabase) {
        return {
          code: 404,
          success: false,
          message: C.JOB_OFFER_NOT_EXISTS,
          jobOffer: null,
        };
      }

      jobOffer = await JobOffer.findByIdAndDelete(id).lean();
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.JOB_OFFER_SUCCESSFULLY_DELETED,
      jobOffer,
    };
  },

  updateJobOffer: async (
    _parent: unknown,
    {
      id,
      input: {
        title,
        description,
        employer,
        minSalary,
        maxSalary,
        skills,
        experienceYears,
        levels,
        contractType,
      },
    }: { id: Scalars['ID']; input: UpdateJobOfferInput },
    { accessToken }: { accessToken: Token }
  ): Promise<JobOfferResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const updatedDateTime = timestampToDateTime(new Date());
    let jobOffer: JobOfferType;

    try {
      const isJobOfferInDatabase = await JobOffer.exists({ _id: id });

      if (!isJobOfferInDatabase) {
        return {
          code: 404,
          success: false,
          message: C.JOB_OFFER_NOT_EXISTS,
          jobOffer: null,
        };
      }

      jobOffer = await JobOffer.findById(id);

      let updatedTitle = title;
      let updatedDescription = description;
      let updatedEmployer = employer;
      let updatedMinSalary = minSalary;
      let updatedMaxSalary = maxSalary;
      let updatedSkills = skills;
      let updatedExperienceYears = experienceYears;
      let updatedLevels = levels;
      let updatedContractType = contractType;

      if (isNullish(updatedTitle)) {
        updatedTitle = jobOffer.title;
      }
      if (isNullish(updatedDescription)) {
        updatedDescription = jobOffer.description;
      }
      if (isNullish(updatedEmployer)) {
        updatedEmployer = jobOffer.employer;
      }
      if (isNullish(updatedMinSalary)) {
        updatedMinSalary = jobOffer.minSalary;
      }
      if (isNullish(updatedMaxSalary)) {
        updatedMaxSalary = jobOffer.maxSalary;
      }
      if (isNullish(updatedSkills)) {
        updatedSkills = jobOffer.skills;
      }
      if (isNullish(updatedExperienceYears)) {
        updatedExperienceYears = jobOffer.experienceYears;
      }
      if (isNullish(updatedLevels)) {
        updatedLevels = jobOffer.levels;
      }
      if (isNullish(updatedContractType)) {
        updatedContractType = jobOffer.contractType;
      }

      jobOffer = await JobOffer.findByIdAndUpdate(
        id,
        {
          title: updatedTitle,
          description: updatedDescription,
          employer: updatedEmployer,
          minSalary: updatedMinSalary,
          maxSalary: updatedMaxSalary,
          skills: updatedSkills,
          experienceYears: updatedExperienceYears,
          levels: updatedLevels,
          contractType: updatedContractType,
          updatedDateTime,
        },
        { new: true }
      ).lean();
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.JOB_OFFER_SUCCESSFULLY_UPDATED,
      jobOffer,
    };
  },
};

export default jobOfferMutations;
