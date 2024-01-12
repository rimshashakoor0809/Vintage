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
    .addCase('USER_FORGOT_PASSWORD_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('USER_FORGOT_PASSWORD_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase('USER_FORGOT_PASSWORD_FAIL', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    })
    .addCase('USER_RESET_PASSWORD_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('USER_RESET_PASSWORD_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase('USER_RESET_PASSWORD_FAIL', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    })
    .addCase('USER_CHANGE_PASSWORD_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('USER_CHANGE_PASSWORD_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase('USER_CHANGE_PASSWORD_FAIL', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    })
    .addCase('UPDATE_USER_INFO_REQUEST', (state) => {
      state.userInfoLoading = true;
    })
    .addCase('UPDATE_USER_INFO_SUCCESS', (state, action) => {
      state.userInfoLoading = false;
      state.userInfoMessage = action.payload;
      state.userInfoError = null;
    })
    .addCase('UPDATE_USER_INFO_FAIL', (state, action) => {
      state.userInfoLoading = false;
      state.userInfoError = action.payload;
      state.userInfoMessage = null;
    })
    .addCase('UPDATE_USER_ADDRESS_REQUEST', (state) => {
      state.userAddressLoading = true;
    })
    .addCase('UPDATE_USER_ADDRESS_SUCCESS', (state, action) => {
      state.userAddressLoading = false;
      state.userAddressMessage = action.payload;
      state.userAddressError = null;
    })
    .addCase('UPDATE_USER_ADDRESS_FAIL', (state, action) => {
      state.userAddressLoading = false;
      state.userAddressError = action.payload;
      state.userAddressMessage = null;
    })
    .addCase('DELETE_USER_ADDRESS_REQUEST', (state) => {
      state.deleteUserAddressLoading = true;
    })
    .addCase('DELETE_USER_ADDRESS_SUCCESS', (state, action) => {
      state.deleteUserAddressLoading = false;
      state.deleteUserAddressMessage = action.payload;
      state.deleteUserAddressError = null;
    })
    .addCase('DELETE_USER_ADDRESS_FAIL', (state, action) => {
      state.deleteUserAddressLoading = false;
      state.deleteUserAddressError = action.payload;
      state.deleteUserAddressMessage = null;
    })
    .addCase('CLEAR_ERROR', (state) => {
      state.error = null;
    });
});
