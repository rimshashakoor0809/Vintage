import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('USER_DETAILS_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('USER_DETAILS_SUCCESS', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    })
    .addCase('USER_DETAILS_FAIL', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null;
    })
    .addCase('USER_DETAILS_CLEAR_ERROR', (state) => {
      state.error = null;
    });
});
