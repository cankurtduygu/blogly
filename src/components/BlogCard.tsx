import type { Blog } from "../features/blogSlice";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <>
      <div className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 w-full">
        <img
          className="rounded-md max-h-40 w-full object-cover"
          src={blog.image}
          alt={blog.title}
        />
        <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
          {blog.title}
        </p>
        <p className="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2">
          {blog.content.length > 100
            ? blog.content.slice(0, 100) + "..."
            : blog.content}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded-md text-white text-sm"
        >
          Learn More
        </button>
      </div>
    </>
  );
}
