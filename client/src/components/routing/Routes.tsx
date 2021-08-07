import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import routes from './routesStrings';
import SecureRoute from './SecureRoute';
import StarterPage from '@views/Starter/StarterPage';
import RegistrationPage from '@views/Registration/RegistrationPage/RegistrationPage';
import LoginPage from '@views/Login/LoginPage/LoginPage';
import JobOffersMainPage from '@views/JobOffers/JobOffersMainPage/JobOffersMainPage';
import JobOffersSearchPage from '@views/JobOffers/JobOffersSearchPage/JobOffersSearchPage';
import ProfilePage from '@views/Profile/ProfilePage';

const Routes: FC = () => (
  <Router>
    <Switch>
      <Route exact path={routes.starter} component={StarterPage} />
      <Route exact path={routes.registration} component={RegistrationPage} />
      <Route exact path={routes.login} component={LoginPage} />
      <SecureRoute exact path={routes.jobOffers}>
        <JobOffersMainPage />
      </SecureRoute>
      <SecureRoute exact path={routes.jobOffersSearch}>
        <JobOffersSearchPage />
      </SecureRoute>
      <SecureRoute exact path={routes.profile}>
        <ProfilePage />
      </SecureRoute>
      <Redirect to={routes.login} />
    </Switch>
  </Router>
);

export default Routes;
