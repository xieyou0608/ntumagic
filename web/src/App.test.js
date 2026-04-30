import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./setupTest";

import App from "./App";

describe("App routing test", () => {
  test("From login to register", async () => {
    renderWithProviders(<App />, "/login");

    const goToRegisterBtn = screen.getByText("尚未註冊，點此註冊");
    expect(goToRegisterBtn).toBeInTheDocument();

    userEvent.click(goToRegisterBtn);

    const goToLoginBtn = screen.getByText("已經註冊，點此登入");
    expect(goToLoginBtn).toBeInTheDocument();
  });
});
