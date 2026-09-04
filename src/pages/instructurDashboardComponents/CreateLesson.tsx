import { useState } from "react";
import LessonEditor from "./LessonEditer";
import { useParams } from "react-router-dom";

export default function CreateLesson() {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState<object>({
    type: "doc",
    content: [],
  });

  const [loading, setLoading] = useState(false);

  const { courseId } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Lesson title is required");
      return;
    }

    try {
      setLoading(true);

      alert("Lesson created successfully!");

      setTitle("");

      setContent({
        type: "doc",
        content: [],
      });
    } catch (error) {
      console.error(error);

      alert("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Lesson</h1>

      {/* Lesson title */}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Lesson Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Introduction to React"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Lesson content */}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Lesson Content</label>

        <LessonEditor onChange={setContent} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-5 py-3 rounded-lg bg-green-600 text-white"
      >
        {loading ? "Creating..." : "Create Lesson"}
      </button>
    </form>
  );
}
