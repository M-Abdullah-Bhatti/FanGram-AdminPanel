import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";

import Routes from "./Routes/index";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fdc564",
    },
  },
});

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
