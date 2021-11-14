import React from "react";
import mainTheme from "./../theme/mainTheme";
import { ThemeProvider } from "@mui/material";
import Home from "./../../pages/home/Home";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
        <Home />
    </ThemeProvider>
  );
}

export default App;
