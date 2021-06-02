import jwt from 'jsonwebtoken';

import { Scalars } from '../types/graphql';
import config from '../config';
import { Token } from '../types/shared';

const privateKey = config.TOKEN_SECRET_JWT;
const algorithm = 'HS256';

const calculateExpirationTime = (expirationSeconds: number) =>
  (new Date().getTime() + expirationSeconds * 1000) / 1000;

const authService = {
  generateAccessToken: (userId: Scalars['ID']): Token => {
    const expirationSeconds = 1200; // 20 minutes
    const expirationTime = calculateExpirationTime(expirationSeconds);
    const issuedAtDateTime = Date.now();

    const accessToken = jwt.sign(
      {
        typ: 'JWT_ACCESS_TOKEN',
        sub: userId,
        iss: 'IT Job Finder Server',
        aud: 'IT Job Finder Client',
        iat: issuedAtDateTime,
        exp: expirationTime,
      },
      privateKey,
      {
        algorithm,
      }
    );

    return accessToken;
  },

  generateRefreshToken: (userId: Scalars['ID']): Token => {
    const expirationSeconds = 2400; // 40 minutes
    const expirationTime = calculateExpirationTime(expirationSeconds);

    const refreshToken = jwt.sign(
      {
        typ: 'JWT_REFRESH_TOKEN',
        sub: userId,
        exp: expirationTime,
      },
      privateKey,
      {
        algorithm,
      }
    );

    return refreshToken;
  },
};

export default authService;
