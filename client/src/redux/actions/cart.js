// add to cart
export const addToCartAction = (data) => async (dispatch, getState) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCartAction = (data) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
