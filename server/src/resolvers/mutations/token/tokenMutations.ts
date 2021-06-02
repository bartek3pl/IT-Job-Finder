import jwt from 'jsonwebtoken';

import {
  AccessTokenResponse,
  AccessRefreshTokenResponse,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import { Token as GraphQlToken } from '../../../types/graphql';
import tokenC from './constants';
import config from '../../../config';
import authService from '../../../services/authService';

const databaseAccessTokenErrorResponse: AccessTokenResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  accessToken: null,
};

const databaseAccessRefreshTokenErrorResponse: AccessRefreshTokenResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  accessToken: null,
  refreshToken: null,
};

const tokenMutations = {
  verifyAccessToken: async (
    _parent: unknown,
    { accessToken }: { accessToken: Token }
  ): Promise<AccessTokenResponse> => {
    try {
      if (!accessToken) {
        return {
          code: 400,
          success: false,
          message: tokenC.MISSING_ACCESS_TOKEN,
          accessToken,
        };
      }

      const BEARER = 'Bearer';
      const AUTHORIZATION_TOKEN = accessToken.split(' ');

      if (AUTHORIZATION_TOKEN[0] !== BEARER) {
        return {
          code: 400,
          success: false,
          message: tokenC.NOT_COMPLETE_ACCESS_TOKEN,
          accessToken,
        };
      }

      let invalidAccessTokenResponse;

      jwt.verify(AUTHORIZATION_TOKEN[1], config.TOKEN_SECRET_JWT, (err) => {
        if (err) {
          console.error(err);
          invalidAccessTokenResponse = {
            code: 401,
            success: false,
            message: tokenC.INVALID_ACCESS_TOKEN,
            accessToken,
          };
        }
      });

      if (invalidAccessTokenResponse) {
        return invalidAccessTokenResponse;
      }

      return {
        code: 200,
        success: true,
        message: tokenC.SUCCESSFULLY_AUTHORIZED_ACCESS_TOKEN,
        accessToken,
      };
    } catch (error) {
      console.error(error);
      return databaseAccessTokenErrorResponse;
    }
  },

  generateTokensByRefreshToken: async (
    _parent: unknown,
    { refreshToken }: { refreshToken: Token }
  ): Promise<AccessRefreshTokenResponse> => {
    try {
      if (!refreshToken) {
        return {
          code: 400,
          success: false,
          message: tokenC.MISSING_REFRESH_TOKEN,
          accessToken: null,
          refreshToken,
        };
      }

      const BEARER = 'Bearer';
      const REFRESH_TOKEN = refreshToken.split(' ');

      if (REFRESH_TOKEN[0] !== BEARER) {
        return {
          code: 400,
          success: false,
          message: tokenC.NOT_COMPLETE_REFRESH_TOKEN,
          accessToken: null,
          refreshToken,
        };
      }

      let invalidRefreshTokenResponse;

      jwt.verify(REFRESH_TOKEN[1], config.TOKEN_SECRET_JWT, (err) => {
        if (err) {
          console.error(err);
          invalidRefreshTokenResponse = {
            code: 401,
            success: false,
            message: tokenC.INVALID_REFRESH_TOKEN,
            accessToken: null,
            refreshToken,
          };
        }
      });

      if (invalidRefreshTokenResponse) {
        return invalidRefreshTokenResponse;
      }

      const decodedToken = jwt.decode(REFRESH_TOKEN[1]) as GraphQlToken;

      const userId = decodedToken.sub.toString();
      const accessToken = authService.generateAccessToken(userId);
      const newRefreshToken = authService.generateRefreshToken(userId);

      return {
        code: 200,
        success: true,
        message: tokenC.SUCCESSFULLY_RENEWED_ACCESS_AND_REFRESH_TOKEN,
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      console.error(error);
      return databaseAccessRefreshTokenErrorResponse;
    }
  },
};

export default tokenMutations;
