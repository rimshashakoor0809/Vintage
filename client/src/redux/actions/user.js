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
      payload: data.data,
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

export const userForgotPassword = (email) => async (dispatch) => {

  try {
    console.log("Request initiated")
    dispatch({
      type: "USER_FORGOT_PASSWORD_REQUEST"
    });

    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user/forgot-password`, { email });
    console.log("User forgot password:", data);
    dispatch({
      type: "USER_FORGOT_PASSWORD_SUCCESS",
      payload: data.message,
    });
    console.log("Success user dispatched")


  } catch (error) {
    console.log("User: Error forgetting password:", error.response.data)
    dispatch({
      type: "USER_FORGOT_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
}

export const userResetPassword = (id, password) => async (dispatch) => {

  try {
    console.log("Request initiated")
    dispatch({
      type: "USER_RESET_PASSWORD_REQUEST"
    });

    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user/reset-password/${id}`, { password });
    console.log("User reset password:", data);
    dispatch({
      type: "USER_RESET_PASSWORD_SUCCESS",
      payload: data.message,
    });
    console.log("Success user dispatched")


  } catch (error) {
    console.log("User: Error resetting password:", error.response.data)
    dispatch({
      type: "USER_RESET_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
}

// user update information
export const updateUserInfoAction =
  (name, phoneNumber) => async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_INFO_REQUEST",
      });

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user`,
        {
          phoneNumber,
          name,
        },
      );

      dispatch({
        type: "UPDATE_USER_INFO_SUCCESS",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_INFO_FAIL",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updateUserAddressAction =
  (country, city, address, zipCode) =>
    async (dispatch) => {
      try {
        dispatch({
          type: "UPDATE_USER_ADDRESS_REQUEST",
        });

        const { data } = await axios.put(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user/address`,
          {
            country,
            city,
            address,
            zipCode,
          }
        );

        dispatch({
          type: "UPDATE_USER_ADDRESS_SUCCESS",
          payload: {
            user: data.user,
          },
        });
      } catch (error) {
        dispatch({
          type: "UPDATE_USER_ADDRESS_FAIL",
          payload: error.response.data.message,
        });
      }
    };

// delete user address
export const deleteUserAddressAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_USER_ADDRESS_REQUEST",
    });

    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/user/address/${id}`);

    dispatch({
      type: "DELETE_USER_ADDRESS_SUCCESS",
      payload: {
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "DELETE_USER_ADDRESS_FAIL",
      payload: error.response.data.message,
    });
  }
};


