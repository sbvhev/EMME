import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAppSelector } from 'stores/hooks';

import { LoadingOverlay } from 'material/shared/components/LoadingOverlay';
import { HomePage, ProfilePage, SignupPage, LoginPage } from 'pages';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
  const { user, loading } = useAppSelector((state) => state.users);

  return (
    <LoadingOverlay isLoading={!user && loading} size={100} zIndex={1}>
      <PrivateRoute path="/orderbook" component={HomePage} />
      <PrivateRoute path="/profile" component={ProfilePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />

      <Redirect to="/orderbook" />
    </LoadingOverlay>
  );
};
export default Routes;
