import { useSelector, useDispatch } from "react-redux";
import { selectBlog, fetchBlogByIdSuccess } from "../features/blogSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaEye, FaRegCommentDots } from "react-icons/fa";
import { selectCurrentUser } from "../features/authSlice";
import useBlogCall from "../hooks/useBlogCall";
import Sidebar from "../components/Sidebar";

export default function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getBlogsById, toggleLike, postComment } = useBlogCall();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blog = useSelector(selectBlog) as any;
  const currentUser = useSelector(selectCurrentUser);

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  useEffect(() => {
    if (id) getBlogsById(id);
  }, [id]);

  if (!blog || !blog.data)
    return <div className="text-center mt-20 text-lg">Loading...</div>;

  const {
    title,
    content,
    image,
    createdAt,
    categoryId,
    userId,
    likes,
    comments,
    countOfVisitors,
    _id,
  } = blog.data;

  const currentUserId = currentUser?._id;
  const isLiked = likes?.includes(currentUserId);

  const filteredMessages =
    comments?.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (comment: any) => comment.userId?._id === currentUserId,
    ) || [];

  const handleSubmitComment = async (commentText: string) => {
    await postComment(_id, commentText);
    await getBlogsById(_id);
    setIsCommentOpen(false);
  };

  const handleLike = async () => {
    await toggleLike(_id);
    const updatedLikes = isLiked
      ? likes.filter((uid: string) => uid !== currentUserId)
      : [...(likes || []), currentUserId];
    dispatch(
      fetchBlogByIdSuccess({
        data: { ...blog, data: { ...blog.data, likes: updatedLikes } },
      }),
    );
  };

  return (
    <>
      <Sidebar
        isOpen={isCommentOpen}
        setIsOpen={setIsCommentOpen}
        handleSubmitComment={handleSubmitComment}
        filteredMessages={filteredMessages}
      />

      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Kategori */}
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
          {categoryId?.name || "Category"}
        </span>

        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
          {title}
        </h1>

        {/* Yazar bilgisi */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
            {userId?.username?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {userId?.username}
            </p>
            <p className="text-xs text-slate-400">
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Unknown date"}
            </p>
          </div>
        </div>

        {/* Görsel */}
        <div className="w-full overflow-hidden rounded-xl mb-8">
          <img
            src={image}
            alt={title}
            className="w-full h-72 md:h-[28rem] object-cover"
          />
        </div>

        {/* Like, Comment, View — ince çizgi altında */}
        <div className="flex items-center gap-6 py-3 mb-8 border-y border-slate-200">
          <button
            type="button"
            title="Like"
            className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition cursor-pointer"
            onClick={handleLike}
          >
            {isLiked ? (
              <FaHeart className="w-[18px] h-[18px] text-red-500" />
            ) : (
              <FaRegHeart className="w-[18px] h-[18px]" />
            )}
            <span className="text-sm">{likes?.length || 0}</span>
          </button>

          <button
            className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition cursor-pointer"
            onClick={() => setIsCommentOpen(true)}
          >
            <FaRegCommentDots className="w-[18px] h-[18px]" />
            <span className="text-sm">{comments?.length || 0}</span>
          </button>

          <div className="flex items-center gap-1.5 text-slate-400">
            <FaEye className="w-[18px] h-[18px]" />
            <span className="text-sm">{countOfVisitors || 0}</span>
          </div>
        </div>

        {/* İçerik */}
        <div
          className="prose prose-slate prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Yorumlar */}
        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Comments ({comments?.length || 0})
          </h2>
          {comments?.length ? (
            <ul className="space-y-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {comments.map((c: any) => (
                <li
                  key={c._id}
                  className="flex gap-3 py-4 border-b border-slate-100 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 text-xs shrink-0">
                    {c.username?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-800">
                        {c.username}
                      </span>
                      <span className="text-xs text-slate-400">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleString()
                          : ""}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{c.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">No comments yet.</p>
          )}
        </div>
      </article>
    </>
  );
}
