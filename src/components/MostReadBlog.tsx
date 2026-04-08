import { useSelector } from "react-redux";
import { selectTopBlogs } from "../features/blogSlice";
import { Link } from "react-router-dom";

export default function MostReadBlog() {
  const topBlogs = useSelector(selectTopBlogs);

  if (!topBlogs.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {topBlogs.map((blog) => (
        <Link
          key={blog._id}
          to={`/blogs/${blog._id}`}
          className="flex items-center gap-4 bg-white rounded-xl p-4 shadow shadow-black/5 hover:-translate-y-0.5 transition duration-300"
        >
          <img
            className="w-32 h-28 object-cover rounded-lg shrink-0"
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
