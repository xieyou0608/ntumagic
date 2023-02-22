import { renderWithProviders } from "../../setupTest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => {
  return {
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
  };
});

describe("LoginForm unit test", () => {
  test("the login form is display correctly", () => {
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText("信箱");
    const passwordInput = screen.getByLabelText("密碼");
    const loginBtn = screen.getByRole("button", { name: "登入" });
    const goToRegisterLink = screen.getByRole("link", {
      name: "尚未註冊，點此註冊",
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(goToRegisterLink).toBeInTheDocument();
  });

  test("click loginBtn will trigger dispatch", () => {
    renderWithProviders(<LoginForm />);

    const loginBtn = screen.getByRole("button", { name: "登入" });
    userEvent.click(loginBtn);

    expect(mockDispatch).toHaveBeenCalled();

    // 如果沒有寫 preventDefault, test log 會報錯，但還是會通過測試
    // expect(submitEvent.preventDefault).toHaveBeenCalled();
  });
});
