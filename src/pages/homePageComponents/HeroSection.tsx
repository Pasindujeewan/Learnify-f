import hero from "../../assets/hero.png";
import { FaBook, FaRocket, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/courses?search=${search}`);
  };

  return (
    <section className="bg-gradient-to-r from-[#2563ea] via-[#204ac0] to-[#7c3aed] text-white py-16 md:py-20 px-4 md:px-20 flex flex-col md:flex-row items-center overflow-x-hidden relative">
      {/* Subtle background circles for depth */}
      <div
        className="absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)", filter: "blur(2px)" }}
      />
      <div
        className="absolute bottom-[-80px] right-[-40px] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.18)", filter: "blur(4px)" }}
      />

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex flex-col text-center md:text-left relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-flex items-center gap-2 self-center md:self-start mb-4 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <FaRocket className="text-yellow-300" />
          <span>Start learning today</span>
        </motion.div>

        <h1
          className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Unlock Your Potential with{" "}
          <span style={{ color: "#93c5fd" }}>Learnify</span>
        </h1>

        <p
          className="text-sm md:text-lg mb-6 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Access world-class education from top universities and industry
          experts. Start your learning journey today with over 10,000+ courses.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition cursor-pointer flex items-center justify-center gap-2"
            style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}
          >
            <FaBook />
            Browse Courses
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-xl font-semibold transition cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            }}
          >
            <FaRocket />
            Get Started
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mt-8">
          <form onSubmit={handleSearchSubmit}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border text-gray-700 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </form>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex justify-center md:justify-start gap-6 md:gap-10 mt-8 flex-wrap"
        >
          <div
            className="text-center px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <h1 className="text-lg md:text-3xl font-bold mb-0.5 tracking-wide text-orange-400">
              2M+
            </h1>
            <p
              className="text-xs md:text-sm"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Active Students
            </p>
          </div>

          <div
            className="text-center px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <h1 className="text-lg md:text-3xl font-bold mb-0.5 tracking-wide">
              500+
            </h1>
            <p
              className="text-xs md:text-sm"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Expert Instructors
            </p>
          </div>

          <div
            className="text-center px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <h1 className="text-lg md:text-3xl font-bold mb-0.5 tracking-wide">
              10K+
            </h1>
            <p
              className="text-xs md:text-sm"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Courses Available
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
            border: "1.5px solid rgba(255,255,255,0.15)",
          }}
        >
          <img
            src={hero}
            className="w-full max-w-md md:max-w-lg h-auto block"
            alt="Hero"
          />
        </div>
      </motion.div>
    </section>
  );
}
