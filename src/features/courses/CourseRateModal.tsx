import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { rateCourse } from "../../services/courseService";
import { useToast } from "../../hooks/useToast";

const RATING_LABELS = ["", "Not Satisfied", "Poor", "Okay", "Good", "Excellent"];

interface CourseRateModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  courseId: string;
  onRatingSubmitted?: () => void;
}

export function CourseRateModal({
  isOpen,
  onClose,
  courseId,
  onRatingSubmitted,
}: CourseRateModalProps) {
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const activeIndex = hoveredStar >= 0 ? hoveredStar : rating - 1;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.info("Please select a star rating first.", "Rating required");
      return;
    }

    try {
      setIsSubmitting(true);
      await rateCourse({
        rating,
        comment,
        courseId,
      });
      toast.success("Thank you for helping other learners choose well.", "Review submitted");
      onClose(false);
      onRatingSubmitted?.();
    } catch {
      toast.error("Please login as a student and try again.", "Review failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl w-full max-w-sm p-6 sm:p-8 relative shadow-2xl">
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <IoClose size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
            <MdRateReview size={24} className="text-amber-500" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Rate this Course
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Share your experience to help other learners
          </p>
        </div>

        {/* Stars */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              type="button"
              onMouseEnter={() => setHoveredStar(index)}
              onMouseLeave={() => setHoveredStar(-1)}
              onClick={() => setRating(index + 1)}
              className="text-2xl transition-transform hover:scale-110 cursor-pointer focus:outline-none"
            >
              {index <= activeIndex ? (
                <FaStar className="text-amber-400" />
              ) : (
                <FaRegStar className="text-zinc-300 dark:text-zinc-600" />
              )}
            </button>
          ))}
        </div>

        {/* Label indicator */}
        <p className="text-center text-xs font-medium text-amber-600 dark:text-amber-400 h-4 mb-4">
          {RATING_LABELS[activeIndex + 1] || ""}
        </p>

        {/* Comment */}
        <div className="mb-5">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Write your thoughts about this course (optional)..."
            className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none transition"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-semibold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

// Backward compatibility alias
export const CourseRateToggle = CourseRateModal;
export default CourseRateModal;
