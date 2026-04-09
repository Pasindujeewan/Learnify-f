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
    navigate(`/courses/${course.course_id}`, { state: course });
  }

  return (
    <div className="w-full max-w-[350px] rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100">
      {/* Image */}
      <div className="relative">
        <img
          src={course.image_url || "/placeholder.jpg"}
          alt={course.title || "Course image"}
          className="w-full aspect-video object-cover"
        />

        {/* Level Badge */}
        <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-md">
          {course.level || "All Levels"}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1">
        {/* Title */}
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">
          {course.title || "Untitled Course"}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-gray-500">
          {course.instructorName || "Unknown Instructor"}
        </p>

        {/* Rating + Duration */}
        <div className="flex items-center justify-between text-xs mt-1">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar className="text-[12px]" />
            <span>
              {course.rating != null ? course.rating.toFixed(1) : "No rating"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-blue-500">
            <FiClock className="text-[12px]" />
            <span>
              {course.duration != null ? `${course.duration}h` : "Duration N/A"}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-sm text-blue-700">
            {course.price != null ? `$${course.price}` : "Free"}
          </span>

          <button
            onClick={handleCardClick}
            className="text-xs bg-blue-600 text-white px-7 py-3 rounded-md hover:bg-blue-700 transition"
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
