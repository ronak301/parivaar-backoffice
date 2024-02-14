import { createSlice } from "@reduxjs/toolkit";

const successSlice = createSlice({
  name: "familyMember",
  initialState: {
    success: false,
  },
  reducers: {
    setSuccess: (state) => {
      state.success = true;
    },
    setSuccessReset: (state) => {
      state.success = false;
    },
  },
});

export const { setSuccess } = successSlice.actions;
export const { setSuccessReset } = successSlice.actions;

export default successSlice.reducer;
