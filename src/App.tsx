import React, { ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

import AlertState from 'context/alert/AlertState';

import ThemeSwitcher, { ThemeType } from 'material/ThemeSwitcher';
import Alerts from 'material/shared/components/Alerts';
import Routes from 'routing/Routes';

import { store } from './stores/store';

/* ** For now we can simply switch here between themes ** */
// let selectedTheme: ThemeType = ThemeType.lightTheme;
let selectedTheme: ThemeType = ThemeType.darkTheme;

const StateUpdaters = () => <></>;

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const darkModeMediaQuery = useRef(window.matchMedia('(prefers-color-scheme: dark)'));
  const [themeCfg, changeThemeCfg] = useState<ThemeType>(selectedTheme);
  // const [themeCfg, changeThemeCfg] = useState<ThemeType>(
  //   darkModeMediaQuery.current?.matches ? ThemeType.darkTheme : ThemeType.lightTheme
  // );

  useEffect(() => {
    selectedTheme = themeCfg;
  }, [themeCfg]);

  useEffect(() => {
    const setThemeFromMediaQuery = (e: MediaQueryListEvent) => {
      changeThemeCfg(e.matches ? ThemeType.darkTheme : ThemeType.lightTheme);
    };
    const mediaQuery = darkModeMediaQuery.current;

    mediaQuery?.addEventListener('change', setThemeFromMediaQuery);
    return () => {
      mediaQuery?.removeEventListener('change', setThemeFromMediaQuery);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ThemeSwitcher themeCfg={themeCfg!}>{children}</ThemeSwitcher>;
};

const App = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <StateProvider store={store}>
        <StateUpdaters />

        <ThemeProvider>
          <CssBaseline />
          <AlertState>
            <Switch>
              <Routes selectedTheme={selectedTheme} />
            </Switch>
            <Alerts />
          </AlertState>
        </ThemeProvider>
      </StateProvider>
    </Suspense>
  </BrowserRouter>
);

export default App;
