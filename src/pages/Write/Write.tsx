import { useSelector } from "react-redux";
import { selectCategories } from "../../store/blogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { writeSchema, type WriteFormData } from "../../lib/schemas";
import useBlogCall from "../../hooks/useBlogCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import Tiptap from "../../components/ui/Tiptap";

export default function Write() {
  const { createPost } = useBlogCall();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<WriteFormData>({
    resolver: zodResolver(writeSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      image: "",
      content: "",
      isPublish: true,
    },
  });

  async function onSubmit(data: WriteFormData) {
    try {
      await createPost(data);
      toast.success("Blog published!");
      navigate("/");
    } catch {
      toast.error("Failed to publish");
    }
  }

  const categories = useSelector(selectCategories);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Blog</h1>

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
          <select
            id="category"
            {...register("categoryId")}
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
            render={({ field }) => (
              <Tiptap content={field.value} onChange={field.onChange} />
            )}
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
        <button
          type="submit"
          className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
