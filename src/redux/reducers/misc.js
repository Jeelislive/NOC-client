import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export default miscSlice;
export const {
    setIsMobile,
} = miscSlice.actions;