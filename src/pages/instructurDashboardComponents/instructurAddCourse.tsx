import { useForm } from "react-hook-form";
import { useAppSelector } from "../../hook/reduxHook";
import { selectUser } from "../../features/authSlice";
import type { CourseFormData } from "../../types/courseType";
import { uploadImage } from "../../api/getSignature";
import { addCourse } from "../../api/instructurServices/AddCourses";

type Props = {
  isOpen: boolean;
  onClose: (b: boolean) => void;
};

type formData = Omit<CourseFormData, "image"> & {
  image: FileList;
};

export default function CreateCourseForm({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const user = useAppSelector(selectUser);

  const onSubmit = async (data: formData) => {
    if (!user || !user.userId) {
      console.error("user not login");
      return;
    }

    let imageUrl = "";

    try {
      if (data.image?.[0]) {
        imageUrl = await uploadImage(data.image[0]);
        console.log("Image uploaded successfully:", imageUrl);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }

    const { image, ...otherData } = data;
    const instructorId = user?.userId;

    const formData: CourseFormData = {
      ...otherData,
      instructorId,
      imageUrl: imageUrl,
    };

    try {
      const res = await addCourse(formData);
      console.log("Course added successfully:", res);
    } catch (error) {
      console.error("Failed to add course:", error);
    } finally {
      onClose(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[640px] max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
          <span className="text-sm text-gray-400">new course</span>
          <div className="w-10" />
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 4h12M2 8h8M2 12h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Create new course
              </p>
              <p className="text-xs text-gray-400">Fill in the details below</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
          >
            {/* Title */}
            <div className="col-span-2">
              <label className="field-label">Course title</label>
              <input
                placeholder="e.g. Introduction to Python"
                {...register("title", { required: "Title is required" })}
                className="field-input"
              />
              {errors.title && (
                <p className="field-error">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="field-label">Description</label>
              <textarea
                rows={3}
                placeholder="What will students learn?"
                {...register("description", {
                  required: "Description is required",
                })}
                className="field-input resize-none"
              />
              {errors.description && (
                <p className="field-error">{errors.description.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="field-label">Category</label>
              <input
                placeholder="e.g. Programming"
                {...register("category", { required: "Category is required" })}
                className="field-input"
              />
              {errors.category && (
                <p className="field-error">{errors.category.message}</p>
              )}
            </div>

            {/* Level */}
            <div>
              <label className="field-label">Level</label>
              <select
                {...register("level", { required: "Level is required" })}
                className="field-input"
              >
                <option value="">Select level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              {errors.level && (
                <p className="field-error">{errors.level.message}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="field-label">Duration (hrs)</label>
              <input
                type="number"
                step="0.5"
                placeholder="0.0"
                {...register("duration", {
                  required: "Duration is required",
                })}
                className="field-input"
              />
              {errors.duration && (
                <p className="field-error">{errors.duration.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="field-label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                  max: { value: 999.99, message: "Max price is 999.99" },
                })}
                className="field-input"
              />
              {errors.price && (
                <p className="field-error">{errors.price.message}</p>
              )}
            </div>

            {/* Language */}
            <div>
              <label className="field-label">Language</label>
              <input
                placeholder="e.g. English"
                {...register("language", { required: "Language is required" })}
                className="field-input"
              />
              {errors.language && (
                <p className="field-error">{errors.language.message}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="field-label">Image </label>
              <input
                type="file"
                {...register("image", { required: "Image is required" })}
                className="field-input bg-slate-50 text-sm text-slate-500 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium"
              />
              {errors.image && (
                <p className="field-error">{errors.image.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="col-span-2 flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="flex-1 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Create course
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .field-label {
          display: block;
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        .field-input {
          width: 100%;
          box-sizing: border-box;
          font-size: 14px;
          padding: 8px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
          background: #fff;
          color: #111827;
          transition: border-color 0.15s;
        }
        .field-input:focus {
          border-color: #3b82f6;
        }
        .field-error {
          font-size: 11px;
          color: #ef4444;
          margin-top: 3px;
        }
      `}</style>
    </div>
  );
}
