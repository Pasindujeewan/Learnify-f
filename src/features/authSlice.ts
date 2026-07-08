import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserStateType } from "../types/UserType";
import type { RootState } from "../app/store";

interface AuthState {
  user: UserStateType | null;
}
const initialState: AuthState = {
  user: null,
};

// Redux keeps only the lightweight identity needed by navigation and shared UI.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStateType | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
