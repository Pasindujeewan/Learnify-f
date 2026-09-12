import { FaCheckCircle, FaLock, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Course } from "../../types";

interface CoursePricingCardProps {
  course: Course;
  isEnrolled: boolean;
  isEnrolling: boolean;
  onEnroll: () => void;
  onOpenReviewModal: () => void;
}

export function CoursePricingCard({
  course,
  isEnrolled,
  isEnrolling,
  onEnroll,
  onOpenReviewModal,
}: CoursePricingCardProps) {
  const price = Number(course.price) || 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
      <div>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Tuition
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {price === 0 ? "Free" : `$${price.toFixed(2)}`}
          </span>
          {price > 0 && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              One-time payment
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {isEnrolled ? (
          <Link
            to={`/courses/${course.course_id}/learn`}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-md transition-all text-center cursor-pointer"
          >
            <FaBookOpen />
            Continue Learning
          </Link>
        ) : (
          <button
            type="button"
            onClick={onEnroll}
            disabled={isEnrolling}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        )}

        <button
          type="button"
          onClick={onOpenReviewModal}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Leave a Review
        </button>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          This course includes:
        </p>
        <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500 shrink-0" />
            Full lifetime access to all lessons
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500 shrink-0" />
            Self-paced interactive reading & tracking
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500 shrink-0" />
            Verified Certificate of Completion
          </li>
          <li className="flex items-center gap-2">
            <FaLock className="text-blue-500 shrink-0" />
            Secure enrollment & verified access
          </li>
        </ul>
      </div>
    </div>
  );
}
