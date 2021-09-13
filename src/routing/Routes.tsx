import { Redirect, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Signup from 'pages/SignupPage';
import Login from 'pages/LoginPage';
import { HomePage, ProfilePage } from 'pages';
import { ThemeType } from 'material/ThemeSwitcher';

import SignupPage from 'pages/SignupPage/SignupPage';
import LoginPage from 'pages/LoginPage/LoginPage';

interface RoutesProps {
  selectedTheme: ThemeType;
}

const Routes = ({ selectedTheme }: RoutesProps) => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile" component={ProfilePage} />

      {selectedTheme === ThemeType.lightTheme && <Route exact path="/login" component={Login} />}
      {selectedTheme === ThemeType.lightTheme && <Route exact path="/signup" component={Signup} />}

      {selectedTheme === ThemeType.darkTheme && <Route exact path="/login" component={LoginPage} />}
      {selectedTheme === ThemeType.darkTheme && (
        <Route exact path="/signup" component={SignupPage} />
      )}
      {/* <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <Redirect path="*" to="/" /> */}
    </>
  );
};

export default Routes;
