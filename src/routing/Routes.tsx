import { Redirect, Route } from 'react-router-dom';

import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import { HomePage, ProfilePage } from 'pages';

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Redirect path="*" to="/login" />
    </>
  );
};

export default Routes;
