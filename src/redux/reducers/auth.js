import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    user: null,
    isAdmin: false,
    loader: true,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload;
            state.loader = false;
            state.isAuthenticated = true;
        },
        userNotExist: (state) => {
            state.user = null;
            state.loader = false;
            state.isAuthenticated = false;
        },
    },
});

export default authSlice;
export const { userExist, userNotExist } = authSlice.actions;