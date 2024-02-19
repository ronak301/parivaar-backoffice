import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    current_user: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.current_user = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
