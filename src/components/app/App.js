import React from "react";
import mainTheme from "./../theme/mainTheme";
import { ThemeProvider } from "@mui/material";
import Home from "./../../pages/home/Home";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <div className="App" data-testid="app">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
