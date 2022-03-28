import axios from "../../utils/axios";

export const SET_TEST_SUCCESS = "SET_TEST_SUCCESS";
export const SET_TEST_LOADING = "SET_TEST_LOADING";
export const SET_TEST_ERROR = "SET_TEST_ERROR";

export const setTests = (type) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: type === SET_TEST_LOADING,
      });

      const response = await axios.get();

      if (response.status !== 200) {
        dispatch({
          type: SET_TEST_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;

      dispatch({
        type: SET_TEST_SUCCESS,
        tests: data,
      });
    } catch (error) {
      dispatch({
        type: SET_TEST_ERROR,
        error_msg: "network error",
      });
    }
  };
};
