import LatestBlog from "./LatestBlog";
import MostReadBlog from "./MostReadBlog";

export default function BlogSection() {
  return (
    <div className="mt-8 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* The Latest */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            The Latest
          </h2>
          <LatestBlog />
        </div>

        {/* Top Reads */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Top Reads
          </h2>
          <MostReadBlog />
        </div>
      </div>

      <hr className="border-slate-200 mt-10" />
    </div>
  );
}
