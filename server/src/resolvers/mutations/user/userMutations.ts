import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
  User as UserType,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import { timestampToDateTime } from '../../../utils/converters';
import {
  validateLogin,
  validatePassword,
} from '../../../validators/validateInputs';
import validateEmail from '../../../validators/scalars/validateEmail';
import C from './constants';
import User from '../../../models/user';

const databaseErrorResponse: UserResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  user: null,
};

const userMutations = {
  createUser: async (
    _parent: any,
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
    }: { input: CreateUserInput },
    { token }: Token
  ): Promise<UserResponse> => {
    if (!token) {
      throw new AuthenticationError('Invalid authentication token.');
    }

    if (!validateLogin(login)) {
      return {
        code: 400,
        success: false,
        message: C.INVALID_LOGIN,
        user: null,
      };
    }

    if (!validateEmail(email)) {
      return {
        code: 400,
        success: false,
        message: C.INVALID_EMAIL,
        user: null,
      };
    }

    if (!validatePassword(password)) {
      return {
        code: 400,
        success: false,
        message: C.INVALID_PASSWORD,
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
          message: C.NOT_UNIQUE_LOGIN,
          user: null,
        };
      }

      const isEmailInDatabase = await User.exists({ email });

      if (isEmailInDatabase) {
        return {
          code: 409,
          success: false,
          message: C.NOT_UNIQUE_EMAIL,
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
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.USER_SUCCESSFULLY_CREATED,
      user,
    };
  },

  deleteUser: async (
    _parent: any,
    { id }: { id: Scalars['ID'] },
    { token }: Token
  ): Promise<UserResponse> => {
    if (!token) {
      throw new AuthenticationError('Invalid authentication token.');
    }

    let user: UserType;

    try {
      const isUserInDatabase = await User.exists({ _id: id });

      if (!isUserInDatabase) {
        return {
          code: 404,
          success: false,
          message: C.USER_NOT_EXISTS,
          user: null,
        };
      }

      user = await User.findByIdAndDelete(id).lean();
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.USER_SUCCESSFULLY_DELETED,
      user,
    };
  },

  updateUser: async (
    _parent: any,
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
    { token }: Token
  ): Promise<UserResponse> => {
    if (!token) {
      throw new AuthenticationError('Invalid authentication token.');
    }

    const updatedDateTime = timestampToDateTime(new Date());
    let user: UserType;

    try {
      const isUserInDatabase = await User.exists({ _id: id });

      if (!isUserInDatabase) {
        return {
          code: 404,
          success: false,
          message: C.USER_NOT_EXISTS,
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
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.USER_SUCCESSFULLY_UPDATED,
      user,
    };
  },
};

export default userMutations;
