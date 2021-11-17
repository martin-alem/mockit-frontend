import React from "react";
import ProtectedRoute from "../protect_route/ProtectedRoute";
import { UserProvider } from "./../../context/userContext";
import mainTheme from "./../theme/mainTheme";
import { ThemeProvider } from "@mui/material";
import Home from "./../../pages/home/Home";
import Profile from "./../../pages/profile/Profile";
import Admin from "./../../pages/admin/Admin";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <UserProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <Route path="/admin" exact component={Admin} />
        </Switch>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
