import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import { CiMail } from "react-icons/ci";
import { useEffect, useState } from "react";
import useBlogCall from "../../hooks/useBlogCall";
import type { Blog } from "../../features/blogSlice";

export default function UserProfileCard() {
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

  const { getUserBlogs } = useBlogCall();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetch = async () => {
      const data = await getUserBlogs(currentUser!._id);
      console.log(data);
      setUserBlogs(data.data);
    };
    if (currentUser?._id) fetch();
  }, []);

  const totalLikes = userBlogs.reduce(
    (sum, blog) => sum + blog.likes.length,
    0,
  );

  return (
    <div className="w-full">
      <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 w-full flex flex-col sm:flex-row items-center sm:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
            <img
              className="w-full h-full object-cover object-top"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="userImage2"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-semibold text-lg sm:text-xl text-white capitalize">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5">
                <CiMail className="text-gray-400" />
                <p className="text-gray-400 text-sm">{currentUser?.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Blogs
            </p>
            <p className="text-2xl font-bold text-white">{userBlogs.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Likes
            </p>
            <p className="text-2xl font-bold text-green-400">{totalLikes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
