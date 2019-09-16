import * as actionTypes from "./actionTypes";

const defaultState = {
  loggedIn: false,
  fetchPending: true,
  fetchError: false,
  posts: []
};

export const posts = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_START:
      return {
        ...state,
        fetchPending: true
      };
    case actionTypes.FETCH_POSTS_FAIL:
      return {
        ...state,
        fetchPending: false,
        fetchError: true
      };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        fetchError: false,
        fetchPending: false,
        posts: action.data
      };
    case actionTypes.CREATE_POST:
      return {
        ...state
      };
    case actionTypes.EDIT_POST:
      return {
        ...state
      };
    case actionTypes.DELETE_POST:
      return {
        ...state
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        loggedIn: action.loggedIn
      };
    default:
      return state;
  }
};

export default posts;
