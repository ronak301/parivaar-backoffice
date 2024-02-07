import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthLogout: (state) => {
      state.token = null;
    },
  },
});

export const { setAuthToken } = authSlice.actions;
export const { setAuthLogout } = authSlice.actions;
export default authSlice.reducer;
