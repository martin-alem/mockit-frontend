import React from "react";
import mainTheme from "./../theme/mainTheme";
import { ThemeProvider } from "@mui/material";
import Home from "./../../pages/home/Home";
import Profile from "./../../pages/profile/Profile";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
