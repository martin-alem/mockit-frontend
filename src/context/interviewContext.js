import React from "react";
import useLocalStorage from "./../hooks/useLocalStorage";
export const InterviewContext = React.createContext();

export function InterviewProvider(props) {
  const [room, setRoom] = useLocalStorage("roomId", "");

  return <InterviewContext.Provider value={{ room, setRoom }}>{props.children}</InterviewContext.Provider>;
}
