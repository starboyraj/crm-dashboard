import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // modern blue
    },
    secondary: {
      main: "#0ea5e9",
    },
    background: {
      default: "#f1f5f9",   // main bg
      paper: "#ffffff"      // cards/forms
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
