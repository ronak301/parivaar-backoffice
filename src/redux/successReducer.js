import { createSlice } from "@reduxjs/toolkit";

const successSlice = createSlice({
  name: "familyMember",
  initialState: {
    success: false,
    close: false,
  },
  reducers: {
    setSuccess: (state) => {
      state.success = true;
    },
    setSuccessReset: (state) => {
      state.success = false;
    },
    setClose: (state) => {
      state.close = true;
    },
    setCloseReset: (state) => {
      state.close = false;
    },
  },
});

export const { setSuccess } = successSlice.actions;
export const { setSuccessReset } = successSlice.actions;
export const { setClose } = successSlice.actions;
export const { setCloseReset } = successSlice.actions;
export default successSlice.reducer;
