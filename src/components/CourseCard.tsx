import type { Course } from "../types/courseType";
import { FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export type CourseCardProps = {
  course: Partial<Course>;
};

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  let user = null;
  try {
    user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
  }

  function handleCardClick() {
    if (user?.role === "instructor") {
      navigate(`/instructor/courses/${course.course_id}`);
      return;
    }
    navigate(`/courses/${course.course_id}`, { state: course });
  }

  return (
    <div className="w-full max-w-[350px] rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#132045] border border-gray-100 dark:border-[#1e3160] hover:shadow-xl dark:hover:shadow-blue-900/30 transition duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative">
        <img
          src={course.image_url || "/placeholder.jpg"}
          alt={course.title || "Course image"}
          className="w-full aspect-video object-cover"
        />
        {/* Level Badge */}
        <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-md font-medium">
          {course.level || "All Levels"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-800 dark:text-white leading-snug">
          {course.title || "Untitled Course"}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-gray-400 dark:text-slate-400">
          {course.instructorName || "Unknown Instructor"}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-[#1e3160] my-1" />

        {/* Rating + Duration */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar className="text-[11px]" />
            <span className="font-medium text-gray-700 dark:text-slate-300">
              {course.rating != null ? course.rating.toFixed(1) : "No rating"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-blue-400 dark:text-blue-400">
            <FiClock className="text-[11px]" />
            <span>
              {course.duration != null ? `${course.duration}h` : "N/A"}
            </span>
          </div>
        </div>

        {/* Price + Button */}
        <div className="mt-1 flex items-center justify-between">
          <span className="font-bold text-base text-blue-600 dark:text-blue-400">
            {course.price != null ? `$${course.price}` : "Free"}
          </span>
          <button
            onClick={handleCardClick}
            className="text-xs bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition font-medium"
          >
            {!user
              ? "Enroll Now"
              : user.role === "instructor"
                ? "View Course"
                : "Go to Course"}
          </button>
        </div>
      </div>
    </div>
  );
}
