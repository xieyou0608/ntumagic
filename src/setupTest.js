import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import theme from "./styles/theme";

export const renderWithProviders = (testComponent) => {
  return render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>{testComponent}</BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};
