import { Redirect, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Signup from 'pages/SignupPage';
import Login from 'pages/LoginPage';
import { HomePage, ProfilePage } from 'pages';

const Routes = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      {/* <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <Redirect path="*" to="/" /> */}
    </>
  );
};

export default Routes;
