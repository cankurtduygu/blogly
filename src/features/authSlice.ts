import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
}

interface AuthState {
  currentUser: User | null;
  token: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserInfo: (state, { payload }) => {
      if (payload.user) {
        const { _id, email, username, isAdmin, firstName, lastName } =
          payload.user; //paload icinde bir suru sey geliyor sadece bu verileri alsak yeterli olur.
        state.currentUser = {
          _id,
          email,
          username,
          isAdmin,
          firstName,
          lastName,
        };
      } else {
        const { _id, email, username, isAdmin, firstName, lastName } =
          payload.data;
        state.currentUser = {
          _id,
          email,
          username,
          isAdmin,
          firstName,
          lastName,
        };
      }
      state.token = payload.token;
    },
    cleanAuth: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { updateUserInfo, cleanAuth } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.currentUser; //useSelectorda uzun uzun yazmamaik icin burda bu sekilde yazyioruz.

export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
