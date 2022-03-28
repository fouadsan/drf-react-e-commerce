import {
  SET_TEST_LOADING,
  SET_TEST_SUCCESS,
  SET_TEST_ERROR,
} from "../actions/test";

const initialState = {
  tests_loading: false,
  tests_error: {
    is_occured: false,
    msg: "",
  },
  tests: [],
};
export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_LOADING:
      return { ...state, tests_loading: true };

    case SET_TEST_ERROR:
      return {
        ...state,
        tests_error: { is_occured: true, msg: action.error_msg },
        tests_loading: false,
      };

    case SET_TEST_SUCCESS:
      return { ...state, tests: action.tests, tests_loading: false };

    default:
      return state;
  }
};
