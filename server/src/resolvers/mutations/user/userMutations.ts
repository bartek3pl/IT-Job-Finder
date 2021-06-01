import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
  UserFavouriteJobOffersResponse,
  UserTokenResponse,
  User as UserType,
  JobOffer as JobOfferType,
  Maybe,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import { timestampToDateTime } from '../../../utils/converters';
import {
  validateLogin,
  validatePassword,
} from '../../../validators/validateInputs';
import validateEmail from '../../../validators/scalars/validateEmail';
import userC from './constants';
import jobOfferC from '../jobOffer/constants';
import globalC from '../../../constants';
import User from '../../../models/user';
import JobOffer from '../../../models/jobOffer';
import authService from '../../../services/authService';

const databaseUserErrorResponse: UserResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  user: null,
};

const databaseUserJobOffersErrorResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  user: null,
  jobOffers: [],
};

const databaseUserTokenErrorResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userMutations = {
  login: async (
    _parent: unknown,
    {
      input: { login, password },
    }: { input: { login: Scalars['String']; password: Scalars['String'] } }
  ): Promise<UserTokenResponse> => {
    let user: UserType;
    let accessToken: Token;
    let refreshToken: Token;

    try {
      user = await User.findOne({ login }).lean();

      if (!user) {
        return {
          code: 404,
          success: false,
          message: userC.USER_NOT_EXISTS,
          user: null,
          accessToken: null,
          refreshToken: null,
        };
      }

      const userPassword = user.password;
      const isPasswordValid = await bcrypt.compare(password, userPassword);

      if (!isPasswordValid) {
        return {
          code: 401,
          success: false,
          message: userC.WRONG_PASSWORD,
          user: null,
          accessToken: null,
          refreshToken: null,
        };
      }

      const userId = user._id;
      accessToken = authService.generateAccessToken(userId);
      refreshToken = authService.generateRefreshToken(userId);
    } catch (error) {
      console.error(error);
      return databaseUserTokenErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: userC.USER_SUCCESSFULLY_LOGGED_IN,
      user,
      accessToken,
      refreshToken,
    };
  },

  createUser: async (
    _parent: unknown,
    {
      input: {
        login,
        password,
        email,
        firstName,
        lastName,
        age,
        gender,
        address,
        skills,
        experienceYears,
        level,
        minSalary,
        maxSalary,
        githubLink,
        linkedinLink,
        emailNotification,
      },
    }: { input: CreateUserInput }
  ): Promise<UserResponse> => {
    if (!validateLogin(login)) {
      return {
        code: 400,
        success: false,
        message: userC.INVALID_LOGIN,
        user: null,
      };
    }

    if (!validateEmail(email)) {
      return {
        code: 400,
        success: false,
        message: userC.INVALID_EMAIL,
        user: null,
      };
    }

    if (!validatePassword(password)) {
      return {
        code: 400,
        success: false,
        message: userC.INVALID_PASSWORD,
        user: null,
      };
    }

    const createdDateTime = timestampToDateTime(new Date());
    let user: UserType;

    try {
      const isLoginInDatabase = await User.exists({ login });

      if (isLoginInDatabase) {
        return {
          code: 409,
          success: false,
          message: userC.NOT_UNIQUE_LOGIN,
          user: null,
        };
      }

      const isEmailInDatabase = await User.exists({ email });

      if (isEmailInDatabase) {
        return {
          code: 409,
          success: false,
          message: userC.NOT_UNIQUE_EMAIL,
          user: null,
        };
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        login,
        email,
        password: encryptedPassword,
        firstName,
        lastName,
        age,
        gender,
        address,
        skills,
        experienceYears,
        level,
        minSalary,
        maxSalary,
        githubLink,
        linkedinLink,
        emailNotification,
        createdDateTime,
        updatedDateTime: createdDateTime,
      });
    } catch (error) {
      console.error(error);
      return databaseUserErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: userC.USER_SUCCESSFULLY_CREATED,
      user,
    };
  },

  deleteUser: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    { accessToken }: { accessToken: Token }
  ): Promise<UserResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let user: UserType;

    try {
      const isUserInDatabase = await User.exists({ _id: id });

      if (!isUserInDatabase) {
        return {
          code: 404,
          success: false,
          message: userC.USER_NOT_EXISTS,
          user: null,
        };
      }

      user = await User.findByIdAndDelete(id).lean();
    } catch (error) {
      console.error(error);
      return databaseUserErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: userC.USER_SUCCESSFULLY_DELETED,
      user,
    };
  },

  updateUser: async (
    _parent: unknown,
    {
      id,
      input: {
        firstName,
        lastName,
        age,
        gender,
        address,
        skills,
        experienceYears,
        level,
        minSalary,
        maxSalary,
        githubLink,
        linkedinLink,
        emailNotification,
      },
    }: { id: Scalars['ID']; input: UpdateUserInput },
    { accessToken }: { accessToken: Token }
  ): Promise<UserResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const updatedDateTime = timestampToDateTime(new Date());
    let user: UserType;

    try {
      const isUserInDatabase = await User.exists({ _id: id });

      if (!isUserInDatabase) {
        return {
          code: 404,
          success: false,
          message: userC.USER_NOT_EXISTS,
          user: null,
        };
      }

      user = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          age,
          gender,
          address,
          skills,
          experienceYears,
          level,
          minSalary,
          maxSalary,
          githubLink,
          linkedinLink,
          emailNotification,
          updatedDateTime,
        },
        { new: true }
      ).lean();
    } catch (error) {
      console.error(error);
      return databaseUserErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: userC.USER_SUCCESSFULLY_UPDATED,
      user,
    };
  },

  addJobOfferToUserFavourite: async (
    _parent: unknown,
    {
      userId,
      jobOfferId,
    }: { userId: Scalars['ID']; jobOfferId: Scalars['ID'] },
    { accessToken }: { accessToken: Token }
  ): Promise<UserFavouriteJobOffersResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let user: UserType;
    let jobOffers: Array<Maybe<JobOfferType>>;

    try {
      user = await User.findById(userId).lean();

      if (!user) {
        return {
          code: 404,
          success: false,
          message: userC.USER_NOT_EXISTS,
          user: null,
          jobOffers: [],
        };
      }

      const jobOffer = await JobOffer.findById(jobOfferId);

      if (!jobOffer) {
        return {
          code: 404,
          success: false,
          message: jobOfferC.JOB_OFFER_NOT_EXISTS,
          user: null,
          jobOffers: [],
        };
      }

      const isJobOfferAlreadyFavourite = await User.exists({
        _id: userId,
        'favouriteJobOffers._id': jobOfferId,
      });

      if (isJobOfferAlreadyFavourite) {
        jobOffers = user.favouriteJobOffers ?? [];

        return {
          code: 409,
          success: false,
          message: userC.JOB_OFFER_ALREADY_FAVOURITE,
          user,
          jobOffers,
        };
      }

      user = await User.findByIdAndUpdate(
        userId,
        { $push: { favouriteJobOffers: jobOffer } },
        { new: true }
      ).lean();

      jobOffers = user.favouriteJobOffers ?? [];
    } catch (error) {
      console.error(error);
      return databaseUserJobOffersErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: userC.JOB_OFFER_SUCCESSFULLY_ADDED,
      user,
      jobOffers,
    };
  },

  deleteJobOfferFromUserFavourite: async (
    _parent: unknown,
    {
      userId,
      jobOfferId,
    }: { userId: Scalars['ID']; jobOfferId: Scalars['ID'] },
    { accessToken }: { accessToken: Token }
  ): Promise<UserFavouriteJobOffersResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let user: UserType;
    let jobOffers: Array<Maybe<JobOfferType>>;

    try {
      user = await User.findById(userId).lean();

      if (!user) {
        return {
          code: 404,
          success: false,
          message: userC.USER_NOT_EXISTS,
          user: null,
          jobOffers: [],
        };
      }

      const jobOffer = await JobOffer.findById(jobOfferId);

      if (!jobOffer) {
        return {
          code: 404,
          success: false,
          message: jobOfferC.JOB_OFFER_NOT_EXISTS,
          user: null,
          jobOffers: [],
        };
      }

      const isJobOfferFavourite = await User.exists({
        _id: userId,
        'favouriteJobOffers._id': jobOfferId,
      });

      if (!isJobOfferFavourite) {
        jobOffers = user.favouriteJobOffers ?? [];

        return {
          code: 404,
          success: false,
          message: userC.JOB_OFFER_NOT_FAVOURITE,
          user,
          jobOffers,
        };
      }

      user = await User.findByIdAndUpdate(
        userId,
        { $pull: { favouriteJobOffers: { _id: jobOffer._id } } },
        { new: true }
      ).lean();

      jobOffers = user.favouriteJobOffers ?? [];
    } catch (error) {
      console.error(error);
      return databaseUserJobOffersErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: userC.JOB_OFFER_SUCCESSFULLY_DELETED,
      user,
      jobOffers,
    };
  },
};

export default userMutations;
