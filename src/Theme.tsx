import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

const darkTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          borderColor: "white",
          fontSize: "0.5rem",
          fontFamily: "D-DIN-Bold",
          padding: "10px 30px",
          color: "white",
        },
      },
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
  typography: {
    fontFamily: ["D-DIN-Medium", "Arial", "Verdana", "sans-serif"].join(","),
  },
  palette: {
    mode: "dark",
  },
});

const Theme: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
