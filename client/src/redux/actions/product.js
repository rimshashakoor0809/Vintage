import axios from "axios";

export const createProductAction = (form) => async (dispatch) => {

  try {
    console.log("Seller: Request initiated")
    dispatch({
      type: "CREATE_PRODUCT_REQUEST"
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } }
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/product`, form, config);

    console.log("Seller Data:", data)
    dispatch({
      type: "CREATE_PRODUCT_SUCCESS",
      payload: data.product,
    });

    console.log("Success Seller dispatched")


  } catch (error) {
    console.log("Fetch Seller Error:", error.response.data)
    dispatch({
      type: "CREATE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
}

export const getAllSellerProductsAction = (id) => async (dispatch) => {

  try {
    dispatch({
      type: "GET_ALL_SELLER_PRODUCTS_REQUEST"
    });

    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/product/all-seller-products/${id}`);
    console.log("Seller Products Data:", data)
    dispatch({
      type: "GET_ALL_SELLER_PRODUCTS_SUCCESS",
      payload: data.products,
    });

  } catch (error) {
    console.log("Fetching seller products Error:", error.response.data)
    dispatch({
      type: "GET_ALL_SELLER_PRODUCTS_FAIL",
      payload: error.response.data.message,
    });
  }
}

export const deleteProductAction = (id) => async (dispatch) => {

  try {
    dispatch({
      type: "DELETE_PRODUCT_REQUEST"
    });

    const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/product/${id}`);

    console.log("Delete Products:", data)
    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
      payload: data.message,
    });

  } catch (error) {
    console.log("deleting seller products Error:", error.response.data)
    dispatch({
      type: "DELETE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
}

export const getAllProductsAction = () => async (dispatch) => {

  try {
    dispatch({
      type: "ALL_PRODUCTS_REQUEST"
    });

    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/product/all`);

    console.log("All Products Data:", data)
    dispatch({
      type: "ALL_PRODUCTS_SUCCESS",
      payload: data.products,
    });

  } catch (error) {
    console.log("Fetching all products Error:", error.response.data)
    dispatch({
      type: "ALL_PRODUCTS_FAIL",
      payload: error.response.data.message,
    });
  }
}

