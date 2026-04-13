import { FaStar, FaRegStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { useState } from "react";
import type { CourseRatingType } from "../../types/RatingType";
import { rateCourse } from "../../api/studentService/RateCourse";

const LABELS = ["", "Not Satisfied", "Poor", "Okay", "Good", "Excellent"];

type Props = {
  isOpen: boolean;
  onClose: (b: boolean) => void;
  courseId: string;
};

export function CourseRateToggle({ isOpen, onClose, courseId }: Props) {
  const [selectedStar, setSelectedStar] = useState(-1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  if (!isOpen) return null;

  const stars = new Array(5).fill(undefined);
  const activeIndex = selectedStar >= 0 ? selectedStar : rating - 1;

  const handleSubmit = async () => {
    console.log("Submitting rating:", { rating, comment, courseId });
    const res = await rateCourse({
      rating,
      comment,
      courseId,
    } as CourseRatingType);
    console.log("Course rated successfully:", res);
    onClose(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl w-full max-w-sm p-6 sm:p-8 relative">
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <IoClose size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
            <MdRateReview size={22} className="text-amber-500" />
          </div>
          <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
            Rate this course
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Your feedback helps other learners
          </p>
        </div>

        <div className="flex justify-center gap-1.5 mb-3">
          {stars.map((_, i) =>
            i <= activeIndex ? (
              <FaStar
                key={i}
                size={32}
                className="text-amber-400 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                onMouseEnter={() => setSelectedStar(i)}
                onMouseLeave={() => setSelectedStar(-1)}
                onClick={() => setRating(i + 1)}
              />
            ) : (
              <FaRegStar
                key={i}
                size={32}
                className="text-zinc-300 dark:text-zinc-600 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                onMouseEnter={() => setSelectedStar(i)}
                onMouseLeave={() => setSelectedStar(-1)}
                onClick={() => setRating(i + 1)}
              />
            ),
          )}
        </div>

        <div className="text-center min-h-[28px] mb-4">
          {rating > 0 ? (
            <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-medium px-3 py-1 rounded-full">
              <FaStar size={10} />
              {LABELS[rating]} &middot; {rating}/5
            </span>
          ) : (
            <span className="text-sm text-zinc-400 dark:text-zinc-500">
              Tap a star to rate
            </span>
          )}
        </div>

        <textarea
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share what you learned or how it helped you…"
          rows={3}
          className="w-full p-3 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 resize-none transition"
        />

        <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => onClose(false)}
            className="flex-1 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-[2] py-2.5 text-sm font-medium rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 disabled:opacity-35 hover:opacity-85 transition-opacity"
          >
            Submit review
          </button>
        </div>
      </div>
    </div>
  );
}
