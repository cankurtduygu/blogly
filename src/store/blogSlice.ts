import { createSlice } from "@reduxjs/toolkit";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  categoryId: string;
  userId: string;
  likes: string[];
  comments: string[];
  countOfVisitors?: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Comment {
  _id: string;
  blogId: string;
  userId: string;
  comment: string;
  createdAt: string;
}

interface PaginationDetails {
  pages: {
    previous: number | false;/// önceki sayfa var mı?
    current: number;
    next: number | false;// sonraki sayfa var mı?
    total: number;// toplam sayfa sayısı
  } | false;
  totalRecords: number;
}

interface BlogState {
  loading: boolean;
  error: string | null;
  blogs: Blog[];
  blog: Blog | null;
  latestBlog: Blog | null;
  topBlogs: Blog[];
  categories: Category[];
  comments: Comment[];
  details: PaginationDetails | null;
}

const initialState: BlogState = {
  loading: false,
  error: null,
  blogs: [],
  blog: null,
  latestBlog: null,
  topBlogs: [],
  categories: [],
  comments: [],
  details: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    fetchSuccess: (state, { payload }) => {
      state.error = null;
      state.blogs = payload.data;// o sayfanın blogları
      state.details = payload.details;// sayfalama bilgisi
      //API'den gelen details objesi Redux'a kaydedilir.
    },
    fetchCategoriesSuccess: (state, { payload }) => {
      state.error = null;
      state.categories = payload.data;
    },
    fetchBlogByIdSuccess: (state, { payload }) => {
      state.error = null;
      state.blog = payload.data;
    },
    fetchLatestBlogSuccess: (state, { payload }) => {
      state.error = null;
      state.latestBlog = payload.data[0] ?? null;
    },
    fetchMostReadBlogsSuccess: (state, { payload }) => {
      state.error = null;
      state.topBlogs = payload.data;
    },
    fetchFinish: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  fetchSuccess,
  fetchCategoriesSuccess,
  fetchBlogByIdSuccess,
  fetchLatestBlogSuccess,
  fetchMostReadBlogsSuccess,
  fetchFinish,
} = blogSlice.actions;

export const selectBlogs = (state: { blog: BlogState }) => state.blog.blogs;
export const selectBlog = (state: { blog: BlogState }) => state.blog.blog;
export const selectLatestBlog = (state: { blog: BlogState }) =>
  state.blog.latestBlog;
export const selectTopBlogs = (state: { blog: BlogState }) =>
  state.blog.topBlogs;
export const selectCategories = (state: { blog: BlogState }) =>
  state.blog.categories;
export const selectBlogLoading = (state: { blog: BlogState }) =>
  state.blog.loading;
export const selectBlogError = (state: { blog: BlogState }) => state.blog.error;
export const selectDetails = (state: { blog: BlogState }) => state.blog.details;
export default blogSlice.reducer;
