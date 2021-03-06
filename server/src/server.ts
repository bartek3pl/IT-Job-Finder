import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import './data/dbConnectors';
import queryTypeDefs from './typeDefs/query';
import mutationTypeDefs from './typeDefs/mutation';
import enumsTypeDefs from './typeDefs/shared/enums';
import interfacesTypeDefs from './typeDefs/shared/interfaces';
import scalarsTypeDefs from './typeDefs/shared/scalars';
import userTypeDefs from './typeDefs/user';
import addressTypeDefs from './typeDefs/address';
import jobOfferTypeDefs from './typeDefs/jobOffer';
import companyTypeDefs from './typeDefs/company';
import fileTypeDefs from './typeDefs/file';
import tokenTypeDefs from './typeDefs/token';
import paginationTypeDefs from './typeDefs/pagination';

import resolvers from './resolvers';
import { ClientRequest } from './types/shared';
import config from './config';

const typeDefs = [
  queryTypeDefs,
  mutationTypeDefs,
  enumsTypeDefs,
  interfacesTypeDefs,
  scalarsTypeDefs,
  userTypeDefs,
  addressTypeDefs,
  jobOfferTypeDefs,
  companyTypeDefs,
  fileTypeDefs,
  tokenTypeDefs,
  paginationTypeDefs,
];

const context = async ({ req }: { req: ClientRequest }) => {
  const accessToken = req.headers.accesstoken || '';
  const verifiedAccessToken = await resolvers.Mutation.verifyAccessToken(null, {
    accessToken,
  });
  const isAccessTokenValid = verifiedAccessToken.success;

  if (isAccessTokenValid) {
    return { accessToken };
  }

  return { accessToken: null };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  debug: config.NODE_ENV === 'development',
});

const protocol = 'http';
const url = config.URL || 'localhost';
const port = config.PORT;
const path = '/graphql';

const app = express();

app.use(cors());

server.applyMiddleware({ app, path });

app.listen({ port }, () => {
  console.log(
    `Apollo Server is listening on ${protocol}://${url}:${port}${path}.`
  );
});
