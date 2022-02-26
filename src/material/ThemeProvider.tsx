import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { MuiThemeProvider, Theme } from '@material-ui/core/styles';

import darkTheme from 'material/darkTheme';
import lightTheme from 'material/lightTheme';

import * as storage from './shared/utils/localstorage';
import { StorageKey } from './shared/model/localstorage.model';

export enum ThemeType {
  darkThemePref,
  lightThemePref,
}

type ThemeContextType = {
  theme?: ThemeType;
  setTheme: (data: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeType.darkThemePref,
  setTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState(ThemeType.darkThemePref);

  const darkModeMediaQuery = useRef(window.matchMedia('(prefers-color-scheme: dark)'));

  useEffect(() => {
    async function asyncFunc() {
      const storageType: number = await storage.get(StorageKey.EMME_DARK_MODE);

      if (typeof storageType === 'number') {
        setCurrentTheme(storageType);
      }

      const setThemeFromMediaQuery = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? ThemeType.darkThemePref : ThemeType.lightThemePref);
      };
      const mediaQuery = darkModeMediaQuery.current;

      mediaQuery?.addEventListener('change', setThemeFromMediaQuery);
      return () => {
        mediaQuery?.removeEventListener('change', setThemeFromMediaQuery);
      };
    }

    asyncFunc();
  }, []);

  useEffect(() => {
    storage.set(StorageKey.EMME_DARK_MODE, currentTheme);
  }, [currentTheme]);

  const setTheme = (data: boolean) => {
    setCurrentTheme(data ? ThemeType.lightThemePref : ThemeType.darkThemePref);
  };

  function getTheme(): Theme {
    if (currentTheme === ThemeType.darkThemePref) {
      return darkTheme();
    }

    return lightTheme();
  }

  const selectedTheme = getTheme();

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <MuiThemeProvider theme={selectedTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
