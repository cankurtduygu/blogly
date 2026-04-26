import { useSelector } from "react-redux";
import { selectBlog, selectCategories } from "../../store/blogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { writeSchema, type WriteFormData } from "../../lib/schemas";
import useBlogCall from "../../hooks/useBlogCall";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Controller } from "react-hook-form";
import Tiptap from "../../components/ui/Tiptap";
import { useEffect } from "react";

export default function Write() {
  const { createPost, getBlogsById, updateBlog, getCategories } = useBlogCall();
  const navigate = useNavigate();
  const { id } = useParams(); //id for editing Blog
  const blog = useSelector(selectBlog) as any;

  useEffect(() => {
    if (id) getBlogsById(id);
    getCategories();
  }, [id]);

  const isEditMode = !!id && blog?.data?._id === id;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<WriteFormData>({
    resolver: zodResolver(writeSchema),
    values: {
      title: isEditMode ? (blog.data.title ?? "") : "",
      categoryId: isEditMode
        ? (blog?.data?.categoryId?._id ?? blog?.data?.categoryId ?? "")
        : "",
      image: isEditMode ? (blog.data.image ?? "") : "",
      content: isEditMode ? (blog.data.content ?? "") : "",
      isPublish: isEditMode ? (blog.data.isPublish ?? true) : true,
    },
  });

  async function onSubmit(data: WriteFormData) {
    try {
      if (id) {
        await updateBlog(id, data);
        toast.success("Blog updated!");
      } else {
        await createPost(data);
        toast.success("Blog published!");
      }
      navigate("/");
    } catch {
      toast.error(id ? "Failed to update" : "Failed to publish");
    }
  }

  const categories = useSelector(selectCategories);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {id ? "Edit Your Blog" : "Create New Blog"}
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter your blog title..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            {...register("title")}
            disabled={isSubmitting}
          />
          <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          {categories.length > 0 ? (
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <select
                  id="category"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            />
          ) : (
            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm">
              Loading categories...
            </div>
          )}
          <p className="text-red-500 text-xs mt-1">
            {errors.categoryId?.message}
          </p>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            id="image"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("image")}
            disabled={isSubmitting}
          />
          <p className="text-red-500 text-xs mt-1">{errors.image?.message}</p>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) =>
              !id || field.value ? (
                <Tiptap content={field.value} onChange={field.onChange} />
              ) : (
                <div className="border border-gray-300 rounded-lg p-4 text-gray-400 text-sm">
                  Loading content...
                </div>
              )
            }
          />
          <p className="text-red-500 text-xs mt-1">{errors.content?.message}</p>
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="publish"
            type="checkbox"
            defaultChecked
            className="w-4 h-4 text-slate-900 border-gray-300 rounded focus:ring-slate-900"
            {...register("isPublish")}
            disabled={isSubmitting}
          />
          <label htmlFor="publish" className="text-sm text-gray-700">
            Publish immediately
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              toast.info("Cancelled");
              navigate(-1 as any);
            }}
            disabled={isSubmitting}
            className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {id ? "Save Changes" : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
