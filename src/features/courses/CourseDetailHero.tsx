import { FaTag, FaPlayCircle } from "react-icons/fa";
import type { Course } from "../../types";

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  Beginner: {
    bg: "bg-emerald-100 dark:bg-emerald-900/50",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  Intermediate: {
    bg: "bg-amber-100 dark:bg-amber-900/50",
    text: "text-amber-700 dark:text-amber-300",
  },
  Advanced: {
    bg: "bg-rose-100 dark:bg-rose-900/50",
    text: "text-rose-700 dark:text-rose-300",
  },
};

interface CourseDetailHeroProps {
  course: Course;
}

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  const levelStyle = LEVEL_COLORS[course.level] || {
    bg: "bg-blue-100 dark:bg-blue-900/50",
    text: "text-blue-700 dark:text-blue-300",
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 group bg-slate-900">
      <img
        src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"}
        alt={course.title}
        className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Floating Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${levelStyle.bg} ${levelStyle.text}`}>
            {course.level}
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm flex items-center gap-1.5">
            <FaTag size={10} /> {course.category}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
          {course.title}
        </h1>
      </div>

      {/* Play Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 text-white">
          <FaPlayCircle size={48} />
        </div>
      </div>
    </div>
  );
}
