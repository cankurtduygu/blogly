import { useEffect } from "react";
import useBlogCall from "../../hooks/useBlogCall";
import Blogs from "./Blogs";
import LatestBlog from "./LatestBlog";
import MostReadBlog from "./MostReadBlog";

export default function BlogSection() {
  const { getLatestBlog, getMostReadBlogs, getCategories } = useBlogCall();

  useEffect(() => {
    getLatestBlog();
    getMostReadBlogs();
    getCategories();
  }, []);

  return (
    <div className="mt-8 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16">
        {/* The Latest */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            The Latest Blog
          </h2>
          <LatestBlog />
        </div>

        {/* Top Reads */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Trending on Blogly
          </h2>
          <MostReadBlog />
        </div>
      </div>

      <hr className="border-slate-200 mt-10" />
      <Blogs />
    </div>
  );
}
