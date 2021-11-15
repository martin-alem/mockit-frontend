import React from "react";
import useLocalStorage from "./../hooks/useLocalStorage"
export const UserContext = React.createContext();

export function UserProvider(props) {
  const [loggedInUser, setLoggedInUser] = useLocalStorage("logged_in_user", {})

  return <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>{props.children}</UserContext.Provider>;
}
