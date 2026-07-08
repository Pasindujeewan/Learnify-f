import type { Course } from "../types/courseType";
import { FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export type CourseCardProps = {
  course: Partial<Course>;
};

function toNumber(value: unknown, fallback = 0) {
  // Postgres numeric values can arrive as strings, so cards normalize before formatting.
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  const rating = course.rating == null ? null : toNumber(course.rating);
  const duration = course.duration == null ? null : toNumber(course.duration);
  const price = course.price == null ? null : toNumber(course.price);
  let user: { role?: string } | null = null;
  try {
    user = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user") || "null")
      : null;
  } catch {
    sessionStorage.removeItem("user");
  }

  function handleCardClick() {
    // Instructors manage the course; students and guests view the enrollment page.
    if (user?.role === "instructor") {
      navigate(`/instructor/courses/${course.course_id}`);
      return;
    }
    navigate(`/courses/${course.course_id}`, { state: course });
  }

  return (
    <article
      onClick={handleCardClick}
      className="w-full rounded-lg overflow-hidden shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md transition duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={course.imageUrl || "/placeholder.jpg"}
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
              {rating != null ? rating.toFixed(1) : "No rating"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-blue-400 dark:text-blue-400">
            <FiClock className="text-[11px]" />
            <span>
              {duration != null ? `${duration}h` : "N/A"}
            </span>
          </div>
        </div>

        {/* Price + Button */}
        <div className="mt-1 flex items-center justify-between">
          <span className="font-bold text-base text-blue-600 dark:text-blue-400">
            {price != null && price > 0 ? `$${price.toFixed(2)}` : "Free"}
          </span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleCardClick();
            }}
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
    </article>
  );
}
