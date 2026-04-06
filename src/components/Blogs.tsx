import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBlogs, selectCategories } from "../features/blogSlice";
import { selectCurrentUser } from "../features/authSlice";
import BlogCard from "./BlogCard";

export default function Blogs() {
  const categories = useSelector(selectCategories);
  const blogs = useSelector(selectBlogs);
  const currentUser = useSelector(selectCurrentUser);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: Tab Switch */}
      <div className="w-fit mt-5 hidden lg:flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-full text-sm justify-center items-center mx-auto">
        {categories.map((category) => (
          <div className="flex items-center" key={category._id}>
            <input
              type="radio"
              name="options"
              id={category._id}
              className="hidden peer"
              checked={selectedCategory === category._id}
              onChange={() => setSelectedCategory(category._id)}
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
      {blogs.map((blog) => {
        const catName = categories.find((cat)=> (cat._id ===blog.categoryId))?.name || null;
        const authorName = currentUser && currentUser._id === blog.userId
          ? `${currentUser.firstName} ${currentUser.lastName}`
          : "Anonymous";
        return <BlogCard key={blog._id} blog={blog} catName={catName} authorName={authorName} />;
      })}
      </div>
    </>
  );
}
