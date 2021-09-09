import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { Provider as StateProvider } from "react-redux";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import { darkTheme } from "./theme";
import { store } from "./stores/store";

import { LoginPage, SignupPage, HomePage, ProfilePage } from "./pages";

const StateUpdaters: React.FC = () => {
  return <></>;
};

const ThemeProvider: React.FC = ({ children }) => {
  const location = useLocation();
  let theme = darkTheme;

  if (location.pathname.replace("/", "") === "") {
    theme = darkTheme;
  }

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

const Providers: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <StateProvider store={store}>
          <StateUpdaters />

          <ThemeProvider>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StateProvider>
      </Suspense>
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return (
    <Providers>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Providers>
  );
};

export default App;
