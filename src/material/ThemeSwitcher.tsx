import React, { ReactNode } from 'react';
import { Theme, MuiThemeProvider } from '@material-ui/core/styles';

import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

let currentTheme: Theme | null = null;

export const getCurrentTheme = () => currentTheme;

export enum ThemeType {
  darkTheme,
  lightTheme,
}

interface ThemeSwitcherProps {
  children: ReactNode;
  themeCfg: ThemeType;
}

type ThemeContextState = {
  theme?: ThemeType;
};

export const ThemeContext = React.createContext<ThemeContextState>({});

const ThemeSwitcher = ({ children, themeCfg }: ThemeSwitcherProps) => {
  const getTheme = (): Theme => {
    if (themeCfg === ThemeType.lightTheme) {
      return lightTheme();
    }

    return darkTheme();
  };

  const theme = getTheme();
  currentTheme = theme;

  return (
    <ThemeContext.Provider value={{ theme: themeCfg }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeSwitcher;
