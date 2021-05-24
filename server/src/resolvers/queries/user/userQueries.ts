import { AuthenticationError } from 'apollo-server-express';

import {
  UserResponse,
  UsersResponse,
  User as UserType,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import C from './constants';
import globalC from '../../../constants';
import User from '../../../models/user';

const databaseErrorUsersResponse: UsersResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  users: null,
};

const databaseErrorUserResponse: UserResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  user: null,
};

const userQueries = {
  getAllUsers: async (
    _parent: unknown,
    _args: unknown,
    token: Token
  ): Promise<UsersResponse> => {
    if (!token) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let users: Array<UserType>;

    try {
      users = await User.find({}).lean();

      if (!users?.length) {
        return {
          code: 404,
          success: true,
          message: C.NO_USERS_IN_DATABASE,
          users,
        };
      }
    } catch (error) {
      console.error(error);
      return databaseErrorUsersResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.USERS_SUCCESSFULLY_FETCHED,
      users,
    };
  },

  getUserById: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    token: Token
  ): Promise<UserResponse> => {
    if (!token) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let user: UserType;

    try {
      user = await User.findById(id).lean();

      if (!user) {
        return {
          code: 404,
          success: false,
          message: C.USER_NOT_EXISTS,
          user: null,
        };
      }
    } catch (error) {
      console.error(error);
      return databaseErrorUserResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.USER_SUCCESSFULLY_FETCHED,
      user,
    };
  },
};

export default userQueries;
