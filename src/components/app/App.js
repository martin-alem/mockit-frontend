import React from "react";
import ProtectedRoute from "../protect_route/ProtectedRoute";
import { UserProvider } from "./../../context/userContext";
import { InterviewProvider } from "./../../context/interviewContext";
import mainTheme from "./../theme/mainTheme";
import { ThemeProvider } from "@mui/material";
import Home from "./../../pages/home/Home";
import Profile from "./../../pages/profile/Profile";
import WaitRoom from "./../../pages/wait_room/WaitRoom";
import Lobby from "./../../pages/lobby/Lobby";
import Room from "./../../pages/room/Room";
import Admin from "./../../pages/admin/Admin";
import NotFound from "../../pages/404/404";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <UserProvider>
        <InterviewProvider>
          <Switch>
            <ProtectedRoute path="/profile" exact component={Profile} />
            <ProtectedRoute path="/wait_room/:roomId" exact component={WaitRoom} />
            <Route path="/mock-interview/lobby/:roomId" exact component={Lobby} />
            <Route path="/room/:roomId" exact component={Room} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </InterviewProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
