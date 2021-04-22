import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import {
  UserInput,
  UserMutationResponse,
  User as UserType,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import timestampToDateTime from '../../../utils/converters';
import {
  validateLogin,
  validatePassword,
} from '../../../validators/validateInputs';
import validateEmail from '../../../validators/scalars/validateEmail';
import C from './constants';
import User from '../../../models/user';

const databaseErrorResponse: UserMutationResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  user: null,
};

const userMutations = {
  createUser: async (
    _parent: any,
    { input: { login, password, email } }: { input: UserInput },
    { token }: Token
  ): Promise<UserMutationResponse> => {
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

    const createdDate = timestampToDateTime(new Date());
    let createdUser: UserType;

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

      const encryptedPassword = await bcrypt.hash(password, 10);

      createdUser = await User.create({
        login,
        email,
        password: encryptedPassword,
        createdDate,
        updatedDate: createdDate,
      });
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.USER_SUCCESSFULLY_CREATED,
      user: createdUser,
    };
  },
};

export default userMutations;
