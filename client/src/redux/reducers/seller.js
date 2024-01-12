import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SELLER_DETAILS_REQUEST', (state) => {
      state.sellerLoading = true;
    })
    .addCase('SELLER_DETAILS_SUCCESS', (state, action) => {
      state.sellerLoading = false;
      state.isSellerAuthenticated = true;
      state.seller = action.payload;
      state.sellerError = null;
    })
    .addCase('SELLER_DETAILS_FAIL', (state, action) => {
      state.sellerLoading = false;
      state.isSellerAuthenticated = false;
      state.sellerError = action.payload;
      state.seller = null;
    })
    .addCase('SELLER_DETAILS_CLEAR_ERROR', (state) => {
      state.sellerError = null;
    });
});
