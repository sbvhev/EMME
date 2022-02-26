import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAppSelector } from 'stores/hooks';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { user, loading } = useAppSelector((state) => state.users);

  return (
    <Route
      {...rest}
      render={(props) => (!user && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
