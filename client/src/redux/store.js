import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { cartReducer } from "./reducers/cart";

const rootReducer = combineReducers({
  user: userReducer,
  seller: sellerReducer,
  products: productReducer,
  cart: cartReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;