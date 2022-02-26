import React, { ReactNode } from 'react';
import { Theme, MuiThemeProvider } from '@material-ui/core/styles';

import darkThemeFunc from './darkTheme';
import lightThemeFunc from './lightTheme';

enum ThemeType {
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
      return lightThemeFunc();
    }

    return darkThemeFunc();
  };

  const theme = getTheme();

  return (
    <ThemeContext.Provider value={{ theme: themeCfg }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeSwitcher;
