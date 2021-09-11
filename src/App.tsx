import { ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

import { store } from './stores/store';
import AlertState from 'context/alert/AlertState';

import { LoginPage, SignupPage, HomePage, ProfilePage } from "./pages";
import ThemeSwitcher, { ThemeType } from 'material/ThemeSwitcher';
import Alerts from 'material/shared/components/Alerts';
import Routes from 'routing/Routes';

const StateUpdaters = () => {
  return <></>;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const darkModeMediaQuery = useRef(window.matchMedia('(prefers-color-scheme: dark)'));
  const [themeCfg, changeThemeCfg] = useState<ThemeType>(ThemeType.lightTheme);
  // const [themeCfg, changeThemeCfg] = useState<ThemeType>(
  //   darkModeMediaQuery.current?.matches ? ThemeType.darkTheme : ThemeType.lightTheme
  // );

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

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <StateProvider store={store}>
          <StateUpdaters />

          <ThemeProvider>
            <CssBaseline />
            <AlertState>
              <Switch>
                <Routes />
              </Switch>
              <Alerts />
            </AlertState>
          </ThemeProvider>
        </StateProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
