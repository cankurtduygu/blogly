import type { Blog } from "../features/blogSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authSlice";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function BlogCard({ blog, catName, authorName }: { blog: Blog; catName: string | null; authorName: string }) {
  const currentUser = useSelector(selectCurrentUser);
  const isLiked = currentUser ? blog.likes.includes(currentUser._id) : false;

  return (
    <>
      <div className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 w-full">
        <img
          className="rounded-md max-h-40 w-full object-cover"
          src={blog.image}
          alt={blog.title}
        />
        <p className="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2">
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""}
        </p>
        <div className="flex items-center gap-2 ml-2 mt-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.userId}`}
            alt="author"
          />
          <span className="text-slate-900 text-sm font-medium">
            {authorName}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-indigo-500 text-sm font-medium">
            {catName || "Uncategorized"}
          </span>
        </div>
        <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
          {blog.title}
        </p>

        <p className="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2">
          {blog.content.length > 100
            ? blog.content.slice(0, 100).replace(/<[^>]*>/g, "") + "..."
            : blog.content.replace(/<[^>]*>/g, "")}
        </p>
        <div className="flex items-center justify-between mt-4 mb-3 ml-2 mr-2">
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer px-6 py-2 font-medium rounded-md text-white text-sm"
          >
            Read More
          </button>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <button className="flex items-center gap-1 cursor-pointer transition hover:text-red-500">
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{blog.likes.length}</span>
            </button>
            <span className="flex items-center gap-1">
              <FaRegComment />
              <span>{blog.comments.length}</span>
            </span>
            <span className="flex items-center gap-1">
              <FiEye />
              <span>{blog.countOfVisitors ?? 0}</span>
            </span>
            <button className="cursor-pointer text-gray-500 hover:text-gray-700 transition">
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
