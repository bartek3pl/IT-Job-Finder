import React, { FC } from 'react';
import styled from 'styled-components';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import color from '@styles/colors';
import ErrorBoundary from '@components/errorBoundary/ErrorBoundary';
import Routes from '@components/routing/Routes';

const StyledApp = styled.div`
  height: 100%;
  color: ${color.primary};
  background-color: ${color.white};
`;

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
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
