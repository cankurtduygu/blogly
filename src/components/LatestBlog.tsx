import { useSelector } from "react-redux";
import { selectLatestBlog } from "../features/blogSlice";
import { selectCurrentUser } from "../features/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LatestBlog() {
  const latestBlog = useSelector(selectLatestBlog);
  const currentUser = useSelector(selectCurrentUser);

  if (!latestBlog) return null;

  const handleAuthAction = (e: React.MouseEvent) => {
    if (!currentUser) {
      e.preventDefault();
      toast.info("Please sign in to read full articles");
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 w-full">
      <img
        className="rounded-md h-60 w-full object-cover"
        src={latestBlog.image}
        alt={latestBlog.title}
      />
      <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
        {latestBlog.title}
      </p>
      <p className="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2">
        {(() => {
          const stripped = latestBlog.content.replace(/<[^>]*>/g, "");
          return stripped.length > 300
            ? stripped.slice(0, 300) + "..."
            : stripped;
        })()}
      </p>
      <Link
        to={`/blogs/${latestBlog._id}`}
        onClick={handleAuthAction}
        className="inline-block bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded-md text-white text-sm"
      >
        Read More
      </Link>
    </div>
  );
}
