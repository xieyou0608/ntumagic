import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    gold: {
      main: "#e6bb6f",
    },
    gentle: {
      main: "#ffc258",
    },
    background: {
      main: "#fcefd6",
    },
    border: {
      main: "#540b0e",
    },
  },
  typography: {
    // Change font-family of all mui components
    allVariants: {
      fontFamily: `"Noto Sans TC", sans-serif`,
    },
  },
});

export default theme;
