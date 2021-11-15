import React from "react";

export const UserContext = React.createContext();

export function UserProvider(props) {
  const [loggedInUser, setLoggedInUser] = React.useState({});

  return <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>{props.children}</UserContext.Provider>;
}
