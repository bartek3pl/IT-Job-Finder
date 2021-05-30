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
import config from '../../../config';
import { getPageInfo } from '../../../utils/pagination';

const databaseErrorUsersResponse: UsersResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  results: null,
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
    {
      first = config.PAGE_SIZE,
      offset = 0,
    }: { first: Scalars['Int']; offset: Scalars['Int'] },
    { accessToken }: { accessToken: Token }
  ): Promise<UsersResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const pageInfo = await getPageInfo(User, first, offset);
    let users: Array<UserType>;

    try {
      users = await User.find({}).skip(offset).limit(first).lean();

      if (!users?.length) {
        return {
          code: 404,
          success: true,
          message: C.NO_USERS_IN_DATABASE,
          results: {
            pageInfo,
            users,
          },
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
      results: {
        pageInfo,
        users,
      },
    };
  },

  getUserById: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    { accessToken }: { accessToken: Token }
  ): Promise<UserResponse> => {
    if (!accessToken) {
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
