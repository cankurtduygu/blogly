import { useDispatch } from "react-redux";
import axios from "axios";
import { selectToken } from "../features/authSlice";
import {
  //   fetchCategoriesSuccess,
  fetchFail,
  fetchStart,
  fetchSuccess,
  fetchLatestBlogSuccess,
  fetchMostReadBlogsSuccess,
  //   fetchBlogByIdSuccess,
  fetchFinish,
  fetchCategoriesSuccess,
} from "../features/blogSlice";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useBlogCall = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const getBlogs = async () => {
    try {
      dispatch(fetchStart());

      const { data } = await axios(`${BASE_URL}blogs`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

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

      const { data } = await axios(`${BASE_URL}categories`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      dispatch(fetchCategoriesSuccess(data));
      dispatch(fetchFinish());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Categories fetch failed";
      dispatch(fetchFail(message));
      console.log(error);
    }
  };

  //   const getBlogPageData = async () => {
  //     try {
  //       dispatch(fetchStart());

  //       const categoryRes = await axios(`${BASE_URL}categories`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });

  //       dispatch(fetchCategoriesSuccess(categoryRes.data));

  //       const blogRes = await axios(`${BASE_URL}blogs`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });

  //       dispatch(fetchSuccess(blogRes.data));

  //       dispatch(fetchFinish());
  //     } catch (error) {
  //       dispatch(fetchFail(error.message));
  //       console.log(error);
  //     }
  //   };

  // const getBlogsById = async (id) =>{
  //   try {
  //     dispatch(fetchStart());

  //     const { data } = await axios(`${BASE_URL}blogs/${id}`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });

  //     dispatch(fetchBlogByIdSuccess({ data }));
  //     dispatch(fetchFinish());
  //   } catch (error) {
  //     dispatch(fetchFail(error.message));
  //     console.log(error);
  //   }
  // }

  // const toggleLike = async (id) => {
  //   try {
  //     await axios.post(`${BASE_URL}blogs/${id}/postLike`, {}, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     dispatch(fetchFail(error.message));
  //     console.log(error);
  //   }
  // };

  // const postComment = async (blogId, commentText) => {
  //   try {
  //     await axios.post(`${BASE_URL}comments`, { blogId: blogId, comment: commentText }, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     toast.success('Yorum başarıyla eklendi!');
  //   } catch (error) {
  //     toast.error('Yorum eklenemedi!');
  //     dispatch(fetchFail(error.message));
  //     console.log(error);
  //   }
  // };

  const getLatestBlog = async () => {
    try {
      dispatch(fetchStart());

      const { data } = await axios(
        `${BASE_URL}blogs?sort[createdAt]=desc&limit=1`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
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
        {
          headers: { Authorization: `Token ${token}` },
        },
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

  return { getBlogs, getLatestBlog, getMostReadBlogs, getCategories };
};

export default useBlogCall;
