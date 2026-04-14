import { useSelector } from "react-redux";
import { selectTopBlogs } from "../features/blogSlice";
import { selectCurrentUser } from "../features/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function MostReadBlog() {
  const topBlogs = useSelector(selectTopBlogs);
  const currentUser = useSelector(selectCurrentUser);

  if (!topBlogs.length) return null;

  const handleAuthAction = (e: React.MouseEvent) => {
    if (!currentUser) {
      e.preventDefault();
      toast.info("Please sign in to read full articles");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {topBlogs.map((blog) => (
        <Link
          key={blog._id}
          to={`/blogs/${blog._id}`}
          onClick={handleAuthAction}
          className="flex items-center gap-4 bg-white rounded-xl p-3 sm:p-4 shadow shadow-black/5 hover:-translate-y-0.5 transition duration-300"
        >
          <img
            className="w-20 h-20 sm:w-32 sm:h-28 object-cover rounded-lg shrink-0"
            src={blog.image}
            alt={blog.title}
          />
          <div>
            <h3 className="text-base text-slate-900 font-semibold leading-snug">
              {blog.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <span className="mx-1.5">|</span>
              {(() => {
                const text = blog.content.replace(/<[^>]*>/g, "");
                return text.length > 30 ? text.slice(0, 30) + "..." : text;
              })()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
