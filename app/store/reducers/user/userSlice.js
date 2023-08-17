import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    token: null,
    refreshToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    setToken: (state, action = null) => {
      if (action) state.token = action.payload;
      else state.token = action;
    },
    setRefreshToken: (state, action = null) => {
      if (action) state.refreshToken = action.payload;
      else state.refreshToken = action;
    },
  },
});

export const { setUser, setToken, setRefreshToken } = userSlice.actions;

export default userSlice.reducer;
