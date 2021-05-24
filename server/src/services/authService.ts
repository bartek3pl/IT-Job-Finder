import jwt from 'jsonwebtoken';

import { Scalars } from '../types/graphql';
import config from '../config';
import { Token } from '../types/shared';

const privateKey = config.TOKEN_SECRET_JWT;

const authService = {
  generateAccessToken: (userId: Scalars['ID']): Token => {
    const expirationTime = 1200; // 20 minutes
    const issuedAtDateTime = Date.now();

    const accessToken = jwt.sign(
      {
        typ: 'JWT_ACCESS_TOKEN',
        sub: userId,
        iss: 'IT Job Finder Server',
        aud: 'IT Job Finder Client',
        iat: issuedAtDateTime,
      },
      privateKey,
      {
        algorithm: 'HS256',
        expiresIn: expirationTime,
      }
    );

    return accessToken;
  },

  generateRefreshToken: (userId: Scalars['ID']): Token => {
    const expirationTime = 2400; // 40 minutes

    const refreshToken = jwt.sign(
      {
        typ: 'JWT_REFRESH_TOKEN',
        sub: userId,
      },
      privateKey,
      {
        algorithm: 'HS256',
        expiresIn: expirationTime,
      }
    );

    return refreshToken;
  },
};

export default authService;
