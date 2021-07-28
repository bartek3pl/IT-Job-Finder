import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import routes from './routesStrings';

const Routes: React.FC = () => (
    <Router>
      <Switch>
        <Route path={routes.registration}>
          <></>
        </Route>
        <Redirect to={routes.login} />
      </Switch>
    </Router>
  );

export default Routes;
