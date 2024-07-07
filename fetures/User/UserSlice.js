import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../services/userService";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      user: null,
      userData: {
        email: null,
        street: null,
        city: null,
        state: null,
        country: null,
        whatsapp: null,
        obs: null,
      },
      token: null,
      localId: null,
      imageCamera: null,
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.value.user = payload.email;
      state.value.token = payload.idToken;
      state.value.localId = payload.localId;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.token = null;
      state.value.localId = null;
      state.value.userData = {};
    },
    setUserData: (state, { payload }) => {
      state.value.userData = payload;
    },
    setCameraImage: (state, { payload }) => {
      state.value.imageCamera = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.createUserData.matchFulfilled,
      (state, { payload }) => {
        state.value.userData = { ...state.value.userData, id: payload.id };
      }
    );
  },
});

export const { setUser, clearUser, setCameraImage, setUserData } = authSlice.actions;
export default authSlice.reducer;
