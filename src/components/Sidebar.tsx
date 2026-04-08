import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleSubmitComment: (commentText: string) => Promise<void>;
  filteredMessages: { _id: string; comment: string; createdAt?: string }[];
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  handleSubmitComment,
  filteredMessages,
}: SidebarProps) {
  const [commentText, setCommentText] = useState("");

  const onSubmit = async () => {
    if (!commentText.trim()) return;
    await handleSubmitComment(commentText);
    setCommentText("");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">Comments</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-slate-800 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[calc(100vh-160px)]">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div key={msg._id} className="bg-gray-50 rounded-lg p-3 text-sm">
                <p className="text-slate-700">{msg.comment}</p>
                {msg.createdAt && (
                  <span className="text-xs text-slate-400 mt-1 block">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm text-center">
              No comments from you yet.
            </p>
          )}
        </div>

        <div className="p-4 border-t">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={onSubmit}
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
