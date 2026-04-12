import { useDispatch } from "react-redux";
import axios from "axios";
import { selectToken } from "../features/authSlice";
import {
  fetchFail,
  fetchStart,
  fetchSuccess,
  fetchLatestBlogSuccess,
  fetchMostReadBlogsSuccess,
  fetchBlogByIdSuccess,
  fetchFinish,
  fetchCategoriesSuccess,
} from "../features/blogSlice";
import { useSelector } from "react-redux";
import type { WriteFormData } from "../lib/schemas";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useBlogCall = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const authHeaders = token
    ? { headers: { Authorization: `Token ${token}` } }
    : {};

  const getBlogs = async (page = 1, limit = 6, categoryId = "" ) => {
    try {
      dispatch(fetchStart());

      let url = `${BASE_URL}blogs?page=${page}&limit=${limit}`;
      if (categoryId) {
        url += `&filter[categoryId]=${categoryId}`;
      }
      const { data } = await axios(url, authHeaders);

      dispatch(fetchSuccess(data));
      dispatch(fetchFinish());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Blog fetch failed";
      dispatch(fetchFail(message));
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      dispatch(fetchStart());

      const { data } = await axios(`${BASE_URL}categories`, authHeaders);
      dispatch(fetchCategoriesSuccess(data));
      dispatch(fetchFinish());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Categories fetch failed";
      dispatch(fetchFail(message));
      console.log(error);
    }
  };

  const getBlogsById = async (id: string) => {
    try {
      dispatch(fetchStart());
      const { data } = await axios(`${BASE_URL}blogs/${id}`, authHeaders);
      dispatch(fetchBlogByIdSuccess({ data }));
      dispatch(fetchFinish());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Blog fetch failed";
      dispatch(fetchFail(message));
    }
  };

  const toggleLike = async (id: string) => {
    try {
      await axios.post(
        `${BASE_URL}blogs/${id}/postLike`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Like toggle failed";
      dispatch(fetchFail(message));
    }
  };

  const postComment = async (blogId: string, commentText: string) => {
    try {
      await axios.post(
        `${BASE_URL}comments`,
        { blogId, comment: commentText },
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Comment post failed";
      dispatch(fetchFail(message));
    }
  };

  const createPost = async (data:WriteFormData) => {
    try {
      await axios.post(`${BASE_URL}blogs`,
        data,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
    } catch (error) {
       const message =
        error instanceof Error ? error.message : "Create post failed";
      dispatch(fetchFail(message));
      throw error;
    }
  };

  const getLatestBlog = async () => {
    try {
      dispatch(fetchStart());

      const { data } = await axios(
        `${BASE_URL}blogs?sort[createdAt]=desc&limit=1`,
        authHeaders,
      );

      dispatch(fetchLatestBlogSuccess(data));
      dispatch(fetchFinish());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Latest blog fetch failed";
      dispatch(fetchFail(message));
      console.log(error);
    }
  };
  const getMostReadBlogs = async () => {
    try {
      dispatch(fetchStart());

      const { data } = await axios(
        `${BASE_URL}blogs?sort[countOfVisitors]=desc&limit=3`,
        authHeaders,
      );

      dispatch(fetchMostReadBlogsSuccess(data));
      dispatch(fetchFinish());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Most read blogs fetch failed";
      dispatch(fetchFail(message));
      console.log(error);
    }
  };

  const getUserBlogs = async (userId: string) => {
    const { data } = await  axios(`${BASE_URL}blogs?filter[userId]=${userId}`, authHeaders);
    return data;
   } 

  return {
    getBlogs,
    getLatestBlog,
    getMostReadBlogs,
    getCategories,
    getBlogsById,
    toggleLike,
    postComment,
    createPost,
    getUserBlogs
  };
};

export default useBlogCall;
