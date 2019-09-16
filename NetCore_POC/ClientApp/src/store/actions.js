import localhost from "../api/localhost";
import * as actionTypes from "./actionTypes";

export const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START
  };
};

export const fetchPostsFail = error => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error
  };
};

export const fetchPostsSuccess = data => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    data: data
  };
};

export const fetchPosts = page => async dispatch => {
  const pageQuery = page !== undefined ? `?page=${page}` : "";
  dispatch(fetchPostsStart());
  try {
    const response = await localhost.get(`/api/posts${pageQuery}`);
    dispatch(fetchPostsSuccess(response));
  } catch (e) {
    dispatch(fetchPostsFail(e));
  }
};

export const editPost = (formValues, pageNum) => async dispatch => {
  const response = await localhost.patch("/api/posts", formValues);
  dispatch({ type: actionTypes.EDIT_POST, quoteEdited: response.data });
  dispatch(fetchPosts(pageNum));
};

export const addPost = (formValues, pageNum) => {
  return async dispatch => {
    const response = await localhost.post("/api/posts", { ...formValues });
    dispatch({ type: actionTypes.CREATE_POST, postNew: response });
    dispatch(fetchPosts(pageNum));
  };
};

export const deletePost = id => async dispatch => {
  await localhost.delete(`/api/posts/${id}`);
  dispatch({ type: actionTypes.DELETE_POST, id: id });
  dispatch(fetchPosts());
};
