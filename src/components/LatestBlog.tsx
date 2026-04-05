import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLatestBlog } from "../features/blogSlice";
import useBlogCall from "../hooks/useBlogCall";

export default function LatestBlog() {
  const { getLatestBlog } = useBlogCall();
  const latestBlog = useSelector(selectLatestBlog);

  useEffect(() => {
    getLatestBlog();
  }, []);

  if (!latestBlog) return null;

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
        {latestBlog.content.length > 100
          ? latestBlog.content.slice(0, 300) + "..."
          : latestBlog.content}
      </p>
      <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded-md text-white text-sm"
      >
        Learn More
      </button>
    </div>
  );
}
