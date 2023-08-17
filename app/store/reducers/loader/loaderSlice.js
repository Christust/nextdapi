import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    count: 0,
  },
  reducers: {
    setLoaderCount: (state, action) => {
      const newCount = state.count + action.payload;
      if (newCount >= 0) {
        state.count = newCount;
      }
    },
  },
});

export const { setLoaderCount } = loaderSlice.actions;

export default loaderSlice.reducer;
