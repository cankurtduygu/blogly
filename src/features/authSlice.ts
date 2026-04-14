import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  image?: string;
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
        const { _id, email, username, isAdmin, firstName, lastName, image } =
          payload.user;
        state.currentUser = {
          _id,
          email,
          username,
          isAdmin,
          firstName,
          lastName,
          image,
        };
      } else {
        const { _id, email, username, isAdmin, firstName, lastName, image } =
          payload.data;
        state.currentUser = {
          _id,
          email,
          username,
          isAdmin,
          firstName,
          lastName,
          image,
        };
      }
      state.token = payload.token;
    },
    updateProfile: (state, { payload }) => {
      const { _id, email, username, isAdmin, firstName, lastName, image } = payload;
      state.currentUser = { _id, email, username, isAdmin, firstName, lastName, image };
    },
    cleanAuth: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { updateUserInfo, updateProfile, cleanAuth } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.currentUser; //useSelectorda uzun uzun yazmamaik icin burda bu sekilde yazyioruz.

export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
