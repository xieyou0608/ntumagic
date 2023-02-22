import { renderWithProviders } from "../../setupTest";
import LoginForm from "./LoginForm";

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");

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

  test("login success", async () => {
    const res = { status: 200, data: { token: "mockJWT123" } };
    axios.post.mockResolvedValue(res);

    renderWithProviders(<LoginForm />);
    const loginBtn = screen.getByRole("button", { name: "登入" });
    expect(loginBtn.textContent).toBe("登入");

    userEvent.click(loginBtn);
    expect(loginBtn.textContent).toBe("登入中...");

    await waitFor(() => expect(loginBtn.textContent).toBe("登入"));
    const errorAlert = screen.queryByRole("alert");
    expect(errorAlert).toBeNull();
  });

  test("login fail", async () => {
    const res = { status: 400, message: '"email" is not allowed to be empty' };
    axios.post.mockRejectedValue(res);

    renderWithProviders(<LoginForm />);
    const loginBtn = screen.getByRole("button", { name: "登入" });
    expect(loginBtn.textContent).toBe("登入");

    userEvent.click(loginBtn);
    expect(loginBtn.textContent).toBe("登入中...");

    await waitFor(() => expect(loginBtn.textContent).toBe("登入"));
    const errorAlert = screen.getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert.textContent).toBe('"email" is not allowed to be empty');
  });
});
