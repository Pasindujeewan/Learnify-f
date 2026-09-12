import { useState } from "react";
import { FaClock, FaGlobe, FaLayerGroup, FaBookOpen, FaStar } from "react-icons/fa";
import type { Course, Lesson, Comment } from "../../types";
import { Comments } from "../../components/Comments";

interface CourseContentTabsProps {
  course: Course;
  lessons: Lesson[];
  comments: Comment[] | null;
  onRefreshComments?: () => void;
}

type TabType = "overview" | "curriculum" | "reviews";

export function CourseContentTabs({
  course,
  lessons,
  comments,
  onRefreshComments: _onRefreshComments,
}: CourseContentTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const duration = Number(course.duration) || 0;
  const rating = Number(course.rating) || 0;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
            activeTab === "overview"
              ? "border-blue-600 dark:border-indigo-400 text-blue-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("curriculum")}
          className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === "curriculum"
              ? "border-blue-600 dark:border-indigo-400 text-blue-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Curriculum
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {lessons.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === "reviews"
              ? "border-blue-600 dark:border-indigo-400 text-blue-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Reviews
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {comments?.length || 0}
          </span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Instructor Bio Row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow">
              {(course.instructorName || course.instructor || "L").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">Instructor</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                {course.instructorName || course.instructor || "Learnify Instructor"}
              </p>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              About This Course
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <FaClock className="text-blue-500 text-base shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white">{duration} hrs</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <FaGlobe className="text-emerald-500 text-base shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Language</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white">{course.language}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <FaLayerGroup className="text-purple-500 text-base shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Level</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white">{course.level}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <FaStar className="text-amber-500 text-base shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Rating</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white">{rating.toFixed(1)} / 5</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "curriculum" && (
        <div className="space-y-3">
          {lessons.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-sm text-slate-500">
              No lessons have been published for this course yet.
            </div>
          ) : (
            lessons.map((lesson, idx) => (
              <div
                key={lesson.lesson_id}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                    {lesson.order || idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lesson.estimatedMinutes} min estimated reading
                    </p>
                  </div>
                </div>
                <FaBookOpen className="text-slate-400 text-xs" />
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((c, idx) => (
              <Comments key={idx} comment={c} />
            ))
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-sm text-slate-500">
              No reviews yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
