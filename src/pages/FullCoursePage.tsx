import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  User,
  Tag,
  BarChart2,
  Clock,
  Globe,
  Star,
  DollarSign,
  Users,
  BookMarked,
  Award,
  Loader2,
} from "lucide-react";
import type { FullCourseType } from "../types/courseType";
import { getFullCourse } from "../api/instructorServices/getFullCourse";
import { useToast } from "../hook/toastHook";
import {
  addLesson,
  getInstructorCourseLessons,
} from "../api/lessonService";
import type { Lesson } from "../types/lessonType";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  {
    light: "bg-violet-100 text-violet-700",
    dark: "dark:bg-violet-900 dark:text-violet-200",
  },
  {
    light: "bg-teal-100 text-teal-700",
    dark: "dark:bg-teal-900 dark:text-teal-200",
  },
  {
    light: "bg-orange-100 text-orange-700",
    dark: "dark:bg-orange-900 dark:text-orange-200",
  },
  {
    light: "bg-blue-100 text-blue-700",
    dark: "dark:bg-blue-900 dark:text-blue-200",
  },
  {
    light: "bg-pink-100 text-pink-700",
    dark: "dark:bg-pink-900 dark:text-pink-200",
  },
  {
    light: "bg-green-100 text-green-700",
    dark: "dark:bg-green-900 dark:text-green-200",
  },
];

function toNumber(value: unknown, fallback = 0) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

