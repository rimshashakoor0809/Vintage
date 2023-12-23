import axios from "axios";

export const getUser = () => async (dispatch) => {

  try {
    console.log("Request initiated")
    dispatch({
      type: "USER_DETAILS_REQUEST"
    });

    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user`);
    console.log("User Object:", data);
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data.user,
    });
    console.log("Success user dispatched")


  } catch (error) {
    console.log("Fetch User Error:", error.response.data)
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
}

