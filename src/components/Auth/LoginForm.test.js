import LoginForm from "./LoginForm";
import { screen, render } from "@testing-library/react";
import { renderWithProviders } from "../../setupTest";

test("The login form is display correctly", () => {
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
