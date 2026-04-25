import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories, type Blog } from "../../store/blogSlice";
import { selectCurrentUser } from "../../store/authSlice";
import BlogCard from "../../components/blog/BlogCard";
import useBlogCall from "../../hooks/useBlogCall";
import { toast } from "react-toastify";

export default function MyBlogs() {
  const categories = useSelector(selectCategories);
  const currentUser = useSelector(selectCurrentUser);
  const { getUserBlogs, deleteBlog } = useBlogCall();
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (currentUser?._id) {
      getUserBlogs(currentUser._id).then((res) => {
        setMyBlogs(res.data);
      });
    }
  }, [currentUser?._id]);

  const handleDelete = async (blogId: string) => {
    try {
      await deleteBlog(blogId);
      setMyBlogs((prev) => prev.filter((b) => b._id !== blogId));
      toast.success("Blog deleted successfully");
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">My Blogs</h1>
      <p className="text-gray-500 text-sm mt-1 mb-6">
        View and manage your published blogs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {myBlogs.map((blog) => {
          const catName =
            categories.find((c) => c._id === blog.categoryId)?.name ?? null;
          return (
            <BlogCard
              key={blog._id}
              blog={blog}
              catName={catName}
              authorName={currentUser?.username ?? ""}
              showMenu
              onDelete={handleDelete}
            />
          );
        })}
      </div>
      {myBlogs.length === 0 && (
        <p className="text-gray-400 text-sm mt-4">
          You haven't written any blogs yet.
        </p>
      )}
    </div>
  );
}
