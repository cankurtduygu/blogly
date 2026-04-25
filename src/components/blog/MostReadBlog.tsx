import { useSelector } from "react-redux";
import { selectTopBlogs } from "../../store/blogSlice";
import { selectCurrentUser } from "../../store/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
    <Swiper
      direction="vertical"
      modules={[Autoplay]}
      slidesPerView={3}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      style={{ height: "480px" }}
    >
      {topBlogs.map((blog, index) => (
        <SwiperSlide key={blog._id}>
          <Link
            to={`/blogs/${blog._id}`}
            onClick={handleAuthAction}
            className="flex items-center gap-4 bg-white rounded-xl p-3 sm:p-4 shadow shadow-black/5 hover:-translate-y-0.5 transition duration-300"
          >
            <span className="text-5xl font-extrabold text-slate-900 leading-none w-10 shrink-0 select-none">
              {index + 1}
            </span>
            <img
              className="w-24 h-24 sm:w-36 sm:h-32 object-cover rounded-lg shrink-0"
              src={blog.image}
              alt={blog.title}
            />
            <div>
              <h3 className="text-base text-slate-900 font-semibold leading-snug">
                {blog.title}
              </h3>
              <p className="text-xs text-zinc-900 mt-1.5">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-zinc-600 mt-1.5">
                {(() => {
                  const text = blog.content.replace(/<[^>]*>/g, "");
                  return text.length > 30 ? text.slice(0, 30) + "..." : text;
                })()}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
