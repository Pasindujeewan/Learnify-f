import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { addLesson } from "../../services/lessonService";
import type { Lesson } from "../../types";

interface AddLessonFormProps {
  courseId: string;
  onLessonAdded: (lesson: Lesson) => void;
}

export function AddLessonForm({ courseId, onLessonAdded }: AddLessonFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please provide both title and lesson content.", "Missing fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const newLesson = await addLesson(courseId, {
        title: title.trim(),
        content: content.trim(),
        estimatedMinutes,
      });
      toast.success("Lesson successfully added to curriculum.", "Lesson created");
      onLessonAdded(newLesson);
      setTitle("");
      setContent("");
      setEstimatedMinutes(10);
    } catch {
      toast.error("Failed to add lesson. Please try again.", "Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 dark:border-gray-800 dark:bg-gray-950/70">
      <h3 className="text-base font-bold text-gray-900 dark:text-white">
        Add New Lesson
      </h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
            Lesson Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            placeholder="e.g. Introduction to Asynchronous JavaScript"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
            Lesson Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="mt-1 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            placeholder="Write the lesson content students will read..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
            Estimated Reading Time (minutes)
          </label>
          <input
            type="number"
            min={1}
            value={estimatedMinutes}
            onChange={(e) => setEstimatedMinutes(Math.max(1, Number(e.target.value)))}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-98 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Adding lesson..." : "Add Lesson"}
        </button>

        <Link
          to={`/instructor/courses/${courseId}/lessons/create`}
          className="block text-center mt-2 w-full rounded-lg border border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/50 px-4 py-2 text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
        >
          Open Rich Text Editor →
        </Link>
      </form>
    </div>
  );
}
