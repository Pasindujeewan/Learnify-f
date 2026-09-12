import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../hooks/useAppRedux";
import { selectUser } from "../../features/authSlice";
import type { CourseFormData } from "../../types";
import { uploadImage } from "../../services/uploadService";
import { addCourse } from "../../services/instructorService";
import { useToast } from "../../hooks/useToast";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onCourseCreated?: () => void;
}

type FormValues = Omit<CourseFormData, "imageUrl"> & {
  image: FileList;
};

export function CreateCourseModal({ isOpen, onClose, onCourseCreated }: CreateCourseModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const user = useAppSelector(selectUser);
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    if (!user || !user.userId) {
      toast.error("Please login as an instructor to create a course.", "Not authenticated");
      return;
    }

    setIsSubmitting(true);
    let imageUrl = "";

    try {
      if (data.image?.[0]) {
        imageUrl = await uploadImage(data.image[0], "course");
      }
    } catch {
      toast.info("Image upload skipped. You can update the thumbnail later.", "Photo");
    }

    const coursePayload: CourseFormData = {
      title: data.title,
      description: data.description,
      category: data.category,
      level: data.level,
      duration: Number(data.duration),
      price: Number(data.price),
      language: data.language,
      imageUrl: imageUrl,
    };

    try {
      await addCourse(coursePayload);
      toast.success("Your new course was published successfully!", "Course created");
      reset();
      onClose(false);
      onCourseCreated?.();
    } catch {
      toast.error("Please verify the course details and try again.", "Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Create New Course
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide the details below to publish your curriculum
            </p>
          </div>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Title *
              </label>
              <input
                placeholder="e.g. Modern Full Stack Development with React & Node"
                {...register("title", { required: "Course title is required" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white transition"
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Description *
              </label>
              <textarea
                rows={3}
                placeholder="What will students learn in this course?"
                {...register("description", { required: "Description is required" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white resize-none transition"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <input
                placeholder="e.g. Programming, Design"
                {...register("category", { required: "Category is required" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white transition"
              />
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Skill Level *
              </label>
              <select
                {...register("level", { required: "Level is required" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white transition cursor-pointer"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.level && <p className="text-xs text-red-500 mt-1">{errors.level.message}</p>}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Duration (hours) *
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                placeholder="10"
                {...register("duration", { required: "Duration is required" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white transition"
              />
              {errors.duration && (
                <p className="text-xs text-red-500 mt-1">{errors.duration.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Price (USD) *
              </label>
              <input
                type="number"
                step="1"
                min="0"
                placeholder="0 for free"
                {...register("price", { required: "Price is required" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white transition"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Language *
              </label>
              <select
                {...register("language", { required: "Language is required" })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white transition cursor-pointer"
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
              {errors.language && (
                <p className="text-xs text-red-500 mt-1">{errors.language.message}</p>
              )}
            </div>

            {/* Course Thumbnail Image */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Thumbnail (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 outline-none file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/40 file:text-blue-600 dark:file:text-blue-300 hover:file:bg-blue-100 transition cursor-pointer"
              />
            </div>

            {/* Submit Actions */}
            <div className="sm:col-span-2 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-sm font-bold text-white shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Creating course..." : "Publish Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Backward compatibility alias
export default CreateCourseModal;
