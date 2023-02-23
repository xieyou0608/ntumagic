import { renderWithProviders } from "../../setupTest";
import RegisterForm from "./RegisterForm";

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");

describe("RegisterForm test", () => {
  test("the register form is display correctly", () => {
    renderWithProviders(<RegisterForm />);

    const emailInput = screen.getByLabelText("信箱");
    const passwordInput = screen.getByLabelText("密碼");
    const passwordAgainInput = screen.getByLabelText("再次輸入密碼");
    const usernameInput = screen.getByLabelText("姓名");
    const phoneInput = screen.getByLabelText("聯絡電話");

    const registerBtn = screen.getByRole("button", { name: "註冊" });
    const goToLoginLink = screen.getByRole("link", {
      name: "已經註冊，點此登入",
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordAgainInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
    expect(goToLoginLink).toBeInTheDocument();
  });

  test("register success", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const res = { status: 200, data: { msg: "success" } };
    axios.post.mockResolvedValue(res);

    renderWithProviders(<RegisterForm />, "/register");
    const registerBtn = screen.getByRole("button", { name: "註冊" });

    userEvent.click(registerBtn);

    await waitFor(() => expect(registerBtn.textContent).toBe("註冊中..."));
    await waitFor(() =>
      expect(window.alert).toBeCalledWith("註冊成功! 將前往登入頁面")
    );
  });

  test("register fail", async () => {
    const error = {
      response: { status: 400, data: '"email" is not allowed to be empty' },
    };
    const res = { status: 400, data: '"email" is not allowed to be empty' };
    axios.post.mockRejectedValue(error);

    renderWithProviders(<RegisterForm />);
    const registerBtn = screen.getByRole("button", { name: "註冊" });
    expect(registerBtn.textContent).toBe("註冊");

    userEvent.click(registerBtn);

    await waitFor(() => expect(registerBtn.textContent).toBe("註冊中..."));
    await waitFor(() => expect(registerBtn.textContent).toBe("註冊"));
    const errorAlert = screen.getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert.textContent).toBe('"email" is not allowed to be empty');
  });
});