export const FullCourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<FullCourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonMinutes, setLessonMinutes] = useState(8);
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await getFullCourse(id);
        if (!data) {
          throw new Error("Course not found");
        }
        setCourse(data);
        // Lessons are managed separately from course metadata while dummy data is used.
        const lessonData = await getInstructorCourseLessons(id);
        setLessons(lessonData);
      } catch {
        setError("Failed to load course");
        toast.error("Instructor course details could not be loaded.", "Course loading failed");
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id, toast]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-gray-400 dark:text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading course...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl px-5 py-3 text-sm">
          {error}
        </div>
      </div>
    );

  if (!course)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500 text-sm">
        No course found
      </div>
    );

  const rating = toNumber(course.rating);
  const duration = toNumber(course.duration);
  const price = toNumber(course.price);
  const totalLessonMinutes = lessons.reduce(
    (sum, lesson) => sum + toNumber(lesson.estimatedMinutes),
    0,
  );

  const handleAddLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !lessonTitle.trim() || !lessonContent.trim()) {
      toast.error("Lesson title and content are required.", "Missing lesson details");
      return;
    }

    try {
      setIsAddingLesson(true);
      // The new lesson appears immediately because the backend returns the created item.
      const lesson = await addLesson(id, {
        title: lessonTitle.trim(),
        content: lessonContent.trim(),
        estimatedMinutes: lessonMinutes,
      });
      setLessons((currentLessons) => [...currentLessons, lesson]);
      setLessonTitle("");
      setLessonContent("");
      setLessonMinutes(8);
      toast.success("Lesson added to this course.", "Lesson created");
    } catch {
      toast.error("Lesson could not be added. Please try again.", "Lesson creation failed");
    } finally {
      setIsAddingLesson(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <AnimatePresence>
        <motion.div
          className="p-4 sm:p-6 max-w-5xl mx-auto space-y-4 sm:space-y-5"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* ── Course Header ── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 self-start">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full sm:w-52 h-40 sm:h-34 object-cover rounded-xl border border-gray-100 dark:border-gray-800"
                />
                <span className="absolute top-2 left-2 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 text-xs font-medium px-2.5 py-1 rounded-full">
                  {course.level}
                </span>
              </div>

              {/* Meta */}
              <div className="flex-1 space-y-3">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-50 leading-snug">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {course.description}
                </p>

                {/* Badges */}
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-violet-50 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    <Tag className="w-3 h-3" /> {course.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    <Globe className="w-3 h-3" /> {course.language}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> {duration}h
                  </span>
                </div>

                {/* Rating + Price */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl px-3 sm:px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                      {price > 0 ? price.toFixed(2) : "Free"}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                    by {course.instructorName}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Info + Stats Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Course Info */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm"
            >
              <h2 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
                Course info
              </h2>
              <ul className="divide-y divide-gray-50 dark:divide-gray-800">
                {[
                  {
                    icon: User,
                    label: "Instructor",
                    value: course.instructorName,
                  },
                  { icon: BookOpen, label: "Category", value: course.category },
                  { icon: BarChart2, label: "Level", value: course.level },
                  {
                    icon: Clock,
                    label: "Duration",
                    value: `${duration} hours`,
                  },
                  { icon: Globe, label: "Language", value: course.language },
                ].map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-3 py-2.5">
                    <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {label}
                    </span>
                    <span className="ml-auto text-sm font-medium text-gray-800 dark:text-gray-100 text-right">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm"
            >
              <h2 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
                Stats
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Users,
                    label: "Students",
                    value: course.enrolledstudents.length,
                  },
                  {
                    icon: Clock,
                    label: "Duration",
                    value: `${duration}h`,
                  },
                  { icon: Star, label: "Rating", value: rating.toFixed(1) },
                  { icon: Award, label: "Level", value: course.level },
                ].map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4 flex flex-col gap-1.5"
                  >
                    <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-50">
                      {value}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Enrolled Students ── */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-50">
                  Enrolled students
                </h2>
              </div>
              <span className="bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 text-xs font-medium px-3 py-1 rounded-full">
                {course.enrolledstudents.length} total
              </span>
            </div>

            {course.enrolledstudents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-600 gap-2">
                <BookMarked className="w-8 h-8" />
                <p className="text-sm">No students enrolled yet</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
              >
                {course.enrolledstudents.map((student, i) => {
                  const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <motion.div
                      key={student.userId}
                      variants={fadeUp}
                      custom={i}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="border border-gray-100 dark:border-gray-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all bg-white dark:bg-gray-900"
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0 ${color.light} ${color.dark}`}
                      >
                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(student.name)
                        )}
                      </div>
                      <div className="overflow-hidden min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                          {student.email}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={4}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-50">
                  Course lessons
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {lessons.length} lessons / {totalLessonMinutes} estimated minutes
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
              <div className="space-y-3">
                {lessons.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500 dark:border-gray-800">
                    No lessons added yet.
                  </div>
                ) : (
                  lessons.map((lesson) => (
                    <div
                      key={lesson.lesson_id}
                      className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                            Lesson {lesson.order}
                          </p>
                          <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                            {lesson.title}
                          </h3>
                        </div>
                        <span className="rounded-full bg-white px-2 py-1 text-xs text-gray-500 dark:bg-gray-900">
                          {lesson.estimatedMinutes} min
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        {lesson.content}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <form
                onSubmit={handleAddLesson}
                className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950"
              >
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Add lesson
                </h3>
                <label className="mt-4 block text-xs font-medium text-gray-500">
                  Lesson title
                </label>
                <input
                  value={lessonTitle}
                  onChange={(event) => setLessonTitle(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-gray-800 dark:bg-gray-900"
                  placeholder="e.g. Understanding the basics"
                />
                <label className="mt-3 block text-xs font-medium text-gray-500">
                  Lesson content
                </label>
                <textarea
                  value={lessonContent}
                  onChange={(event) => setLessonContent(event.target.value)}
                  rows={7}
                  className="mt-1 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-gray-800 dark:bg-gray-900"
                  placeholder="Write the lesson text students will scroll and read..."
                />
                <label className="mt-3 block text-xs font-medium text-gray-500">
                  Estimated minutes
                </label>
                <input
                  value={lessonMinutes}
                  onChange={(event) => setLessonMinutes(Number(event.target.value))}
                  type="number"
                  min={1}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-gray-800 dark:bg-gray-900"
                />
                <button
                  type="submit"
                  disabled={isAddingLesson}
                  className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {isAddingLesson ? "Adding..." : "Add lesson"}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
