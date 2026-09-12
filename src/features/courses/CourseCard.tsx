import type { Course } from "../../types";
import { FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDurationHours } from "../../utils/formatDuration";

export type CourseCardProps = {
  course: Partial<Course>;
};

function toNumber(value: unknown, fallback = 0): number {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  const rating = course.rating == null ? null : toNumber(course.rating);
  const duration = course.duration == null ? null : toNumber(course.duration);
  const price = course.price == null ? null : toNumber(course.price);

  let user: { role?: string } | null = null;
  try {
    const raw = sessionStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch {
    sessionStorage.removeItem("user");
  }

  function handleCardClick() {
    if (user?.role === "instructor") {
      navigate(`/instructor/courses/${course.course_id}`);
      return;
    }
    navigate(`/courses/${course.course_id}`, { state: course });
  }

  return (
    <article
      onClick={handleCardClick}
      className="w-full rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer flex flex-col group"
    >
      {/* Image & Level Badge */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"}
          alt={course.title || "Course thumbnail"}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-xs px-2.5 py-1 rounded-md font-medium shadow-sm backdrop-blur">
          {course.level || "All Levels"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-800 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {course.instructorName || course.instructor || "Learnify Instructor"}
        </p>

        {/* Rating & Duration */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">
          {rating !== null && (
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <FaStar className="text-xs" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}

          {duration !== null && (
            <div className="flex items-center gap-1">
              <FiClock className="text-xs" />
              <span>{formatDurationHours(duration)}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-bold">
          <span className="text-slate-900 dark:text-white">
            {price === 0 || price === null ? "Free" : `$${price}`}
          </span>
          <span className="text-xs text-blue-600 dark:text-indigo-400 font-medium">
            View Details →
          </span>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
