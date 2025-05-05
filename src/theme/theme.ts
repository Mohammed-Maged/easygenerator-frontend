import { createTheme } from "@mui/material/styles";

export const greenTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00c853" },
    background: { default: "#ffffff" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontWeightMedium: 600,
  },
});

export const blueTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#448aff" },
    background: { default: "#ffffff" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontWeightMedium: 600,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#1f2937" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
