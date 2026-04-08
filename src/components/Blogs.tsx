import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectBlogs,
  selectCategories,
  selectDetails,
  selectBlogLoading,
} from "../features/blogSlice";
import { selectCurrentUser } from "../features/authSlice";
import BlogCard from "./BlogCard";
import { useSearchParams } from "react-router-dom";
import useBlogCall from "../hooks/useBlogCall";

export default function Blogs() {
  const categories = useSelector(selectCategories);
  const blogs = useSelector(selectBlogs);
  const currentUser = useSelector(selectCurrentUser);
  const details = useSelector(selectDetails);
  const loading = useSelector(selectBlogLoading);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Mevcut sayfayı oku, yoksa 1 kabul et
  const page = Number(searchParams.get("page")) || 1;

  const { getBlogs } = useBlogCall();

  useEffect(() => {
    getBlogs(page, 6, selectedCategory);
  }, [page, selectedCategory]);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start justify-between mt-10 gap-6">
        <div>
          <h2 className="text-2xl font-semibold  text-slate-900 mb-6 ">
            Browse by categories
          </h2>
        </div>
        <div>
          <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-11.5 rounded-full overflow-hidden max-w-md w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="#6B7280"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>
            <input
              type="text"
              className="w-full h-full outline-none text-sm text-gray-500"
            />
            <button
              type="submit"
              className="bg-indigo-500 w-32 h-9 rounded-full text-sm text-white mr-1.25"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Dropdown */}
      <div className="mt-5 flex justify-center lg:hidden">
        <select
          className="w-full max-w-xs bg-white border border-gray-500/50 rounded-full py-2 px-4 text-sm text-gray-500 outline-none"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchParams({ page: "1" });
          }}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: Tab Switch */}
      <div className="w-fit mt-5 hidden lg:flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-full text-sm justify-center items-center mx-auto">
        <div className="flex items-center">
          <input
            type="radio"
            name="options"
            id="all"
            className="hidden peer"
            checked={selectedCategory === ""}
            onChange={() => {
              setSelectedCategory("");
              setSearchParams({ page: "1" });
            }}
          />
          <label
            htmlFor="all"
            className="cursor-pointer rounded-full py-2 px-4 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white"
          >
            All
          </label>
        </div>
        {categories.map((category) => (
          <div className="flex items-center" key={category._id}>
            <input
              type="radio"
              name="options"
              id={category._id}
              className="hidden peer"
              checked={selectedCategory === category._id}
              onChange={() => {
                setSelectedCategory(category._id);
                setSearchParams({ page: "1" });
              }}
            />
            <label
              htmlFor={category._id}
              className="cursor-pointer rounded-full py-2 px-4 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse p-4 bg-white border border-gray-200 rounded-lg shadow shadow-black/10"
              >
                <div className="bg-gray-200 rounded-md h-40 w-full" />
                <div className="mt-3 h-4 bg-gray-200 rounded w-1/3" />
                <div className="mt-3 h-5 bg-gray-200 rounded w-3/4" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-full" />
                <div className="mt-1 h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))
          : blogs.map((blog) => {
              const catName =
                categories.find((cat) => cat._id === blog.categoryId)?.name ||
                null;
              const authorName =
                currentUser && currentUser._id === blog.userId
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : "Anonymous";
              return (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  catName={catName}
                  authorName={authorName}
                />
              );
            })}
      </div>
      {/* Pagination */}
      {details && details.pages && details.pages.total > 1 && (
        <div className="flex items-center justify-between w-full max-w-80 mx-auto mt-8 text-gray-500 font-medium">
          <button
            type="button"
            aria-label="prev"
            onClick={() => {
              if (details.pages && details.pages.previous) {
                setSearchParams({ page: String(page - 1) });
              }
            }}
            disabled={!details.pages || !details.pages.previous}
            className="rounded-full bg-slate-200/50 disabled:opacity-30"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                fill="#475569"
                stroke="#475569"
                strokeWidth=".078"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2 text-sm font-medium">
            {details.pages &&
              Array.from({ length: details.pages.total }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setSearchParams({ page: String(num) })}
                    className={`h-10 w-10 flex items-center justify-center aspect-square ${
                      num === page
                        ? "text-indigo-500 border border-indigo-200 rounded-full"
                        : ""
                    }`}
                  >
                    {num}
                  </button>
                ),
              )}
          </div>

          <button
            type="button"
            aria-label="next"
            onClick={() => {
              if (details.pages && details.pages.next) {
                setSearchParams({ page: String(page + 1) });
              }
            }}
            disabled={!details.pages || !details.pages.next}
            className="rounded-full bg-slate-200/50 disabled:opacity-30"
          >
            <svg
              className="rotate-180"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                fill="#475569"
                stroke="#475569"
                strokeWidth=".078"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
