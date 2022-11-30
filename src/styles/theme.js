import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    gold: {
      main: "#e6bb6f",
    },
    gentle: {
      main: "#ffc258",
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
