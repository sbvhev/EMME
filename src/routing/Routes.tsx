import { Redirect, Route } from 'react-router-dom';

import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';

const Routes = () => {
  return (
    <>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Redirect path="*" to="/login" />
    </>
  );
};

export default Routes;
