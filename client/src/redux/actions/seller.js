import axios from "axios";

export const getSeller = () => async (dispatch) => {

  try {
    console.log("Seller: Request initiated")
    dispatch({
      type: "SELLER_DETAILS_REQUEST"
    });

    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/seller`);
    console.log("Seller Data:", data)
    dispatch({
      type: "SELLER_DETAILS_SUCCESS",
      payload: data.data,
    });

    console.log("Success Seller dispatched")


  } catch (error) {
    console.log("Fetch Seller Error:", error.response.data)
    dispatch({
      type: "SELLER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
}

