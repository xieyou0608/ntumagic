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
    darkBlue: {
      main: "#234b88",
    },
    forest: {
      main: "#3f6b3a",
    },
    vine: {
      main: "#8fa876",
    },
    vintageRed: {
      main: "#b43a3a",
    },
    warmBrown: {
      main: "#3d2e1f",
    },
    cream: {
      main: "#f2ead0",
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
