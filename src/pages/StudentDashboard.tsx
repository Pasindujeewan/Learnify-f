import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiCheckCircle, FiLoader, FiSearch } from "react-icons/fi";
import type { StudentProfileType } from "../types/StudentType";
import CourseCard from "./CourseCard";
import { useAppSelector } from "../hook/reduxHook";
import { selectUser } from "../features/authSlice";

// ─── Mock data ────────────────────────────────────────────────────────────────

// ─── Filter type ──────────────────────────────────────────────────────────────
type FilterMode = "all" | "in-progress" | "completed";

// ─── Props ────────────────────────────────────────────────────────────────────
interface StudentDashboardProps {
  profile?: StudentProfileType | undefined;
}

// ─── Component ────────────────────────────────────────────────────────────────
const StudentDashboard: React.FC<StudentDashboardProps> = ({ profile }) => {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [search, setSearch] = useState("");

  const user = useAppSelector(selectUser);
  console.log("User from Redux:", user);

  const completed = profile?.courses.filter((c) => c.status === "completed");
  const inProgress = profile?.courses.filter((c) => c.status === "in-progress");

  const filtered = profile?.courses.filter((c) => {
    const matchFilter = filter === "all" || c.status === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const firstName = profile?.name.split(" ")[0];
  const initials = profile?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800">My Learning</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden sm:block">
            {profile?.email}
          </span>
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            {initials}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* ── Greeting ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-extrabold text-slate-900">
            Welcome back, {firstName} 👋
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Here's what you're working on.
          </p>
        </motion.div>

        {/* ── Stats ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: <FiBook />,
              label: "Enrolled",
              value: profile?.courses.length || 0,
              color: "text-indigo-600 bg-indigo-50",
            },
            {
              icon: <FiCheckCircle />,
              label: "Completed",
              value: completed?.length || 0,
              color: "text-emerald-600 bg-emerald-50",
            },
            {
              icon: <FiLoader />,
              label: "In Progress",
              value: inProgress?.length || 0,
              color: "text-amber-600 bg-amber-50",
            },
          ].map(({ icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color}`}
              >
                {icon}
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Toolbar ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-bold text-slate-700 text-base">Courses</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                className="pl-8 pr-3 py-1.5 text-sm bg-white border border-slate-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-indigo-200 w-40 text-slate-700 placeholder-slate-400"
              />
            </div>

            {/* Filter pills */}
            <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
              {(["all", "in-progress", "completed"] as FilterMode[]).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      filter === f
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {f === "all"
                      ? "All"
                      : f === "in-progress"
                        ? "Active"
                        : "Done"}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* ── Course grid ─────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered?.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-slate-400 text-sm"
            >
              No courses match your search.
            </motion.p>
          ) : (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered?.map((course, i) => (
                <CourseCard key={course.course_id} course={course} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StudentDashboard;
