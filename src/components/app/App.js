import React from "react";
import mainTheme from "./../theme/mainTheme";
import { ThemeProvider } from "@mui/material";
import Header from "./../header/Header";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <div className="App" data-testid="app">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
