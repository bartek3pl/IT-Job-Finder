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
import JobOffer from '../../../models/jobOffer';

const databaseErrorResponse: JobOfferResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  jobOffer: null,
};

const jobOfferMutations = {
  createJobOffer: async (
    _parent: any,
    {
      input: {
        title,
        description,
        employer,
        minSalary,
        maxSalary,
        skills,
        experienceYears,
        level,
        contractType,
      },
    }: { input: CreateJobOfferInput },
    { token }: Token
  ): Promise<JobOfferResponse> => {
    if (!token) {
      throw new AuthenticationError('Invalid authentication token.');
    }

    const createdDateTime = timestampToDateTime(new Date());
    let jobOffer: JobOfferType;

    try {
      jobOffer = await JobOffer.create({
        title,
        description,
        employer,
        minSalary,
        maxSalary,
        skills,
        experienceYears,
        level,
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
    _parent: any,
    { id }: { id: Scalars['ID'] },
    { token }: Token
  ): Promise<JobOfferResponse> => {
    if (!token) {
      throw new AuthenticationError('Invalid authentication token.');
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
    _parent: any,
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
        level,
        contractType,
      },
    }: { id: Scalars['ID']; input: UpdateJobOfferInput },
    { token }: Token
  ): Promise<JobOfferResponse> => {
    if (!token) {
      throw new AuthenticationError('Invalid authentication token.');
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
      let updatedLevel = level;
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
      if (isNullish(updatedLevel)) {
        updatedLevel = jobOffer.level;
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
          level: updatedLevel,
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
