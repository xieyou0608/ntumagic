import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import AudienceService from "../services/audience.service";
import SeatService from "../services/seat.service";
import { userActions } from "./user-slice";

export const clearAPI = (apiName) => {
  return (dispatch) => {
    dispatch(userActions.clearApiStatus(apiName));
  };
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch(userActions.logout());
    AuthService.logout();
  };
};

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await AuthService.login(email, password);
      if (res.data.token) {
        // localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      }
    } catch (error) {
      if (error && error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async ({ email, password, username, phone }, { rejectWithValue }) => {
    try {
      await AuthService.register(email, password, username, phone);
      window.alert("註冊成功! 將前往登入頁面");
      return; // fulfilled
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBank = createAsyncThunk(
  "user/updateBank",
  async (bank, { rejectWithValue }) => {
    try {
      await AudienceService.editBankAccount(bank);
      window.alert("修改成功!");
      return bank;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFriends = createAsyncThunk(
  "user/updateFrinds",
  async (friends, { rejectWithValue }) => {
    try {
      await AudienceService.editFriends(friends);
      // localStorage.setItem("user", JSON.stringify(temp));
      window.alert("修改成功!");
      return friends;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookTickets = createAsyncThunk(
  "user/bookTickets",
  async (submitData, { rejectWithValue }) => {
    try {
      const res = await SeatService.booking(
        submitData.map((x) => {
          return { row: x.row, col: x.col };
        })
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("位置已被其他人選擇，請重新劃位");
    }
  }
);

export const loadProfile = createAsyncThunk(
  "user/loadProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AudienceService.reload();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
