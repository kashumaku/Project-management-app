import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.loggedIn = true;
      state.profile = action.payload.user;
    },
    loggedOut: (state) => {
      (state.loggedIn = false), (state.profile = null);
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;

export default userSlice.reducer;
