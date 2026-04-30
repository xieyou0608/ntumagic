import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import store from "./store";
import theme from "./styles/theme";

// MemoryRouter intialEntries default 是 ["/"]
// 若元件沒有涉及 url 則使用預設即可
export const renderWithProviders = (ui, entryUrl = "/") => {
  return render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MemoryRouter initialEntries={[entryUrl]}>{ui}</MemoryRouter>
      </Provider>
    </ThemeProvider>
  );
};
