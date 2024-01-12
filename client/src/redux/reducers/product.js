import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  product: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('CREATE_PRODUCT_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('CREATE_PRODUCT_SUCCESS', (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.error = null;
      state.success = true;
    })
    .addCase('CREATE_PRODUCT_FAIL', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.product = null;
      state.success = false;

    })
    .addCase('GET_ALL_SELLER_PRODUCTS_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('GET_ALL_SELLER_PRODUCTS_SUCCESS', (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
      state.success = true;
    })
    .addCase('GET_ALL_SELLER_PRODUCTS_FAIL', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.products = null;
      state.success = false;
    })
    .addCase('DELETE_PRODUCT_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('DELETE_PRODUCT_SUCCESS', (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase('DELETE_PRODUCT_FAIL', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('ALL_PRODUCTS_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('ALL_PRODUCTS_SUCCESS', (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      state.error = null;
      state.success = true;
    })
    .addCase('ALL_PRODUCTS_FAIL', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.allProducts = null;
      state.success = false;
    })
    .addCase('CLEAR_ERROR', (state) => {
      state.error = null;
    });
});
