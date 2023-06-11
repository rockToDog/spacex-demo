import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import DDINBold2 from "../public/fonts/D-DIN-Bold.woff2";
import DDIN from "../public/fonts/D-DIN.woff2";

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'D-DIN-Bold';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('D-DIN-Bold'), local('D-DIN-Bold'), url(${DDINBold2}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'D-DIN-Media';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('D-DIN-Media'), local('D-DIN-Media'), url(${DDIN}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
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
        disableRipple: true,
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
