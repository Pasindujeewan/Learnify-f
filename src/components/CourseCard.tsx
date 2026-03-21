import type { Course } from "../types/courseType";
import { initials } from "../utils/Initials";
import type { Category, Level } from "../types/courseType";
import { ClockIcon } from "./smallComponents/ClockIcon";
import { StarRating } from "./smallComponents/StarRating";

// CONFIGS (fully typed)
const categoryConfig: Record<
  Category,
  { thumb: string; title: string; badge: string }
> = {
  Frontend: {
    thumb: "bg-blue-900",
    title: "text-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  "Data Science": {
    thumb: "bg-emerald-900",
    title: "text-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  Design: {
    thumb: "bg-violet-900",
    title: "text-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
};

const levelConfig: Record<Level, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

// SMALL COMPONENTS

// MAIN COMPONENT
type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const cat = categoryConfig[course.category];
  const lvl = levelConfig[course.level];

  return (
    <div className="w-80 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col">
      {/* Thumbnail */}
      <div
        className={`relative h-44 ${cat.thumb} flex flex-col justify-between p-4`}
      >
        <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_14px)]" />

        <div className="flex justify-between relative z-10">
          <span className={`text-xs px-2.5 py-1 rounded-full ${lvl}`}>
            {course.level}
          </span>
        </div>

        <h2 className={`relative z-10 font-semibold text-lg ${cat.title}`}>
          {course.title}
        </h2>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-0.5 rounded-full ${cat.badge}`}>
            {course.category}
          </span>
          <span className="text-xs text-gray-400">{course.language}</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center">
            {initials(course.instructor)}
          </div>
          <span className="text-sm text-gray-500">{course.instructor}</span>
        </div>

        <div className="flex items-center gap-4 py-3 border-y border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <ClockIcon />
            {`${Math.floor(course.duration)}h ${Math.round((course.duration % 1) * 60)}m`}
          </div>

          <div className="flex items-center gap-1.5">
            <StarRating rating={course.rating} />
            <span className="text-xs font-medium text-gray-600">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>

          <button
            className={`text-sm px-4 py-2 rounded-lg transition-all  border bg-blue-600 border-gray-200 text-white hover:bg-blue-700 active:scale-95"
            `}
          >
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
