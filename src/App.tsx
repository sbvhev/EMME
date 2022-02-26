import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

import { fetchUserInfo } from 'stores/reducers/users';

import { ThemeProvider } from 'material/ThemeProvider';
import LiquidityState from 'context/liquidityMarket/LiquidityState';
import AlertState from './context/alert/AlertState';

import Alerts from './material/shared/components/Alerts';
import Routes from './routing/Routes';

import { store, useAppDispatch } from './stores/store';

const StateUpdaters = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return <></>;
};

const App = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <StateProvider store={store}>
        <StateUpdaters />

        <ThemeProvider>
          <CssBaseline />
          <AlertState>
            <LiquidityState>
              <Switch>
                <Routes />
              </Switch>
              <Alerts />
            </LiquidityState>
          </AlertState>
        </ThemeProvider>
      </StateProvider>
    </Suspense>
  </BrowserRouter>
);

export default App;
