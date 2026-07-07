import hero from "../../assets/hero.png";
import { ArrowRight, BookOpen, Search, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/courses?search=${search}`);
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-slate-950 text-white">
      <img
        src={hero}
        alt="Students learning online"
        className="absolute inset-0 h-full w-full object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-center px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-100 backdrop-blur">
            <ShieldCheck size={15} />
            Career-ready learning platform
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Learnify
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Build job-ready skills with structured courses, instructor-led
            lessons, progress tracking, reviews, and practical resources in one
            complete online LMS.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 flex max-w-2xl flex-col gap-3 rounded-lg border border-white/15 bg-white p-2 shadow-2xl sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search courses, skills, or instructors"
                className="h-12 w-full rounded-lg border-0 pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700">
              Search
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <BookOpen size={18} />
              Browse Courses
            </button>
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Start Free
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["12K+", "Lessons published"],
              ["480+", "Expert instructors"],
              ["94%", "Learner satisfaction"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
              >
                <p className="text-2xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-4 right-4 z-10 mx-auto hidden max-w-7xl items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-lg md:flex dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          <div className="flex items-center gap-3">
            <Users className="text-emerald-600" size={22} />
            <span className="text-sm font-semibold">
              Continue below to explore categories, featured courses, and LMS tools.
            </span>
          </div>
          <span className="text-xs text-slate-500">Built for students and instructors</span>
        </div>
      </div>
    </section>
  );
}
