import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTopBlogs } from "../../store/blogSlice";
import { selectCurrentUser } from "../../store/authSlice";
import { toast } from "react-toastify";

export default function Hero() {
  const topsBlog = useSelector(selectTopBlogs);
  const currentUser = useSelector(selectCurrentUser);
  const topBlog = topsBlog[0];

  const handleAuthAction = (e: React.MouseEvent) => {
    if (!currentUser) {
      e.preventDefault();
      toast.info("Please sign in to interact with blogs");
    }
  };

  return (
    <div className="relative w-full h-[70vh] min-h-120 flex items-end overflow-hidden">
      {/* Background image */}
      {topBlog?.image ? (
        <img
          src={topBlog.image}
          alt={topBlog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-slate-800" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 md:pb-16 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mb-4">
          {topBlog?.title ?? "A place to read, write, and grow."}
        </h1>

        <p className="text-white/70 text-sm sm:text-base max-w-xl mb-8">
          {topBlog
            ? new Date(topBlog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Read and share articles on technology, life, and more."}
        </p>

        <div className="flex items-center gap-4 text-sm">
          {topBlog && (
            <Link
              to={`/blogs/${topBlog._id}`}
              className="flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 h-11 rounded-md hover:bg-slate-100 active:scale-95 transition"
              onClick={handleAuthAction}
            >
              Read Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          )}
          {!currentUser && (
            <Link
              to="/sign-up"
              className="flex items-center border border-white/60 text-white px-6 h-11 rounded-md hover:bg-white/10 active:scale-95 transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
