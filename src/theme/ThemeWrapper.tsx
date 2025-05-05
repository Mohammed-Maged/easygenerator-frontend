import React from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { greenTheme, blueTheme, darkTheme } from "./theme";

interface Props {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  const theme = React.useMemo(() => {
    if (location.pathname === "/register") return greenTheme;
    if (location.pathname === "/dashboard") return darkTheme;
    return blueTheme;
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
