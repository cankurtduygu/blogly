import type { Blog } from "../features/blogSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authSlice";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuLink, LuPencil, LuTrash2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function BlogCard({
  blog,
  catName,
  authorName,
  showMenu = false,
  onDelete,
}: {
  blog: Blog;
  catName: string | null;
  authorName: string;
  showMenu?: boolean;
  onDelete?: (blogId: string) => void;
}) {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const isLiked = currentUser ? blog.likes.includes(currentUser._id) : false;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuthAction = (e: React.MouseEvent) => {
    if (!currentUser) {
      e.preventDefault();
      toast.info("Please sign in to interact with blogs");
    }
  };


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
        <p className="text-gray-900 text-xl font-semibold ml-2 mt-4 line-clamp-2">
          {blog.title}
        </p>

        <p className="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2">
          {blog.content.length > 100
            ? blog.content.slice(0, 100).replace(/<[^>]*>/g, "") + "..."
            : blog.content.replace(/<[^>]*>/g, "")}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 mb-3 ml-2 mr-2">
          <Link
            to={`/blogs/${blog._id}`}
            onClick={handleAuthAction}
            className="bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer px-6 py-2 font-medium rounded-md text-white text-sm"
          >
            Read More
          </Link>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <Link
              to={`/blogs/${blog._id}`}
              onClick={handleAuthAction}
              className="flex items-center gap-1 transition hover:text-red-500"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{blog.likes.length}</span>
            </Link>
            <Link
              to={`/blogs/${blog._id}`}
              onClick={handleAuthAction}
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              <FaRegComment />
              <span>{blog.comments.length}</span>
            </Link>
            <span className="flex items-center gap-1">
              <FiEye />
              <span>{blog.countOfVisitors ?? 0}</span>
            </span>
            {showMenu && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
                >
                  <BsThreeDotsVertical />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40 z-10">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/blogs/${blog._id}`);
                        toast.success("Link copied!");
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      <LuLink size={16} /> Copy Link
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/blogs/${blog._id}/edit`);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      <LuPencil size={16} /> Edit Blog
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete?.(blog._id);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50 cursor-pointer"
                    >
                      <LuTrash2 size={16} /> Delete Blog
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
