import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import {
  userLogin,
  // userRegister,
  updateBank,
  updateFriends,
  bookTickets,
  loadProfile,
} from "./user-actions";

const loading = () => ({ loading: true, errorMsg: "" });
const success = () => ({ success: true, errorMsg: "" });
const fail = (message) => ({ fail: true, errorMsg: message });

const initialCurrentUser = AuthService.getCurrentUser();

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: initialCurrentUser,
    authApi: {},
    bankApi: {},
    friendsApi: {},
    bookingApi: {},
    profileApi: {},
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setUserInfo(state, action) {
      state.currentUser.user = action.payload;
    },
    updateFriends(state, action) {
      state.currentUser.user.friends = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
    clearApiStatus(state, action) {
      // payload should be like 'authApi', 'bankApi'...
      state[action.payload] = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(userLogin.pending, (state) => {
        state.authApi = loading();
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.authApi = success();
        state.currentUser = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.authApi = fail(action.payload);
      })
      // register
      // .addCase(userRegister.pending, (state) => {
      //   state.authApi = loading();
      // })
      // .addCase(userRegister.fulfilled, (state, action) => {
      //   state.authApi = success();
      // })
      // .addCase(userRegister.rejected, (state, action) => {
      //   state.authApi = fail(action.payload);
      // });
      // update bank
      .addCase(updateBank.pending, (state) => {
        state.bankApi = loading();
      })
      .addCase(updateBank.fulfilled, (state, action) => {
        state.bankApi = success();
        state.currentUser.user.bankAccount = action.payload;
      })
      .addCase(updateBank.rejected, (state, action) => {
        state.bankApi = fail(action.payload);
      })
      // update friends
      .addCase(updateFriends.pending, (state) => {
        state.friendsApi = loading();
      })
      .addCase(updateFriends.fulfilled, (state, action) => {
        state.friendsApi = success();
        state.currentUser.user.friends = action.payload;
      })
      .addCase(updateFriends.rejected, (state, action) => {
        state.friendsApi = fail(action.payload);
      })
      // book tickets
      .addCase(bookTickets.pending, (state) => {
        state.bookingApi = loading();
      })
      .addCase(bookTickets.fulfilled, (state, action) => {
        state.bookingApi = success();
        state.currentUser.user = action.payload;
      })
      .addCase(bookTickets.rejected, (state, action) => {
        state.bookingApi = fail(action.payload);
      })
      // load profile
      .addCase(loadProfile.pending, (state) => {
        state.profileApi = loading();
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.profileApi = success();
        state.currentUser.user = action.payload;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.profileApi = fail(action.payload);
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
