import { useState } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LessonEditor } from "../../features/lessons/LessonEditor";
import { addLesson } from "../../services/lessonService";
import { useToast } from "../../hooks/useToast";

export default function CreateLesson() {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<object>({
    type: "doc",
    content: [],
  });
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Lesson title is required", "Missing field");
      return;
    }

    if (!courseId) {
      toast.error("Course ID not found in URL", "Navigation error");
      return;
    }

    try {
      setLoading(true);
      const jsonContent = JSON.stringify(content);

      await addLesson(courseId, {
        title: title.trim(),
        content: jsonContent,
        estimatedMinutes,
      });

      toast.success("Lesson created successfully!", "Success");
      setTitle("");
      setContent({ type: "doc", content: [] });
      navigate(`/instructor/courses/${courseId}`);
    } catch {
      toast.error("Failed to create lesson. Please try again.", "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create Rich Text Lesson
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Write structured content with formatted headings and lists
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Lesson Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Understanding Hooks in React 19"
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Estimated Reading Time (minutes)
          </label>
          <input
            type="number"
            min={1}
            value={estimatedMinutes}
            onChange={(e) => setEstimatedMinutes(Math.max(1, Number(e.target.value)))}
            className="w-full sm:w-48 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Lesson Content *
          </label>
          <LessonEditor content={content} onChange={setContent} />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 active:scale-98 text-white font-bold text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating lesson..." : "Publish Lesson"}
          </button>
        </div>
      </form>
    </div>
  );
}
