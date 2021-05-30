import { AuthenticationError } from 'apollo-server-express';

import {
  UserResponse,
  UsersResponse,
  User as UserType,
  UserSearch,
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
      sorting,
      search: {
        login,
        firstName,
        lastName,
        email,
        age,
        gender,
        address,
        skills,
        experienceYears,
        level,
        minSalary,
        maxSalary,
      } = {
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        gender: null,
        address: {
          country: '',
          city: '',
        },
        skills: [],
        experienceYears: 0,
        level: null,
        minSalary: 0,
        maxSalary: 50000,
      },
    }: {
      first: Scalars['Int'];
      offset: Scalars['Int'];
      sorting: Scalars['String'];
      search: UserSearch;
    },
    { accessToken }: { accessToken: Token }
  ): Promise<UsersResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const pageInfo = await getPageInfo(User, first, offset);
    let users: Array<UserType>;

    try {
      users = await User.find({
        $and: [
          login ? { login: { $regex: login, $options: 'i' } } : {},
          firstName ? { firstName: { $regex: firstName, $options: 'i' } } : {},
          lastName ? { lastName: { $regex: lastName, $options: 'i' } } : {},
          email ? { email: { $regex: email, $options: 'i' } } : {},
          age ? { age: { $regex: age, $options: 'i' } } : {},
          gender ? { gender: { $regex: gender, $options: 'i' } } : {},
          address?.country
            ? {
                'address.country': {
                  $regex: address?.country,
                  $options: 'i',
                },
              }
            : {},
          address?.city
            ? {
                'address.city': {
                  $regex: address?.city,
                  $options: 'i',
                },
              }
            : {},
          skills?.length ? { skills: { $in: skills } } : {},
          experienceYears !== 0
            ? { experienceYears: { $lte: experienceYears } }
            : {},
          level ? { level: { $regex: level, $options: 'i' } } : {},
          minSalary ? { minSalary: { $gte: minSalary } } : {},
          maxSalary ? { maxSalary: { $lte: maxSalary } } : {},
        ],
      })
        .sort(sorting)
        .skip(offset)
        .limit(first)
        .lean();

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
