import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

export default function Tiptap({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    //Yani sen burada bir editor motoru başlatıyorsun.
    extensions: [StarterKit], // define your extension array Bu editöre temel özellikleri ekler:
    content: content, // initial content
    onUpdate: ({ editor }) => {
      //kullanıcı yazdıkça onUpdate çalışıyor
      onChange(editor.getHTML()); // editor.getHTML() ile oluşan içerik parent’a gönderiliyor
    },
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <>
      <EditorContext.Provider value={providerValue}>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("bold") ? "bg-gray-200" : ""}`}
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("italic") ? "bg-gray-200" : ""}`}
            >
              <FaItalic />
            </button>

            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
            >
              <FaHeading />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("bulletList") ? "bg-gray-200" : ""}`}
            >
              <FaListUl />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("orderedList") ? "bg-gray-200" : ""}`}
            >
              <FaListOl />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("blockquote") ? "bg-gray-200" : ""}`}
            >
              <FaQuoteLeft />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().undo().run()}
            >
              <FaUndo />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().redo().run()}
            >
              <FaRedo />
            </button>
          </div>

          {/* Editör */}
          <div className="min-h-50 px-4 py-2 cursor-text" onClick={() => editor?.chain().focus().run()}>
            <EditorContent editor={editor} className="h-full outline-none" />
          </div>
        </div>
      </EditorContext.Provider>
    </>
  );
}
