import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
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
