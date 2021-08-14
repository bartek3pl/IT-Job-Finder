import React, { FC } from 'react';
import styled from 'styled-components';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import config from './config';
import color from '@styles/colors';
import AuthenticationService from '@services/authenticationService';
import ErrorBoundary from '@components/errorBoundary/ErrorBoundary';
import Routes from '@components/routing/Routes';

const StyledApp = styled.div`
  height: 100%;
  color: ${color.primary};
  background-color: ${color.white};
`;

const httpLink = createHttpLink({
  uri: `http://${config.URL}:${config.SERVER_PORT}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const authenticationService = new AuthenticationService();
  const accessToken = authenticationService.getBearerAccessToken();

  return {
    headers: {
      ...headers,
      accessToken: accessToken ? accessToken : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: FC = () => (
  <StyledApp>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </ErrorBoundary>
  </StyledApp>
);

export default App;
