import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    errorMessage: "",
  },
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
