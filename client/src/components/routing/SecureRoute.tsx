import React, { FC, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Route, Redirect } from 'react-router-dom';

import { VERIFY_ACCESS_TOKEN } from '@api/tokens/mutations';
import AuthenticationService from '@services/authenticationService/authenticationService';
import routes from './routesStrings';

interface SecureRouteProps {
  children: any;
  path?: string;
}

const SecureRoute: FC<SecureRouteProps> = ({ children, ...rest }) => {
  const [verifyAccessToken] = useMutation(VERIFY_ACCESS_TOKEN);

  const checkAuthentification = async () => {
    const authenticationService = new AuthenticationService();
    const bearerAccessToken = authenticationService.getBearerAccessToken();

    try {
      if (bearerAccessToken) {
        await verifyAccessToken({
          variables: { accessToken: bearerAccessToken },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthentification();
  }, []);

  const isAuthenticated = true; // !!data?.verifyAccessToken?.success;

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? children : <Redirect to={routes.login} />
      }
    />
  );
};

export default SecureRoute;
