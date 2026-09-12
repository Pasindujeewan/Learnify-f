import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface LessonEditorProps {
  content?: object | string;
  onChange: (content: object) => void;
}

export function LessonEditor({ content = "", onChange }: LessonEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
            editor.isActive("bold")
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 text-xs font-italic rounded-lg border transition-colors cursor-pointer ${
            editor.isActive("italic")
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          H3
        </button>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          • Bullet List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          1. Numbered List
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 text-slate-800 dark:text-slate-100 prose dark:prose-invert max-w-none focus:outline-none"
      />
    </div>
  );
}

export default LessonEditor;
