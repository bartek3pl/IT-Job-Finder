import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import queryTypeDefs from './typeDefs/query';
import mutationTypeDefs from './typeDefs/mutation';
import enumsTypeDefs from './typeDefs/shared/enums';
import interfacesTypeDefs from './typeDefs/shared/interfaces';
import scalarsTypeDefs from './typeDefs/shared/scalars';
import userTypeDefs from './typeDefs/user';
import addressTypeDefs from './typeDefs/address';
import jobOfferTypeDefs from './typeDefs/jobOffer';
import companyTypeDefs from './typeDefs/company';

import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs: [
    queryTypeDefs,
    mutationTypeDefs,
    enumsTypeDefs,
    interfacesTypeDefs,
    scalarsTypeDefs,
    userTypeDefs,
    addressTypeDefs,
    jobOfferTypeDefs,
    companyTypeDefs,
  ],
  resolvers,
});

const protocol = 'http';
const url = 'localhost';
const port = 8000;
const path = '/graphql';

const app = express();

app.use('*', cors());

server.applyMiddleware({ app, path });

app.listen({ port }, () => {
  console.log(`Apollo Server on ${protocol}://${url}:${port}${path}`);
});
