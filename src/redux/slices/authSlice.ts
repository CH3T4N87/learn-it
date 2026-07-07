import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../types";
import type { User } from "../../App.types";

const initialState: AuthState = {
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state: AuthState) => {
            state.user = null
            localStorage.removeItem("token");
        },
        restoreSession: (state: AuthState, action: PayloadAction<User>) => {
                state.user = action.payload
        }
    }
})

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;