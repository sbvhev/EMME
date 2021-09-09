import { Redirect, Route } from 'react-router-dom';

import SignupPage from 'pages/SignupPage';
import Login from 'pages/LoginPage';
import { HomePage, ProfilePage } from 'pages';

const Routes = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/signup" component={SignupPage} />
      <Redirect path="*" to="/login" />
    </>
  );
};

export default Routes;
